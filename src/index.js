import * as THREE from "three"
import { OGC3DTile } from "@jdultra/threedtiles/src/tileset/OGC3DTile"

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"

//setup
const camera = new THREE.PerspectiveCamera();

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ogc3DTile = new OGC3DTile({
    url: "./Scene/PPmSUD_OUESTmCesium.json",
    renderer: renderer
});

scene.add(ogc3DTile);

setInterval(function () {
    ogc3DTile.update(camera);
}, 20);

//controls
const controls = new PointerLockControls(camera, renderer.domElement)
const onKeyDown = function (event) {
    switch (event.code) {
        case "KeyW":
            controls.moveForward(1.25)
            break
        case "KeyA":
            controls.moveRight(-1.25)
            break
        case "KeyS":
            controls.moveForward(-1.25)
            break
        case "KeyD":
            controls.moveRight(1.25)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

document.addEventListener("click", () => {
    controls.lock()
  
}, false)



//resize
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


//render
function render(){
  window.requestAnimationFrame(render)
  renderer.render(scene, camera)
}

render();