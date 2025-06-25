import { SceneUtilities } from '../ScriptResources/SceneUtilities.js';
import * as THREE from 'three';
export class SceneElement {
    constructor(sourceInterfaceScene) {
        this.hasPreloadedAssets = false;
        this.eventDispatcher = new THREE.EventDispatcher();
        this.interfaceScene = sourceInterfaceScene;
    }
    InitialiseElement() {
        if (!this.hasPreloadedAssets)
            throw new Error("Element was initialised without being pre-loaded! Make sure the local PreloadAssets has been called, and that it launches FirePreloadedAssetsEvent(), when successful!");
        this.element = this.GenerateElement();
    }
    InitiatePreload() {
        this.FirePreloadedAssetsEvent();
    }
    Animate() {
    }
    SetPosition(lateralPercentile, heightPercentile) {
        SceneUtilities.SetLateralAsPercent(this.interfaceScene, this.element, lateralPercentile);
        SceneUtilities.SetHeightAsPercent(this.interfaceScene, this.element, heightPercentile);
    }
    get Element() { return this.element; }
    get HasPreloadedAssets() { return this.hasPreloadedAssets; }
    ;
    get EventDispatcher() { return this.eventDispatcher; }
    ;
    //This indicates all assets have been loaded. If there is only one, it can go inside its onLoad without needign to call something else or tallying up with other assets, first.
    FirePreloadedAssetsEvent() {
        this.hasPreloadedAssets = true;
        this.eventDispatcher.dispatchEvent({ type: 'preloadedAssets' });
    }
}
//# sourceMappingURL=SceneElement.js.map