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

// Crie uma luz pontual
const pointLight = new THREE.PointLight(0xffffff);

// Defina a posição da luz
pointLight.position.set(0, 10, 0);

pointLight.intensity = 100.0;

// Adicione a luz à cena
scene.add(pointLight);

// Crie uma luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Cor branca, intensidade 0.5

// Adicione a luz ambiente à cena
scene.add(ambientLight);

// Cria e adiciona um cubo
const cubeH = 1;
const geometry = new THREE.BoxGeometry( 1, cubeH, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x6b1010 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.geometry.computeBoundingBox();
cube.geometry.boundingBox.translate(cube.position);
// console.log('Bounding box do cubo:', cube.geometry.boundingBox);

// Cria e adiciona um segundo cubo
const geometry2 = new THREE.BoxGeometry( 0.5, 1, 2 );
const material2 = new THREE.MeshStandardMaterial( { color: 0x32db24} );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.set(5, 0, 0);
cube2.geometry.computeBoundingBox();
cube2.geometry.boundingBox.translate(cube2.position);

// Cria e adiciona uma esfera
const geometryEsfera = new THREE.SphereGeometry( 0.7, 10, 100 );
const materialEsfera = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( geometryEsfera, materialEsfera );
scene.add( sphere );
sphere.position.set(-5,0,0);
sphere.geometry.computeBoundingBox();
sphere.geometry.boundingBox.translate(sphere.position);

// Cria e adiciona um cilindro
const geometryCylinder = new THREE.CylinderGeometry( 1, 1, 1, 20 );
const materialCylinder = new THREE.MeshStandardMaterial( { color: 0x6252ad } );
const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );
scene.add( cylinder );
cylinder.position.set(-5,0,-5);
cylinder.geometry.computeBoundingBox();
cylinder.geometry.boundingBox.translate(cylinder.position);

// Cria e adiciona um plano
const geometryPlane = new THREE.PlaneGeometry( 20, 20, 5, 5 );
const materialPlane = new THREE.MeshStandardMaterial( { color: 0x2f791e, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
scene.add( plane );
plane.position.set(0,-0.5,0);
plane.rotation.x = -Math.PI / 2;

// Cria e adiciona um clone
const geometryCone = new THREE.ConeGeometry( 1, 2, 20 );
const materialCone = new THREE.MeshStandardMaterial( { color: 0xbf2bd4} );
const cone = new THREE.Mesh( geometryCone, materialCone );
scene.add( cone );
cone.position.set(3,0,-4);
cone.geometry.computeBoundingBox();
cone.geometry.boundingBox.translate(cone.position);


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

// Create a function to handle key releases
function onKeyUp(event) {
    var keyCode = event.keyCode;
    if (keyCode == 65 || keyCode == 68) { // left or right arrow key
        velocity.x = 0; // stop horizontal movement
    } else if (keyCode == 87 || keyCode == 83) { // up or down arrow key
        velocity.z = 0; // stop vertical movement
    }
    // console.log('Bounding box do cubo:', cube.geometry.boundingBox);
}

// Função para verificar colisões
function checkCollisions() {
    // Itera sobre todos os objetos na cena
    scene.traverse(function(object) {
        if (object instanceof THREE.Mesh && object !== cube && object.geometry.boundingBox) { // Verifica se o objeto é uma malha e exclui o próprio cubo da verificação de colisões
            // Verifica se há colisão entre as caixas delimitadoras do cubo e do objeto
            if (cube.geometry.boundingBox.intersectsBox(object.geometry.boundingBox)) {
                // Se houver colisão, move o cubo de volta para sua posição anterior
                // console.log('Colisão detectada!');
                // console.log('Posição do cubo:', cube.position);
                // console.log('Posição do objeto:', object.position);
                // console.log('Bounding box do cubo:', cube.geometry.boundingBox);
                // console.log('Bounding box do objeto:', object.geometry.boundingBox);

                var alturaObj = object.geometry.boundingBox.max.y - object.geometry.boundingBox.min.y
                if (cube.position.y + cubeH > object.position.y + alturaObj){
                    cube.position.set(0,0,0);
                } else {
                    cube.position.copy(previousPosition);
                }
                
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

    move(cube, scene);

	renderer.render( scene, camera );
}
animate();