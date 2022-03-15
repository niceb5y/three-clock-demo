import {MeshLambertMaterial, DoubleSide} from 'three'

const HAND_COLOR = 0x171717
const SECOND_HAND_COLOR = 0xff0000
const FACE_COLOR = 0xffffff
const CASE_COLOR = 0x999999
const DIAL_COLOR = 0x171717

export const MATERIAL = {
    HAND: new MeshLambertMaterial({color: HAND_COLOR}),
    SECOND_HAND: new MeshLambertMaterial({color: SECOND_HAND_COLOR}),
    FACE: new MeshLambertMaterial({color: FACE_COLOR}),
    CASE: new MeshLambertMaterial({color: CASE_COLOR, side: DoubleSide}),
    DIAL: new MeshLambertMaterial({color: DIAL_COLOR}),
}