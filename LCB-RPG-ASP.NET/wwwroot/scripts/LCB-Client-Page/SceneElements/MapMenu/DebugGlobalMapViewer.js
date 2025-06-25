import { SceneElement } from '../SceneElement.js';
import * as THREE from 'three';
export class DebugGlobalWorldMap extends SceneElement {
    constructor(sourceInterfaceScene) {
        super(sourceInterfaceScene);
        this.GetGlobalMapData();
    }
    GenerateElement() {
        const map = new THREE.Group;
        return map;
    }
    GetGlobalMapData() {
    }
}
//# sourceMappingURL=DebugGlobalMapViewer.js.map