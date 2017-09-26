function upgrade_1_1_to_1_2 (doneupdating) {
    force_refresh_spells();
    force_refresh_attacks();
    doneupdating();
}

function upgrade_1_2_to_1_3 (doneupdating) {
    // UPGRADING SAVING THROW TOGGLE
    getSectionIDs('repeating_attack', function (idarray) {
        var update = {};
        _.each(idarray, function (currentID, i) {
            getAttrs(['repeating_attack_' + currentID + '_saveflag'], function (v) {
                if (
                    v['repeating_attack_' + currentID + '_saveflag'] &&
                    ['repeating_attack_' + currentID + '_saveflag'] != '0'
                ) {
                    update['repeating_attack_' + currentID + '_saveflag'] =
                        '{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}';
                }
                if (i === idarray.length - 1) {
                    setAttrs(update, {}, function () {
                        force_refresh_npcactions();
                        updateac();
                        force_refresh_spells();
                        force_refresh_attacks();
                        doneupdating();
                    });
                }
            });
        });
    });
}

function upgrade_1_3_to_1_4 (doneupdating) {
    force_refresh_spells();
    force_refresh_attacks();
    doneupdating();
}

function upgrade_1_4_to_1_5 (doneupdating) {
    force_refresh_spells();
    force_refresh_attacks();
    doneupdating();
}

function upgrade_1_5_to_1_6 (doneupdating) {
    doneupdating();
}

function upgrade_1_6_to_2_0 (doneupdating) {
    doneupdating();
}

function versioning () {
    getAttrs(['version'], (v) => {
        switch (v.version) {
            case '':
                console.log('UPGRADING TO v1.0');
                setAttrs({version: '1.0'});
                versioning();
                break;
            case '1.0':
                console.log('UPGRADING TO v1.1');
                setAttrs({version: '1.1'});
                versioning();
                break;
            case '1.1':
                console.log('UPGRADING TO v1.2');
                upgrade_1_1_to_1_2(function () {
                    setAttrs({version: '1.2'});
                    versioning();
                });
                break;
            case '1.2':
                console.log('UPGRADING TO v1.3');
                upgrade_1_2_to_1_3(function () {
                    setAttrs({version: '1.3'});
                    versioning();
                });
                break;
            case '1.3':
                console.log('UPGRADING TO v1.4');
                upgrade_1_3_to_1_4(function () {
                    setAttrs({version: '1.4'});
                    versioning();
                });
                break;
            case '1.4':
                console.log('UPGRADING TO v1.5');
                upgrade_1_4_to_1_5(function () {
                    setAttrs({version: '1.5'});
                    versioning();
                });
                break;
            case '1.5':
                console.log('UPGRADING TO v1.6');
                upgrade_1_5_to_1_6(function () {
                    setAttrs({version: '1.6'});
                    versioning();
                });
                break;
            case '1.6':
                console.log('UPGRADING TO v2.0');
                upgrade_1_6_to_2_0(function () {
                    setAttrs({version: '2.0'});
                    versioning();
                });
                break;
            default:
                setAttrs({version: '2.0'});
                console.log('5th Edition OGL (writh mods) by Roll20 and Kevin Kragenbrink, version ' + v['version']);
                break;
        }
    });
}