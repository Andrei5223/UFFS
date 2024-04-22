import * as THREE from 'three';
import { move, onKeyDown, onKeyUp, checkCollisions } from './movement.js';

//Cria a scene e a camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Muda a posição da camera para fora de 0, 0, 0
camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// Define a resoluçao e tamanho da janela
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Cria e adiciona um cubo
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.geometry.computeBoundingBox();
cube.geometry.boundingBox.translate(cube.position);
// console.log('Bounding box do cubo:', cube.geometry.boundingBox);


// Cria e adiciona um segundo cubo
const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.set(5, 0, 0);
cube2.geometry.computeBoundingBox();
cube2.geometry.boundingBox.translate(cube2.position);
// console.log('Bounding box do cubo2:', cube2.geometry.boundingBox);

// Cria e adiciona um plano para representar o chão
// const groundGeometry = new THREE.PlaneGeometry(10, 10); // Você pode ajustar o tamanho conforme necessário
// const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide }); // Ajuste a cor conforme necessário
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.x = Math.PI / 2; // Rotação para que o plano fique horizontal
// ground.position.y = -0.5;
// scene.add(ground);


// Procura por eventos de teclado
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// Inicia o loop de renderização
function animate() {
	requestAnimationFrame( animate );

    move(cube, scene);

	renderer.render( scene, camera );
}
animate();