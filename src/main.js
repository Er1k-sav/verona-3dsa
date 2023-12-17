console.log("main.js")
import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'
import { MapControls } from 'three/addons/controls/MapControls.js';

let resizing = false
let lastKnownSize = { width: 0, height: 0 }

if (window.innerWidth < 647) {
    bPhone = true
}

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
        document.addEventListener( 'mousemove', onDocumentMouseMove );

        const canvasContainer = document.getElementById('map')
        canvasContainer.appendChild(renderer.domElement)
        let rect = canvasContainer.getBoundingClientRect()

        const mapG = new THREE.BoxGeometry(10, 0, 10)
        const mapM1 = new THREE.MeshStandardMaterial({ color: 0x101010 })
        const mapSvg = new THREE.TextureLoader().load("../m3.png")
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
        let box =  [[0.3, 0.22, 0.5], //FERMO
                    [0.3, 0.26, 0.6], //EUFEMIA
                    [0.3, 0.3, 0.6], //ANASTASIA
                    [0.3, 1.5, 0.3], //LAMBERTI
                    ////[0.4, 0.2, 0.4], //RAGIONE
                    [0.2, 1, 0.2], //GARDELLO
                    [0.2, 0.3, 0.2], //CATENA
                    [0.2, 0.5, 0.15], //ALBERTO
                    [0.5, 0.2, 0.3], //SGARZERIE
                    [0.2, 0.15, 0.5], //PIETRA
                    [0.2, 0.15, 0.5], //NAVI
                    [0.2, 0.15, 0.5], //NUOVO
                    [0.35, 0.2, 0.35], //DOMUS
                    [0.15, 0.16, 0.15], //MADONNA
                    [0.35, 0.2, 0.35], //MAZZANTI
                    [0.15, 0.16, 0.15], //ARCHE
                    [0.2, 0.2, 0.25], //CAPITANO
                    [0.2, 0.3, 0.25], //ROMEO
                    [0.2, 0.3, 0.25], //CANGRANDE
                    [0.3, 0.8, 0.3], //CASTELLO
                    [0.2, 0.3, 0.6]] //CASTELVECCHIO

        let pos =  [[3.3, 0.11, 2.94, -0.87], //FERMO
                    [0.82, 0.13, 0.34, -0.94], //EUFEMIA
                    [3.2, 0.15, -0.72, -1], //ANASTASIA
                    [2.5, 0.75, 0.7, 0.6], //LAMBERTI
                    ////[2.62, 0.1, 0.14, 0.6], //RAGIONE
                    [1.75, 0.55, 0.34, 0.6], //GARDELLO
                    [-3.95, 0.15, -0.5, 0.3], //CATENA
                    [2.95, 0.25, -1.73, -0.8], //ALBERTO
                    [1.36, 0.1, 0.5, 0.6], //SGARZERIE
                    [3.32, 0.075, -2, -0.9], //PIETRA
                    [3.9, 0.075, 2.88, -1.6], //NAVI
                    [3.9, 0.075, 0.9, -1.5], //NUOVO
                    [1.86, 0.1, 0.7, 0.6], //DOMUS
                    [2.2, 0.08, 0.9, 0.6], //MADONNA
                    [2.3, 0.1, 0.36, 0.6], //MAZZANTI
                    [2.88, 0.08, 0.38, 0.6], //ARCHE
                    [2.76, 0.1, 0.56, 0.6], //CAPITANO
                    [3.2, 0.15, 0.4, 0.6], //ROMEO ([3.1, 0.1, 0.3, 0.6])
                    [2.76, 0.15, 0.13, 0.6], //CANGRANDE
                    [-1.3, 0.4, 2.38, 0.6], //CASTELLO
                    [-1.8, 0.15, 2.15, 0.15]] //CASTELVECCHIO

        for (let i = 0; i < box.length; i++) {
            const geo = new THREE.BoxGeometry(box[i][0], box[i][1], box[i][2])
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff })
            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.set(pos[i][0], pos[i][1], pos[i][2])
            mesh.rotation.y = pos[i][3]
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

			var intersects = raycaster.intersectObjects( scene.children, false ).filter(a => a.object.name != "map")

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
