function resize(evt, size) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => setTokenSize(token, size));
}

function shapechange(evt) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const name = token.get("name");
        const side = token.get("currentSide");
        const rollableTableObj = findObjs({_type: "rollabletable", name: name})[0];
        if (rollableTableObj == undefined) return;
        const rollableTableItemsObj = findObjs({_type: "tableitem", _rollabletableid: rollableTableObj.get("_id")});
        if (rollableTableItemsObj.length < 1) return;
        const newSide = 1 - side;
        const currentSrc = rollableTableItemsObj[newSide].get("avatar");
        const extension = currentSrc.substr(currentSrc.lastIndexOf('.'), currentSrc.lastIndexOf('?'));
        const src = currentSrc.substr(0, currentSrc.lastIndexOf('/')) + '/thumb' + extension;
        token.set("currentSide", newSide);
        token.set("imgsrc", src);
        const represents = token.get("represents");
        const type = getAttrByName(represents, "shapechanger_type").toLowerCase();
        if (type == undefined) return;
        shapechange[type](token, newSide, represents)
    })
}

shapechange.dragon = (token, newSide, represents) => {
    const sizeAttr = getSheetAttribute(represents, 'dragon_size');
    let size;
    if (!sizeAttr) size = 'large';
    else size = sizeAttr.get('current');
    if (newSide === 0) setTokenSize(token, 'medium');
    else setTokenSize(token, size);
};

shapechange.lythari = ((token, newSide, represents) => {
    const strength = getSheetAttribute(represents, "strength");
    const speed = getSheetAttribute(represents, "speed");
    const ac = getSheetAttribute(represents, "armor_class");
    let baseStrength = getSheetAttribute(represents, "lythari_base_strength");
    let baseSpeed = getSheetAttribute(represents, "lythari_base_speed");
    let baseAC = getSheetAttribute(represents, "lythari_base_ac");
    if (!baseStrength) baseStrength = setSheetAttribute(represents, "lythari_base_strength", strength.get("current"));
    if (!baseSpeed) baseSpeed = setSheetAttribute(represents, "lythari_base_speed", speed.get("current"));
    if (!baseAC) baseAC = setSheetAttribute(represents, "lythari_base_ac", ac.get("current"));
    if (newSide === 1) {
        strength.set("current", 15);
        speed.set("current", parseInt(baseSpeed.get("current")) + 10);
        ac.set("current", parseInt(baseAC.get("current")) + 1)
    } else {
        strength.set("current", baseStrength.get("current"));
        speed.set("current", baseSpeed.get("current"));
        ac.set("current", baseAC.get("current"))
    }
});