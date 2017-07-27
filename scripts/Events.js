on('add:graphic', (obj) => {
    const {token: token, represents: represents} = identifyToken(obj);

    if (isNPC(token)) {
        trackNPCToken(token, represents);
        setNPCTokenHP(token, represents);
        setOrdinalTokenName(token, represents);
    }
});

on('change:graphic', (obj, prev) => {
    if (hasObjectMoved(obj, prev) && hasFollowers(obj.id)) {
        state.writh.followers[obj.id].forEach((follower) => moveFollower(follower, obj.id));
    }

    if (isObjectToken(obj) && hasObjectMoved(obj, prev)) {
        setTokenRotation(obj);
    }
});

on('chat:message', (evt) => {
    if (evt.type === "api") {
        processCommand(evt);
    }
    //else if (evt.playerid !== 'api' && evt.rolltemplate) {
    //    debug(JSON.stringify(evt));
    //}
});

on('destroy:graphic', (obj) => {
    const {token: token, represents: represents} = identifyToken(obj);

    if (isNPC(token)) {
        untrackNPCToken(token, represents);
    }
});

on('ready', () => {
    state.writh = state.writh || {};
    state.writh.npcs = state.writh.npcs || {};
    state.writh.followers = state.writh.followers || {};
});
