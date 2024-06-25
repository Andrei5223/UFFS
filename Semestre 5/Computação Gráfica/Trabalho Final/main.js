import * as THREE from 'three';
import { camera, updatePos } from './camera.js';
import { ambientLight, directionalLight, initSky } from './luz.js';
import { buildMaze, wall, walls, floor } from './labirinto.js';

//Cria a scene e a camera
const scene = new THREE.Scene();

// Define a resoluçao e tamanho da janela
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Configurar o renderizador para habilitar sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Adiciona luzes com o céu
scene.add(ambientLight);
scene.add(directionalLight);
initSky(scene, renderer, camera);

let maze = [
	[3,1,1,1,1,1,3,1,1,1,2],
	[2,3,1,0,2,2,1,1,2,1,2],
	[3,1,0,3,1,2,3,2,1,2,2],
	[2,2,3,0,2,1,2,0,2,0,2],
	[2,1,0,3,1,2,1,2,2,2,2],
	[2,3,2,3,2,1,2,0,2,1,2],
	[2,2,0,0,1,2,1,3,2,2,2],
	[3,0,3,1,2,2,1,0,1,1,2],
	[2,2,0,2,2,2,3,2,3,2,2],
	[2,1,1,2,1,0,0,2,2,0,2],
	[1,1,1,1,1,1,1,0,1,1,0]
]

// Adiciona o labirinto
scene.add(floor);
buildMaze(scene, maze);

// Inicia o loop de renderização
function animate() {
	requestAnimationFrame( animate );

    updatePos(walls, wall);

	renderer.render( scene, camera );
}
animate();