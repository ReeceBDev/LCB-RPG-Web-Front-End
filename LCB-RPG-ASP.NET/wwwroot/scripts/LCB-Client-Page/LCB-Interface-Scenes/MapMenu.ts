import { UserInterfaceScene } from '../ScriptResources/UserInterfaceScene.js';
import { SceneUtilities } from '../ScriptResources/SceneUtilities.js';
import { SceneElement } from '../SceneElements/SceneElement.js';

import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../Types/Colour.js';

//PostProcessing
import { EffectInstructions } from '../Types/EffectInstructions.js';
import { PostProcessingInstruction } from '../Types/PostProcessingInstruction.js';

//Scene Elements
import { DebugGlobalWorldMap } from '../SceneElements/MapMenu/DebugGlobalMapViewer.js';

export class MapMenu extends UserInterfaceScene {
    private mapElement: DebugGlobalWorldMap;

    protected override AllocateElements(): Array<SceneElement> {
        const sceneElements = new Array<SceneElement>;

        this.mapElement = new DebugGlobalWorldMap(this);
        sceneElements.push(this.mapElement);

        return sceneElements;
    }

    protected override InitialiseElements(

        scene: THREE.Scene,
        {
            //Input object
            postprocessConfig = new Array<EffectInstructions>
        } = {}): {
            //Output type declarations
            currentPostProcessConfig: Array<EffectInstructions>
        } {
        const currentPostProcessConfig = postprocessConfig;

        //Implementation



        return {currentPostProcessConfig};
    }
}