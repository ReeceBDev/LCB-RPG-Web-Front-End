import * as THREE from 'three';
import { UserInterfaceScene } from './UserInterfaceScene';

export namespace SceneUtilities {
    /**
     * * Sets the target's horizontal position as a percentage of the source's viewport width.
     * @param scene
     * @param target
     * @param percentage
     */
    export function SetLateralAsPercent(scene: UserInterfaceScene, target: THREE.Object3D, percentage: number) {
        target.position.x = (percentage / 100) * scene.WorldUnitsLaterally;
    }

    /**
     * Sets the target's vertical position as a percentage of the source's viewport height.
     * @param scene
     * @param target
     * @param percentage
     */
    export function SetHeightAsPercent(scene: UserInterfaceScene, target: THREE.Object3D, percentage: number) {
        target.position.y = (percentage / 100) * scene.WorldUnitsVertically;
    }

    export function ReturnLateralAsPercent(scene: UserInterfaceScene, percentage: number): number {
        return ((percentage / 100) * scene.WorldUnitsLaterally);
    }
    export function ReturnHeightAsPercent(scene: UserInterfaceScene, percentage: number): number {
        return ((percentage / 100) * scene.WorldUnitsVertically);
    }
}