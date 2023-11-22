import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import typeface from './assets/fonts/Hakgyoansim Wooju R_Regular.json'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

window.addEventListener('load', () => {
  init();
})

async function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  )
  camera.position.z = 5;

  const fontLoader = new FontLoader();

  const font = await fontLoader.loadAsync('./assets/fonts/Hakgyoansim Wooju R_Regular.json')

  const textGeometry = new TextGeometry('안녕, 친구들', {
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  })
  const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00c896 })

  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)

  // const font = fontLoader.parse(typeface) //typeface 직접 불러오는 부분

  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  scene.add(pointLight)

  const controls = new OrbitControls(camera, renderer.domElement)

  textGeometry.computeBoundingBox()
  textGeometry.center()


  render()

  function render() {

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    controls.update()
  }

  window.addEventListener('resize', handleResize)
}