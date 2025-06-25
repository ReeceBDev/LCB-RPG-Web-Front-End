import * as THREE from 'three';

//Unmodified PostProcessing
// @ts-ignore
import {
    BloomEffect, EffectPass, RenderPass, KernelSize, BoxBlurPass, MipmapBlurPass, LuminancePass,
    FXAAEffect, Selection, KawaseBlurPass, GaussianBlurPass, SMAAEffect, SMAAPreset, BlendFunction,
    EdgeDetectionMode, PredicationMode, TextureEffect, GlitchEffect, GlitchMode, ChromaticAberrationEffect
} from "postprocessing";

//Custom PostProcessing
// @ts-ignore
import {
    SelectiveBloomEffect, EffectComposer as PostProcessingEffectComposer, NoiseEffect
} from '../../../lib/local/customPostprocessing.js';

import { PostProcessingInstruction } from '../Types/PostProcessingInstruction.js';
import { EffectInstructions } from '../Types/EffectInstructions.js';

export function ApplyBlooms(composer: PostProcessingEffectComposer, scene: THREE.Scene,
    camera: THREE.Camera, instructions: Array<EffectInstructions>, currentLayer: number) {

    let bloomLayer = currentLayer + 1;
    let bloomedTargets = new Set<THREE.Object3D>;

    if (bloomLayer > 32) {
        throw new RangeError("This scenes layers went over 32! This bloom function just adds one to the highest current-value each time, so make sure all the layers have actually been used, first!")
    }

    //Bloom Configs
    const GlobalIntensity = 0.04;
    //Note: Strength should be defined here, not on the enum. This is standard in-case an instruction requires multiple values.
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

export function ApplyNoise(composer: PostProcessingEffectComposer, camera: THREE.Camera) {

    //Note: BlendFunction.COLOR_DODGE, makes it look, you know, red or whatever its set to be, on the bloom.
    const noiseEffect = new NoiseEffect({ blendFunction: BlendFunction.COLOR_DODGE, premultiply: false });
    noiseEffect.blendMode.opacity.value = 0.8;

    composer.addPass(new EffectPass(camera, noiseEffect));
}


export function ApplyFlicker(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
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


export function ApplyChromaticAbberation(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
    //Maybe chromatic abberation is red?
    composer.addPass(new EffectPass(camera, new ChromaticAberrationEffect({
        offset: new THREE.Vector2(30e-5, 20e-5),
        radialModulation: true,
        modulationOffset: 0.15
    })));
}

export function ApplyFXAA(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
    composer.addPass(new EffectPass(camera, new FXAAEffect({ blendFunction: BlendFunction.NORMAL })));
}


export function ApplySMAA(composer: PostProcessingEffectComposer, camera: THREE.Camera) {
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