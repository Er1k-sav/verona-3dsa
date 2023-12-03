console.log("main.js");
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

let bPhone = false;
let resizing = false;
let lastKnownSize = { width: 0, height: 0 };

if (window.innerWidth < 647) {
    bPhone = true;
}

function init() {
    if (WebGL.isWebGLAvailable()) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
        camera.position.set(0, 0.5, 9);
        camera.rotation.set(-0.23, 0, 0);

        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor("#cabfa3");
        const canvasContainer = document.getElementById('map');
        canvasContainer.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(10, 0.3, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x101010 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(0.3, 0, 0);
        scene.add(mesh);

        const light = new THREE.PointLight(0xffffff, 500, 500);
        light.position.set(0, 10, 0);
        scene.add(light);

        function updateSize() {
            resizing = true;
            const rect = canvasContainer.getBoundingClientRect();
            lastKnownSize = { width: rect.width, height: rect.height };
            if (bPhone) {
                lastKnownSize.height += window.innerHeight * 4.5 / 100
            } else {
                lastKnownSize.width += window.innerHeight * 4.5 / 100
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            if (resizing) {
                requestAnimationFrame(render);
            } else {
                updateSize();
            }
        });

        resizeObserver.observe(canvasContainer);

        function render() {
            mesh.rotation.y += 0.003;

            if (resizing) {
                camera.aspect = lastKnownSize.width / lastKnownSize.height;
                camera.updateProjectionMatrix();
                renderer.setSize(lastKnownSize.width, lastKnownSize.height);
            }

            renderer.render(scene, camera);

            if (resizing) {
                resizing = false;
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }
        render();
        animate();

    } else {
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById('container').appendChild(warning);
    }
}

init();
