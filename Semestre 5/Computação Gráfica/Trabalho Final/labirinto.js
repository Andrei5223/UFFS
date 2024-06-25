import * as THREE from 'three';

// Posição da matriz é a coordenada da parede
// 0 = Sem parede
// 1 = Parede pelo eixo x (horizontal na matriz)
// 2 = Parede pelo eixo z (vertical na matriz)
// 3 = Parede pelos dois eixos
// 31111131112
// 23102211212
// 31031232122
// 22302120202
// 21031212222
// 23232120212
// 22001213222
// 30312210112
// 22022232322
// 21121002202
// 11111110110

let walls = []
const wall = {width: 1, height: 1, depth: 0.1};
const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load('brickwall.png');
wallTexture.colorSpace = THREE.SRGBColorSpace;

function addWall(x, z, dir = 0, scene){
	const geometry = new THREE.BoxGeometry( wall.width, wall.height, wall.depth );
	const material = new THREE.MeshPhysicalMaterial( { map: wallTexture } );
	const cube = new THREE.Mesh( geometry, material );
	cube.castShadow = true;
    cube.receiveShadow = true;

	cube.position.y = 0.5;
	cube.position.x = x + 0.5;
	cube.position.z = z;

	if (dir == 1){
		cube.rotation.y = Math.PI / 2;
		cube.position.x += 0.5 - 1;
		cube.position.z += -0.5 + 1;
	}

	scene.add(cube);
	walls.push({x: x, z: z, dir: dir})
}

function buildMaze(scene, maze){
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] == 3){
                addWall(j, i, 0, scene);
                addWall(j, i, 1, scene);
            } else if (maze[i][j] == 2){
                addWall(j, i, 1, scene);
            } else if (maze[i][j] == 1){
                addWall(j, i, 0, scene);
            }
        }	
    }
}

// Cria e adiciona o plano de chão
const floorTexture = textureLoader.load('grass.jpg');
floorTexture.colorSpace = THREE.SRGBColorSpace;
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20); // Ajuste conforme necessário
const geometryPlane = new THREE.PlaneGeometry( 10, 10, 5, 5 );
const materialPlane = new THREE.MeshStandardMaterial( { map: floorTexture } );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
plane.receiveShadow = true; 
plane.position.set(5,0,5);
plane.rotation.x = -Math.PI / 2;

export {buildMaze, wall, walls, plane as floor, }