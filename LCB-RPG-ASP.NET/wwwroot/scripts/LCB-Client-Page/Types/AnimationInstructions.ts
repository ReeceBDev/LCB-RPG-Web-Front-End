import * as THREE from 'three';
import { Instructions } from './Instructions.js';
import { AnimateInstruction } from './AnimateInstruction.js';

export class AnimationInstructions extends Instructions {
    readonly Instruction: AnimateInstruction;
    Targets: Array<THREE.Object3D>;

    constructor(
        setInstruction: AnimateInstruction,
        setTargets: Array<THREE.Object3D> = new Array<THREE.Object3D>
    ) {
        super(setTargets);
        this.Instruction = setInstruction;
    }
}