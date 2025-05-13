import * as THREE from 'three'; 
import { Text } from 'troika-three-text';
import { Colour } from '../Colour.js';
import { OverrideMaterialManager } from 'postprocessing';
OverrideMaterialManager.workaroundEnabled = true

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//Geometries
const solidBox = new THREE.BoxGeometry(1, 1, 1);
const boxOutline = new THREE.EdgesGeometry(solidBox);


//Meshes
//Background modifications
const whitePanel = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 2.5), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.FrontSide }));

//RGB
const warningRedSolid = new THREE.Mesh(solidBox, new THREE.MeshStandardMaterial({ color: Colour.WarningRed, emissive: Colour.WarningRed, emissiveIntensity: 1 }));
const warningRedOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.WarningRed }));
const warningRedTitle = new Text()
warningRedTitle.text = 'WARNING RED'
warningRedTitle.fontSize = 0.22
warningRedTitle.color = Colour.WarningRed

const matrixGreenSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.MatrixGreen }));
const matrixGreenOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.MatrixGreen }));
const matrixGreenTitle = new Text();
matrixGreenTitle.text = 'MATRIX GREEN'
matrixGreenTitle.fontSize = 0.22
matrixGreenTitle.color = Colour.MatrixGreen

const normalBlueSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.ConditionNormalBlue }));
const normalBlueOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.ConditionNormalBlue }));
const normalBlueTitle = new Text();
normalBlueTitle.text = 'CONDITION\nNORMAL'
normalBlueTitle.fontSize = 0.22
normalBlueTitle.color = Colour.ConditionNormalBlue


//Oranges
const magiOrangeSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.MagiOrange }));
const magiOrangeOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.MagiOrange }));
const magiOrangeTitle = new Text();
magiOrangeTitle.text = 'MAGI ORANGE'
magiOrangeTitle.fontSize = 0.22
magiOrangeTitle.color = Colour.MagiOrange

const emergencyOrangeSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.EmergencyOrange }));
const emergencyOrangeOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.EmergencyOrange }));
const emergencyOrangeTitle = new Text();
emergencyOrangeTitle.text = 'EMERGENCY\nORANGE'
emergencyOrangeTitle.fontSize = 0.22
emergencyOrangeTitle.color = Colour.EmergencyOrange


const alertYellowSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.AlertYellow }));
const alertYellowOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.AlertYellow }));
const alertYellowTitle = new Text();
alertYellowTitle.text = 'ALERT YELLOW'
alertYellowTitle.fontSize = 0.22
alertYellowTitle.color = Colour.AlertYellow

//Greys
const whiteSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.RetroWhite }));
const whiteOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.RetroWhite }));
const whiteTitle = new Text();
whiteTitle.text = 'RETRO WHITE'
whiteTitle.fontSize = 0.22
whiteTitle.color = Colour.RetroWhite

const blackSolid = new THREE.Mesh(solidBox, new THREE.MeshBasicMaterial({ color: Colour.DeathBlack }));
const blackOutline = new THREE.LineSegments(boxOutline, new THREE.LineBasicMaterial({ color: Colour.DeathBlack }));
const blackTitle = new Text();
blackTitle.text = 'DEATH BLACK'
blackTitle.fontSize = 0.22
blackTitle.color = Colour.DeathBlack


//Scene adds
scene.add(warningRedSolid)
scene.add(warningRedOutline)
scene.add(warningRedTitle)
scene.add(matrixGreenSolid)
scene.add(matrixGreenOutline)
scene.add(matrixGreenTitle)
scene.add(normalBlueSolid)
scene.add(normalBlueOutline)
scene.add(normalBlueTitle)

scene.add(magiOrangeSolid)
scene.add(magiOrangeOutline)
scene.add(magiOrangeTitle)
scene.add(emergencyOrangeSolid)
scene.add(emergencyOrangeOutline)
scene.add(emergencyOrangeTitle)
scene.add(alertYellowSolid)
scene.add(alertYellowOutline)
scene.add(alertYellowTitle)

scene.add(whiteSolid);
scene.add(whiteOutline)
scene.add(whiteTitle)
scene.add(blackSolid);
scene.add(blackOutline);
scene.add(blackTitle)

scene.add(whitePanel);

//Positions
camera.position.z = 6;

//RGB
warningRedSolid.position.x = 2.5;
warningRedOutline.position.x = 4;
warningRedOutline.position.y = +1.5;
warningRedTitle.position.x = 0.2
warningRedTitle.position.y = 1.6

matrixGreenSolid.position.x = 2.5;
matrixGreenOutline.position.x = 4;
matrixGreenTitle.position.x = 0.2
matrixGreenTitle.position.y = 0.1

