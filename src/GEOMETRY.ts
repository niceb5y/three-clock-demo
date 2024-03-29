import {BoxGeometry, CylinderGeometry, RingGeometry, Matrix4} from 'three'


const HOUR_HAND_LENGTH = 24;
const MINUTE_HAND_LENGTH = 33;
const SECOND_HAND_LENGTH = 28;
const HAND_WIDTH = 3
const SECOND_HAND_WIDTH = 0.8
const HOUR_HAND_CAP_RADIUS = 3.6
const MINUTE_HAND_CAP_RADIUS = 2.8
const SECOND_HAND_CAP_RADIUS = 2.1
const SECOND_HAND_HEAD_RADIUS = 2.4
const HAND_DEPTH = 0.5


const HOUR_HAND_TAIL = HOUR_HAND_LENGTH / 2 - 6;
const MINUTE_HAND_TAIL = MINUTE_HAND_LENGTH / 2 - 6;
const SECOND_HAND_TAIL = SECOND_HAND_LENGTH / 2 - 8;

const INNER_RADIUS = 30
const OUTER_RADIUS = 33
const FACE_DEPTH = 1
const RADIAL_SEGMENTS = 360
const HEIGHT_SEGMENTS = 1
const BEZEL_DEPTH = 6

const LARGE_DIAL_LENGTH = 5.4
const LARGE_DIAL_WIDTH = 1.8
const LARGE_DIAL_DEPTH = 0.5
const LARGE_DIAL_MARGIN = 24

const SMALL_DIAL_LENGTH = 2.7
const SMALL_DIAL_WIDTH = 0.9
const SMALL_DIAL_DEPTH = 0.3
const SMALL_DIAL_MARGIN = 25.35

export const GEOMETRY = {
    HOUR_HAND: new BoxGeometry(HOUR_HAND_LENGTH, HAND_WIDTH, HAND_DEPTH),
    HOUR_HAND_CAP:  new CylinderGeometry(HOUR_HAND_CAP_RADIUS, HOUR_HAND_CAP_RADIUS, HAND_DEPTH, RADIAL_SEGMENTS),
    MINUTE_HAND: new BoxGeometry(MINUTE_HAND_LENGTH, HAND_WIDTH, HAND_DEPTH),
    MINUTE_HAND_CAP:  new CylinderGeometry(MINUTE_HAND_CAP_RADIUS, MINUTE_HAND_CAP_RADIUS, HAND_DEPTH, RADIAL_SEGMENTS),
    SECOND_HAND: new BoxGeometry(SECOND_HAND_LENGTH, SECOND_HAND_WIDTH, HAND_DEPTH),
    SECOND_HAND_CAP:  new CylinderGeometry(SECOND_HAND_CAP_RADIUS, SECOND_HAND_CAP_RADIUS, HAND_DEPTH, RADIAL_SEGMENTS),
    SECOND_HAND_HEAD:  new CylinderGeometry(SECOND_HAND_HEAD_RADIUS, SECOND_HAND_HEAD_RADIUS, HAND_DEPTH, RADIAL_SEGMENTS),
    FACE: new CylinderGeometry(INNER_RADIUS, INNER_RADIUS, FACE_DEPTH, RADIAL_SEGMENTS),
    BEZEL_FRONT: new RingGeometry(INNER_RADIUS, OUTER_RADIUS, RADIAL_SEGMENTS),
    BEZEL_INNER: new CylinderGeometry(INNER_RADIUS, INNER_RADIUS, BEZEL_DEPTH, RADIAL_SEGMENTS, HEIGHT_SEGMENTS, true),
    BEZEL_OUTER: new CylinderGeometry(OUTER_RADIUS, OUTER_RADIUS, BEZEL_DEPTH, RADIAL_SEGMENTS, HEIGHT_SEGMENTS, true),

    LARGE_DIAL: new BoxGeometry(LARGE_DIAL_LENGTH, LARGE_DIAL_WIDTH, LARGE_DIAL_DEPTH),
    SMALL_DIAL: new BoxGeometry(SMALL_DIAL_LENGTH, SMALL_DIAL_WIDTH, SMALL_DIAL_DEPTH),
}

GEOMETRY.HOUR_HAND.applyMatrix4(new Matrix4().makeTranslation(HOUR_HAND_TAIL, 0, 0));
GEOMETRY.MINUTE_HAND.applyMatrix4(new Matrix4().makeTranslation(MINUTE_HAND_TAIL, 0, 0));
GEOMETRY.SECOND_HAND.applyMatrix4(new Matrix4().makeTranslation(SECOND_HAND_TAIL, 0, 0));
GEOMETRY.SECOND_HAND_HEAD.applyMatrix4(new Matrix4().makeTranslation(SECOND_HAND_LENGTH-SECOND_HAND_TAIL, 0, 0));
GEOMETRY.LARGE_DIAL.applyMatrix4(new Matrix4().makeTranslation(LARGE_DIAL_MARGIN, 0, 0));
GEOMETRY.SMALL_DIAL.applyMatrix4(new Matrix4().makeTranslation(SMALL_DIAL_MARGIN, 0, 0));