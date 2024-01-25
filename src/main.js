console.log("main.js")

import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'
import { MapControls } from 'three/addons/controls/MapControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { objClick } from "../src/script.js"
import { pos } from "../src/assets/data.js"

let resizing = false
let lastKnownSize = { width: 0, height: 0 }
let shadowDim = 512
let clock = new THREE.Clock(), sumFPS = []

const scene = new THREE.Scene()
const loader = new GLTFLoader()

function init() {
    if (WebGL.isWebGLAvailable()) {
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
        camera.position.set(0, 0, 9)
        camera.rotation.set(-0.33, 0, 0)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor("#535251")
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        const controls = new MapControls( camera, renderer.domElement )
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.screenSpacePanning = false
        controls.minDistance = 5
        controls.maxDistance = 10
        controls.zoomToCursor = true
        controls.maxPolarAngle = 2 * Math.PI / 5.4
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
        const mapM1 = new THREE.MeshBasicMaterial({ color: 0x535251 })
        const mapSvg = new THREE.TextureLoader().load("../src/assets/images/map.png")
        const mapM2 = new THREE.MeshStandardMaterial({ map: mapSvg, transparent: true})
        const map = new THREE.Mesh(mapG, [mapM1, mapM1, mapM2, mapM1, mapM1, mapM1])
        map.name = "map"
        map.castShadow = true
        map.receiveShadow = true
        scene.add(map)

        const dirLight = new THREE.DirectionalLight( 0xffffff, 3 )
        dirLight.color.setHSL( 0.1, 1, 0.95 )
        dirLight.position.set( - 1, 1.75, -1 )
        dirLight.position.multiplyScalar( 30 )
        dirLight.castShadow = true
        dirLight.shadow.mapSize.width = shadowDim
        dirLight.shadow.mapSize.height = shadowDim
        dirLight.shadow.camera.bias = -0.0001
        dirLight.shadow.bias = -0.0001
        scene.add( dirLight )

        const hemiLight = new THREE.HemisphereLight( 0xe1e1e1, 0xc5c5c5, 2 )
        hemiLight.position.set( 0, 50, 0 )
        scene.add( hemiLight )

        /*
        // *TODO: SAN FERMO 45.43918322839255, 11.00004607670956 0 
        // *TODO: SANT' EUFEMIA 45.443111683828526, 10.993443765291731 1
        // *TODO: SANT' ANASTASIA 45.44512693814932, 10.99962559013084 2
        // *TODO: TORRE DEI LAMBERTI 45.4429680283074, 10.99776121422446 3
        // *TODO: TORRE DEL GARDELLO 45.44356965384231, 10.996515263027883 4 
        // *TODO: TORRE DELLA CATENA 45.445075437145626, 10.98208518708498 5
        // *TODO: TORRE DI ALBERTO I DELLA SCALA 45.44748483415449, 10.999571050005212 6
        // *TODO: CORTE SGARZARIE 45.443509073954345, 10.99582437090889 7
        // *TODO: PONTE PIETRA 45.447799553121236, 11.000030089016231 8
        // *TODO: PONTE NAVI 45.43923086307812, 11.001439916441365 9 
        // *TODO: PONTE NUOVO 45.442650012466906, 11.001331776552052 10
        // *TODO: DOMUS MERCATORUM 45.442786249876434, 10.997124576357265 11
        // *TODO: MADONNA VERONA 45.44323038655243, 10.997086049046727 12
        ! *TODO: CASE MAZZANTI 45.44353295604631, 10.997189340502977 13
        // *TODO: ARCHE SCALIGERE 45.44359241142518, 10.998833482636472 14
        // *TODO: PALAZZO DEL CAPITANIO 45.44336437888571, 10.99851552515274 15
        // *TODO: CASA DI ROMEO 45.443555117685165, 10.999284797431109 16
        // *TODO: PALAZZO CANGRANDE 45.44367180528564, 10.9985294300728 17
        // *TODO: PONTE CATELVECCHIO 45.440411919025564, 10.987280900845837 18
        // *TODO: MURA
        // *TODO: FIUME
        */

        //* ###############################################
        //*            STRUTTURE NELLA MAPPA
        //* ###############################################

        let Str = []

        for (let i = 0; i < pos.length; i++) {
            loader.load(`../src/assets/models/${i}.glb`, (gltf) => {
                let obj = gltf.scene
                obj.scale.set(pos[i][3], pos[i][3], pos[i][3])
                obj.position.set(pos[i][0], 0, pos[i][1])
                obj.rotation.y = pos[i][2]
                obj.traverse((child) => {
                    if (child.isMesh) {
                        if (child.material) {
                            child.material = new THREE.MeshStandardMaterial({ color: child.material.color, map: child.material.map })
                            child.material.side = THREE.DoubleSide
                        }
                        child.geometry.computeVertexNormals()
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                });
                obj.name = `${i}`
                Str.push(obj)
                scene.add(obj)
            })
        }

        //* ###############################################

        let hands = []
        let hnd = new THREE.Group()
        let Hbox = [0.15, 0.1]
        let Hpos = [0.04, 0.02]
        hnd.rotation.y = 3.74
        hnd.position.set(2.3807734163907077, 0.7137759073257822, 0.7781474088918205)

        for (let i = 0; i < Hpos.length; i++) {
            var pivot = new THREE.Group()
            const geo = new THREE.BoxGeometry(0.01-i/1000, Hbox[i], 0.01)
            const mat = new THREE.MeshStandardMaterial({color: 0x353535})
            const hand = new THREE.Mesh(geo, mat)
            hand.name = "map"
            hand.position.set(i/1000, Hpos[i], 0)
            hands.push(pivot)
            pivot.add(hand)
            hnd.add(pivot)
        }
        scene.add(hnd)

        function rotateClock() {
            let time = new Date()
            hands[0].rotation.x = -2 * Math.PI * time.getMinutes()/ 60 + -2 * Math.PI * time.getSeconds() / 3600
            hands[1].rotation.x = -2 * Math.PI * time.getHours() / 12 + hands[0].rotation.x / 12
        }

        setInterval(rotateClock, 10)

        function updateSize() {
            resizing = true
            raycaster = new THREE.Raycaster()
            rect = canvasContainer.getBoundingClientRect()
            lastKnownSize = { width: rect.width, height: rect.height }
        }

        const resizeObserver = new ResizeObserver(() => {
            if (resizing) {
                requestAnimationFrame(render)
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

            intersects = raycaster.intersectObjects( scene.children, true).filter(a => a.object.name != "map").filter(a => a.object.parent.name != "ping")

            

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

        setInterval(quality, 3000)
        function animate() {
            requestAnimationFrame(animate)
            FpsSum()
            try {
                let pings = []
                for (let i=0; i<scene.children.length; i++) {
                    if (scene.children[i].name == "19" || scene.children[i].name == "ping") {
                        pings.push(scene.children[i])
                    }
                }
                for (let i=0; i<pings.length; i++) {
                    pings[i].rotation.y += 0.005
                }
            } catch {}
            render()
        }
        animate()

        function onDocumentMouseMove(event) {
            event.preventDefault()

            const canvasX = event.clientX - rect.left
            const canvasY = event.clientY - rect.top

            mouse.x = (canvasX / rect.width) * 2 - 1
            mouse.y = - (canvasY / rect.height) * 2 + 1
        }

        function FpsSum() {
            let fps = 1 / clock.getDelta()
            sumFPS.push(fps)
        }

        function quality() {
            let avgFPS = sumFPS.reduce((a, e) => a + e, 0) / sumFPS.length
            if (avgFPS != Infinity) {
                if (avgFPS < 30 && dirLight.shadow.mapSize.width > 512) {
                    shadowResize(0.5)
                } else if ((avgFPS > 60) && (dirLight.shadow.mapSize.width < 8192) && (avgFPS < 100)) {
                    shadowResize(2)
                }
            }
            sumFPS = []
        }

        function shadowResize(fct) {
            dirLight.shadow.mapSize.width *= fct
            dirLight.shadow.mapSize.height *= fct
            dirLight.shadow.map.dispose()
            dirLight.shadow.map = null
        }
        
    } else {
        const warning = WebGL.getWebGLErrorMessage()
        document.getElementById("app").appendChild(warning)
    }
}

init()

export function pings(arr) {
    clearPings()
    color(arr)
    for (let i = 0; i < arr.length; i++) {
        loader.load(`../src/assets/models/19.glb`, (gltf) => {
            let obj = gltf.scene
            obj.scale.set(0.3, 0.3, 0.3)
            obj.position.set(pos[arr[i]][0], 1.8, pos[arr[i]][1])
            obj.rotation.y = Math.random()*2*Math.PI
            obj.traverse((child) => {
                if (child.isMesh) {
                    if (child.material) {
                        child.material = new THREE.MeshStandardMaterial({ color: child.material.color, map: child.material.map })
                        child.material.side = THREE.DoubleSide
                    }
                    child.geometry.computeVertexNormals()
                }
            });
            obj.name = "ping"
            scene.add(obj)
        })
    }    
}

function color(arr) {
    scene.traverse((object) => {
        if (arr.indexOf(parseInt(object.name)) != -1) {
            object.children.forEach((child) => {
                if (child.type == "Mesh") {
                    if (child.material && child.material.color) {
                        child.material.color.setHex(0xcabfa3)
                    }
                }
            })
        }
    })
}

export function clearPings() {
    clearColor()
    for (let i = scene.children.length - 1; i >= 0; i--) {
        if (scene.children[i].name == "ping") {
            scene.remove(scene.children[i])
        }
    }
}

function clearColor() {
    scene.traverse((object) => {
        if (object.type == "Group" && object.name != "map" && object.name != "") {
            object.children.forEach((child) => {
                if (child.type == "Mesh") {
                    if (child.material && child.material.color) {
                        child.material.color.setHex(0xe7e7e7)
                    }
                }
            })
        }
    })
}