normalBlueSolid.position.x = 2.5;
normalBlueSolid.position.y = -1.5;
warningRedSolid.position.y = +1.5;
normalBlueOutline.position.x = 4
normalBlueOutline.position.y = -1.5;
normalBlueTitle.position.x = 0.4
normalBlueTitle.position.y = -1.2

//Oranges
emergencyOrangeSolid.position.x = -2.5;
emergencyOrangeSolid.position.y = +1.5;
emergencyOrangeOutline.position.x = -4;
emergencyOrangeOutline.position.y = +1.5;
emergencyOrangeTitle.position.x = -1.7
emergencyOrangeTitle.position.y = 1.6
magiOrangeSolid.position.x = -2.5;
magiOrangeOutline.position.x = -4;
magiOrangeTitle.position.x = -1.7
magiOrangeTitle.position.y = +0.3
alertYellowSolid.position.x = -2.5;
alertYellowSolid.position.y = -1.5;
alertYellowOutline.position.x = -4;
alertYellowOutline.position.y = -1.5;
alertYellowTitle.position.x = -1.7
alertYellowTitle.position.y = -1.3


//Greys
whiteSolid.position.x = - 2.2
whiteSolid.position.y = - 3.5
whiteOutline.position.x = - 0.7
whiteOutline.position.y = - 3.5
whiteTitle.position.x = -1.7
whiteTitle.position.y = -2.3
blackSolid.position.x = + 0.7
blackSolid.position.y = - 3.5
blackOutline.position.x = + 2.2
blackOutline.position.y = - 3.5
blackTitle.position.x = +0.2
blackTitle.position.y = -2.3


whitePanel.position.z = - 1
whitePanel.position.x = + 1.8
whitePanel.position.y = - 3.9


//PostProcessing
import { BloomEffect, EffectComposer, EffectPass, RenderPass, KernelSize, BoxBlurPass, MipmapBlurPass, LuminancePass, SMAAEffect, FXAAEffect, Selection, KawaseBlurPass, GaussianBlurPass } from "postprocessing";
import { Resolution } from 'postprocessing';

//import { SelectiveBloomEffect } from 'postprocessing';
import { SelectiveBloomEffect } from '../../../lib/local/customPostprocessing.js';

const composer = new EffectComposer(renderer);
//const composer = new EffectComposer(renderer, {
    multisampling: 4
//});

composer.addPass(new RenderPass(scene, camera));

//SSAA (Not MSAA!)
/*
const msaaRenderPass = new THREE.SSAARenderPass(scene, camera);
msaaRenderPass.unbiased = true;
msaaRenderPass.sampleLevel = 4;
composer.addPass(msaaRenderPass);
*/

//FXAA. This works! :D
//composer.addPass(new EffectPass(camera, new FXAAEffect(scene, camera)));



//Blooms
//composer.addPass(new EffectPass(camera, new BloomEffect({ luminanceThreshold: 0, intensity: 0.04, kernelSize: KernelSize.HUGE })));
//composer.addPass(new EffectPass(camera, new SelectiveBloomEffect(scene, camera, { selection: orangeBloomTargets, luminanceThreshold: 0, intensity: 5, kernelSize: KernelSize.HUGE })));
const orangeBloomTargets = new Selection([emergencyOrangeOutline, emergencyOrangeSolid, emergencyOrangeTitle], 3);
const greenBloomTargets = new Selection([matrixGreenSolid], 2);
composer.addPass(new EffectPass(camera, new SelectiveBloomEffect(scene, camera, orangeBloomTargets, {luminanceThreshold: 0, intensity: 5, kernelSize: KernelSize.HUGE })));

//Blur
//composer.addPass(new KawaseBlurPass({ kernelSize: KernelSize.VERY_SMALL }))
//composer.addPass(new GaussianBlurPass({kernelSize: 7, }))
//composer.addPass(new MipmapBlurPass())
//composer.addPass(new BoxBlurPass({ resolutionX: Resolution.AUTO_SIZE, resolutionY: Resolution.AUTO_SIZE}))

//Luminance
//composer.addPass(new LuminancePass());


requestAnimationFrame(function render() {
    requestAnimationFrame(render);
    composer.render();

});

function animate() {

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

    normalBlueSolid.rotation.x += 0.014;
    normalBlueSolid.rotation.y += 0.014;
    normalBlueOutline.rotation.x += 0.014;
    normalBlueOutline.rotation.y += 0.014;


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


    //Greys
    whiteSolid.rotation.x += 0.014;
    whiteSolid.rotation.y += 0.014;
    whiteOutline.rotation.x += 0.014;
    whiteOutline.rotation.y += 0.014;

    blackSolid.rotation.x += 0.014;
    blackSolid.rotation.y += 0.014;
    blackOutline.rotation.x += 0.014;
    blackOutline.rotation.y += 0.014;
    */
    //Camera
    renderer.render(scene, camera);
}