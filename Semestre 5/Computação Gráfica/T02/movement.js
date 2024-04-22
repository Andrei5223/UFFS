import * as THREE from 'three';

var velocity = new THREE.Vector3(0, 0, 0);
var previousPosition = new THREE.Vector3(0, 0, 0);
var jumpVelocity = 2;
var movVelocity = 5;
var isJumping = false;
var isMoving = false;
var clock = new THREE.Clock();
var gravity = 5;

function onKeyDown(event) {
    var keyCode = event.keyCode;
    if (keyCode == 32 && !isJumping) { // space key
        velocity.y = jumpVelocity; // jump
        isJumping = true; // set jumping flag to true
    } else if (keyCode == 65) { // a key
        velocity.x = -1; // move left
        isMoving = true;
    } else if (keyCode == 68) { // d key
        velocity.x = 1; // move right
        isMoving = true;
    } else if (keyCode == 87) { // w key
        velocity.z = -1; // move forward
        isMoving = true;
    } else if (keyCode == 83) { // s key
        velocity.z = 1; // move backward
        isMoving = true;
    }
}


function onKeyUp(event) {
    var keyCode = event.keyCode;
    if (keyCode == 65 || keyCode == 68) { // left or right arrow key
        velocity.x = 0; // stop horizontal movement
        isMoving = false;
    } else if (keyCode == 87 || keyCode == 83) { // up or down arrow key
        velocity.z = 0; // stop vertical movement
        isMoving = false;
    }
}


function checkCollisions(obj, scene) {
    // Itera sobre todos os objetos na cena
    scene.traverse(function(object) {
        // Verifica se o objeto é uma malha e exclui o próprio cubo da verificação de colisões
        if (object instanceof THREE.Mesh && object !== obj && object.geometry.boundingBox) {
            // Verifica se há colisão entre as caixas delimitadoras do cubo e do objeto
            if (obj.geometry.boundingBox.intersectsBox(object.geometry.boundingBox)) {

                // Se houver colisão, move o cubo de volta para sua posição anterior
                console.log('Colisão detectada!');
                // console.log('Posição do cubo:', obj.position);
                // console.log('Posição do objeto:', object.position);
                // console.log('Bounding box do cubo:', obj.geometry.boundingBox);
                // console.log('Bounding box do objeto:', object.geometry.boundingBox);

                obj.position.copy(previousPosition);
                isJumping = false;
                velocity.set(0,0,0);

            } 

        }
    });
}

function move(obj, scene) {
    previousPosition.copy(obj.position);

    var delta = clock.getDelta();

    obj.position.x += velocity.x * delta * movVelocity; 
    obj.position.z += velocity.z * delta * movVelocity; 
    obj.position.y += velocity.y * delta * movVelocity;
    obj.geometry.computeBoundingBox();
    obj.geometry.boundingBox.translate(obj.position);

    checkCollisions(obj, scene);
    
    if (isJumping || isMoving) {
        velocity.y -= gravity * delta;
    }

    if (obj.position.y <= 0) {
        obj.position.y = 0;
        velocity.y = 0;
        isJumping = false;
    }

}

export { move, onKeyDown, onKeyUp, checkCollisions };