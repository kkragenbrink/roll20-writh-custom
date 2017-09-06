function processCommand(evt) {
    const [command, ...args] = evt.content.split(" ");
    debug(`${evt.who} sent ${command}${args ? " " + args.join(" ") : null}.`);
    switch (command) {
      case "!shapechanger":
        shapechange(evt);
        break;

      case "!resize":
        resize(evt, args);
        break;

      case "!follow":
        follow(evt, ...args);
        break;

      case "!debug":
        debugTokenProperties(evt, ...args);
        break;

      case "!searchForTokenAnomalies":
        searchForTokenAnomalies(evt, ...args);
        break;

      case "!cleanupTokenAnomalies":
        cleanupTokenAnomalies(evt, ...args);
        break;

      case "!resetOrdinals":
        resetOrdinals(evt);
        break;
    }
}

function debugTokenProperties(evt, selectedId) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const represents = token.get("represents");
        const name = token.get("name");
        debug(`Token For ${name} (${represents})`);
        const attributes = getAllSheetAttributes(represents);
        attributes.forEach(attribute => {
            const attrName = attribute.get("name");
            debug(`  - ${attrName}`);
        });
    });
}

function searchForTokenAnomalies(evt, selectedId) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const represents = token.get("represents");
        const name = token.get("name");
        debug(`Token For ${name} (${represents})`);
        const attributes = getAllSheetAttributes(represents);
        attributes.map(attribute => attribute.get("name")).filter(filterAnomalousAttributes).forEach(attribute => {
            const attrObj = getSheetAttribute(represents, attribute);
            const value = attrObj.get("current");
            debug(`  - ${attribute}: ${value}`);
        });
    });
}

function cleanupTokenAnomalies(evt, selectedId) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const represents = token.get("represents");
        const name = token.get("name");
        debug(`Token For ${name} (${represents})`);
        const attributes = getAllSheetAttributes(represents);
        attributes.map(attribute => attribute.get("name")).filter(filterAnomalousAttributes).forEach(attribute => {
            const attrObj = getSheetAttribute(represents, attribute);
            attrObj.remove();
            debug(`  - removed: ${attribute}`);
        });
    });
}

function filterAnomalousAttributes(attribute) {
    return /pb$/i.test(attribute) || /(.*?)_(bonus$|save_bonus$|mod$|mod_with_sign$|mod_formula$)/i.test(attribute);
}

on("add:graphic", obj => {
    const {token: token, represents: represents} = identifyToken(obj);
    if (isNPC(token)) {
        trackNPCToken(token, represents);
        setNPCTokenHP(token, represents);
        selectTokenSide(token, represents);
        setOrdinalTokenName(token, represents);
    }
});

on("change:graphic", (obj, prev) => {
    if (!isObjectToken(obj)) return;
    if (!hasObjectMoved(obj, prev)) return;
    setTokenRotation(obj);
    if (isFollower(obj.id)) unfollowToken(obj.id);
    if (hasFollowers(obj.id)) state.writh.followers[obj.id].forEach(follower => moveFollower(follower, obj.id));
});

on("chat:message", evt => {
    if (evt.type === "api") processCommand(evt);
});

on("destroy:graphic", obj => {
    const {token: token, represents: represents} = identifyToken(obj);
    if (isNPC(token)) {
        untrackNPCToken(token, represents);
    }
});

on("ready", () => {
    state.writh = state.writh || {};
    state.writh.npcs = state.writh.npcs || {};
    state.writh.followers = state.writh.followers || {};
});

const BIAS = 45;

const ROTATIONS = [ 0, 45, 90, 135, 180, 225, 270, 315 ];

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
    return obj.get("left") != prev["left"] || obj.get("top") != prev["top"];
}

function parseMoves(moves) {
    moves = moves.split(",").reverse();
    let length = moves.length;
    const parsed = [];
    while (length) {
        parsed.push(new Move({
            left: Math.floor(moves[--length]),
            top: Math.floor(moves[--length])
        }));
    }
    return parsed;
}

function setTokenRotation(obj) {
    const moveList = parseMoves(obj.get("lastmove"));
    moveList.push(new Move({
        left: Math.ceil(obj.get("left")),
        top: Math.ceil(obj.get("top"))
    }));
    let moves = moveList.length;
    const to = moveList[--moves];
    const from = moveList[--moves];
    obj.set("rotation", calculateRotation(from, to));
}

class Move {
    constructor({top: top, left: left}) {
        this.top = top;
        this.left = left;
    }
}

function follow(evt, selectedId, targetId) {
    if (selectedId === targetId) {
        return unfollowToken(selectedId);
    }
    followToken(selectedId, targetId);
}

function getLeaderId(followerId) {
    const leaderId = _.findKey(state.writh.followers, target => target.includes(followerId));
    return leaderId;
}

function isFollower(followerId) {
    const leaderId = getLeaderId(followerId);
    return !!leaderId;
}

