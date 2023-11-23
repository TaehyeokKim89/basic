import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Firework from './firework';

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
    10000
  )

  camera.position.z = 8000

  new OrbitControls(camera, renderer.domElement)
  //----- BufferGeometry 를 이용한 파티클 생성------//
  // const geometry = new THREE.BufferGeometry();

  // const count = 10000;

  // const positions = new Float32Array(count * 3)
  // const colors = new Float32Array(count * 3)


  // for (let i = 0; i < count; i++) {
  //   positions[i * 3] = THREE.MathUtils.randFloatSpread(10);
  //   positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
  //   positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10);

  //   colors[i*3 ] = Math.random()
  //   colors[i*3 +1] =  Math.random()
  //   colors[i*3 +2] =  Math.random()
  // }

  // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  // geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // const material = new THREE.PointsMaterial({
  //   color: 0xccaaff,
  //   size: 0.1,
  //   vertexColors: true,
  // });

  // const textureLoader = new THREE.TextureLoader()
  // const texture = textureLoader.load('./assets/textures/particle.png')

  // material.alphaMap = texture;
  // material.transparent = true;
  // material.depthWrite = false;

  // const points = new THREE.Points(geometry, material)

  // scene.add(points)
  const fireworks = []

  fireworks.update = function () {
    for ( let i = 0; i < this.length; i++) {
      const firework = fireworks[i]

      firework.update()
    }
  };
  const firework = new Firework({ x: 0, y: 0})

  scene.add(firework.points)

  fireworks.push(firework)

  render()

  function render() {
    fireworks.update()
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

  function handleMouseDown() {
    const firework = new Firework({
      x: THREE.MathUtils.randFloatSpread(8000),
      y: THREE.MathUtils.randFloatSpread(8000)
    })

    scene.add(firework.points)

    fireworks.push(firework)
  }

  window.addEventListener('mousedown', handleMouseDown)
}