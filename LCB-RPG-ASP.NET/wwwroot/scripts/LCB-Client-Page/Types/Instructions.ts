import * as THREE from 'three';

export abstract class Instructions {
    readonly abstract Instruction;
    Targets: Array<THREE.Object3D>;

    constructor(
        setTargets: Array<THREE.Object3D> = new Array<THREE.Object3D>
    ) {
        this.Targets = setTargets;
    }

        AddTarget(target: THREE.Object3D): void {
        this.Targets.push(target);
    }

    AddRange(targets: Array<THREE.Object3D>): void {
        this.Targets.concat(targets);
    }

    RemoveTarget(target: THREE.Object3D): void {   
        this.Targets.splice(this.Targets.indexOf(target), 1);
    }
}