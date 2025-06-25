import { SceneElement } from '../../SceneElements/SceneElement.js';
//@ts-ignore
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';
export class Health extends SceneElement {
    constructor(sourceInterfaceScene, healthBarNodeCount = 24, //Must be even
    healthNodeDistance = 2, healthNodeSizeMultiplier = 3) {
        if (!((healthBarNodeCount % 2) === 0))
            throw new Error('healthBarNodeCount must be an even number, or it won\'t display correctly. This bug occurs due to how each node is positioned relative to the centre of the health element.');
        super(sourceInterfaceScene);
        this.healthBarNodeCount = healthBarNodeCount;
        this.healthNodeDistance = healthNodeDistance;
        this.healthNodeSizeMultiplier = healthNodeSizeMultiplier;
        this.loader = new SVGLoader();
    }
    GenerateElement() {
        const healthBar = new THREE.Group;
        for (let currentHealthNode = 0; currentHealthNode <= this.healthBarNodeCount; currentHealthNode++) {
            const healthNode = new THREE.Group();
            //Form the node from components
            healthNode.add(this.GenerateHealthLight(this.loader));
            //Position the node within the healthBar, relative to the previous node
            if (currentHealthNode > 0) {
                //Current position plus previous node, minus half the total distance, which centres.
                healthNode.position.x = (this.healthNodeDistance * currentHealthNode) - ((this.healthNodeDistance * this.healthBarNodeCount) / 2);
            }
            healthBar.add(healthNode);
        }
        return healthBar;
    }
    GenerateHealthLight(loader) {
        const group = new THREE.Group();
        const currentSizeMultiplier = this.healthNodeSizeMultiplier;
        loader.load('resources/fullhealthelement.svg', function (data) {
            for (let i = 0; i < data.paths.length; i++) {
                const path = data.paths[i];
                const fillColor = path.userData.style.fill;
                if (fillColor && fillColor !== 'none') {
                    const shapes = SVGLoader.createShapes(path);
                    for (let j = 0; j < shapes.length; j++) {
                        const shape = shapes[j];
                        // Create mesh geometry
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
            // Scaling
            group.scale.set(0.03, -0.03, 0.03); //Scale so that the svg comes out square.
            group.scale.y = -group.scale.y; //Flip the right way-up
            group.scale.multiply(new THREE.Vector3(currentSizeMultiplier, currentSizeMultiplier, currentSizeMultiplier)); //Scale up larger
            console.log('Added new SVG: fullhealthelement.svg in a Health element.');
        }, undefined, function (error) {
            console.error('Error loading SVG: fullhealthelement.svg in Ea Health element. ', error);
        });
        return group;
    }
}
//# sourceMappingURL=Health.js.map