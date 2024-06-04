import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Cria a scene e a camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Define a resolução e tamanho da janela
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Configurar o renderizador para habilitar sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de mapeamento de sombra

// Muda a posição da câmera para fora de 0, 0, 0
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 8;
camera.position.y = 10;

// Crie uma luz pontual
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 25, 0);
pointLight.intensity = 500.0;
scene.add(pointLight);

// Crie uma luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Cor branca, intensidade 0.5
scene.add(ambientLight);

// Crie uma luz direcional
const directionalLight = new THREE.DirectionalLight(0xf5ff38, 5); // Cor e intensidade da luz
directionalLight.position.set(10, 10, 10); // Posição da luz
directionalLight.castShadow = true;
scene.add(directionalLight);

// Configurar a sombra da luz direcional
directionalLight.shadow.mapSize.width = 1024; // Largura da textura da sombra
directionalLight.shadow.mapSize.height = 1024; // Altura da textura da sombra
directionalLight.shadow.camera.near = 0.5; // Distância mínima para renderização da sombra
directionalLight.shadow.camera.far = 50; // Distância máxima para renderização da sombra

// Ajuste os limites da câmera ortográfica (para que as sombras funcionem em toda a área do plano)
const frustumSize = 10;
const aspect = window.innerWidth / window.innerHeight;
directionalLight.shadow.camera.left = -frustumSize * aspect;
directionalLight.shadow.camera.right = frustumSize * aspect;
directionalLight.shadow.camera.top = frustumSize;
directionalLight.shadow.camera.bottom = -frustumSize;

// Crie e adicione um plano
const geometryPlane = new THREE.PlaneGeometry( 15, 15, 5, 5 );
const materialPlane = new THREE.MeshStandardMaterial( { color: 0x2f791e, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
plane.receiveShadow = true; 
scene.add( plane );
plane.position.set(0, 0,0);
plane.rotation.x = -Math.PI / 2;

// GLTFLoader para carregar os modelos
const loader = new GLTFLoader();

// Variáveis para armazenar os modelos
let modelEd, modelElaine, modelPorl;

// Função auxiliar para habilitar sombras em todos os meshes
function enableShadows(object) {
    object.traverse(function(node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
}

// Função para carregar e adicionar os modelos
loader.load('ed.glb', function (gltf) {
    modelEd = gltf.scene;
    enableShadows(modelEd);
    modelEd.position.set(0, 0, 0); // Posição inicial
    modelEd.scale.set(0.5, 0.5, 0.5); // Ajuste de escala
    scene.add(modelEd);
}, undefined, function (error) {
    console.error(error);
});

loader.load('elaine.glb', function (gltf) {
    modelElaine = gltf.scene;
    enableShadows(modelElaine);
    modelElaine.position.set(5, 0, 0); // Posição inicial
    modelElaine.scale.set(0.5, 0.5, 0.5); // Ajuste de escala
    scene.add(modelElaine);
}, undefined, function (error) {
    console.error(error);
});

loader.load('porl.glb', function (gltf) {
    modelPorl = gltf.scene;
    enableShadows(modelPorl);
    modelPorl.position.set(-5, 0, 0); // Posição inicial
    modelPorl.scale.set(0.5, 0.5, 0.5); // Ajuste de escala
    scene.add(modelPorl);
}, undefined, function (error) {
    console.error(error);
});

// Set initial velocity of the cabinet
var velocity = new THREE.Vector3(0, 0, 0);
var previousPosition = new THREE.Vector3(0, 0, 0);
var jumpVelocity = 3; // velocity when jumping
var movVelocity = 5;
var inverterVel = 1;
var isJumping = false; // flag to track if the model is jumping

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

// Create a function to update the position of the cabinet
function update() {
    if (modelEd) {
        var delta = clock.getDelta();

        // Update cabinet's position based on velocity and delta time
        modelEd.position.x += velocity.x * delta * movVelocity * inverterVel; 
        modelEd.position.z += velocity.z * delta * movVelocity * inverterVel; 
        modelEd.position.y += velocity.y * delta * movVelocity;

        camera.lookAt(modelEd.position);

        // If cabinet is jumping, decrease its y velocity over time due to gravity
        if (isJumping) {
            velocity.y -= 9.8 * delta; // Adjust gravity as needed
        }

        // If cabinet reaches the ground, stop jumping and reset its y position
        if (modelEd.position.y <= 0) {
            modelEd.position.y = 0;
            velocity.y = 0;
            isJumping = false;
        }

        checkSceneLimits(modelEd);
    }
}

// Inicia o loop de renderização
function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}
animate();
