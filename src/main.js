import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl');

window.addEventListener('resize', ()=>{
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
})

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/matcaps/1.png');
texture.colorSpace = THREE.SRGBColorSpace;

const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry('Welcome', {
            size: 0.5,
            font: font,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });
        textGeometry.center();
        const material = new THREE.MeshMatcapMaterial();
        material.matcap = texture;
        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
        for(let i = 0; i < 100; i++){
            const donut = new THREE.Mesh(donutGeometry, material);
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            scene.add(donut);
        }
    }
)

const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

function tick(){
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}
tick();
