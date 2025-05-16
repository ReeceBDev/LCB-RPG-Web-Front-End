import { Instructions } from './Instructions.js';
export class EffectInstructions extends Instructions {
    constructor(setInstruction, setTargets = new Array) {
        super(setTargets);
        this.Instruction = setInstruction;
    }
}
//# sourceMappingURL=EffectInstructions.js.map