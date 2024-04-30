import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Cria a scene e a camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


// Define a resoluçao e tamanho da janela
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Muda a posição da camera para fora de 0, 0, 0
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 8;
camera.position.y = 10;

// Crie uma luz pontual
const pointLight = new THREE.PointLight(0xffffff);

// Defina a posição da luz
pointLight.position.set(0, 10, 0);

pointLight.intensity = 200.0;

// Adicione a luz à cena
scene.add(pointLight);

// Crie uma luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Cor branca, intensidade 0.5

// Adicione a luz ambiente à cena
scene.add(ambientLight);

// Cria e adiciona um cubo
const cubeH = 1;
const geometry = new THREE.BoxGeometry( 1, cubeH, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x6b1010 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Cria e adiciona um plano
const geometryPlane = new THREE.PlaneGeometry( 15, 15, 5, 5 );
const materialPlane = new THREE.MeshStandardMaterial( { color: 0x2f791e, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
scene.add( plane );
plane.position.set(0,-0.5,0);
plane.rotation.x = -Math.PI / 2;

// Set initial velocity of the cube
var velocity = new THREE.Vector3(0, 0, 0);
var previousPosition = new THREE.Vector3(0, 0, 0);
var jumpVelocity = 3; // velocity when jumping
var movVelocity = 5;
var inverterVel = 1;
var isJumping = false; // flag to track if the cube is jumping

// Create a function to handle key presses
function onKeyDown(event) {
    var keyCode = event.keyCode;
    if (keyCode == 32 && !isJumping) { // space key
        velocity.y = jumpVelocity; // jump
        isJumping = true; // set jumping flag to true
    } else if (keyCode == 65) { // a key
        velocity.x = -1; // move left
    } else if (keyCode == 68) { // d key
        velocity.x = 1; // move right
    } else if (keyCode == 87) { // w key
        velocity.z = -1; // move forward
    } else if (keyCode == 83) { // s key
        velocity.z = 1; // move backward
    }
}

// Create a function to handle key releases
function onKeyUp(event) {
    var keyCode = event.keyCode;
    if (keyCode == 65 || keyCode == 68) { // left or right arrow key
        velocity.x = 0; // stop horizontal movement
    } else if (keyCode == 87 || keyCode == 83) { // up or down arrow key
        velocity.z = 0; // stop vertical movement
    }
    inverterVel = Math.abs(inverterVel);
}

// Add event listeners for key presses and releases
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

var clock = new THREE.Clock();

// Função para verificar os limites da cena
function checkSceneLimits(object) {
    if ((object.position.x >= 7.5 || object.position.x <= -7.5)  ) {
        inverterVel *= -1;
    }
    if (object.position.z >= 7.5 || object.position.z <= -7.5) {
        inverterVel *= -1;
    }
}

// Create a function to update the position of the cube
function update() {
    previousPosition.copy(cube.position);

    var delta = clock.getDelta();

    // Update cube's position based on velocity and delta time
    cube.position.x += velocity.x * delta * movVelocity * inverterVel; 
    cube.position.z += velocity.z * delta * movVelocity * inverterVel; 
    cube.position.y += velocity.y * delta * movVelocity;

    camera.lookAt(cube.position);

    // If cube is jumping, decrease its y velocity over time due to gravity
    if (isJumping) {
        velocity.y -= 9.8 * delta; // Adjust gravity as needed
    }

    // If cube reaches the ground, stop jumping and reset its y position
    if (cube.position.y <= 0) {
        cube.position.y = 0;
        velocity.y = 0;
        isJumping = false;
    }

    checkSceneLimits(cube);
}

// Inicia o loop de renderização
function animate() {
	requestAnimationFrame( animate );

    update();

	renderer.render( scene, camera );
}
animate();