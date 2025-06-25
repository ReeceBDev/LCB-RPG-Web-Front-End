import { UserInterfaceScene } from '../ScriptResources/UserInterfaceScene.js';
import { SceneUtilities } from '../ScriptResources/SceneUtilities.js';
import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../Types/Colour.js';
//RoundedBox Modules
import { RoundedRect } from '../ScriptResources/Imports/RoundedRectangle.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { Wireframe } from 'three/addons/lines/Wireframe.js';
//Scene Elements
import { ExplorationTextfield } from '../SceneElements/ExploreMenu/ExplorationTextfield.js';
import { Radio } from '../SceneElements/ExploreMenu/Radio.js';
import { Health } from '../SceneElements/ExploreMenu/Health.js';
import { Status } from '../SceneElements/ExploreMenu/Status.js';
export class ExploreMenu extends UserInterfaceScene {
    AllocateElements() {
        const sceneElements = new Array;
        this.explorationTextfield = new ExplorationTextfield(this);
        sceneElements.push(this.explorationTextfield);
        this.health = new Health(this);
        sceneElements.push(this.health);
        this.status = new Status(this);
        sceneElements.push(this.status);
        this.radio = new Radio(this);
        sceneElements.push(this.radio);
        return sceneElements;
    }
    InitialiseElements(scene, { 
    //Input object
    postprocessConfig = new Array } = {}) {
        const currentPostProcessConfig = postprocessConfig;
        //Implementation
        //Basic Scene-Generic
        let menuTitle = this.GenerateMenuTitle(scene);
        scene.add(menuTitle);
        //Add the textfield to the scene
        try {
            this.explorationTextfield.InitialiseElement();
            this.explorationTextfield.SetPosition(15, 15);
            this.ActiveAnimatedElements.push(this.explorationTextfield);
            scene.add(this.explorationTextfield.Element);
        }
        catch (error) {
            console.error('ERROR: Couldn\'t initialise explorationTextfield element on ExploreMenu.');
        }
        //Add health group to the scene
        try {
            this.health.InitialiseElement();
            this.health.SetPosition(15, 88);
            this.ActiveAnimatedElements.push(this.health);
            scene.add(this.health.Element);
            console.log('Successfully created the health element on the ExploreMenu. :)');
        }
        catch (error) {
            console.error('ERROR: Couldn\'t initialise health element on ExploreMenu.');
        }
        //Add status group to the scene
        try {
            this.status.InitialiseElement();
            this.status.SetPosition(8, 13);
            scene.add(this.status.Element);
        }
        catch (error) {
            console.error('ERROR: Couldn\'t initialise status element on ExploreMenu.');
        }
        //Add radio group to the scene
        try {
            this.radio.InitialiseElement();
            this.radio.SetPosition(89, 60);
            scene.add(this.radio.Element);
        }
        catch (error) {
            console.error('ERROR: Couldn\'t initialise radio element on ExploreMenu.');
        }
        return { currentPostProcessConfig }; //Returns main content configurations
    }
    InitialiseCamera() {
        const camera = new THREE.OrthographicCamera(0, this.WorldUnitsLaterally, 0, this.WorldUnitsVertically, -100, 2000);
        return camera;
    }
    GenerateMenuTitle(scene) {
        const menuTitle = new THREE.Group;
        const BorderGeometry = new THREE.ShapeGeometry(RoundedRect(new THREE.Shape(), 0, 0, 31, 4, 0.7));
        const menuTitleText = new Text();
        //MenuTitle Group
        SceneUtilities.SetHeightAsPercent(this, menuTitle, 3.1);
        SceneUtilities.SetLateralAsPercent(this, menuTitle, 1);
        //Text
        menuTitleText.text = 'ENVIRONMENT INTERFACE';
        menuTitleText.fontSize = 5;
        menuTitleText.font = '/resources/Chathura-ExtraBold.ttf';
        menuTitleText.position.y = -2.1;
        menuTitleText.position.x = 1;
        menuTitleText.scale.y = -menuTitle.scale.y; //Flip the right way up
        menuTitle.add(menuTitleText);
        //Border
        menuTitle.add(new Wireframe(new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(BorderGeometry)), new LineMaterial({ color: Colour.RetroWhite, linewidth: 3 })));
        return menuTitle;
    }
}
//# sourceMappingURL=ExploreMenu.js.map