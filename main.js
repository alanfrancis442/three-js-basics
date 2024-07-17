import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import  Dat  from "three-dat.gui";
// import init from 'three-dat.gui';
// init(Dat);

// var gui = new Dat.GUI();
//three js needs render camera and a scene

const height = window.innerHeight
const width = window.innerWidth


const renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(width,height)

document.body.appendChild(renderer.domElement)

const fov = 75
const aspect = width/height
const near = 0.1
const far = 10

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z = 4

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

const scene = new THREE.Scene()

//creating a geometry

const geo = new THREE.SphereGeometry(1,16,16)
const material = new THREE.MeshStandardMaterial(
  {
    color:'red' ,
    flatShading:true,
  }
)

const sphere = new THREE.Mesh(geo,material)
// sphere.add(sphere2)
scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(5, 5); 

const planeMaterial = new THREE.MeshStandardMaterial({
  color: 'white', 
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = Math.PI / 2; 
plane.position.y = -1; 

scene.add(plane);

const light = new THREE.AmbientLight()
scene.add(light)
const directionalLight = new THREE.DirectionalLight(0xffffff,1)
directionalLight.position.set(1.5,1,0)
scene.add(directionalLight)

const dirlighthelper = new THREE.DirectionalLightHelper(directionalLight,0.2)
scene.add(dirlighthelper)

function animate(t=0){
  requestAnimationFrame(animate)
  // sphere.rotateY(t*0.00001)
  controls.update()
  renderer.render(scene,camera);
}

animate()

// renderer.render(scene,camera);