function hasFollowers(target) {
    return Array.isArray(state.writh.followers[target]) && state.writh.followers[target].length > 0;
}

function followToken(followerId, targetId) {
    state.writh.followers[targetId] = state.writh.followers[targetId] || [];
    state.writh.followers[targetId].push(followerId);
    moveFollower(followerId, targetId);
    const selected = getTokenById(followerId);
    const sname = selected.get("name");
    const target = getTokenById(targetId);
    const tname = target.get("name");
    sendChat("System", `${sname} is now following ${tname}.`);
}

function moveFollower(followerId, targetId) {
    const follower = getTokenById(followerId);
    const target = getTokenById(targetId);
    const tleft = Math.floor(target.get("left"));
    const ttop = Math.floor(target.get("top"));
    const theight = Math.floor(target.get("height"));
    const twidth = Math.floor(target.get("width"));
    const fheight = Math.floor(follower.get("height"));
    const fwidth = Math.floor(follower.get("width"));
    const fleft = tleft;
    const ftop = ttop;
    follower.set("left", fleft);
    follower.set("top", ftop);
    follower.set("rotation", target.get("rotation"));
}

function unfollowToken(followerId) {
    const target = getLeaderId(followerId);
    state.writh.followers[target] = _.without(state.writh.followers[target], followerId);
    const selected = getTokenById(followerId);
    const sname = selected.get("name");
    sendChat("System", `${sname} stops following others.`);
}

const NPC_SETUP_TIME = 500;

function setNPCTokenHP(token, represents) {
    const hpformulaAttr = getSheetAttribute(represents, "npc_hpformula");
    const conAttr = getSheetAttribute(represents, "npcd_con");
    if (!hpformulaAttr || !conAttr) return;
    const hpformula = hpformulaAttr.get("current");
    const hpmod = Math.floor(parseInt(conAttr.get("current")) / 2) - 5;
    let [hitDie, hitDieType] = hpformula.split("d");
    if (hitDieType.indexOf("+") > -1) {
        [hitDieType] = hitDieType.split("+");
    }
    if (hitDieType.indexOf("-") > -1) {
        [hitDieType] = hitDieType.split("-");
    }
    let hp = 0;
    for (let i = 0; i < +hitDie; i++) {
        hp += randomInteger(+hitDieType) + hpmod;
    }
    setTimeout(() => token.set("bar1_link", null), NPC_SETUP_TIME);
    setTimeout(() => token.set("bar1_value", hp), NPC_SETUP_TIME);
    setTimeout(() => token.set("bar1_max", hp), NPC_SETUP_TIME);
}

function resetOrdinals(evt) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const represents = token.get("represents");
        delete state.writh.npcs[represents];
        const nameAttr = getSheetAttribute(represents, "npc_name");
        const name = nameAttr.get("current");
        debug(`Resetting ordinals for ${name}.`);
    });
}

function trackNPCToken(token, represents) {
    const list = state.writh.npcs[represents] || [];
    list.push(token.id);
    state.writh.npcs[represents] = list;
}

function untrackNPCToken(token, represents) {
    const list = state.writh.npcs[represents] || [];
    const idx = list.indexOf(token.id);
    list.splice(idx, 1);
    state.writh.npcs[represents] = list;
}

function setOrdinalTokenName(token, represents) {
    const list = state.writh.npcs[represents] || [];
    const ord = getOrdinal(list.length);
    const name = getTokenName(token, represents);
    token.set("name", ord + " " + name);
}

function selectTokenSide(token, represents) {
    const name = getTokenName(token, represents);
    const rollableTableObj = findObjs({
        _type: "rollabletable",
        name: name
    })[0];
    if (rollableTableObj == undefined) return;
    const rollableTableItemsObj = findObjs({
        _type: "tableitem",
        _rollabletableid: rollableTableObj.get("_id")
    });
    if (rollableTableItemsObj.length < 1) return;
    const side = Math.floor(Math.random() * (rollableTableItemsObj.length + 1));
    const src = rollableTableItemsObj[side].get("avatar").replace("/max", "/thumb");
    token.set("currentSide", side);
    token.set("imgsrc", src);
}

function resize(evt, size) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => setTokenSize(token, size));
}

function shapechange(evt) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const name = token.get("name");
        const side = token.get("currentSide");
        const rollableTableObj = findObjs({
            _type: "rollabletable",
            name: name
        })[0];
        if (rollableTableObj == undefined) return;
        const rollableTableItemsObj = findObjs({
            _type: "tableitem",
            _rollabletableid: rollableTableObj.get("_id")
        });
        if (rollableTableItemsObj.length < 1) return;
        const newSide = 1 - side;
        const src = rollableTableItemsObj[newSide].get("avatar").replace("/max", "/thumb");
        token.set("currentSide", newSide);
        token.set("imgsrc", src);
        const represents = token.get("represents");
        const type = getAttrByName(represents, "shapechanger_type").toLowerCase();
        if (type == undefined) return;
        shapechange[type](token, newSide, represents);
    });
}

