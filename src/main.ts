import * as THREE from 'three'
import {GEOMETRY} from './GEOMETRY';
import {MATERIAL} from './MATERIAL';
import {getClockHandsDegree} from './util';

import './style.css'

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight
let mouseX = 0;
let mouseY = 0;


const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000)
document.body.appendChild(renderer.domElement);

const HOUR_HAND_Z = 0
const MINUTE_HAND_Z = 1
const SECOND_HAND_Z = 2


const hourHand = new THREE.Mesh(GEOMETRY.HOUR_HAND, MATERIAL.HAND);
hourHand.position.z = HOUR_HAND_Z;

const hourHandCap = new THREE.Mesh(GEOMETRY.HOUR_HAND_CAP, MATERIAL.HAND);
hourHandCap.position.z = HOUR_HAND_Z;
hourHandCap.rotation.x = Math.PI / 2

const minuteHand = new THREE.Mesh(GEOMETRY.MINUTE_HAND, MATERIAL.HAND);
minuteHand.position.z = MINUTE_HAND_Z;

const minuteHandCap = new THREE.Mesh(GEOMETRY.MINUTE_HAND_CAP, MATERIAL.HAND);
minuteHandCap.position.z = MINUTE_HAND_Z;
minuteHandCap.rotation.x = Math.PI / 2

const secondHand = new THREE.Mesh(GEOMETRY.SECOND_HAND, MATERIAL.SECOND_HAND);
secondHand.position.z = SECOND_HAND_Z;

const secondHandCap = new THREE.Mesh(GEOMETRY.SECOND_HAND_CAP, MATERIAL.SECOND_HAND);
secondHandCap.position.z = SECOND_HAND_Z;
secondHandCap.rotation.x = Math.PI / 2

const handsGroup = new THREE.Group()
handsGroup.add(hourHand);
handsGroup.add(hourHandCap);
handsGroup.add(minuteHand);
handsGroup.add(minuteHandCap);
handsGroup.add(secondHand);
handsGroup.add(secondHandCap);


const face = new THREE.Mesh(GEOMETRY.FACE, MATERIAL.FACE);
face.position.z = -1;
face.rotation.x = Math.PI / 2
face.receiveShadow = true

const bezelFront = new THREE.Mesh(GEOMETRY.BEZEL_FRONT, MATERIAL.CASE);
bezelFront.position.z = 5;

const bezelInner = new THREE.Mesh(GEOMETRY.BEZEL_INNER, MATERIAL.CASE);
bezelInner.position.z = 2;
bezelInner.rotation.x = Math.PI / 2

const bezelOuter = new THREE.Mesh(GEOMETRY.BEZEL_OUTER, MATERIAL.CASE);
bezelOuter.position.z = 2;
bezelOuter.rotation.x = Math.PI / 2

const caseGroup = new THREE.Group()
caseGroup.add(face);
caseGroup.add(bezelFront);
caseGroup.add(bezelInner);
caseGroup.add(bezelOuter);


const dialGroup = new THREE.Group();

const largeDial = new THREE.Mesh(GEOMETRY.LARGE_DIAL, MATERIAL.DIAL);
largeDial.position.z = -0.25;
largeDial.rotation.z = Math.PI / 2;
dialGroup.add(largeDial)

for (let i = 1; i < 12; i++) {
    const newLargeDial = largeDial.clone()
    newLargeDial.rotation.z += Math.PI / 6 * i;
    dialGroup.add(newLargeDial)
}

const smallDial = new THREE.Mesh(GEOMETRY.SMALL_DIAL, MATERIAL.DIAL);
smallDial.position.z = -0.35;
smallDial.rotation.z = Math.PI / 2
// dialGroup.add(smallDial)

for (let i = 1; i < 60; i++) {
    if (i % 5 == 0) continue;
    const newSmallDial = smallDial.clone()
    newSmallDial.rotation.z += Math.PI / 30 * i;
    dialGroup.add(newSmallDial)
}


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-60, -60, 100);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8)

const lightGroup = new THREE.Group()
lightGroup.add(directionalLight)
lightGroup.add(hemisphereLight)


const group = new THREE.Group()
group.add(handsGroup)
group.add(caseGroup)
group.add(lightGroup)
group.add(dialGroup)


group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
    }
})


const scene = new THREE.Scene();
scene.add(group)


const updateCameraPos = () => {
    const minHalf = Math.min(windowWidth / 2, windowHeight / 2);

    const posX = -50 * Math.max(Math.min((mouseX - windowWidth / 2) / minHalf, 1), -1)
    const posY = 50 * Math.max(Math.min((mouseY - windowHeight / 2) / minHalf, 1), -1)
    const posZ = Math.sqrt(100 * 100 - (posX * posX) - (posY * posY));

    camera.position.x = posX
    camera.position.y = posY
    camera.position.z = posZ
    camera.lookAt(0, 0, 0)
}

const animate = () => {
    requestAnimationFrame(animate);

    const handsDegree = getClockHandsDegree()

    hourHand.rotation.z = Math.PI / 2 - handsDegree.hour
    minuteHand.rotation.z = Math.PI / 2 - handsDegree.minute
    secondHand.rotation.z = Math.PI / 2 - handsDegree.second

    updateCameraPos()

    renderer.render(scene, camera);
};

animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
})

window.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY
})