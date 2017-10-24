const BIAS = 90;
const ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315];
const SNAP_TO_GRID = false;

function calculateRotation(from, to) {
    const deltaY = to.top - from.top;
    const deltaX = to.left - from.left;
    let angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    angleInDegrees += BIAS;
    if (angleInDegrees >= 360) {
        angleInDegrees -= 360;
    }
    if (angleInDegrees < 0) {
        angleInDegrees += 360;
    }
    if (SNAP_TO_GRID) {
        angleInDegrees = closestRotation(angleInDegrees);
    }
    return angleInDegrees;
}

function closestRotation(angle) {
    let current = 720;
    let length = ROTATIONS.length;
    while (length--) {
        if (Math.abs(angle - ROTATIONS[length]) < Math.abs(angle - current)) {
            current = ROTATIONS[length];
        }
    }
    return current;
}

function hasObjectMoved(obj, prev) {
    return obj.get('left') != prev['left'] || obj.get('top') != prev['top'];
}

function parseMoves(moves) {
    moves = moves.split(',').reverse();
    let length = moves.length;
    const parsed = [];
    while (length) {
        parsed.push(
            new Move({
                left: Math.floor(moves[--length]),
                top: Math.floor(moves[--length])
            })
        );
    }
    return parsed;
}

function setTokenRotation(obj) {
    const moveList = parseMoves(obj.get('lastmove'));
    moveList.push(
        new Move({
            left: Math.ceil(obj.get('left')),
            top: Math.ceil(obj.get('top'))
        })
    );
    let moves = moveList.length;
    const to = moveList[--moves];
    const from = moveList[--moves];
    obj.set('rotation', calculateRotation(from, to));
}

class Move {
    constructor({top: top, left: left}) {
        this.top = top;
        this.left = left;
    }
}
