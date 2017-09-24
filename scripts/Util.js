const DEBUG = true;

const TOKEN_SIZES = {
    tiny: 30,
    small: 50,
    medium: 70,
    large: 140,
    huge: 210,
    gargantuan: 280,
    colossal: 350
};

function debug(...args) {
    if (DEBUG) {
        log(`[${new Date().toISOString()}] ${args.join(' ')}`);
    }
}

function identifyToken(obj) {
    const id = obj.id || obj._id;
    const token = getTokenById(id);
    const represents = token.get('represents');

    return {
        token: token,
        represents: represents
    };
}

function isObjectToken(obj) {
    return !(obj.attributes && obj.attributes.isdrawing) && !obj.isdrawing;
}

function isNPC(token) {
    const represents = token.get('represents');
    const npc = getSheetAttribute(represents, 'npc');
    const named = getSheetAttribute(represents, 'named_npc');
    return (
        npc && npc.get('current') == 1 && (!named || named.get('current') == 0)
    );
}
function getTokenById(id, type = 'graphic') {
    return getObj(type, id);
}

function getAllSheetAttributes(characterid) {
    return findObjs({
        type: 'attribute',
        characterid: characterid
    });
}

function getOrdinal(n) {
    var s = ['th', 'st', 'nd', 'rd'],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getSelectedTokens(evt) {
    if (!evt.selected) return [];

    return evt.selected.map(({_id, _type}) => {
        return getTokenById(_id, _type);
    });
}

function getSheetAttribute(characterid, name) {
    return findObjs(
        {
            type: 'attribute',
            characterid: characterid,
            name: name
        },
        {
            caseInsensitive: true
        }
    )[0];
}

function getTokenName(token, represents) {
    let name = token.get('name');
    if (!name) {
        const nameAttr = getSheetAttribute(represents, 'npc_name');
        name = nameAttr.get('current');
    }
    return name;
}

function modifier(attribute) {
    return Math.floor(attribute / 2) - 5;
}

function setSheetAttribute(characterid, name, current, max = null) {
    let attr = getSheetAttribute(characterid, name);
    if (!attr)
        attr = createObj('attribute', {
            characterid: characterid,
            name: name,
            current: current,
            max: max
        });
    attr.set('current', current);
    attr.set('max', max);
    return attr;
}

function setTokenSize(token, size) {
    token.set('height', TOKEN_SIZES[size]);
    token.set('width', TOKEN_SIZES[size]);
}
