import { UserInterfaceScene } from '../ScriptResources/UserInterfaceScene.js';
//Scene Elements
import { DebugGlobalWorldMap } from '../SceneElements/MapMenu/DebugGlobalMapViewer.js';
export class MapMenu extends UserInterfaceScene {
    AllocateElements() {
        const sceneElements = new Array;
        this.mapElement = new DebugGlobalWorldMap(this);
        sceneElements.push(this.mapElement);
        return sceneElements;
    }
    InitialiseElements(scene, { 
    //Input object
    postprocessConfig = new Array } = {}) {
        const currentPostProcessConfig = postprocessConfig;
        //Implementation
        return { currentPostProcessConfig };
    }
}
//# sourceMappingURL=MapMenu.js.map