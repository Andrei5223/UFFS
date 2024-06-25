import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

// Crie uma luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 10); // Cor branca, intensidade 0.5

// Crie uma luz direcional
const directionalLight = new THREE.DirectionalLight(0xffffff, 20); // Cor e intensidade da luz
directionalLight.position.set(10, 5.5 , 7.5); // Posição da luz
directionalLight.castShadow = true;

// Configurar a sombra da luz direcional
directionalLight.shadow.mapSize.width = 2048; // Largura da textura da sombra
directionalLight.shadow.mapSize.height = 2048; // Altura da textura da sombra
directionalLight.shadow.camera.near = 0.5; // Distância mínima para renderização da sombra
directionalLight.shadow.camera.far = 50; // Distância máxima para renderização da sombra

// Ajuste os limites da câmera ortográfica (para que as sombras funcionem em toda a area do plano)
const frustumSize = 8; // Tamanho do frustum
const aspect = window.innerWidth / window.innerHeight;
directionalLight.shadow.camera.left = -frustumSize * aspect;
directionalLight.shadow.camera.right = frustumSize * aspect;
directionalLight.shadow.camera.top = frustumSize;
directionalLight.shadow.camera.bottom = -frustumSize;

//https://github.com/mrdoob/three.js/blob/29e3db579f47feb464e2ece5cd24ccf8572e48fb/examples/webgl_shaders_sky.html
function initSky(scene, renderer, camera) {
	// Add Sky
	let sky = new Sky();
	sky.scale.setScalar( 450000 );
	scene.add( sky );

	let sun = new THREE.Vector3();

	const uniforms = sky.material.uniforms;
	uniforms[ 'turbidity' ].value = 10;
	uniforms[ 'rayleigh' ].value = 3;
	uniforms[ 'mieCoefficient' ].value = 0.005;
	uniforms[ 'mieDirectionalG' ].value = 0.7;

	const phi = THREE.MathUtils.degToRad( 90 - 45 );
	const theta = THREE.MathUtils.degToRad( 45 );

	sun.setFromSphericalCoords( 1, phi, theta );

	uniforms[ 'sunPosition' ].value.copy( sun );

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.1;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.toneMappingExposure = renderer.toneMappingExposure;
	renderer.render( scene, camera );
}

export { ambientLight, directionalLight, initSky };