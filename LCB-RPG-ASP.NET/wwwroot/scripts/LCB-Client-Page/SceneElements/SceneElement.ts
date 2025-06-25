import { ISceneElement } from "./ISceneElement";
import { UserInterfaceScene } from '../ScriptResources/UserInterfaceScene.js';
import { SceneUtilities } from '../ScriptResources/SceneUtilities.js';
import { SceneEvents } from './SceneEvents';

import * as THREE from 'three';

export abstract class SceneElement implements ISceneElement {
    private interfaceScene: UserInterfaceScene;
    private element: THREE.Group;
    private hasPreloadedAssets = false;
    private eventDispatcher = new THREE.EventDispatcher<SceneEvents>();

    constructor(sourceInterfaceScene: UserInterfaceScene) {
        this.interfaceScene = sourceInterfaceScene;
    }

    public InitialiseElement(): void {
        if (!this.hasPreloadedAssets)
            throw new Error("Element was initialised without being pre-loaded! Make sure the local PreloadAssets has been called, and that it launches FirePreloadedAssetsEvent(), when successful!");

        this.element = this.GenerateElement();
    }

    public InitiatePreload(): void {
        this.FirePreloadedAssetsEvent();
    }

    public Animate(): void {

    }

    public SetPosition(lateralPercentile: number, heightPercentile: number): void {
        SceneUtilities.SetLateralAsPercent(this.interfaceScene, this.element, lateralPercentile);
        SceneUtilities.SetHeightAsPercent(this.interfaceScene, this.element, heightPercentile);
    }

    protected abstract GenerateElement(): THREE.Group;

    public get Element(): THREE.Group { return this.element; }
    public get HasPreloadedAssets(): Boolean { return this.hasPreloadedAssets };
    public get EventDispatcher(): THREE.EventDispatcher<SceneEvents> { return this.eventDispatcher };

    //This indicates all assets have been loaded. If there is only one, it can go inside its onLoad without needign to call something else or tallying up with other assets, first.
    protected FirePreloadedAssetsEvent(): void {
        this.hasPreloadedAssets = true;
        this.eventDispatcher.dispatchEvent({ type: 'preloadedAssets'});
    }
}