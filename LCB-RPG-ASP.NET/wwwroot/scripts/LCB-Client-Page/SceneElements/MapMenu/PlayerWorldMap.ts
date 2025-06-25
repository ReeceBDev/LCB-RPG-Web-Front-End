import { UserInterfaceScene } from '../../ScriptResources/UserInterfaceScene.js';
import { SceneUtilities } from '../../ScriptResources/SceneUtilities.js';
import { SceneElement } from '../SceneElement.js';

import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../../Types/Colour.js';
export class WorldMap extends SceneElement {

    constructor(sourceInterfaceScene: UserInterfaceScene) {
        super(sourceInterfaceScene);

        this.GetPlayerMapData
    }

    protected override GenerateElement(): THREE.Group {
        const map = new THREE.Group;

        return map;
    }

    private GetPlayerMapData() {

    }
}