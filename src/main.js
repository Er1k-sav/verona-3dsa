console.log("main.js")
import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'
import { MapControls } from 'three/addons/controls/MapControls.js';
import { objClick } from "../src/script.js"
import { box, pos } from "../src/assets/data.js"

let resizing = false
let lastKnownSize = { width: 0, height: 0 }

function init() {
    if (WebGL.isWebGLAvailable()) {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
        camera.position.set(0, 0, 9)
        camera.rotation.set(-0.33, 0, 0)
        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor("#474747")

        const controls = new MapControls( camera, renderer.domElement )
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = false
        controls.minDistance = 5
        controls.maxDistance = 10
        controls.zoomToCursor = true
        controls.maxPolarAngle = 2 * Math.PI / 5.7
        controls.maxTargetRadius = 5

        let intObject
        const mouse = new THREE.Vector2()
        var raycaster = new THREE.Raycaster()
        var intersects = []
        document.addEventListener("mousemove", onDocumentMouseMove )
        document.addEventListener("click", () => {
            if (intersects.length > 0) {
                objClick(intersects[0])
            }
        })

        const canvasContainer = document.getElementById('map')
        canvasContainer.appendChild(renderer.domElement)
        let rect = canvasContainer.getBoundingClientRect()

        const mapG = new THREE.BoxGeometry(10, 0, 10)
        const mapM1 = new THREE.MeshStandardMaterial({ color: 0x101010 })
        const mapSvg = new THREE.TextureLoader().load("../src/assets/map.png")
        const mapM2 = new THREE.MeshBasicMaterial({ map: mapSvg, transparent: true })
        const map = new THREE.Mesh(mapG, [mapM1, mapM1, mapM2, mapM1, mapM1, mapM1])
        map.name = "map"
        scene.add(map)

        const light1 = new THREE.PointLight(0xffffff, 200, 500)
        light1.position.set(3, 10, 10)
        scene.add(light1)

        const light2 = new THREE.HemisphereLight(0x1a1a1a)
        light2.position.set(-3, 0, -10)
        scene.add(light2)

        /*
        //TODO: SAN FERMO
        //TODO: SANT' EUFEMIA
        //TODO: SANT' ANASTASIA
        //TODO: TORRE DEI LAMBERTI
        !TODO: TORRE DEL PALAZZO DELLA RAGIONE
        //TODO: TORRE DEL GARDELLO
        //TODO: TORRE DELLA CATENA
        //TODO: TORRE DI ALBERTO I DELLA SCALA
        //TODO: CORTE SGARZERIE
        //TODO: PONTE PIETRA
        //TODO: PONTE NAVI
        //TODO: PONTE NUOVO
        //TODO: DOMUS MERCATORUM
        //TODO: MADONNA VERONA
        //TODO: CASE MAZZANTI
        //TODO: ARCHE SCALIGERE
        //TODO: PALAZZO DEL CAPITANO
        //TODO: CASA DI ROMEO
        //TODO: PALAZZO CANGRANDE
        //TODO: CASTELLO
        //TODO: PONTE CATELVECCHIO
        TODO: MURA
        TODO: FIUME
        */

        //* ###############################################
        //*            STRUTTURE NELLA MAPPA
        //* ###############################################

        let structures = []

        for (let i = 0; i < box.length; i++) {
            const geo = new THREE.BoxGeometry(box[i][0], box[i][1], box[i][2])
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff })
            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.set(pos[i][0], pos[i][1], pos[i][2])
            mesh.rotation.y = pos[i][3]
            mesh.name = i
            scene.add(mesh)
            structures.push(mesh)
        }

        //* ###############################################

        function updateSize() {
            resizing = true
            raycaster = new THREE.Raycaster()
            rect = canvasContainer.getBoundingClientRect()
            lastKnownSize = { width: rect.width, height: rect.height }
        }

        const resizeObserver = new ResizeObserver(() => {
            if (resizing) {
                requestAnimationFrame(render);
            } else {
                updateSize()
            }
        });

        resizeObserver.observe(canvasContainer);

        function render() {
            controls.update()

            if (resizing) {
                camera.aspect = lastKnownSize.width / lastKnownSize.height
                camera.updateProjectionMatrix()
                renderer.setSize(lastKnownSize.width, lastKnownSize.height)
            }

            renderer.render(scene, camera)
            raycaster.setFromCamera( mouse, camera )

			intersects = raycaster.intersectObjects( scene.children, false ).filter(a => a.object.name != "map")

            if (intersects.length > 0) {
                if (intObject != intersects[0].object) {
                    if (intObject != null) {
                        intObject.material.color.setHex(intObject.currentHex)
                    }
                    intObject = intersects[0].object
                    intObject.currentHex = intObject.material.color.getHex()
                    intObject.material.color.setHex(0xff0000)
                }
            } else {
                if (intObject != null) {
                    intObject.material.color.setHex(intObject.currentHex)
                }
                intObject = null
            }

            if (resizing) {
                resizing = false
            }
        }

        function animate() {
            requestAnimationFrame(animate)
            render()
        }
        render()
        animate()

        function onDocumentMouseMove(event) {
            event.preventDefault();

            const canvasX = event.clientX - rect.left;
            const canvasY = event.clientY - rect.top;

            mouse.x = (canvasX / rect.width) * 2 - 1;
            mouse.y = - (canvasY / rect.height) * 2 + 1;
        }
        
    } else {
        const warning = WebGL.getWebGLErrorMessage()
        document.getElementById('container').appendChild(warning)
    }
}

init()
