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

const VEL = 1;
const ACEL = 0.1;
const GRAV = 10;

let JUMPS = 1;
let JUMP_POWER = 0;

// Define os vetores de movimento
const VEL_Y = new THREE.Vector3(0, 0, 0);
const VEL_X = new THREE.Vector3(0, 0, 0);
const VEL_Z = new THREE.Vector3(0, 0, 0);

let directions = [false, false, false, false, false, false]

// Verifica por teclas precionadas
document.addEventListener('keydown', function(event) {
        console.log(directions);
        console.log(event.key);
        // Movimenta um cubo
        if (event.key == 'w'){
            directions[0] = true;
            VEL_Z.z += ACEL * -1;
        }
        if (event.key == 's'){
            directions[1] = true;
            VEL_Z.z += ACEL;
        }
        if (event.key == 'a'){
            directions[2] = true;
            VEL_X.x += ACEL * -1;
        } 
        if (event.key == 'd'){
            directions[3] = true;
            VEL_X.x += ACEL;
        }
        if (event.key == ' '){
            directions[4] = true;
            // VEL_Y.y += ACEL;
        }
        if (event.key == 'Shift'){
            directions[5] = true;
            VEL_Y.y += ACEL * -1;
        }
});

// Verifica por teclas precionadas
document.addEventListener('keyup', function(event) {
    console.log(directions);
    // Movimenta um cubo
    if (event.key == 'w'){
        directions[0] = false;
        VEL_Z.z = 0;
    }
    if (event.key == 's'){
        directions[1] = false;
        VEL_Z.z = 0;
    }
    if (event.key == 'a'){
        directions[2] = false;
        VEL_X.x = 0;
    } 
    if (event.key == 'd'){
        directions[3] = false;
        VEL_X.x = 0;
    }
    if (event.key == ' '){
        directions[4] = false;
        // VEL_Y.y = 0;
    }
    if (event.key == 'Shift'){
        directions[5] = false;
        VEL_Y.y = 0;
    }
});

function movement(){
    if (directions[0]){
        cube.position.add(VEL_Z);
    }
    if (directions[1]){
        cube.position.add(VEL_Z);
    }
    if (directions[2]){
        cube.position.add(VEL_X);
    }
    if (directions[3]){
        cube.position.add(VEL_X);
    }
    if (directions[4]){
        if (JUMPS > 0){
            JUMPS -= 1;
            JUMP_POWER = 0.5;
            VEL_Y.y += JUMP_POWER;
            cube.position.add(VEL_Y);
        } else {
            VEL_Y.y += JUMP_POWER;
            cube.position.add(VEL_Y);
        }
    }
    if (directions[5]){
        cube.position.add(VEL_Y);
    }
}

// Inicia o loop de renderização
function animate() {
	requestAnimationFrame( animate );

    // Adiciona a rotação
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    if (cube.position.y > 0){
        JUMP_POWER -= 0.01 * GRAV

    } else {
        JUMPS = 1;
    }


    movement();

	renderer.render( scene, camera );
}
animate();