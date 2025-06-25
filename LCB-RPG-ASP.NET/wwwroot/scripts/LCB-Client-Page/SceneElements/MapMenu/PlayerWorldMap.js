import { SceneElement } from '../SceneElement.js';
import * as THREE from 'three';
export class WorldMap extends SceneElement {
    constructor(sourceInterfaceScene) {
        super(sourceInterfaceScene);
        this.GetPlayerMapData;
    }
    GenerateElement() {
        const map = new THREE.Group;
        return map;
    }
    GetPlayerMapData() {
    }
}
//# sourceMappingURL=PlayerWorldMap.js.map