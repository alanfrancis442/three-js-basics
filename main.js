import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/Addons.js'

//three js needs render camera and a scene

const height = window.innerHeight
const width = window.innerWidth


const renderer = new THREE.WebGLRenderer({antialias:true})

const textureLoader = new THREE.TextureLoader()
const matcap = textureLoader.load('/textures/matcap.jpg')

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

//creating a geometry



//Loading fonts
const fontLoader = new FontLoader()

fontLoader.load(
  '/fonts/helvetiker_bold.typeface.json',
  (font)=>{
    const textgeo = new TextGeometry(
      "Hello Three Js",
      {
        font: font,
        size: 0.2,
        depth: 0.1,
        curveSegments: 8 ,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.003,
        bevelOffset: 0,
        bevelSegments: 3
      }
    )
    textgeo.computeBoundingBox()
    // console.log(textgeo.boundingBox.max.x)
    //centerign the geo
    textgeo.translate(
      -(textgeo.boundingBox.max.x-0.01)*0.5,
      -(textgeo.boundingBox.max.y-0.01)*0.5,
      -textgeo.boundingBox.max.z*0.5,
    )

    //textgeo.center() can be used to center the text

    // textgeo.translate(textgeo.boundingBox.max.x*0.5)
    // textgeo.translate(textgeo.boundingBox.max.x*0.5)

    const text = new THREE.Mesh(
      textgeo,
      // new THREE.MeshBasicMaterial({wireframe:true})
      new THREE.MeshMatcapMaterial({matcap:matcap})
    )
    // text.position.x = -1
    scene.add(text)
  }
)


const axishelper = new THREE.AxesHelper()
scene.add(axishelper)

const donutMaterial = new THREE.MeshMatcapMaterial({matcap:matcap})
const donutGeo = new THREE.TorusGeometry( 0.5, 0.3, 16, 100 ); 
for(let i =0;i<300;i++){
  const donut = new THREE.Mesh(donutGeo,donutMaterial)
  donut.position.set(
    (Math.random()-0.5)*10,
    (Math.random()-0.5)*10,
    (Math.random()-0.5)*10
  )
  donut.rotation.set(
    Math.PI*Math.random(),
    Math.PI*Math.random(),
    Math.PI*Math.random(),
  )
  let scale = Math.random()
  donut.scale.set(scale,scale,scale)
  scene.add(donut)
}

function animate(t=0){
  requestAnimationFrame(animate)
  // sphere.rotateY(t*0.00001)
  controls.update()
  renderer.render(scene,camera);
}

animate()

// renderer.render(scene,camera);

