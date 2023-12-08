console.log("main.js")
import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'
import { MapControls } from 'three/addons/controls/MapControls.js';

let bPhone = false
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
        controls.maxPolarAngle = 2 * Math.PI / 5.2
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
        const mapSvg = new THREE.TextureLoader().load("https://cdn.discordapp.com/attachments/882315302531125318/1182756588365299712/map.png?ex=6585dae9&is=657365e9&hm=d8309dd744bf477b9e7ff9edd664b09df4fad1f3e22c973c15af39008982a730&")
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

        const towG = new THREE.BoxGeometry(0.5, 2, 0.5)
        const towM = new THREE.MeshStandardMaterial({ color: 0xffffff })
        const tow = new THREE.Mesh(towG, towM)
        tow.position.set(2, 1, 0)
        tow.rotation.y = 0.3
        tow.name = "torre"
        scene.add(tow)

        const brgG = new THREE.BoxGeometry(0.3, 0.2, 0.7)
        const brgM = new THREE.MeshStandardMaterial({ color: 0xffffff })
        const brg = new THREE.Mesh(brgG, brgM)
        brg.position.set(-.2, 0.1, .7)
        brg.rotation.y = -2.21
        brg.name = "ponte"
        scene.add(brg)

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
                    console.log(intObject.name)
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
            //console.log(mouse.x, "  ", mouse.y)
        }
        
    } else {
        const warning = WebGL.getWebGLErrorMessage()
        document.getElementById('container').appendChild(warning)
    }
}

init()