shapechange.dragon = ((token, newSide, represents) => {
    const sizeAttr = getSheetAttribute(represents, "dragon_size");
    let size;
    if (!sizeAttr) size = "large"; else size = sizeAttr.get("current");
    if (newSide === 0) {
        setTokenSize(token, "medium");
    } else {
        setTokenSize(token, size);
    }
});

shapechange.lythari = ((token, newSide, represents) => {
    const strength = getSheetAttribute(represents, "strength");
    const speed = getSheetAttribute(represents, "speed");
    const ac = getSheetAttribute(represents, "ac");
    let baseStrength = getSheetAttribute(represents, "lythari_base_strength");
    let baseSpeed = getSheetAttribute(represents, "lythari_base_speed");
    let baseAC = getSheetAttribute(represents, "lythari_base_ac");
    if (!baseStrength) baseStrength = setSheetAttribute(represents, "lythari_base_strength", strength.get("current"));
    if (!baseSpeed) baseSpeed = setSheetAttribute(represents, "lythari_base_speed", speed.get("current"));
    if (!baseAC) baseAC = setSheetAttribute(represents, "lythari_base_ac", ac.get("current"));
    if (newSide === 1) {
        strength.set("current", 15);
        speed.set("current", parseInt(baseSpeed.get("current")) + 10);
        ac.set("current", parseInt(baseAC.get("current")) + 1);
    } else {
        strength.set("current", baseStrength.get("current"));
        speed.set("current", baseSpeed.get("current"));
        ac.set("current", baseAC.get("current"));
    }
});

const THPBAR = 3;

const HPBAR = 1;

function setBar(obj, bar, value) {
    const link = obj.get("_bar" + bar + "_link");
    if (link !== "") {
        const attr = findObjs({
            _type: "attribute",
            _id: link
        })[0];
        attr.set({
            current: value
        });
    }
    obj.set("bar" + bar + "_value", value);
}

on("change:token", (obj, prev) => {
    const HPVALUE = "bar" + HPBAR + "_value";
    const THPVALUE = "bar" + THPBAR + "_value";
    const hp = {
        new: parseInt(obj.get(HPVALUE)),
        old: parseInt(prev[HPVALUE])
    };
    const thp = parseInt(obj.get(THPVALUE));
    const target = {};
    if (hp.new !== NaN && hp.new !== hp.old && thp > 0) {
        hp.change = hp.new - hp.old;
        if (hp.change < 0) {
            hp.abschange = Math.abs(hp.change);
            target[THPVALUE] = thp > hp.abschange ? thp - hp.abschange : 0;
            target[HPVALUE] = thp > hp.abschange ? hp.old : hp.old - (hp.abschange - thp);
            setBar(obj, HPBAR, target[HPVALUE]);
            setBar(obj, THPBAR, target[THPVALUE]);
        }
    }
});

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
        log(`[${new Date().toISOString()}] ${args.join(" ")}`);
    }
}

function identifyToken(obj) {
    const id = obj.id || obj._id;
    const token = getTokenById(id);
    const represents = token.get("represents");
    return {
        token: token,
        represents: represents
    };
}

function isObjectToken(obj) {
    return !(obj.attributes && obj.attributes.isdrawing) && !obj.isdrawing;
}

function isNPC(token) {
    const represents = token.get("represents");
    const npc = getSheetAttribute(represents, "npc");
    const named = getSheetAttribute(represents, "named_npc");
    return npc && npc.get("current") == 1 && (!named || named.get("current") == 0);
}

function getTokenById(id, type = "graphic") {
    return getObj(type, id);
}

function getAllSheetAttributes(characterid) {
    return findObjs({
        type: "attribute",
        characterid: characterid
    });
}

function getOrdinal(n) {
    var s = [ "th", "st", "nd", "rd" ], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getSelectedTokens(evt) {
    if (!evt.selected) return [];
    return evt.selected.map(({_id: _id, _type: _type}) => {
        return getTokenById(_id, _type);
    });
}

function getSheetAttribute(characterid, name) {
    return findObjs({
        type: "attribute",
        characterid: characterid,
        name: name
    }, {
        caseInsensitive: true
    })[0];
}

function getTokenName(token, represents) {
    let name = token.get("name");
    if (!name) {
        const nameAttr = getSheetAttribute(represents, "npc_name");
        name = nameAttr.get("current");
    }
    return name;
}

function modifier(attribute) {
    return Math.floor(attribute / 2) - 5;
}

function setSheetAttribute(characterid, name, current, max = null) {
    let attr = getSheetAttribute(characterid, name);
    if (!attr) attr = createObj("attribute", {
        characterid: characterid,
        name: name,
        current: current,
        max: max
    });
    attr.set("current", current);
    attr.set("max", max);
    return attr;
}

function setTokenSize(token, size) {
    token.set("height", TOKEN_SIZES[size]);
    token.set("width", TOKEN_SIZES[size]);
}