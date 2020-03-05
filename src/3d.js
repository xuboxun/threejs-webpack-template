import * as THREE from "three/build/three.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { resizeRendererToDisplaySize } from "./utils/tools";

const scene = new THREE.Scene();
let camera = null;
let renderer = null;
let canvas = null;
let controls = null;
let mesh = null;

const addRender = () => {
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setClearColor("#f5f5f5", 1.0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

const addCamera = () => {
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 2000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 100;
  camera.position.y = 0;
  camera.position.x = 0;
};

const addLight = () => {
  const light = new THREE.AmbientLight(0xffffff);
  // const light = new THREE.PointLight( 0xffffff, 1, 100 );
  // const light = new THREE.DirectionalLight( 0xffffff, 1 );
  // light.position.set( 0, 50, 50 );
  scene.add(light);
};

const addOrbit = () => {
  controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();
};

const animate = () => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

export const loadModel = url => {
  const loader = new GLTFLoader();

  const onSuccess = gltf => {
    mesh = gltf.scene;
    mesh.position.x = 0;
    mesh.position.y = 0;
    scene.add(mesh);
  };
  const onError = err => {
    console.error(err);
  };

  loader.load(url, onSuccess, undefined, onError);
};

export const DIRECTION = {
  UP: "up",
  RIGHT: "right",
  DOWN: "down",
  LEFT: "left"
};

const lookAt = {
  x: 0,
  y: 0,
  z: 0
};
export const moveCamera = (direction, step = 1) => {
  step = Math.abs(step);
  switch (direction) {
    case DIRECTION.UP:
      // lookAt.y += step;
      mesh.position.y += step;
      break;
    case DIRECTION.DOWN:
      // lookAt.y -= step;
      mesh.position.y -= step;
      break;
    case DIRECTION.RIGHT:
      // lookAt.x += step;
      mesh.position.x += step;
      break;
    case DIRECTION.LEFT:
      // lookAt.x -= step;
      mesh.position.x -= step;
      break;
  }
  // camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
  controls.update();
};

export const render3D = () => {
  canvas = document.querySelector("#canvas");

  addRender();
  addCamera();
  addLight();
  addOrbit();

  loadModel("./assets/model/girl/scene.gltf");

  animate();
};
