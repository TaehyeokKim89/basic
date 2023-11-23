import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

window.addEventListener('load', () => {
  init();
})

async function init() {
  gsap.registerPlugin(ScrollTrigger)

  const params = {
    waveColor: '#00ffff',
    backgroundColor: '#ffffff',
    fogColor: '#f0f0f0',
  }

  const canvas = document.querySelector('#canvas')

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });

  renderer.shadowMap.enabled = true;

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

  const controls = new OrbitControls(camera, renderer.domElement)

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150)
  const waveMaterial = new THREE.MeshStandardMaterial({
    // wireframe: true,
    color: params.waveColor
  })
  const wave = new THREE.Mesh(waveGeometry, waveMaterial)
  wave.receiveShadow = true;

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
    for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
      const z = initialZPosition[i] + Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;

      waveGeometry.attributes.position.setZ(i, z)
    }
    waveGeometry.attributes.position.needsUpdate = true
  }

  scene.add(wave)

  const gltfLoader = new GLTFLoader();

  const gltf = await gltfLoader.loadAsync('./models/ship/scene.gltf')
  const ship = gltf.scene
  ship.castShadow = true;

  ship.traverse(object => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  })

  ship.update = function () {
    const elapsedTime = clock.getElapsedTime()

    ship.position.y = Math.sin(elapsedTime * 3)
  }

  ship.scale.set(0.01, 0.01, 0.01)
  scene.add(ship)

  // const box


  const pointLight = new THREE.PointLight(0xffffff, 1000);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.radius = 10;

  pointLight.position.set(15, 15, 15)
  scene.add(pointLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 10;

  directionalLight.position.set(-15, 15, 15)
  scene.add(directionalLight)

  const clock = new THREE.Clock()
  render()

  function render() {
    wave.update()
    ship.update()
    camera.lookAt(ship.position)
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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.wrapper',
      start: 'top top',
      end: 'bottom bottom',
      markers: true,
      scrub: true,
    }
  })

  tl
    .to(params, {
      waveColor: '#4268ff',
      onUpdate: () => {
        waveMaterial.color = new THREE.Color(params.waveColor)
      }
    })
    .to(params, {
      backgroundColor: '#2a2a2a',
      onUpdate: () => {
        scene.background = new THREE.Color(params.backgroundColor)
      }
    }, '<')
    .to(params, {
      fogColor: '#2f2f2f',
      onUpdate: () => {
        scene.fog.color = new THREE.Color(params.fogColor)
      }
    }, '<')
    .to(camera.position, {
      x: 200,
      z: -150,
    })
    .to(ship.position,{
      z: 250,
    })
    .to(camera.position, {
      x: -150,
      y: 25,
      z: 150,
    })
    .to(camera.position, {
      x: 0,
      y: 50,
      z: 400,
    })

  gsap.to('.title', {
    opacity: 0,
    scrollTrigger: {
      trigger: '.wrapper',
      scrub: true,
      pin: true,
      end: '+=1000',
    }
  })
}