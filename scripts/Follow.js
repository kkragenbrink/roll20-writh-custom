function follow (evt, selectedId, targetId) {
    if (selectedId === targetId) {
        return unfollowToken(selectedId);
    }

    followToken(selectedId, targetId);
}

function getLeaderId (followerId) {
    const leaderId = _.findKey(state.writh.followers, (target) => target.includes(followerId));
    debug(`leader for ${followerId}: ${leaderId}`);
    return leaderId;
}

function isFollower (followerId) {
    const leaderId = getLeaderId(followerId);
    return !!leaderId;
}

function hasFollowers (target) {
    return Array.isArray(state.writh.followers[target]) && state.writh.followers[target].length > 0;
}

function followToken (followerId, targetId) {
    state.writh.followers[targetId] = state.writh.followers[targetId] || [];
    state.writh.followers[targetId].push(followerId);

    moveFollower(followerId, targetId);

    const selected = getTokenById(followerId);
    const sname = selected.get('name');

    const target = getTokenById(targetId);
    const tname = target.get('name');

    sendChat('System', `${sname} is now following ${tname}.`);
}

function moveFollower (followerId, targetId) {
    const follower = getTokenById(followerId);
    const target = getTokenById(targetId);

    const tleft = Math.floor(target.get('left'));
    const ttop = Math.floor(target.get('top'));
    const theight = Math.floor(target.get('height'));
    const twidth = Math.floor(target.get('width'));

    debug('target l:', tleft, ', t:', ttop, 'h:', theight, 'w:', twidth);

    const fheight = Math.floor(follower.get('height'));
    const fwidth = Math.floor(follower.get('width'));

    const fleft = tleft;
    const ftop = ttop;

    debug('follower l:', fleft, ', t:', ftop, 'h:', fheight, 'w:', fwidth);

    follower.set('left', fleft);
    follower.set('top', ftop);
    follower.set('rotation', target.get('rotation'));
}

function unfollowToken (followerId) {
    const target = getLeaderId(followerId);
    state.writh.followers[target] = _.without(state.writh.followers[target], followerId);

    const selected = getTokenById(followerId);
    const sname = selected.get('name');
    sendChat('System', `${sname} stops following others.`);
}
