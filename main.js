import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as dat from "dat.gui";

const gui = new dat.GUI()

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
camera.position.z = 3

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

const scene = new THREE.Scene()

//creating a geometry

// const material = new THREE.MeshNormalMaterial()
// const material  = new THREE.MeshLambertMaterial()
// material.wireframe = true
// const material = new THREE.MeshPhongMaterial()
// material.wireframe = true
// material.shininess = 1000
// material.specular = new THREE.Color(0x1188ff)

//baseMaterial
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.5
material.metalness = 0.9

//tweaking mateiral
gui.add(material,'metalness').min(0).max(1).step(0.001)
gui.add(material,'roughness').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry( 0.5, 32, 16 ),
  material
)

const box = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,1,1),
  material
)
box.position.x +=2
//tweaking position

scene.add(box)

scene.add(sphere)

const geometry = new THREE.TorusGeometry( 0.5, 0.2, 16, 100 );  
const torus = new THREE.Mesh( geometry, material );
torus.position.x -=2
scene.add( torus );


const ambiLight = new THREE.AmbientLight()
scene.add(ambiLight)
const pointLight =  new THREE.PointLight( 0xff0000, 5, 100)
pointLight.position.set(0,1,1.5)
scene.add(pointLight)
// dirLight = new THREE.DirectionalLight()
// scene.add(dirLight)

function animate(t=0){
  requestAnimationFrame(animate)
  sphere.rotateY(0.003)
  box.rotateZ(0.003)
  torus.rotateX(0.003)
  torus.rotateY(0.003)
  controls.update()
  renderer.render(scene,camera);
}

animate()

// renderer.render(scene,camera);

