import { Instructions } from './Instructions.js';
export class AnimationInstructions extends Instructions {
    constructor(setInstruction, setTargets = new Array) {
        super(setTargets);
        this.Instruction = setInstruction;
    }
}
//# sourceMappingURL=AnimationInstructions.js.map