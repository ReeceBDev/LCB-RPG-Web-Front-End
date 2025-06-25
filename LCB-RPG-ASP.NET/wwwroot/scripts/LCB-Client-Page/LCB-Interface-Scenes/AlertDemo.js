import { UserInterfaceScene } from '../ScriptResources/UserInterfaceScene.js';
import * as THREE from 'three';
//@ts-ignore
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { EffectInstructions } from '../Types/EffectInstructions.js';
import { PostProcessingInstruction } from '../Types/PostProcessingInstruction.js';
//Scene Elements
import { EmergencyHexGrid } from '../SceneElements/EmergencyHexGrid.js';
import { RapidScrollingText } from '../SceneElements/RapidScrollingText.js';
export class AlertDemo extends UserInterfaceScene {
    constructor() {
        super(...arguments);
        this.AlertChangeMutex = false;
        this.secondsUntilNextAlert = 9;
        this.AnimateAlertTarget = 2; //Set as the alert which will run first.
        this.runNextAlert = true; //True so that the alerts run immediately
        this.warningHexGrid = null;
        this.isGridVisible = false;
        this.wasGridAppearTriggered = false;
        this.wasGridVanishTriggered = false;
        this.appearLength = 4.4;
        this.vanishLength = 0.2;
        this.mapIndex = 0; //init as 0, since mapIndex is incremented prior, to allow for cancels to match up with their related alerts.
        this.alertMap = new Map(); //Methods for each alert loop
        this.alertMapCancels = new Map(); //Cancellations for each alert
    }
    AllocateElements() {
        const sceneElements = new Array;
        return sceneElements;
    }
    InitialiseElements(scene, { 
    //Input object
    postprocessConfig = new Array } = {}) {
        //Main function body
        const loader = new SVGLoader();
        const currentPostProcessConfig = postprocessConfig;
        let hexBloomInstruction = new EffectInstructions(PostProcessingInstruction['Bloom.VeryStrong']);
        //Create scene elements
        this.warningHexGrid = new EmergencyHexGrid(scene, loader, hexBloomInstruction, {
            hexGridOffsetTopLeft: new THREE.Vector3(-7.95, 4.7, 0),
            hexGridRows: 7,
            hexGridColumns: 3,
            isInvisible: true,
        });
        this.InitialiseAlertMap();
        this.rapidScrollingAlert = new RapidScrollingText(scene);
        currentPostProcessConfig.push(hexBloomInstruction);
        return { currentPostProcessConfig }; //Returns main content configurations
    }
    AnimateScene() {
        //Run the active alert every animation cycle.
        //Note: This must be before the cycle assignment, to account for running the first alert upon init.
        this.alertMap.get(this.AnimateAlertTarget)();
        //Cycle through different alerts periodically.
        if (this.AlertChangeMutex === false) {
            this.AlertChangeMutex = true; //Hold mutex
            setTimeout(() => {
                this.alertMapCancels.get(this.AnimateAlertTarget)(); //Cancel the old alert, using the old AnimateAlertTarget index
                this.AnimateAlertTarget = (this.AnimateAlertTarget < this.alertMap.size) ? ++this.AnimateAlertTarget : 1; //Give the next map index, or loop to the start.
                console.log("Switched to alert index " + this.AnimateAlertTarget);
                this.AlertChangeMutex = false; //Release mutex
            }, this.secondsUntilNextAlert * 1000 //(After this length of time)
            );
        }
    }
    InitialiseAlertMap() {
        //Assign alerts
        //Note: The cancel index must match its alert index.
        this.alertMap.set(++this.mapIndex, (() => this.LaunchHexGridAlert()));
        this.alertMapCancels.set(this.mapIndex, (() => this.warningHexGrid.CancelAnimation()));
        this.alertMap.set(++this.mapIndex, (() => this.rapidScrollingAlert.AnimateAlert()));
        this.alertMapCancels.set(this.mapIndex, (() => this.rapidScrollingAlert.ClearAnimation())); //Do nothing.
    }
    LaunchHexGridAlert() {
        //Trigger the grid repeatedly.
        if ((this.isGridVisible === false) && (this.wasGridAppearTriggered === false)) {
            this.wasGridAppearTriggered = true; //hold mutex
            this.warningHexGrid.AnimateAppear();
            //Hold timer
            setTimeout(() => {
                this.isGridVisible = true; //toggle hold flag
                this.wasGridAppearTriggered = false; //release mutex
            }, this.appearLength * 1000);
        }
        if ((this.isGridVisible === true) && (this.wasGridVanishTriggered === false)) {
            this.wasGridVanishTriggered = true; //hold mutex
            this.warningHexGrid.CancelAnimation();
            //Hold timer
            setTimeout(() => {
                this.isGridVisible = false; //toggle hold flag
                this.wasGridVanishTriggered = false; //release mutex
            }, this.vanishLength * 1000);
        }
    }
}
//# sourceMappingURL=AlertDemo.js.map