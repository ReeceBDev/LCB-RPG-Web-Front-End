import * as THREE from 'three';
export interface ISceneElement {
    Animate(): void;
    SetPosition(lateralPercentile: number, heightPercentile: number): void;
    InitiatePreload(): void;

    get Element(): THREE.Group;
}