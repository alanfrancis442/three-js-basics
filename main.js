import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

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
camera.position.z = 2

const controls = new OrbitControls(camera,renderer.domElement)


const scene = new THREE.Scene()

//creating a geometry

const geo = new THREE.SphereGeometry(0.8,16,16)
const material = new THREE.MeshBasicMaterial(
  {
    color:'white' ,
    wireframe:true
  }
)

const geo2 = new THREE.IcosahedronGeometry(0.8,2)
const material2 = new THREE.MeshStandardMaterial({
  color:'red',

})

const sphere2 = new THREE.Mesh(geo2,material2)
scene.add(sphere2)

const sphere = new THREE.Mesh(geo,material)
scene.add(sphere)

const light = new THREE.HemisphereLight(0xffff00,0xffff00)
scene.add(light)


function animate(t=0){
  requestAnimationFrame(animate)
  // sphere.rotateY(t*0.00001)
  renderer.render(scene,camera);
}

// animate()

renderer.render(scene,camera);

