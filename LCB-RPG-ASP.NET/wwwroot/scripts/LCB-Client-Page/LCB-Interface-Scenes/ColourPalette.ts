import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../Types/Colour.js';

//Unmodified PostProcessing
// @ts-ignore
import {
    BloomEffect, EffectPass, RenderPass, KernelSize, BoxBlurPass, MipmapBlurPass, LuminancePass,
    FXAAEffect, Selection, KawaseBlurPass, GaussianBlurPass, SMAAEffect, SMAAPreset, BlendFunction,
    EdgeDetectionMode, PredicationMode, TextureEffect, GlitchEffect, GlitchMode, ChromaticAberrationEffect
} from "postprocessing";

//Custom PostProcessing
import {
    SelectiveBloomEffect, EffectComposer as PostProcessingEffectComposer, NoiseEffect
} from '../../../lib/local/customPostprocessing.js';

import { PostProcessingInstruction } from '../Types/PostProcessingInstruction.js';
import { EffectInstructions } from '../Types/EffectInstructions.js';

//Animations
import { AnimateInstruction } from '../Types/AnimateInstruction.js';
import { AnimationInstructions } from '../Types/AnimationInstructions.js';

export function RenderPage() {
    const scene = InitialiseScene();
    const camera = InitialiseCamera();
    const renderer = InitialiseRenderer();
    const composer = InitialiseEffectComposer(scene, camera, renderer);

    const highestLayerUsed: number = 0;

    //const animationTargets = new Array<AnimationInstructions>; //Not used. I believe this must be replaced with the AnimationMixer or Keyframes!
    const customPostProcessingTargets = new Array<EffectInstructions>;

    let emergencyOrangeGeometries = new Array<THREE.Object3D>;
    let warningRedGeometries = new Array<THREE.Object3D>;
    let alertYellowGeometries = new Array<THREE.Object3D>;
    let deathBlackGeometries = new Array<THREE.Object3D>;
    let retroWhiteGeometries = new Array<THREE.Object3D>;
    let conditionBlueGeometries = new Array<THREE.Object3D>;
    let magiOrangeGeometries = new Array<THREE.Object3D>;

    //Not used. I believe this must be replaced with the AnimationMixer or Keyframes!
    //const spinAnimations = new AnimationInstructions(AnimateInstruction['Spin']);

    const emergencyOrangeBlooms = new EffectInstructions(PostProcessingInstruction['Bloom.Strong']);
    const warningRedBlooms = new EffectInstructions(PostProcessingInstruction['Bloom.VeryStrong']);


    //Generate Objects
    GenerateStaticGeometries(scene);

    emergencyOrangeGeometries = emergencyOrangeGeometries.concat(NewEmergencyOrangeGeometries(scene));
    warningRedGeometries = warningRedGeometries.concat(NewWarningRedGeometries(scene));
    alertYellowGeometries = alertYellowGeometries.concat(NewAlertYellowGeometries(scene));
    deathBlackGeometries = deathBlackGeometries.concat(NewDeathBlackGeometries(scene));
    retroWhiteGeometries = retroWhiteGeometries.concat(NewRetroWhiteGeometries(scene));
    conditionBlueGeometries = conditionBlueGeometries.concat(NewConditionBlueGeometries(scene));
    magiOrangeGeometries = magiOrangeGeometries.concat(NewMAGIOrangeGeometries(scene));


    //Declare Object Animation Instructions
    //Note: Not used.I believe this must be replaced with the AnimationMixer or Keyframes!
    /*
    spinAnimations.AddRange(alertYellowGeometries);
    spinAnimations.AddRange(magiOrangeGeometries);
    spinAnimations.AddRange(emergencyOrangeGeometries);

    animationTargets.push(spinAnimations);
    */


    //Declare Object Effect Instructions
    emergencyOrangeBlooms.AddRange(emergencyOrangeGeometries);
    customPostProcessingTargets.push(emergencyOrangeBlooms);

    warningRedBlooms.AddRange(warningRedGeometries);
    customPostProcessingTargets.push(warningRedBlooms);


    //Apply PostProcessing
    ApplyPostProcessing(composer, scene, camera, renderer, customPostProcessingTargets, highestLayerUsed);

    //Render
    RunRender(composer);
}

function InitialiseScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setRGB(0, 0, 0);

    return scene;
}

function InitialiseCamera(): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    return camera;
}

function InitialiseRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animate);

    document.body.appendChild(renderer.domElement);

    return renderer;
}

function RunRender(composer: PostProcessingEffectComposer): void {
    requestAnimationFrame(function render() {
        requestAnimationFrame(render);
        composer.render();

    });
}

function GenerateStaticGeometries(scene): void {
    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Background modifications
    const whitePanel = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 2.5), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.FrontSide }));

    whitePanel.position.z = - 1;
    whitePanel.position.x = + 1.8;
    whitePanel.position.y = - 3.9;

    scene.add(whitePanel);
}

function NewMatrixGreenGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const matrixGreenSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.MatrixGreen }));
    const matrixGreenOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.MatrixGreen }));
    const matrixGreenTitle = new Text();
    matrixGreenTitle.text = 'MATRIX GREEN';
    matrixGreenTitle.fontSize = 0.22;
    matrixGreenTitle.color = Colour.MatrixGreen;

    matrixGreenSolid.position.x = 2.5;
    matrixGreenOutline.position.x = 4;
    matrixGreenTitle.position.x = 0.2;
    matrixGreenTitle.position.y = 0.1;

    scene.add(matrixGreenSolid);
    scene.add(matrixGreenOutline);
    scene.add(matrixGreenTitle);

    objectList.push(matrixGreenSolid);
    objectList.push(matrixGreenOutline);

    return objectList;
}
function NewConditionBlueGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const conditionBlueSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.ConditionBlue }));
    const conditionBlueOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.ConditionBlue }));
    const conditionBlueTitle = new Text();
    conditionBlueTitle.text = 'CONDITION\nBLUE';
    conditionBlueTitle.fontSize = 0.22;
    conditionBlueTitle.color = Colour.ConditionBlue;

    conditionBlueSolid.position.x = 2.5;
    conditionBlueSolid.position.y = -1.5;
    conditionBlueOutline.position.x = 4;
    conditionBlueOutline.position.y = -1.5;
    conditionBlueTitle.position.x = 0.4;
    conditionBlueTitle.position.y = -1.2;

    scene.add(conditionBlueSolid);
    scene.add(conditionBlueOutline);
    scene.add(conditionBlueTitle);

    objectList.push(conditionBlueSolid);
    objectList.push(conditionBlueOutline);


    return objectList;
}
function NewMAGIOrangeGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const magiOrangeSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.MagiOrange }));
    const magiOrangeOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.MagiOrange }));
    const magiOrangeTitle = new Text();
    magiOrangeTitle.text = 'MAGI ORANGE';
    magiOrangeTitle.fontSize = 0.22;
    magiOrangeTitle.color = Colour.MagiOrange;

    magiOrangeSolid.position.x = -2.5;
    magiOrangeOutline.position.x = -4;
    magiOrangeTitle.position.x = -1.7
    magiOrangeTitle.position.y = +0.3

    scene.add(magiOrangeSolid);
    scene.add(magiOrangeOutline);
    scene.add(magiOrangeTitle);

    objectList.push(magiOrangeSolid);
    objectList.push(magiOrangeOutline);

    return objectList;
}
function NewAlertYellowGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const alertYellowSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.AlertYellow }));
    const alertYellowOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.AlertYellow }));
    const alertYellowTitle = new Text();
    alertYellowTitle.text = 'ALERT YELLOW';
    alertYellowTitle.fontSize = 0.22;
    alertYellowTitle.color = Colour.AlertYellow;

    alertYellowSolid.position.x = -2.5;
    alertYellowSolid.position.y = -1.5;
    alertYellowOutline.position.x = -4;
    alertYellowOutline.position.y = -1.5;
    alertYellowTitle.position.x = -1.7;
    alertYellowTitle.position.y = -1.3;

    scene.add(alertYellowSolid);
    scene.add(alertYellowOutline);
    scene.add(alertYellowTitle);

    objectList.push(alertYellowSolid);
    objectList.push(alertYellowOutline);

    return objectList;
}
function NewRetroWhiteGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation

    const whiteSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.RetroWhite }));
    const whiteOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.RetroWhite }));
    const whiteTitle = new Text();
    whiteTitle.text = 'RETRO WHITE';
    whiteTitle.fontSize = 0.22;
    whiteTitle.color = Colour.RetroWhite;

    whiteSolid.position.x = - 2.2;
    whiteSolid.position.y = - 3.5;
    whiteOutline.position.x = - 0.7;
    whiteOutline.position.y = - 3.5;
    whiteTitle.position.x = -1.7;
    whiteTitle.position.y = -2.3;

    scene.add(whiteSolid);
    scene.add(whiteOutline);

    objectList.push(whiteSolid);
    objectList.push(whiteOutline);

    return objectList;
}
function NewDeathBlackGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const blackSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.DeathBlack }));
    const blackOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.DeathBlack }));
    const blackTitle = new Text();
    blackTitle.text = 'DEATH BLACK';
    blackTitle.fontSize = 0.22;
    blackTitle.color = Colour.DeathBlack;

    blackSolid.position.x = + 0.7;
    blackSolid.position.y = - 3.5;
    blackOutline.position.x = + 2.2;
    blackOutline.position.y = - 3.5;
    blackTitle.position.x = +0.2;
    blackTitle.position.y = -2.3;

    scene.add(blackSolid);
    scene.add(blackOutline);
    scene.add(blackTitle);

    objectList.push(blackSolid);
    objectList.push(blackOutline);

    return objectList;
}

function NewEmergencyOrangeGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const emergencyOrangeSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.EmergencyOrange }));
    const emergencyOrangeOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.EmergencyOrange }));
    const emergencyOrangeTitle = new Text();
    emergencyOrangeTitle.text = 'EMERGENCY\nORANGE';
    emergencyOrangeTitle.fontSize = 0.22;
    emergencyOrangeTitle.color = Colour.EmergencyOrange;

    emergencyOrangeSolid.position.x = -2.5;
    emergencyOrangeSolid.position.y = +1.5;
    emergencyOrangeOutline.position.x = -4;
    emergencyOrangeOutline.position.y = +1.5;
    emergencyOrangeTitle.position.x = -1.7;
    emergencyOrangeTitle.position.y = 1.6;

    scene.add(emergencyOrangeSolid);
    scene.add(emergencyOrangeOutline);
    scene.add(emergencyOrangeTitle);

    objectList.push(emergencyOrangeSolid);
    objectList.push(emergencyOrangeOutline);
    objectList.push(emergencyOrangeTitle);

    return objectList;
}

function NewWarningRedGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
    const objectList = new Array<THREE.Object3D>;

    //Geometries
    const solidBox = new THREE.BoxGeometry(1, 1, 1);
    const boxOutline = new THREE.EdgesGeometry(solidBox);

    //Implementation
    const warningRedSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.WarningRed }));
    const warningRedOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.WarningRed }));
    const warningRedTitle = new Text();
    warningRedTitle.text = 'WARNING RED';
    warningRedTitle.fontSize = 0.22;
    warningRedTitle.color = Colour.WarningRed;

    warningRedSolid.position.x = 2.5;
    warningRedSolid.position.y = +1.5;
    warningRedOutline.position.x = 4;
    warningRedOutline.position.y = +1.5;
    warningRedTitle.position.x = 0.2;
    warningRedTitle.position.y = 1.6;

    scene.add(warningRedSolid);
    scene.add(warningRedOutline);
    scene.add(warningRedTitle);

    objectList.push(warningRedSolid);
    objectList.push(warningRedOutline);
    objectList.push(warningRedTitle);

    return objectList;
}

