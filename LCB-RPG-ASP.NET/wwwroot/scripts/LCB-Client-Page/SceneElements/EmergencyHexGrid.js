import * as THREE from 'three';
//@ts-ignore
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { randFloat, randInt } from 'three/src/math/MathUtils.js';
//A few example hex grid configs
/*
const smallHexGrid = {
    hexGridOffsetTopLeft: new THREE.Vector3(-6.5, 4.7, 0),
    hexGridRows: 5,
    hexGridColumns: 3
};

const mediumHexGrid = {
    hexGridOffsetTopLeft: new THREE.Vector3(-7.95, 4.7, 0),
    hexGridRows: 7,
    hexGridColumns: 3
};

const largeHexGrid = {
    hexGridOffsetTopLeft: new THREE.Vector3(-7.95, 5.5, 0),
    hexGridRows: 7,
    hexGridColumns: 4
};
*/
export class EmergencyHexGrid {
    constructor(setScene, loader, postProcessing, { hexGridOffsetTopLeft = new THREE.Vector3(0, 0, 0), hexGridRows = 5, hexGridColumns = 5, isInvisible = false, }) {
        this.localHexList = new Array;
        this.scene = setScene;
        this.hexGridRows = hexGridRows;
        this.hexGridColumns = hexGridColumns;
        this.GenerateGrid(this.scene, loader, {
            hexGridOffsetTopLeft,
            hexGridRows,
            hexGridColumns,
            isInvisible,
        });
        postProcessing.AddRange(this.localHexList);
    }
    AnimateAppear() {
        // Times are set in seconds. Delays are per element.
        // Note: To work with the total delay-time, 
        //  divide the desired total delay by the total number of elements, minus any not used for that delay's scope.
        let currentTimeout = 0;
        const burstAmount = 3;
        const minBurstDelay = 0.6 / (burstAmount); //Total time
        const maxBurstDelay = 1.3 / (burstAmount); //Total time
        const burstCooldownDelay = 1.2; //Total time
        const minAppearDelay = 0.3 / (this.hexGridRows * this.hexGridColumns - burstAmount); //Total time
        const maxAppearDelay = 1.0 / (this.hexGridRows * this.hexGridColumns - burstAmount); //Total time
        this.setTimeoutIDs = new Array; //Clear
        //Get the hex IDs
        let remainingHexIDs = (() => {
            const IDs = new Array;
            for (let entry = 0; entry < this.localHexList.length; entry++) {
                IDs.push(entry);
            }
            return IDs;
        })();
        //Generate the intial "burst", sequentially, using random targets
        for (let i = 0; i < burstAmount; i++) {
            const selectionRand = randInt(0, remainingHexIDs.length - 1);
            const targetID = remainingHexIDs[selectionRand];
            let delayRand = randFloat(minBurstDelay, maxBurstDelay);
            currentTimeout += delayRand;
            this.setTimeoutIDs.push(setTimeout(() => { this.RunAppearAnimation(targetID); }, currentTimeout * 1000));
            remainingHexIDs.splice(selectionRand, 1);
        }
        //Wait after the burst
        currentTimeout += burstCooldownDelay;
        //Generate the rest, at random
        while (remainingHexIDs.length > 0) {
            const selectionRand = randInt(0, remainingHexIDs.length - 1);
            const targetID = remainingHexIDs[selectionRand];
            let delayRand = randFloat(minAppearDelay, maxAppearDelay);
            currentTimeout += delayRand;
            this.setTimeoutIDs.push(setTimeout(() => { this.RunAppearAnimation(targetID); }, currentTimeout * 1000));
            remainingHexIDs.splice(selectionRand, 1);
        }
    }
    CancelAnimation() {
        //Cancel existing setTimeouts
        while (this.setTimeoutIDs.length > 0) {
            clearTimeout(this.setTimeoutIDs.pop());
        }
        //Hide anything already rendered
        for (let i = 0; i < this.localHexList.length; i++) {
            this.localHexList[i].visible = false;
        }
    }
    GenerateGrid(scene, loader, { hexGridOffsetTopLeft = new THREE.Vector3(0, 0, 0), hexGridRows = 5, hexGridColumns = 5, isInvisible = false, }) {
        let xRelative = hexGridOffsetTopLeft.x;
        let yRelative = hexGridOffsetTopLeft.y;
        let zRelative = hexGridOffsetTopLeft.z;
        //Generate a grid of hexes
        for (let currentColumn = 1; currentColumn <= hexGridRows; currentColumn++) {
            xRelative += 1.75;
            //Adjust the height to tile from the correct height, based on odd or even columns. 
            //This creates the half - up - half - down tiling pattern :)
            if (currentColumn % 2)
                yRelative = hexGridOffsetTopLeft.y;
            else
                yRelative = hexGridOffsetTopLeft.y - 0.875;
            for (let currentRow = 1; currentRow <= hexGridColumns; currentRow++) {
                const newHex = this.GenerateEmergencyHex(scene, loader, isInvisible);
                yRelative -= 1.75;
                newHex.position.x = xRelative;
                newHex.position.y = yRelative;
                newHex.position.z = zRelative;
                this.localHexList.push(newHex);
            }
        }
    }
    GenerateEmergencyHex(scene, loader, isInvisible = false) {
        const group = new THREE.Group();
        loader.load('resources/EmergencyHex.svg', function (data) {
            for (let i = 0; i < data.paths.length; i++) {
                const path = data.paths[i];
                const fillColor = path.userData.style.fill;
                if (fillColor && fillColor !== 'none') {
                    const shapes = SVGLoader.createShapes(path);
                    for (let j = 0; j < shapes.length; j++) {
                        const shape = shapes[j];
                        // Create mesh geometry (as in the demo)
                        const meshGeometry = new THREE.ExtrudeGeometry(shape, {
                            depth: 0.1, // Small extrusion
                            bevelEnabled: false
                        });
                        // Create both the fill and stroke materials
                        const material = new THREE.MeshBasicMaterial({
                            color: new THREE.Color().setStyle(fillColor),
                            opacity: path.userData.style.fillOpacity || 1.0,
                            transparent: true,
                            side: THREE.DoubleSide
                        });
                        const mesh = new THREE.Mesh(meshGeometry, material);
                        // Also create an edges geometry to highlight the shape
                        const edgesGeometry = new THREE.EdgesGeometry(meshGeometry);
                        const edges = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
                        group.add(mesh);
                        group.add(edges);
                    }
                }
            }
            // Scale
            group.scale.set(0.03, -0.03, 0.03);
            if (isInvisible)
                group.visible = false;
            //Add to scene
            scene.add(group);
            console.log('Added new SVG: EmergencyHex.svg in EmergencyPanel.');
        }, undefined, function (error) {
            console.error('Error loading SVG: EmergencyHex.svg in EmergencyPanel. ', error);
        });
        return group;
    }
    GenerateEmergencyHexOriginal(scene, loader, isInvisible = false) {
        const group = new THREE.Group();
        // load a SVG resource
        loader.load(
        // resource URL
        //'resources/EmergencyHex.svg',
        'resources/hexagon.svg', 
        // called when the resource is loaded
        function (data) {
            const paths = data.paths;
            const group = new THREE.Group();
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const fillColour = path.userData.style.fill;
                //Generate the shape from the SVG
                const shapes = SVGLoader.createShapes(path);
                //Create materials and meshes
                for (let j = 0; j < shapes.length; j++) {
                    const shape = shapes[j];
                    const material = new THREE.MeshBasicMaterial({
                        color: new THREE.Color().setStyle(fillColour),
                        opacity: path.userData.style.fillOpacity || 1.0,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });
                    const meshGeometry = new THREE.ExtrudeGeometry(shape, {
                        depth: 0.1, // Small extrusion
                        bevelEnabled: false
                    });
                    const mesh = new THREE.Mesh(meshGeometry, material);
                    // Also create an edges geometry to highlight the shape
                    const edgesGeometry = new THREE.EdgesGeometry(meshGeometry);
                    const edges = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x000000 }));
                    //const geometry = new THREE.ShapeGeometry(shape);
                    //const mesh = new THREE.Mesh(geometry, material);
                    group.add(mesh);
                }
            }
            // Scale
            group.scale.set(0.03, -0.03, 0.03);
            if (isInvisible)
                group.visible = false;
            //Add to scene
            scene.add(group);
            console.log('Successfully loaded SVG: EmergencyHex.svg in EmergencyPanels.js');
        }, 
        // called when loading is in progress
        function (xhr) {
            console.log('Trying to load SVG: EmergencyHex.svg in EmergencyPanels.js - ' + (xhr.loaded / xhr.total * 100) + '%');
        }, 
        // called when loading has errors
        function (error) {
            console.log('ERROR: Unknown Error when trying to load an SVG: EmergencyHex.svg in EmergencyPanels.js');
        });
        return group;
    }
    RunAppearAnimation(index) {
        this.localHexList[index].visible = true;
    }
}
//# sourceMappingURL=EmergencyHexGrid.js.map