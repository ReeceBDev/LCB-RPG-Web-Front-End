export class Instructions {
    constructor(setTargets = new Array) {
        this.Targets = setTargets;
    }
    AddTarget(target) {
        this.Targets.push(target);
    }
    AddRange(targets) {
        this.Targets.concat(targets);
    }
    RemoveTarget(target) {
        this.Targets.splice(this.Targets.indexOf(target), 1);
    }
}
//# sourceMappingURL=Instructions.js.map