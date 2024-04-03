import * as THREE from 'three';

//Cria a scene e a camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Define a resoluçao e tamanho da janela
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Cria e adiciona um cubo
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Cria e adiciona um segundo cubo
const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.set(3, 0, 0);

// Cria e adiciona uma esfera
const sphereGeometry = new THREE.SphereGeometry( 0.7, 32, 32 );
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );
sphere.position.set(-3, 0, 0);

// Muda a posição da camera para fora de 0, 0, 0
camera.position.z = 5;

// Define os vetores de movimento
const UP = new THREE.Vector3(0, 0.1, 0);
const DOWN = new THREE.Vector3(0, -0.1, 0);
const LEFT = new THREE.Vector3(-0.1, 0, 0);
const RIGHT = new THREE.Vector3(0.1, 0, 0);
const FRONT = new THREE.Vector3(0, 0, -0.1);
const BACK = new THREE.Vector3(0, 0, 0.1);

let directions = [false, false, false, false, false, false, false, false, false, false, false, false]

// Verifica por teclas precionadas
document.addEventListener('keydown', function(event) {
        console.log(directions);
        // Movimenta um cubo
        if (event.key == 'w'){
            directions[0] = true
        }
        if (event.key == 's'){
            directions[1] = true
        }
        if (event.key == 'a'){
            directions[2] = true
        } 
        if (event.key == 'd'){
            directions[3] = true
        }
        if (event.key == ' '){
            directions[4] = true
        }
        if (event.key == 'Shift'){
            directions[5] = true
        } 
});

// Verifica por teclas precionadas
document.addEventListener('keyup', function(event) {
    console.log(directions);
    // Movimenta um cubo
    if (event.key == 'w'){
        directions[0] = false
    }
    if (event.key == 's'){
        directions[1] = false
    }
    if (event.key == 'a'){
        directions[2] = false
    } 
    if (event.key == 'd'){
        directions[3] = false
    }
    if (event.key == ' '){
        directions[4] = false
    }
    if (event.key == 'Shift'){
        directions[5] = false
    }
});

function movement(){
    if (directions[0]){
        cube.position.add(FRONT);
    }
    if (directions[1]){
        cube.position.add(BACK);
    }
    if (directions[2]){
        cube.position.add(LEFT);
    }
    if (directions[3]){
        cube.position.add(RIGHT);
    }
    if (directions[4]){
        cube.position.add(UP);
    }
    if (directions[5]){
        cube.position.add(DOWN);
    }
}

// Código para clique e arrasta copiado da internet (muito maneiro heheh)
let isDragging = false;
let startPosition;
let startCubePosition;

// Adiciona um ouvinte de evento de mousedown para iniciar o arraste
renderer.domElement.addEventListener('mousedown', function(event) {
    isDragging = true;
    startPosition = { x: event.clientX, y: event.clientY };
    startCubePosition = { x: cube2.position.x, y: cube2.position.y };
});

// Adiciona um ouvinte de evento de mousemove para arrastar o cubo
document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const deltaX = event.clientX - startPosition.x;
        const deltaY = event.clientY - startPosition.y;
        cube2.position.x = startCubePosition.x + (deltaX / window.innerWidth) * 17;
        cube2.position.y = startCubePosition.y - (deltaY / window.innerHeight) * 9;
    }
});

// Adiciona um ouvinte de evento de mouseup para encerrar o arraste
document.addEventListener('mouseup', function(event) {
    isDragging = false;
});


// Inicia o loop de renderização
function animate() {
	requestAnimationFrame( animate );

    // Adiciona a rotação
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    movement();

	renderer.render( scene, camera );
}
animate();