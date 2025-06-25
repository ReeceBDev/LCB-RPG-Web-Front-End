var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from 'three';
import { SceneUtilities } from '../ScriptResources/SceneUtilities.js';
import { Colour } from '../Types/Colour.js';
//PostProcessing
import { RenderPass } from "postprocessing";
import { EffectComposer as PostProcessingEffectComposer } from '../../../lib/local/customPostprocessing.js';
import * as PostProcess from './PostProcesses.js';
//Loading Screen Elements
import { RoundedTextboxSingle } from '../SceneElements/ExploreMenu/RoundedTextboxSingle.js';
export class UserInterfaceScene {
    constructor() {
        this.scenePreloaded = false;
        this.activeAnimatedElements = new Array;
        this.loadingStatusIndicator = new THREE.Group;
        this.worldUnitsAspectRatio = window.innerWidth / window.innerHeight; //Calculates the monitor's aspect ratio
        this.worldUnitsVertically = 100; //Keeps things as a percentile.
        this.worldUnitsLaterally = this.worldUnitsAspectRatio * this.worldUnitsVertically; //The previous cent, multiplied by the monitor aspect ratio.
    }
    PreloadScene() {
        //Guard clause. If this is true, skip the whole method and initialise nothing.
        if (this.scenePreloaded)
            return;
        const camera = this.InitialiseCamera();
        const highestLayerUsed = 0;
        const customPostProcessingTargets = new Array;
        const mainScene = this.InitialiseScene();
        const loadingScreen = this.InitialiseScene();
        const loadMainScene = new Promise((resolve) => {
            this.LoadMainSceneElements(mainScene, { setPostprocessConfig: customPostProcessingTargets })
                .then(() => resolve());
        });
        this.renderer = this.InitialiseRenderer();
        this.composer = new PostProcessingEffectComposer(this.renderer, { multisampling: 4 });
        //LoadingScreen Scene
        this.LoadLoadingSceneElements(loadingScreen, { setPostprocessConfig: customPostProcessingTargets }); //Load the loading screen's elements
        this.OpenLoadingScreen(this.composer, loadingScreen, camera, this.renderer, customPostProcessingTargets, highestLayerUsed);
        //Main Scene
        //Asynchronously queue the loading of main elements within the main scene
        loadMainScene
            .then(() => this.CloseLoadingScreen(this.composer, mainScene, camera, this.renderer, customPostProcessingTargets, highestLayerUsed));
        this.scenePreloaded = true;
    }
    RenderScene() {
        if (!this.scenePreloaded)
            this.PreloadScene();
        //Begin rendering
        this.renderer.setAnimationLoop(this.Animate.bind(this));
        //From here, await the OnFinishedLoading() event to fire.
        //This changes the scene from the loading screen to the main, target scene.
    }
    OpenLoadingScreen(composer, loadingScreen, camera, renderer, customPostProcessingTargets, highestLayerUsed) {
        composer.addPass(new RenderPass(loadingScreen, camera)); //Hand the composer the loading screen scene
        this.LoadingScreenPostProcessing(composer, loadingScreen, camera, renderer, customPostProcessingTargets, highestLayerUsed); //Apply postprocessing to loading screen.
    }
    CloseLoadingScreen(composer, targetScene, camera, renderer, customPostProcessingTargets, highestLayerUsed) {
        //Release from loading screen
        //Clear the old scene and re-add the new scene
        composer.removeAllPasses(); //Clear old passes, including loading-screen postprocessing.
        composer.addPass(new RenderPass(targetScene, camera)); //Change the scene to the main scene
        //Apply derived postprocessing
        this.ApplyPostProcessing(composer, targetScene, camera, customPostProcessingTargets, highestLayerUsed); //Apply the derived post processing, as normal.
    }
    InitialiseScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color().setRGB(0, 0, 0);
        return scene;
    }
    InitialiseCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 6;
        return camera;
    }
    InitialiseRenderer() {
        const renderer = new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        //renderer.setAnimationLoop(this.Animate.bind(this)); //This gets set after loading is complete, now.
        document.body.appendChild(renderer.domElement);
        return renderer;
    }
    ApplyPostProcessing(composer, scene, camera, instructions, highestLayerUsed) {
        // Recommended Effect Execution Order:
        // https://github.com/pmndrs/postprocessing/wiki/Effect-Merging
        //PostProcess.ApplyFXAA(composer, camera); //I think I prefer the sharpness without. It looks far better.
        PostProcess.ApplyChromaticAbberation(composer, camera);
        PostProcess.ApplyBlooms(composer, scene, camera, instructions, highestLayerUsed);
        //PostProcess.ApplySMAA(composer, camera); //I think it looks fine without, just normal msaa, I'd imagine. This must come AFTER other effects, or it wont render, for some reason, which is a MASSIVE pointless performance hit!
        PostProcess.ApplyNoise(composer, camera);
        PostProcess.ApplyFlicker(composer, camera);
    }
    //Provides an override without requiring the base animate to be called every time. This "base" functionality sits within AnimateElements().
    AnimateScene() {
    }
    AnimateElements() {
        this.activeAnimatedElements.forEach((element) => element.Animate());
    }
    Animate() {
        this.AnimateElements();
        this.AnimateScene();
        this.composer.render();
    }
    AnimateLoadingScreen() {
        this.loadingStatusIndicator.rotation.x++;
        this.loadingStatusIndicator.rotation.y++;
        this.composer.render();
    }
    LoadMainSceneElements(scene, configs) {
        return __awaiter(this, void 0, void 0, function* () {
            const elementsToLoad = this.AllocateElements();
            const elementsCurrentlyLoaded = new Set(); //Element, HasLoaded
            const allElementsLoaded = new Promise((resolve) => {
                //Subscribe to each element's preloaded-status
                elementsToLoad.forEach((element) => {
                    element.EventDispatcher.addEventListener('preloadedAssets', () => {
                        elementsCurrentlyLoaded.add(element);
                        //Upon each additional element being loaded, check whether loading has been fully-completed.
                        if (elementsCurrentlyLoaded.size === elementsToLoad.length) {
                            resolve();
                        }
                        else if (elementsCurrentlyLoaded.size > elementsToLoad.length)
                            throw new Error("Unexpected exception! elementsCurrentlyLoaded is higher than the number of possible elementsToLoad!");
                    });
                });
                //Preload all the elements
                this.PreloadElements(elementsToLoad);
            });
            //Preload all element assets
            yield allElementsLoaded;
            //Finalise initialisation using the preloaded assets
            this.InitialiseElements(scene, { postprocessConfig: configs.setPostprocessConfig });
        });
    }
    PreloadElements(targetElements) {
        if (targetElements.length > 0)
            targetElements.forEach((e) => { e.InitiatePreload(); });
    }
    LoadLoadingSceneElements(scene, configs) {
        const loadingIndicator = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), new THREE.LineBasicMaterial({ color: Colour.RetroWhite }));
        const loadingTitle = RoundedTextboxSingle(5, 5, Colour.RetroWhite, 0.2, 'LOADING ...', 2);
        //Loading Indicator
        SceneUtilities.SetHeightAsPercent(this, loadingIndicator, 57);
        SceneUtilities.SetLateralAsPercent(this, loadingIndicator, 50);
        scene.add(loadingIndicator);
        //Loading Title
        SceneUtilities.SetHeightAsPercent(this, loadingTitle, 50);
        SceneUtilities.SetLateralAsPercent(this, loadingTitle, 50);
        scene.add(loadingTitle);
        //Loaded Status Textfield
        //Textfield fade Gradient
        //For this either use this https://stackoverflow.com/questions/63160304/how-to-make-three-js-shadermaterial-gradient-to-transparent
        // OR see if there's an existing solution in texfield for changing colour, transparency, etc on the fly!
        // If I can't get it working, multiple textfields will do! There don't need to be many! only 3-8 :)
    }
    LoadingScreenPostProcessing(composer, scene, camera, renderer, instructions, highestLayerUsed) {
        PostProcess.ApplyChromaticAbberation(composer, camera);
        PostProcess.ApplyBlooms(composer, scene, camera, instructions, highestLayerUsed);
        PostProcess.ApplyNoise(composer, camera);
        PostProcess.ApplyFlicker(composer, camera);
    }
    get WorldUnitsAspectRatio() { return this.worldUnitsAspectRatio; }
    get WorldUnitsVertically() { return this.worldUnitsVertically; }
    get WorldUnitsLaterally() { return this.worldUnitsLaterally; }
    get ActiveAnimatedElements() { return this.activeAnimatedElements; }
    set ActiveAnimatedElements(value) { this.activeAnimatedElements = value; }
}
//# sourceMappingURL=UserInterfaceScene.js.map