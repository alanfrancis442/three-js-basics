import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/Addons.js'
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import studio from "@theatre/studio";
import { getProject, types } from "@theatre/core";

import testfragement from "./shaders/fragment.glsl";
import testvertex from "./shaders/vertex.glsl";

gsap.registerPlugin(ScrollTrigger);
studio.initialize();
const project = getProject("THREE.js x Theatre.js");
const sheet = project.sheet("Animated scene");
//three js needs render camera and a scene

const height = window.innerHeight;
const width = window.innerWidth;

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// const controls = new OrbitControls(camera,renderer.domElement)
// controls.enableDamping = true
// controls.dampingFactor = 0.03

const scene = new THREE.Scene();

//loading texture
const texture = new THREE.TextureLoader().load("/flag.jpeg");
// console.log('texture',texture);

//creating a mateial with shader
const material = new THREE.ShaderMaterial({
  vertexShader: testvertex,
  fragmentShader: testfragement,
  side: THREE.DoubleSide,
});

//creating a geometry
// const material = new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide})

const planegeo = new THREE.PlaneGeometry(4, 4, 50, 50);
const plane = new THREE.Mesh(planegeo, material);
plane.rotation.x = -Math.PI / 10;
plane.rotation.y = -Math.PI / 10;
// scene.add(plane);

const planeGroup = new THREE.Group();
planeGroup.add(plane);
scene.add(planeGroup);

const count = plane.geometry.attributes.position.count;
// console.log(count);

//creating clock object
const clock = new THREE.Clock();

//amibiend light
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const axishelper = new THREE.AxesHelper();
scene.add(axishelper);

const torusKnotObj = sheet.object("Torus Knot", {
  // Note that the rotation is in radians
  // (full rotation: 2 * Math.PI)
  rotation: types.compound({
    x: types.number(plane.rotation.x, { range: [-2, 2] }),
    y: types.number(plane.rotation.y, { range: [-2, 2] }),
    z: types.number(plane.rotation.z, { range: [-2, 2] }),
  }),
});

torusKnotObj.onValuesChange((values) => {
  const { x, y, z } = values.rotation;

  plane.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI);
});

function animate(t = 0) {
  requestAnimationFrame(animate);
  // sphere.rotateY(t*0.00001)
  // plane.rotateY(0.005)
  // plane.rotation.x += 0.01
  // plane.rotation.y += 0.01
  let ellapsedTime = clock.getElapsedTime();
  // console.log(ellapsedTime);
  // controls.update();
  renderer.render(scene, camera);
}
init();
animate();

// renderer.render(scene,camera);

//code to rotate camera

function init() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
  tl.to(planeGroup.rotation, {
    duration: 1,
    y: -0.3141592653589793,
    ease: "power4.inOut",
  });
}
