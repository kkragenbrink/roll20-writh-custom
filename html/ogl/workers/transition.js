on('change:is_shaped change:is_simple', function () {
    transitionCharacterSheet();
});

var transitionCharacterSheet = function () {
    getAttrs(['already_transitioned', 'is_npc', 'is_shaped'], function (attrs) {
        if (attrs.already_transitioned === '1') {
            console.log('do nothing, already transitioned');
            return;
        }
        setAttrs({already_transitioned: '1'});

        if (attrs.is_npc && (attrs.is_npc === '1' || attrs.is_npc === 1)) {
            if (attrs.is_shaped === '1') {
                transferNPCShaped();
            } else {
                transferNPCSimple();
            }
        } else {
            transferPC(attrs.is_shaped === '1');
        }
    });
};