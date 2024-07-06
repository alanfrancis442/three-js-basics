import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import testfragement from './shaders/fragment.glsl'
import testvertex from './shaders/vertex.glsl'

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
controls.enableDamping = true
controls.dampingFactor = 0.03

const scene = new THREE.Scene()

//creating a mateial with shader
const material = new THREE.RawShaderMaterial({
  vertexShader:testvertex,
  fragmentShader:testfragement
})


//creating a geometry
// const material = new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide})

const planegeo = new THREE.PlaneGeometry()
const plane = new THREE.Mesh(planegeo,material)
scene.add(plane)


function animate(t=0){
  requestAnimationFrame(animate)
  // sphere.rotateY(t*0.00001)
  controls.update()
  renderer.render(scene,camera);
}

animate()

// renderer.render(scene,camera);

