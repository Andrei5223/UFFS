import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
const controls = new PointerLockControls(camera, document.body);

camera.near = 0.05;

// Posição inicial do labirinto
camera.position.y = 0.7;
camera.position.x = 3.5;
camera.position.z = 3.5;

var velocity = new THREE.Vector3(0, 0, 0);
var movVelocity = 2;

function onKeyDown(event) {
    var keyCode = event.keyCode;
    if (keyCode == 65) { // a key
        velocity.x = -1;
    } else if (keyCode == 68) { // d key
        velocity.x = 1;
    } else if (keyCode == 87) { // w key
        velocity.z = 1;
    } else if (keyCode == 83) { // s key
        velocity.z = -1;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;
    if (keyCode == 65 || keyCode == 68) { // left or right arrow key
        velocity.x = 0;
    } else if (keyCode == 87 || keyCode == 83) { // up or down arrow key
        velocity.z = 0;
    }
}

// Add event listeners for key presses and releases
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
document.addEventListener('click', () => {controls.lock();}, false);
controls.addEventListener('lock', () => {console.log('Pointer locked');});

function checkColision(walls, wall){
    for (let i = 0; i < walls.length; i++) {
		if (walls[i].dir == 0){

            let x1 = walls[i].x;
            let x2 = walls[i].x + wall.width;
            let z1 = walls[i].z - wall.depth / 2 - 0.1;
            let z2 = walls[i].z + wall.depth / 2 + 0.1;

            if ((camera.position.x > x1 && camera.position.x < x2) && (camera.position.z > z1 && camera.position.z < z2)){
                console.log("Colisão! x=" + walls[i].x + " z=" + walls[i].z + " dir=" + walls[i].dir + " - Camera: x=" + camera.position.x + " z=" + camera.position.z + "\nx1=" + x1 + " x2=" + x2 + " z1=" + z1 + " z2=" + z2);
                return true;
            }
		} else if (walls[i].dir == 1){

            let z1 = walls[i].z;
            let z2 = walls[i].z + wall.width;
            let x1 = walls[i].x - wall.depth / 2 - 0.1;
            let x2 = walls[i].x + wall.depth / 2 + 0.1;

            if ((camera.position.x > x1 && camera.position.x < x2) && (camera.position.z > z1 && camera.position.z < z2)){
                console.log("Colisão! x=" + walls[i].x + " z=" + walls[i].z + " dir=" + walls[i].dir + " - Camera: x=" + camera.position.x + " z=" + camera.position.z + "\nx1=" + x1 + " x2=" + x2 + " z1=" + z1 + " z2=" + z2);
                return true;
            }
		}
	}	
}


var clock = new THREE.Clock();

// Create a function to update the position
function updatePos(walls, wall) {
    var delta = clock.getDelta();

    let prevPosition = {x: 0, y: 0, z:0};
    prevPosition.x = camera.position.x;
    prevPosition.y = camera.position.y;
    prevPosition.z = camera.position.z;

    // Update camera's position based on velocity and delta time
    controls.moveRight(velocity.x * delta * movVelocity);
    controls.moveForward(velocity.z * delta * movVelocity)

    if (checkColision(walls, wall)){
        camera.position.x = prevPosition.x;
        camera.position.y = prevPosition.y;
        camera.position.z = prevPosition.z;
    }

    // console.log(camera.position);
}

export {camera, updatePos};