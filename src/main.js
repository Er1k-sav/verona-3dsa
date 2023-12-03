console.log("main.js")
import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'

if ( WebGL.isWebGLAvailable() ) {

	const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, .5, 7)
    camera.rotation.set(-0.23, 0, 0)

    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor("#cabfa3")
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight

        camera.updateProjectionMatrix()
    })

    const geometry = new THREE.BoxGeometry(10, .3, 10)
    const material = new THREE.MeshStandardMaterial({color: 0x101010})
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.set(.3, 0, 0)
    scene.add(mesh)

    const light = new THREE.PointLight(0xffffff, 500, 500)
    light.position.set(0, 10, 0)
    scene.add(light)

    var render = function() {
        requestAnimationFrame(render)
        mesh.rotation.y += 0.003;
        renderer.render(scene, camera)
    }
    render()

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}