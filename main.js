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
camera.position.z = 5

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

const scene = new THREE.Scene()

//loading texture
const texture = new THREE.TextureLoader().load('/flag.jpeg');
// console.log('texture',texture);

//creating a mateial with shader
const material = new THREE.RawShaderMaterial({
  vertexShader:testvertex,
  fragmentShader:testfragement,
  uniforms:{
    uFrequency:{value:new THREE.Vector2(5,2)},
    uTime:{value:0},
    uTexture:{value:texture}
  },
})


//creating a geometry
// const material = new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide})

const planegeo = new THREE.PlaneGeometry(4, 4, 50, 50)
const plane = new THREE.Mesh(planegeo,material)
plane.doubleSided = true;
scene.add(plane)

const count = plane.geometry.attributes.position.count
// console.log(count);
const randoms = new Float32Array(count)
for(let i = 0; i<count;i++){
  randoms[i] = Math.random()
}
//adding a attribute to the geometry
planegeo.setAttribute('aRandom',new THREE.BufferAttribute(randoms,1))

//creating clock object
const clock = new THREE.Clock()


//amibiend light
const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

function animate(t=0){
  requestAnimationFrame(animate)
  // sphere.rotateY(t*0.00001)
  // plane.rotateY(0.005)
  let ellapsedTime = clock.getElapsedTime()
  // console.log(ellapsedTime);
  material.uniforms.uTime.value = ellapsedTime
  controls.update()
  renderer.render(scene,camera);
}

animate()

// renderer.render(scene,camera);

