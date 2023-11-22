import * as THREE from 'three';
window.addEventListener('load', () => {
  init();
})

function init() {
  const canvas = document.querySelector('#canvas')

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });

  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearAlpha(0)//캔버스 불투명도
  // renderer.setClearColor(0x00aaff, 0)// 캔버스 배경색 및 불투명도


  const scene = new THREE.Scene()

  scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500)

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  )
  // camera.position.z = 5
  camera.position.set(0, 25, 150)

  // const controls = new OrbitControls(camera, renderer.domElement)

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150)
  const waveMaterial = new THREE.MeshStandardMaterial({
    // wireframe: true,
    color: '#00ffff'
  })
  const wave = new THREE.Mesh(waveGeometry, waveMaterial)

  wave.rotation.x = -Math.PI / 2;

  const waveHeight = 2.5;
  const initialZPosition = []
  // for(let i = 0; i < waveGeometry.attributes.position.array.length; i += 3) {
  //   waveGeometry.attributes.position.array[i+2] += (Math.random() - 0.5) * waveHeight;
  // }

  for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
    const z = waveGeometry.attributes.position.getZ(i) + (Math.random() - 0.5) * waveHeight;

    waveGeometry.attributes.position.setZ(i, z)
    initialZPosition.push(z)
  }

  wave.update = function () {
    const elapsedTime = clock.getElapsedTime()
    for (let i = 0; i < waveGeometry.attributes.position.count; i ++) {
     const z =  initialZPosition[i] + Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;

     waveGeometry.attributes.position.setZ(i, z)
    }
    waveGeometry.attributes.position.needsUpdate = true
  }

  scene.add(wave)

  const pointLight = new THREE.PointLight(0xffffff, 1000);
  pointLight.position.set(15, 15, 15)
  scene.add(pointLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(-15, 15, 15)
  scene.add(directionalLight)

  const clock = new THREE.Clock()
  render()

  function render() {
    wave.update()
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