function ApplyPostProcessing(composer: PostProcessingEffectComposer, scene: THREE.Scene, camera: THREE.Camera,
    renderer: THREE.WebGLRenderer, instructions: Array<EffectInstructions>, highestLayerUsed: number) {
    // Recommended Effect Execution Order:
    // https://github.com/pmndrs/postprocessing/wiki/Effect-Merging

    ApplyAntiAliasing(composer, camera);
    ApplyChromaticAbberation(composer, camera);
    ApplyBlooms(composer, scene, camera, instructions, highestLayerUsed);
    ApplyNoise(composer, camera);
    ApplyFlicker(composer, camera);
}

function InitialiseEffectComposer(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer): PostProcessingEffectComposer {
    const postprocessingComposer = new PostProcessingEffectComposer(renderer, { multisampling: 4 });
    postprocessingComposer.addPass(new RenderPass(scene, camera));

    return postprocessingComposer;
}

function ApplyBlooms(composer: PostProcessingEffectComposer, scene: THREE.Scene,
    camera: THREE.Camera, instructions: Array<EffectInstructions>, currentLayer: number) {

    let bloomLayer = currentLayer + 1;
    let bloomedTargets = new Set<THREE.Object3D>;

    if (bloomLayer > 32) {
        throw new RangeError("This scenes layers went over 32! This bloom function just adds one to the highest current-value each time, so make sure all the layers have actually been used, first!")
    }

    //Bloom Configs
    //Note: Blooms should be defined here, not on the enum. This is standard in-case an instruction requires multiple values.
    //It also means each implementation handles the values independently, which I prefer.
    const GlobalIntensity = 0.04;
    const instructionStrength = {
        [PostProcessingInstruction['Bloom.Weak']]: 0.02,
        [PostProcessingInstruction['Bloom.Middling']]: 0.04,
        [PostProcessingInstruction['Bloom.Strong']]: 0.1,
        [PostProcessingInstruction['Bloom.VeryStrong']]: 0.4,
    }

    //Bloom where needed and save as those targets as bloomed
    instructions.forEach((currentInstruction) => {
        const instructionName = PostProcessingInstruction[currentInstruction.Instruction];
        let bloomIntensity: number = null;

        if (instructionName.startsWith("Bloom")) {
            if (bloomLayer > 32) {
                throw new RangeError("This scenes layers went over 32! This bloom function just adds one to the highest current-value each time, so make sure all the layers have actually been used, first!")
            }

            bloomIntensity = instructionStrength[instructionName];

            composer.addPass(new EffectPass(camera, new SelectiveBloomEffect(
                scene,
                camera,
                new Selection(currentInstruction.Targets, bloomLayer++),
                { luminanceThreshold: 0, intensity: bloomIntensity, kernelSize: KernelSize.HUGE }
            )));

            currentInstruction.Targets.forEach((entry) => (bloomedTargets.add(entry)))
        }
    });

    //Globally Bloom remaining targets
    composer.addPass(new EffectPass(camera, new SelectiveBloomEffect(scene, camera, new Selection(bloomedTargets, bloomLayer++), { luminanceThreshold: 0, intensity: GlobalIntensity, kernelSize: KernelSize.HUGE }, true)));
}

function ApplyNoise(composer: PostProcessingEffectComposer, camera: THREE.Camera) {

    //Note: BlendFunction.COLOR_DODGE, makes it look, you know, red or whatever its set to be, on the bloom.
    const noiseEffect = new NoiseEffect({ blendFunction: BlendFunction.COLOR_DODGE, premultiply: false });
    noiseEffect.blendMode.opacity.value = 0.8;

    composer.addPass(new EffectPass(camera, noiseEffect));
}


function ApplyFlicker(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
    const flickerEffect = new GlitchEffect({
        delay: new THREE.Vector2(0.4, 0.8),
        duration: new THREE.Vector2(0.1, 0.1),
        strength: new THREE.Vector2(0.002, 0.003),
        columns: 0.00,
        ratio: 0.995
    });

    //flickerEffect.setMode(GlitchMode.CONSTANT_MILD);

    composer.addPass(new EffectPass(camera, flickerEffect));
}


