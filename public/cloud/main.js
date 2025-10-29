import * as THREE from "three";
import * as BufferGeometryUtils from "addons/utils/BufferGeometryUtils.js";

const cloudShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 fogColor;
    uniform float fogNear;
    uniform float fogFar;
    varying vec2 vUv;

    void main() {

      float depth = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = smoothstep( fogNear, fogFar, depth );

      vec4 color = texture2D( map, vUv );
      color.a *= pow( gl_FragCoord.z, 20.0 );
      gl_FragColor = mix( color, vec4( fogColor , color.a ), fogFactor );

    }
  `
};

const container = document.querySelector('.container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 30000);
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });

let mouseX = 0, mouseY = 0;
let start_time = Date.now();
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const tLoader = new THREE.TextureLoader();

tLoader.load('https://mrdoob.com/lab/javascript/webgl/clouds/cloud10.png', (t) => {
  t.colorSpace = THREE.SRGBColorSpace;
  init(t);
});

function init(t) {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = window.innerHeight;
  const context = canvas.getContext('2d');
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
  container.style.backgroundSize = '32px 100%';

  camera.position.z = 6000;

  const texture = t;
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  const fog = new THREE.Fog(0x4584b4, -100, 3000);
  scene.fog = fog;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far }
    },
    vertexShader: cloudShader.vertexShader,
    fragmentShader: cloudShader.fragmentShader,
    depthWrite: false,
    depthTest: false,
    transparent: true
  });

  const planeGeo = new THREE.PlaneGeometry(64, 64);
  const planeObj = new THREE.Object3D();
  const geometries = [];

  for (let i = 0; i < 8000; i++) {
    planeObj.position.x = Math.random() * 1000 - 500;
    planeObj.position.y = -Math.random() * Math.random() * 200 - 15;
    planeObj.position.z = i;
    planeObj.rotation.z = Math.random() * Math.PI;
    planeObj.scale.x = planeObj.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
    planeObj.updateMatrix();

    const clonedPlaneGeo = planeGeo.clone();
    clonedPlaneGeo.applyMatrix4(planeObj.matrix);

    geometries.push(clonedPlaneGeo);
  }

  const planeGeos = BufferGeometryUtils.mergeGeometries(geometries, false);
  const planesMesh = new THREE.Mesh(planeGeos, material);
  planesMesh.renderOrder = 2;

  const planesMeshA = planesMesh.clone();
  planesMeshA.position.z = -8000;
  planesMeshA.renderOrder = 1;

  scene.add(planesMesh);
  scene.add(planesMeshA);

  renderer.setSize(window.innerWidth, window.innerHeight);
  // Ensure the WebGL canvas sits above the SVG background
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '2';
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);

  animate();
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.25;
  mouseY = (event.clientY - windowHalfY) * 0.15;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const position = ((Date.now() - start_time) * 0.03) % 8000;
  camera.position.x += (mouseX - camera.position.x) * 0.01;
  camera.position.y += (-mouseY - camera.position.y) * 0.01;
  camera.position.z = -position + 8000;
  renderer.render(scene, camera);
}
