function follow (evt, selectedId, targetId) {
    const selected = getTokenById(selectedId);
    const sname = selected.get('name');

    if (selectedId === targetId) {
        unfollowToken(selectedId);
        return sendChat(evt.who, `${sname} stops following others.`);
    }

    const target = getTokenById(targetId);
    const tname = target.get('name');

    followToken(selectedId, targetId);
    sendChat(evt.who, `${sname} is now following ${tname}.`);
}

function hasFollowers (target) {
    return Array.isArray(state.writh.followers[target]) && state.writh.followers[target].length > 0;
}

function followToken (follower, target) {
    state.writh.followers[target] = state.writh.followers[target] || [];
    state.writh.followers[target].push(follower);

    moveFollower(follower, target);
}

function moveFollower (followerId, targetId) {
    const follower = getTokenById(followerId);
    const target = getTokenById(targetId);

    const tleft = target.get('left');
    const ttop = target.get('top');
    const theight = target.get('height');
    const twidth = target.get('width');

    debug('target l:', tleft, ', t:', ttop, 'h:', theight, 'w:', twidth);

    const center = {
        left: tleft + (twidth/2),
        top: ttop + (theight/2)
    };

    debug('center l:', center.left, ', t:', center.top);

    const fheight = follower.get('height');
    const fwidth = follower.get('width');
    const fleft = Math.floor(center.left - (fwidth/2));
    const ftop = Math.floor(center.top - (fheight/2));

    debug('follower l:', fleft, ', t:', ftop, 'h:', fheight, 'w:', fwidth);

    follower.set('left', fleft);
    follower.set('top', ftop);
}

function unfollowToken (follower) {
    const target = _.findKey(state.writh.followers, (target) => target.includes(follower));
    state.writh.followers[target] = _.without(state.writh.followers[target], follower);
}

function resize(evt, size) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach((token) => setTokenSize(token, size));
}

function shapechange(evt) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach((token) => {
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
        setTokenSize(token, 'medium');
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