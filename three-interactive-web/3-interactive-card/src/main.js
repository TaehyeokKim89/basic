import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Card from './card';
import { GUI } from 'lil-gui'

window.addEventListener('load', () => {
  init();
})

function init() {
  const gui = new GUI()

  const COLORS = ['#ff6e6e', '#31e0c1', '#006fff', '#ffd732']

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearAlpha(0.5)//캔버스 불투명도
  // renderer.setClearColor(0x00aaff, 0.5)// 캔버스 배경색 및 불투명도

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  )

  camera.position.z = 25

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  controls.rotateSpeed = 0.75;
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI / 2 - Math.PI /3;
  controls.maxPolarAngle = Math.PI / 2 + Math.PI /3;


  const ambientLighth = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLighth)

  const directionalLigth1 = new THREE.DirectionalLight(0xffffff, 0.6)
  const directionalLigth2 = directionalLigth1.clone()

  directionalLigth1.position.set(1,1,3)
  directionalLigth2.position.set(-1,1,-3)

  scene.add(directionalLigth1, directionalLigth2)

  render()

  const card = new Card({
    width: 10,
    height: 15.8,
    radius: 0.5,
    color: '#0077ff'
  })

  scene.add(card.mesh)
  card.mesh.rotation.z = Math.PI * 0.1

  const cardFolder = gui.addFolder('Card');

  cardFolder
  .add(card.mesh.material, 'roughness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('material.roughness');

  cardFolder
  .add(card.mesh.material, 'metalness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('material.metalness');

  function render() {
    controls.update()
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

  const container = document.querySelector('.container')

  COLORS.forEach(color => {
    const button = document.createElement('button')

    button.style.backgroundColor = color;

    button.addEventListener('click', () => {
      card.mesh.material.color = new THREE.Color(color)
    })

    container.appendChild(button)
  })
}