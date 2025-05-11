import * as THREE from '../../../node_modules/@types/three/index.d.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);


renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
const cube3 = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(cube2);
scene.add(cube3);

camera.position.z = 5;
cube2.position.x = 2;
cube3.position.x = -2;

function animate() {

    cube.rotation.x += 0.02;
    cube.rotation.y -= 0.02;

    cube2.rotation.x -= 0.02;
    cube2.rotation.y += 0.02;

    cube3.rotation.x += 0.02;
    cube3.rotation.y += 0.02;

    renderer.render(scene, camera);
}