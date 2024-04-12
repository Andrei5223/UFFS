import * as THREE from 'three';

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
console.log('Bounding box do cubo:', cube.geometry.boundingBox);


// Cria e adiciona um segundo cubo
const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.set(5, 0, 0);
cube2.geometry.computeBoundingBox();
cube2.geometry.boundingBox.translate(cube2.position);
console.log('Bounding box do cubo2:', cube2.geometry.boundingBox);

// Set initial velocity of the cube
var velocity = new THREE.Vector3(0, 0, 0);
var previousPosition = new THREE.Vector3(0, 0, 0);
var jumpVelocity = 3; // velocity when jumping
var movVelocity = 5;
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
    console.log('Bounding box do cubo:', cube.geometry.boundingBox);
}

// Add event listeners for key presses and releases
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// Função para verificar colisões
function checkCollisions() {
    // Itera sobre todos os objetos na cena
    scene.traverse(function(object) {
        if (object instanceof THREE.Mesh && object !== cube) { // Verifica se o objeto é uma malha e exclui o próprio cubo da verificação de colisões
            // Verifica se há colisão entre as caixas delimitadoras do cubo e do objeto
            if (cube.geometry.boundingBox.intersectsBox(object.geometry.boundingBox)) {
                // Se houver colisão, move o cubo de volta para sua posição anterior
                console.log('Colisão detectada!');
                console.log('Posição do cubo:', cube.position);
                console.log('Posição do objeto:', object.position);
                console.log('Bounding box do cubo:', cube.geometry.boundingBox);
                console.log('Bounding box do objeto:', object.geometry.boundingBox);

                cube.position.copy(previousPosition);
            }
        }
    });
}

var clock = new THREE.Clock();

// Create a function to update the position of the cube
function update() {
    previousPosition.copy(cube.position);

    var delta = clock.getDelta();

    // Update cube's position based on velocity and delta time
    cube.position.x += velocity.x * delta * movVelocity; 
    cube.position.z += velocity.z * delta * movVelocity; 
    cube.position.y += velocity.y * delta * movVelocity;
    cube.geometry.computeBoundingBox();
    cube.geometry.boundingBox.translate(cube.position);

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

    checkCollisions();
}

// Inicia o loop de renderização
function animate() {
	requestAnimationFrame( animate );

    update();

	renderer.render( scene, camera );
}
animate();