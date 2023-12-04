import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from '../shaders/vertexShader.glsl?raw'
import fragmentShader from '../shaders/fragmentShader.glsl?raw'

export default function () {
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
    })
    renderer.setClearColor(0x000000, 1);

    const container = document.querySelector('#container');

    container.appendChild(renderer.domElement)

    const canvasSize = {
        width: window.innerWidth,
        height: window.innerHeight, 
    }

   

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        canvasSize.width/canvasSize.height,
        0.1,
        100
    )
    camera.position.set(0, 0, 3)

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const createEarth = () =>{
        const material = new THREE.ShaderMaterial({
            color: 0x00ff00,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });
        const geometry = new THREE.PlaneGeometry(1, 1)
        const mesh = new THREE.Mesh(geometry, material)

        return mesh;
;
    }

    const create = () =>{
        const earth = createEarth();
        scene.add(earth);
    }

    const resize = () =>{
        canvasSize.width = window.innerWidth;
        canvasSize.height = window.innerHeight;

        camera.aspect = canvasSize.width / canvasSize.height;
        camera.updateProjectionMatrix()

        renderer.setSize(canvasSize.width, canvasSize.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    const addEvent = () => {
        window.addEventListener('resize', resize)
    }

    const draw = () =>{
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(()=>{
            draw()
        })
    }

    const initialize = () =>{
        create();
        addEvent()
        resize()
        draw();
    };

    initialize()
}
