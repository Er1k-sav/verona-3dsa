console.log("main.js")

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { WebGL } from 'https://threejsfundamentals.org/threejs/resources/threejs/r128/jsm/capabilities/WebGL.js';
import { MapControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r128/jsm/controls/MapControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r128/jsm/loaders/GLTFLoader.js';
import { objClick } from "../src/script.js";
import { box, pos } from "../src/assets/data.js";

let resizing = false
let lastKnownSize = { width: 0, height: 0 }

function init() {
    if (WebGL.isWebGLAvailable()) {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
        camera.position.set(0, 0, 9)
        camera.rotation.set(-0.33, 0, 0)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor("#474747")
        renderer.shadowMap.enabled = true;
    	renderer.shadowMap.type = THREE.BasicShadowMap;

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
                objClick(parseInt(intersects[0].object.name))
            }
        })

        const canvasContainer = document.getElementById('map')
        canvasContainer.appendChild(renderer.domElement)
        let rect = canvasContainer.getBoundingClientRect()

        const mapG = new THREE.BoxGeometry(10, 0.01, 10)
        const mapM1 = new THREE.MeshBasicMaterial({ color: 0x474747 })
        const mapSvg = new THREE.TextureLoader().load("../src/assets/images/map.png")
        const mapM2 = new THREE.MeshStandardMaterial({ map: mapSvg, transparent: true})
        const map = new THREE.Mesh(mapG, [mapM1, mapM1, mapM2, mapM1, mapM1, mapM1])
        map.name = "map"
        map.castShadow = true
        map.receiveShadow = true
        scene.add(map)

        const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( - 1, 1.75, 1 );
        dirLight.position.multiplyScalar( 30 );
        dirLight.castShadow = true
        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;
        dirLight.shadow.camera.bias = -0.001;
        scene.add( dirLight );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 50, 0 );
		scene.add( hemiLight );

        /*
        //TODO: SAN FERMO 45.43918322839255, 11.00004607670956
        TODO: SANT' EUFEMIA 45.443111683828526, 10.993443765291731
        TODO: SANT' ANASTASIA 45.44512693814932, 10.99962559013084
        TODO: TORRE DEI LAMBERTI 45.4429680283074, 10.99776121422446
        TODO: TORRE DEL GARDELLO 45.44356965384231, 10.996515263027883
        TODO: TORRE DELLA CATENA 45.445075437145626, 10.98208518708498
        TODO: TORRE DI ALBERTO I DELLA SCALA 45.44748483415449, 10.999571050005212
        TODO: CORTE SGARZARIE 45.443509073954345, 10.99582437090889
        TODO: PONTE PIETRA 45.447799553121236, 11.000030089016231
        TODO: PONTE NAVI 45.43923086307812, 11.001439916441365
        TODO: PONTE NUOVO 45.442650012466906, 11.001331776552052
        TODO: DOMUS MERCATORUM 45.442786249876434, 10.997124576357265
        TODO: MADONNA VERONA 45.44323038655243, 10.997086049046727
        TODO: CASE MAZZANTI 45.44353295604631, 10.997189340502977
        TODO: ARCHE SCALIGERE 45.44359241142518, 10.998833482636472
        TODO: PALAZZO DEL CAPITANO 45.44336437888571, 10.99851552515274
        TODO: CASA DI ROMEO 45.443555117685165, 10.999284797431109
        TODO: PALAZZO CANGRANDE 45.44367180528564, 10.9985294300728
        TODO: PONTE CATELVECCHIO 45.440411919025564, 10.987280900845837
        TODO: MURA
        TODO: FIUME
        */

        //* ###############################################
        //*            STRUTTURE NELLA MAPPA
        //* ###############################################

        let structures = []

        for (let i = 1; i < box.length; i++) {
            const geo = new THREE.BoxGeometry(box[i][0], box[i][1], box[i][2])
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff })
            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.set(pos[i][0], pos[i][1], pos[i][2])
            mesh.rotation.y = pos[i][3]
            mesh.name = i
            mesh.castShadow = true
            mesh.receiveShadow = true
            scene.add(mesh)
            structures.push(mesh)
        }

        const loader = new GLTFLoader();
        for (let i = 0; i < pos.length; i++) {
            loader.load(`../src/assets/models/${i}.glb`, (gltf) => {
                let obj = gltf.scene
                obj.scale.set(pos[i][4], pos[i][4], pos[i][4])
                obj.position.set(pos[i][0], pos[i][1], pos[i][2])
                obj.rotation.y = pos[i][3]
                obj.traverse((child) => {
                    if (child.isMesh) {
                        if (child.material) {
                            child.material = new THREE.MeshStandardMaterial({ color: child.material.color, map: child.material.map });
                        }
                        child.geometry.computeVertexNormals();
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                scene.add(obj)
            })
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

			intersects = raycaster.intersectObjects( scene.children, true).filter(a => a.object.name != "map")

            if (intersects.length > 0) {
                if (intObject != intersects[0].object) {
                    if (intObject != null) {
                        intObject.material.color.setHex(intObject.currentHex)
                    }
                    intObject = intersects[0].object
                    intObject.currentHex = intObject.material.color.getHex()
                    intObject.material.color.setHex(0x908873)
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