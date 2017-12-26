const NPC_SETUP_TIME = 500;

function setNPCTokenHP(token, represents) {
    const hpformulaAttr = getSheetAttribute(represents, 'npc_hpformula');
    const conAttr = getSheetAttribute(represents, 'npcd_con');
    if (!hpformulaAttr || !conAttr) return;
    const hpformula = hpformulaAttr.get('current');
    const hpmod = Math.floor(parseInt(conAttr.get('current')) / 2) - 5;
    let [hitDie, hitDieType] = hpformula.split('d');
    if (hitDieType.indexOf('+') > -1) {
        [hitDieType] = hitDieType.split('+');
    }
    if (hitDieType.indexOf('-') > -1) {
        [hitDieType] = hitDieType.split('-');
    }
    let hp = 0;
    for (let i = 0; i < +hitDie; i++) {
        hp += randomInteger(+hitDieType) + hpmod;
    }

    setTimeout(() => token.set('bar1_link', null), NPC_SETUP_TIME);
    setTimeout(() => token.set('bar1_value', hp), NPC_SETUP_TIME);
    setTimeout(() => token.set('bar1_max', hp), NPC_SETUP_TIME);
}

function resetOrdinals(evt) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const represents = token.get('represents');
        delete state.writh.npcs[represents];

        const nameAttr = getSheetAttribute(represents, 'npc_name');
        const name = nameAttr.get('current');
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
    token.set('name', ord + ' ' + name);
}

function selectTokenSide(token, represents) {
    const name = getTokenName(token, represents);
    const rollableTableObj = findObjs({
        _type: 'rollabletable',
        name: name
    })[0];
    if (rollableTableObj == undefined) return;
    const rollableTableItemsObj = findObjs({
        _type: 'tableitem',
        _rollabletableid: rollableTableObj.get('_id')
    });
    if (rollableTableItemsObj.length < 1) return;
    const side = Math.floor(Math.random() * rollableTableItemsObj.length);
    debug(`name: ${name}, side: ${side}`);
    setTimeout(() => {
        const src = rollableTableItemsObj[side]
            .get('avatar')
            .replace('/max', '/thumb');
        token.set('currentSide', side);
        token.set('imgsrc', src);
    }, NPC_SETUP_TIME);
}

function toggleSight(evt) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach((token) => {
        const sight = token.get('light_hassight');
        token.set('light_hassight', !sight);
    });
}