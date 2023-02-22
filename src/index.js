import * as THREE from "three"
import { OGC3DTile } from "@jdultra/threedtiles/src/tileset/OGC3DTile"

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"

//setup
const camera = new THREE.PerspectiveCamera();

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let ogc3DTile;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)


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
        case "KeyV":
            controls.moveUp(1.25)
            break
        case "KeyC":
            controls.moveUp(-1.25)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

document.addEventListener("click", () => {
    controls.lock()
  
}, false)

document.getElementById("m1").addEventListener("click", () => {
    setupModel1();
})

document.getElementById("m2").addEventListener("click", () => {
    setupModel2();
})

const setupModel1 = () => {
    camera.position.set(0,0,0);
    if(!!ogc3DTile) scene.remove(ogc3DTile)
    ogc3DTile = new OGC3DTile({
        url: "./Scene/PPmSUD_OUESTmCesium.json",
        renderer: renderer,
        centerModel: true,
        geometricErrorMultiplier: 3.0,
        loadOutsideView: true
    });
    
    
    scene.add(ogc3DTile);
    
    setInterval(function () {
        ogc3DTile.update(camera);
    }, 20);
}


const setupModel2 = () => {
    camera.position.set(0,0,0);
    if(!!ogc3DTile) scene.remove(ogc3DTile)
    ogc3DTile = new OGC3DTile({
        url: "./3d-tiles/PontStEtienne_2_20220508_Cesium.json",
        renderer: renderer,
        centerModel: true,
        geometricErrorMultiplier: 3.0,
        loadOutsideView: true
    });
    
    
    scene.add(ogc3DTile);
    
    setInterval(function () {
        ogc3DTile.update(camera);
    }, 20);
}

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

//HELLO