function ApplyChromaticAbberation(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
    //Maybe chromatic abberation is red?
    composer.addPass(new EffectPass(camera, new ChromaticAberrationEffect({
        offset: new THREE.Vector2(30e-5, 20e-5),
        radialModulation: true,
        modulationOffset: 0.15
    })));
}


function ApplyAntiAliasing(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
    //FXAAx2
    composer.addPass(new EffectPass(camera, new FXAAEffect({ blendFunction: BlendFunction.NORMAL })));
    composer.addPass(new EffectPass(camera, new FXAAEffect({ blendFunction: BlendFunction.NORMAL })));


    //SMAA
    const smaaeffect = new SMAAEffect({
        blendFunction: BlendFunction.NORMAL,
        preset: SMAAPreset.ULTRA,
        edgeDetectionMode: EdgeDetectionMode.COLOR,
        predicationMode: PredicationMode.DEPTH
    });

    const edgeDetectionMaterial = smaaeffect.edgeDetectionMaterial;
    edgeDetectionMaterial.edgeDetectionThreshold = 0.2; //0.02
    edgeDetectionMaterial.predicationThreshold = 0.002;
    edgeDetectionMaterial.predicationScale = 1;

    const effectPass = new EffectPass(camera, smaaeffect);

    // BEGIN DEBUG
    const smaaEdgesDebugPass = new EffectPass(camera, smaaeffect,
        new TextureEffect({ texture: smaaeffect.edgesTexture }));
    const smaaWeightsDebugPass = new EffectPass(camera, smaaeffect,
        new TextureEffect({ texture: smaaeffect.weightsTexture }));

    effectPass.renderToScreen = true;
    smaaEdgesDebugPass.renderToScreen = true;
    smaaWeightsDebugPass.renderToScreen = true;
    smaaEdgesDebugPass.enabled = false; //false
    smaaWeightsDebugPass.enabled = false; //false
    smaaEdgesDebugPass.fullscreenMaterial.encodeOutput = false;
    smaaWeightsDebugPass.fullscreenMaterial.encodeOutput = false;
    // END DEBUG


    composer.addPass(effectPass);
    composer.addPass(smaaEdgesDebugPass);
    composer.addPass(smaaWeightsDebugPass);
}


function animate(): void {

    /*
    //RGB
    warningRedSolid.rotation.x += 0.014;
    warningRedSolid.rotation.y += 0.014;
    warningRedOutline.rotation.x += 0.014;
    warningRedOutline.rotation.y += 0.014;

    matrixGreenSolid.rotation.x += 0.014;
    matrixGreenSolid.rotation.y += 0.014;
    matrixGreenOutline.rotation.x += 0.014;
    matrixGreenOutline.rotation.y += 0.014;

    conditionBlueSolid.rotation.x += 0.014;
    conditionBlueSolid.rotation.y += 0.014;
    conditionBlueOutline.rotation.x += 0.014;
    conditionBlueOutline.rotation.y += 0.014;
    */

    /*
    //Oranges
    magiOrangeSolid.rotation.x += 0.014;
    magiOrangeSolid.rotation.y += 0.014;
    magiOrangeOutline.rotation.x += 0.014;
    magiOrangeOutline.rotation.y += 0.014;

    emergencyOrangeSolid.rotation.x += 0.014;
    emergencyOrangeSolid.rotation.y += 0.014;
    emergencyOrangeOutline.rotation.x += 0.014;
    emergencyOrangeOutline.rotation.y += 0.014;

    alertYellowSolid.rotation.x += 0.014;
    alertYellowSolid.rotation.y += 0.014;
    alertYellowOutline.rotation.x += 0.014;
    alertYellowOutline.rotation.y += 0.014;
    */

    /*
    //Greys
    whiteSolid.rotation.x += 0.014;
    whiteSolid.rotation.y += 0.014;
    whiteOutline.rotation.x += 0.014;
    whiteOutline.rotation.y += 0.014;

    blackSolid.rotation.x += 0.014;
    blackSolid.rotation.y += 0.014;
    blackOutline.rotation.x += 0.014;
    blackOutline.rotation.y += 0.014;*
    */
}