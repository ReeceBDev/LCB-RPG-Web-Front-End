import { UserInterfaceScene } from '../ScriptResources/UserInterfaceScene.js';
import { SceneElement } from '../SceneElements/SceneElement.js';

import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../Types/Colour.js';


//PostProcessing
import * as PostProcess from '../ScriptResources/PostProcesses.js';
import { RenderPass } from "postprocessing";
import { EffectComposer as PostProcessingEffectComposer } from '../../../lib/local/customPostprocessing.js';
import { EffectInstructions } from '../Types/EffectInstructions.js';
import { PostProcessingInstruction } from '../Types/PostProcessingInstruction.js';

//Animations
import { AnimateInstruction } from '../Types/AnimateInstruction.js';
import { AnimationInstructions } from '../Types/AnimationInstructions.js';

export class ColourPalette extends UserInterfaceScene {

    protected override AllocateElements(): Array<SceneElement> {
        const sceneElements = new Array<SceneElement>;
        return sceneElements;
    }

    protected override InitialiseElements(
        scene: THREE.Scene,
        {
            //Input object
            postprocessConfig = new Array<EffectInstructions>
        } = {}): {
            //Output type declarations
            currentPostProcessConfig: Array<EffectInstructions>
        } {
        //Main function body
        const currentPostProcessConfig = postprocessConfig;

        let emergencyOrangeGeometries = new Array<THREE.Object3D>;
        let warningRedGeometries = new Array<THREE.Object3D>;
        let alertYellowGeometries = new Array<THREE.Object3D>;
        let deathBlackGeometries = new Array<THREE.Object3D>;
        let retroWhiteGeometries = new Array<THREE.Object3D>;
        let conditionBlueGeometries = new Array<THREE.Object3D>;
        let magiOrangeGeometries = new Array<THREE.Object3D>;
        let matrixGreenGeometries = new Array<THREE.Object3D>;

        //Not used. I believe this must be replaced with the AnimationMixer or Keyframes!
        //const spinAnimations = new AnimationInstructions(AnimateInstruction['Spin']);

        const emergencyOrangeBlooms = new EffectInstructions(PostProcessingInstruction['Bloom.Strong']);
        const warningRedBlooms = new EffectInstructions(PostProcessingInstruction['Bloom.VeryStrong']);


        //Generate Objects
        this.GenerateStaticGeometries(scene);

        emergencyOrangeGeometries = emergencyOrangeGeometries.concat(this.NewEmergencyOrangeGeometries(scene));
        warningRedGeometries = warningRedGeometries.concat(this.NewWarningRedGeometries(scene));
        alertYellowGeometries = alertYellowGeometries.concat(this.NewAlertYellowGeometries(scene));
        deathBlackGeometries = deathBlackGeometries.concat(this.NewDeathBlackGeometries(scene));
        retroWhiteGeometries = retroWhiteGeometries.concat(this.NewRetroWhiteGeometries(scene));
        conditionBlueGeometries = conditionBlueGeometries.concat(this.NewConditionBlueGeometries(scene));
        magiOrangeGeometries = magiOrangeGeometries.concat(this.NewMAGIOrangeGeometries(scene));
        matrixGreenGeometries = matrixGreenGeometries.concat(this.NewMatrixGreenGeometries(scene));


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
        currentPostProcessConfig.push(emergencyOrangeBlooms);

        warningRedBlooms.AddRange(warningRedGeometries);
        currentPostProcessConfig.push(warningRedBlooms);


        return { currentPostProcessConfig }; //Returns main content configurations
    }


    private GenerateStaticGeometries(scene): void {
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

    private NewMatrixGreenGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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
    private NewConditionBlueGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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

    private NewMAGIOrangeGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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
    private NewAlertYellowGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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
    private NewRetroWhiteGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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
    private NewDeathBlackGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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

    private NewEmergencyOrangeGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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

    private NewWarningRedGeometries(scene: THREE.Scene): Array<THREE.Object3D> {
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

    protected override AnimateScene(): void {

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
}