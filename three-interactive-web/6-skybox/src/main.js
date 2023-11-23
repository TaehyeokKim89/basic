import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'lil-gui'

window.addEventListener('load', () => {
  init();
})

function init() {
  const gui = new GUI()

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
    10000
  )

  camera.position.z = 100
  const controls = new OrbitControls(camera, renderer.domElement)
  /** 큐브맵 텍스쳐로 만든 3차원 공간 */

  // controls.minDistance = 5;
  // controls.maxDistance = 100;

  // const texureLoader = new THREE.TextureLoader().setPath('assets/textures/Yokohama/')

  // const images = [
  //   'posx.jpg', 'negx.jpg',
  //   'posy.jpg', 'negy.jpg',
  //   'posz.jpg', 'negz.jpg',
  // ]

  // const geometry = new THREE.BoxGeometry(5000, 5000 , 5000)
  // const matrials = images.map(image=> new THREE.MeshBasicMaterial({
  //     map: texureLoader.load(image),
  //     side: THREE.BackSide,
  //   })
  // )

  // const skybox = new THREE.Mesh(geometry, matrials)
  // scene.add(skybox)  

  /** 큐브맵 텍스쳐로 만든 3차원 공간 2 */
  // const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('assets/textures/Yokohama/')

  //  const images = [
  //   'posx.jpg', 'negx.jpg',
  //   'posy.jpg', 'negy.jpg',
  //   'posz.jpg', 'negz.jpg',
  // ]

  // const cubeTexture = cubeTextureLoader.load(images)
  // scene.background = cubeTexture

  /** 큐브맵 텍스쳐로 만든 3차원 공간 3 */

  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('assets/textures/Realism_equirectangular-jpg_christmas_village_31883075_9479554.jpg')

  texture.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = texture;

  const sphereGeometry = new THREE.SphereGeometry(30, 50, 50)
  const sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: texture,
  })

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  scene.add(sphere)

  gui
    .add(texture, 'mapping', {
      Reflection: THREE.EquirectangularReflectionMapping,
      Refraction: THREE.EquirectangularRefractionMapping
    })
    .onChange(() => {
      sphereMaterial.needsUpdate = true;
    })

  gui
    .add(sphereMaterial, 'reflectivity')
    .min(0)
    .max(1)
    .step(0.01);

  gui
    .add(sphereMaterial, 'refractionRatio')
    .min(0)
    .max(1)
    .step(0.01);
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