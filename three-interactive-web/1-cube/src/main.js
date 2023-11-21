import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

window.addEventListener('load', () => {
  init();
})

function init() {
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
  const controls = new OrbitControls(camera, renderer.domElement)

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)

  // const geometry = new THREE.BoxGeometry(2,2,2)
  const cubeGeometry = new THREE.IcosahedronGeometry(1)
  // const material = new THREE.MeshStandardMaterial({ color : "pink"})
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111
  })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  })

  const sKeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial)


  scene.add(cube, sKeleton)

  // camera.position.set(3,4,5);
  camera.position.z = 5;

  camera.lookAt(cube.position)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)

  // directionalLight.position.set(-1,2,3)

  scene.add(directionalLight)

  // const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.1)

  // ambientLight.position.set(3,2,1)

  // scene.add(ambientLight)

  const clock = new THREE.Clock()

  render()

  function render() {
    const elapsedTime = clock.getElapsedTime() // 현재까지 경과한 시간
    // cube.rotation.x = THREE.MathUtils.degToRad(45);
    // cube.rotation.x = Date.now() / 1000 ;
    cube.rotation.x = elapsedTime
    cube.rotation.y = elapsedTime

    sKeleton.rotation.x = elapsedTime * 1.5
    sKeleton.rotation.y = elapsedTime * 1.5
    // cube.rotation.x += clock.getDelta() // 다음 delta까지의 간격
    // cube.position.y = Math.sin(cube.rotation.x)
    // cube.scale.x = Math.cos(cube.rotation.x)

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResize)
}