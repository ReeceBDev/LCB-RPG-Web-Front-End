import * as THREE from 'three';
import { Instructions } from './Instructions.js';
import { PostProcessingInstruction } from './PostProcessingInstruction.js';

export class EffectInstructions extends Instructions {
    readonly Instruction: PostProcessingInstruction;
    Targets: Array<THREE.Object3D>;

    constructor(
        setInstruction: PostProcessingInstruction,
        setTargets: Array<THREE.Object3D> = new Array<THREE.Object3D>
    ) {
        super(setTargets);
        this.Instruction = setInstruction;
    }
}