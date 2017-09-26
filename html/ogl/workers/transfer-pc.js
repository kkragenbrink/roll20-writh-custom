var transferPC = function (isShaped) {
    var classHitDice = {
        artificer: 'd8',
        barbarian: 'd12',
        bard: 'd8',
        cleric: 'd8',
        druid: 'd8',
        fighter: 'd10',
        monk: 'd8',
        mystic: 'd8',
        paladin: 'd10',
        ranger: 'd10',
        rogue: 'd8',
        sorcerer: 'd6',
        warlock: 'd8',
        wizard: 'd6'
    };
    // set 1to1 values
    getAttrs(
        [
            'temp_hp',
            'xp',
            'death_save_success_1',
            'death_save_success_2',
            'death_save_success_3',
            'death_save_fail_1',
            'death_save_fail_2',
            'death_save_fail_3',
            'inspiration',
            'background',
            'prolanguages',
            'pro_weapons',
            isShaped ? 'pro_armor' : 'pro_armour',
            'class_features',
            'class_abilities_and_feats',
            'notes'
        ],
        function (attrs) {
            // one-to-one mappings
            var updates = {};
            updates.hp_temp =
                attrs.temp_hp && attrs.temp_hp !== '0' ? attrs.temp_hp : '';
            updates.experience = attrs.xp && attrs.xp !== '0' ? attrs.xp : 0;
            updates.deathsave_succ1 =
                attrs.death_save_success_1 && attrs.death_save_success_1 !== '0'
                    ? 'on'
                    : 0;
            updates.deathsave_succ2 =
                attrs.death_save_success_2 && attrs.death_save_success_2 !== '0'
                    ? 'on'
                    : 0;
            updates.deathsave_succ3 =
                attrs.death_save_success_3 && attrs.death_save_success_3 !== '0'
                    ? 'on'
                    : 0;
            updates.deathsave_fail1 =
                attrs.death_save_fail_1 && attrs.death_save_fail_1 !== '0'
                    ? 'on'
                    : 0;
            updates.deathsave_fail2 =
                attrs.death_save_fail_2 && attrs.death_save_fail_2 !== '0'
                    ? 'on'
                    : 0;
            updates.deathsave_fail3 =
                attrs.deathsave_fail3 && attrs.deathsave_fail3 !== '0'
                    ? 'on'
                    : 0;
            updates.inspiration =
                attrs.inspiration && attrs.inspiration !== '0' ? 'on' : 0;
            updates.character_backstory =
                attrs['background'] && attrs['background'] !== ''
                    ? attrs['background']
                    : '';
            updates.features_and_traits = attrs.class_features
                ? attrs.class_features
                : '';
            updates.additional_feature_and_traits = attrs.class_abilities_and_feats
                ? attrs.class_abilities_and_feats
                : '';
            updates.treasure = attrs.notes ? attrs.notes : '';
            updates['background'] = ' ';
            if (isShaped) {
                updates.other_proficiencies_and_languages =
                    (attrs.prolanguages ? attrs.prolanguages : '') +
                    (attrs.pro_weapons && attrs.pro_weapons !== ''
                        ? (attrs.prolanguages ? '\n' : '') + attrs.pro_weapons
                        : '') +
                    (attrs.pro_armor && attrs.pro_armor !== ''
                        ? (attrs.prolanguages || attrs.pro_weapons
                        ? '\n'
                        : '') + attrs.pro_armor
                        : '');
            } else {
                updates.other_proficiencies_and_languages =
                    (attrs.prolanguages ? attrs.prolanguages : '') +
                    (attrs.pro_weapons && attrs.pro_weapons !== ''
                        ? (attrs.prolanguages ? '\n' : '') + attrs.pro_weapons
                        : '') +
                    (attrs.pro_armour && attrs.pro_armour !== ''
                        ? (attrs.prolanguages || attrs.pro_weapons
                        ? '\n'
                        : '') + attrs.pro_armour
                        : '');
            }

            updateAll(updates, 'core stats/direct mapping');
        }
    );
    // set ability proficiency checkboxes
    getAttrs(
        [
            'strength_save_prof',
            'dexterity_save_prof',
            'constitution_save_prof',
            'intelligence_save_prof',
            'wisdom_save_prof',
            'charisma_save_prof'
        ],
        function (attrs) {
            var updates = {};
            _.each(attrs, function (value, key) {
                if (value !== '0') {
                    updates[key] = '(@{pb})';
                }
            });
            updateAll(updates, 'ability proficiencies');
        }
    );
    // set skill proficiency checkboxes/expertise
    getAttrs(
        [
            'acrobatics_prof_exp',
            'animal_handling_prof_exp',
            'arcana_prof_exp',
            'athletics_prof_exp',
            'arcana_prof_exp',
            'deception_prof_exp',
            'history_prof_exp',
            'insight_prof_exp',
            'intimidation_prof_exp',
            'investigation_prof_exp',
            'medicine_prof_exp',
            'nature_prof_exp',
            'perception_prof_exp',
            'performance_prof_exp',
            'religion_prof_exp',
            'sleight_of_hand_prof_exp',
            'stealth_prof_exp',
            'survival_prof_exp'
        ],
        function (attrs) {
            var updates = {};

            _.each(attrs, function (value, key) {
                var skillName = key.slice(0, -9);
                switch (value) {
                    case '(2*@{PB})': //expertise
                        updates[skillName + '_type'] = '2';
                    case '@{PB}': // proficiency or expertise
                        updates[key.slice(0, -4)] =
                            '(@{pb}*@{' + skillName + '_type' + '})';
                        break;
                }
            });
            updateAll(updates, 'skill proficiencies/expertise');
        }
    );
    // get AC value, add armor to inventory
    var baseArmorValues = [
            'armouractive',
            'armouracbase',
            'armourmagicbonus',
            'armouractiveunarmoured',
            'armourstealthpen',
            'amourname',
            'armourtype',
            'armourspeedpen'
        ],
        armorFields = [];
    for (var i = 1; i <= 10; i++) {
        armorFields = armorFields.concat(
            baseArmorValues.map(function (armorValue) {
                return armorValue + i;
            })
        );
    }
    armorFields.push(
        'dexterity',
        'constitution',
        'wisdom',
        'unarmoured_class_bonus'
    );
    if (isShaped) {
        armorFields = armorFields.map(function (name) {
            return name.replace(/armour|amour/g, 'armor');
        });
    }
    getAttrs(armorFields, function (attrs) {
        var updates = {},
            armorTotal = 0,
            unarmoredTotal = 10 + attrMod(attrs.dexterity);

        // Change the spelling of armour to armor, so that this function will fork for both shaped and
        if (!isShaped) {
            _.each(attrs, function (value, key) {
                Object.defineProperty(
                    attrs,
                    key.replace(/armour|amour/g, 'armor'),
                    Object.getOwnPropertyDescriptor(attrs, key)
                );
                delete key;
            });
        }

        for (var i = 1; i <= 10; i++) {
            var active =
                !attrs['armoractive' + i] ||
                attrs['armoractive' + i] !== '0',
                unarmored =
                    attrs['armoractiveunarmored' + i] &&
                    attrs['armoractiveunarmored' + i] !== '0',
                baseAC = parseInt(attrs['armoracbase' + i]) || 0,
                magicBonusAC = parseInt(attrs['armormagicbonus' + i]) || 0,
                totalBaseAC = baseAC + magicBonusAC,
                newRowId = generateRowID(),
                armorTypeBonus = 0,
                armorType = '',
                armorTypeMod = '';

            switch (attrs['armortype' + i]) {
                case '@{dexterity_mod} + 0.002': // light armor
                    armorTypeBonus = attrMod(attrs.dexterity);
                    armorType = 'Light Armor: ';
                    armorTypeMod = ' (DEX mod)';
                    break;
                case '(ceil((@{dexterity_mod}-1)/1e10)*2 - floor((@{dexterity_mod}-2)/1e10)*@{dexterity_mod}) + 0.003': // medium armor
                    armorTypeBonus =
                        attrMod(attrs.dexterity) > 1
                            ? 2
                            : attrMod(attrs.dexterity);
                    armorType = 'Medium Armor: ';
                    armorTypeMod = ' (DEX mod, max 2)';
                    break;
                case '0.004': // heavy armor
                    armorType = 'Heavy Armor: ';
                    break;
            }

            if (active && !unarmored) {
                armorTotal += totalBaseAC + armorTypeBonus;
            } else if (active && unarmored) {
                unarmoredTotal += totalBaseAC;
            }

            if (attrs['armorname' + i] && attrs['armorname' + i] !== '') {
                var stealthPen =
                        attrs['armorstealthpen' + i] &&
                        attrs['armorstealthpen' + i] !== 'No Penalty'
                            ? 'Disadvantage Stealth'
                            : '',
                    speedPen =
                        attrs['armorspeedpen' + i] &&
                        attrs['armorspeedpen' + i] !== 'No'
                            ? 'STR ' + attrs['armorspeedpen' + i].slice(-2)
                            : '';

                updates['repeating_inventory_' + newRowId + '_itemcount'] = 1;
                updates['repeating_inventory_' + newRowId + '_itemname'] =
                    attrs['armorname' + i];
                updates['repeating_inventory_' + newRowId + '_itemproperties'] =
                    armorType + (totalBaseAC + armorTypeBonus) + ' AC';
                updates['repeating_inventory_' + newRowId + '_itemmodifiers'] =
                    magicBonusAC !== 0 ? 'AC +' + magicBonusAC : '';
                updates['repeating_inventory_' + newRowId + '_itemcontent'] =
                    '[' +
                    baseAC +
                    (magicBonusAC !== 0 ? ' + ' + magicBonusAC : '') +
                    (armorTypeMod !== ''
                        ? ' + ' + armorTypeBonus + armorTypeMod
                        : '') +
                    ']' +
                    (stealthPen !== '' || speedPen !== '' ? '\n' : '') +
                    (stealthPen !== '' ? stealthPen : '') +
                    (stealthPen !== '' && speedPen !== '' ? '; ' : '') +
                    (speedPen !== '' ? speedPen : '');
            }
        }

        if (attrs.unarmored_class_bonus === '(@{constitution_mod} + 0.002)') {
            unarmoredTotal += attrMod(attrs.constitution);
        } else if (attrs.unarmored_class_bonus === '(@{wisdom_mod} + 0.003)') {
            unarmoredTotal += attrMod(attrs.wisdom);
        } else if (attrs.unarmored_class_bonus === '(3 + 0.004)') {
            unarmoredTotal += 3;
        }

        updates['ac'] =
            armorTotal > unarmoredTotal ? armorTotal : unarmoredTotal;
        updateAll(updates, 'armor inventory + ac calc');
    });
    // set character levels/multiclass/hit dice
    getAttrs(
        [
            'barbarian_level',
            'bard_level',
            'cleric_level',
            'druid_level',
            'figher_level',
            'monk_level',
            'paladin_level',
            'ranger_level',
            'rogue_level',
            'sorcerer_level',
            'warlock_level',
            'wizard_level',
            'hd_d6',
            'hd_d8',
            'hd_d10',
            'hd_d12'
        ],
        function (attrs) {
            var classLevels = [],
                updates = {},
                currentHitDice = [];

            _.each(attrs, function (value, key) {
                if (value && key.indexOf('level') !== -1 && value !== '0') {
                    classLevels.push({
                        class: key.slice(0, -6),
                        level: parseInt(value)
                    });
                } else if (value && value !== '0') {
                    currentHitDice.push({
                        dice: key.substr(3),
                        count: parseInt(value)
                    });
                }
            });

            if (classLevels.length > 1) {
                classLevels.sort(function (a, b) {
                    return b['level'] - a['level'];
                });
                updates['base_level'] = classLevels[0]['level'];
                updates['class'] =
                    classLevels[0]['class'].substr(0, 1).toUpperCase() +
                    classLevels[0]['class'].substr(1);

                var hitDiceMax = {},
                    hitDiceMaxArray = [];

                _.each(classLevels, function (classLevel) {
                    var numHitDice =
                        hitDiceMax[classHitDice[classLevel['class']]];
                    hitDiceMax[classHitDice[classLevel['class']]] = !numHitDice
                        ? classLevel['level']
                        : numHitDice + classLevel['level'];
                });
                _.each(hitDiceMax, function (value, key) {
                    hitDiceMaxArray.push({dice: key, count: value});
                });

                updates['hit_dice_max'] = hitDiceMaxArray
                    .sort(function (a, b) {
                        return a['dice'].localeCompare(b['dice']);
                    })
                    .map(function (x) {
                        return x['dice'] + ' ' + x['count'];
                    })
                    .join('|');

                _.each(classLevels, function (classLevel, i) {
                    if (i > 0) {
                        updates['multiclass' + i + '_flag'] = '1';
                        updates['multiclass' + i] =
                            classLevel['class'].substr(0, 1).toUpperCase() +
                            classLevel['class'].substr(1);
                        updates['multiclass' + i + '_lvl'] =
                            classLevel['level'];
                    }
                });
            } else if (classLevels.length > 0) {
                updates['base_level'] = classLevels[0]['level'];
                updates['class'] =
                    classLevels[0]['class'].substr(0, 1).toUpperCase() +
                    classLevels[0]['class'].substr(1);
                updates['hit_dice_max'] = classLevels[0]['level'];
            }

            if (currentHitDice.length > 1) {
                updates['hit_dice'] = currentHitDice
                    .sort(function (a, b) {
                        return a['dice'].localeCompare(b['dice']);
                    })
                    .map(function (x) {
                        return x['dice'] + ' ' + x['count'];
                    })
                    .join('|');
            } else if (currentHitDice.length === 1) {
                updates['hit_dice'] = currentHitDice[0]['count'];
            }

            updateAll(updates, 'character levels/multclassing');
        }
    );
    // set proficiencies
    getAttrs(['pro_tools'], function (toolAttrs) {
        var updates = {},
            tools = (toolAttrs.pro_tools || '').split(
                /, and|,and|and|;|:|\||,/
            );
        if (toolAttrs.pro_tools && toolAttrs.pro_tools.trim() !== '') {
            _.each(tools, function (tool) {
                var newRowId = generateRowID();

                updates[
                'repeating_tool_' + newRowId + '_toolname_base'
                    ] = tool.trim();
                updates['repeating_tool_' + newRowId + '_options-flag'] = '0';
            });
        }
        updateAll(updates, 'tool proficiencies');
    });
    // set class/other resources
    getSectionIDs('repeating_classresources', function (classResourceIds) {
        var newRowId = '';
        if (classResourceIds.length === 0) {
            updateAll({}, 'class/other resources');
        } else expectedUpdates += classResourceIds.length - 1;
        _.each(classResourceIds, function (repeatingId, i) {
            var classResources = [
                'repeating_classresources_' +
                repeatingId +
                '_classresourcename',
                'repeating_classresources_' +
                repeatingId +
                '_classresourcerecharge',
                'repeating_classresources_' +
                repeatingId +
                '_classresourcetotal',
                'repeating_classresources_' +
                repeatingId +
                '_classresourcetotal_max'
            ];
            getAttrs(classResources, function (attrs) {
                var updates = {},
                    resourceCurrent =
                        attrs[
                        'repeating_classresources_' +
                        repeatingId +
                        '_classresourcetotal'
                            ],
                    resourceMax =
                        attrs[
                        'repeating_classresources_' +
                        repeatingId +
                        '_classresourcetotal_max'
                            ],
                    resourceName =
                        attrs[
                        'repeating_classresources_' +
                        repeatingId +
                        '_classresourcename'
                            ];

                if (i === 0) {
                    updates.class_resource = resourceCurrent || '';
                    updates.class_resource_max = resourceMax || '';
                    updates.class_resource_name = resourceName || '';
                } else if (i === 1) {
                    updates.other_resource = resourceCurrent || '';
                    updates.other_resource_max = resourceMax || '';
                    updates.other_resource_name = resourceName || '';
                } else if (i % 2 === 0) {
                    newRowId = generateRowID();
                    updates[
                    'repeating_resource_' + newRowId + '_resource_left'
                        ] =
                        resourceCurrent || '';
                    updates[
                    'repeating_resource_' + newRowId + '_resource_left_max'
                        ] =
                        resourceMax || '';
                    updates[
                    'repeating_resource_' + newRowId + '_resource_left_name'
                        ] =
                        resourceName || '';
                } else {
                    updates[
                    'repeating_resource_' + newRowId + '_resource_right'
                        ] =
                        resourceCurrent || '';
                    updates[
                    'repeating_resource_' + newRowId + '_resource_right_max'
                        ] =
                        resourceMax || '';
                    updates[
                    'repeating_resource_' +
                    newRowId +
                    '_resource_right_name'
                        ] =
                        resourceName || '';
                }

                updateAll(updates, 'class/other resources');
            });
        });
    });
    // transfer weapons to inventory/attacks
    var baseWeaponValues = [
            'pbmelee',
            'meleeweaponname',
            'meleeattackstat',
            'meleemagic',
            'meleedmg',
            'meleedmgtype',
            'meleeattackstatdmg',
            'meleecritdmg',
            'meleeweaponcritrange'
        ],
        weaponFields = [];
    for (var i = 1; i <= 6; i++) {
        weaponFields = weaponFields.concat(
            baseWeaponValues.map(function (weaponValue) {
                return weaponValue + i;
            })
        ); //melee weapons
        weaponFields = weaponFields.concat(
            baseWeaponValues.map(function (weaponValue) {
                return (weaponValue + i).replace(/melee/g, 'ranged');
            })
        ); // ranged weapons
    }
    getAttrs(weaponFields, function (attrs) {
        var newRowId = '',
            updates = {},
            attackAttr = '';
        for (var i = 1; i <= 6; i++) {
            if (
                attrs['meleeweaponname' + i] &&
                attrs['meleeweaponname' + i] !== ''
            ) {
                newRowId = generateRowID();
                updates['repeating_inventory_' + newRowId + '_itemcount'] = 1;
                updates['repeating_inventory_' + newRowId + '_itemname'] =
                    attrs['meleeweaponname' + i];
                updates['repeating_inventory_' + newRowId + '_itemmodifiers'] =
                    attrs['meleemagic' + i] &&
                    attrs['meleemagic' + i] !== '' &&
                    attrs['meleemagic' + i] !== '0'
                        ? '+' + attrs['meleemagic' + i] + ' Attack/Damage'
                        : '';
                updates['repeating_inventory_' + newRowId + '_itemcontent'] =
                    'Damage: ' +
                    (attrs['meleedmg' + i] || '') +
                    ' ' +
                    (attrs['meleedmgtype' + i] || '') +
                    (attrs['meleemagic' + i] &&
                    attrs['meleemagic' + i] !== '' &&
                    attrs['meleemagic' + i] !== '0'
                        ? '+' + attrs['meleemagic' + i] + ' magic'
                        : '');

                newRowId = generateRowID();
                attackAttr =
                    !attrs['meleeattackstat' + i] ||
                    attrs['meleeattackstat' + i] === '@{finesse_mod}'
                        ? '@{strength_mod}'
                        : attrs['meleeattackstat' + i];
                updates['repeating_attack_' + newRowId + '_options-flag'] = 0;
                updates['repeating_attack_' + newRowId + '_atkname_base'] =
                    attrs['meleeweaponname' + i];
                updates[
                'repeating_attack_' + newRowId + '_atknattr_base'
                    ] = attackAttr;
                updates['repeating_attack_' + newRowId + '_atkprofflag'] =
                    !attrs['pbmelee' + i] || attrs['pbmelee'] === '@{PB}'
                        ? '(@{pb})'
                        : '0';
                updates['repeating_attack_' + newRowId + '_atkmagic'] =
                    attrs['meleemagic' + i] || '';
                updates['repeating_attack_' + newRowId + '_dmgcustcrit'] =
                    attrs['meleecritdmg' + i] || '';
                updates['repeating_attack_' + newRowId + '_atkcritrange'] =
                    attrs['meleeweaponcritrange' + i] || '20';
                updates['repeating_attack_' + newRowId + '_dmgbase'] =
                    attrs['meleedmg' + i] || '';
                updates['repeating_attack_' + newRowId + '_dmgattr'] =
                    !attrs['meleeattackstatdmg' + i] ||
                    attrs['meleeattackstatdmg' + i] === '1'
                        ? attackAttr
                        : '0';
                updates['repeating_attack_' + newRowId + '_dmgtype'] =
                    attrs['meleedmgtype' + i] || '';
            }
        }

        for (var i = 1; i <= 6; i++) {
            if (
                attrs['rangedweaponname' + i] &&
                attrs['rangedweaponname' + i] !== ''
            ) {
                newRowId = generateRowID();
                updates['repeating_inventory_' + newRowId + '_itemcount'] = 1;
                updates['repeating_inventory_' + newRowId + '_itemname'] =
                    attrs['rangedweaponname' + i];
                updates['repeating_inventory_' + newRowId + '_itemmodifiers'] =
                    attrs['rangedmagic' + i] &&
                    attrs['rangedmagic' + i] !== '' &&
                    attrs['rangedmagic' + i] !== '0'
                        ? '+' + attrs['rangedmagic' + i] + ' Attack/Damage'
                        : '';
                updates['repeating_inventory_' + newRowId + '_itemcontent'] =
                    'Damage: ' +
                    (attrs['rangeddmg' + i] || '') +
                    ' ' +
                    (attrs['rangeddmgtype' + i] || '') +
                    (attrs['rangedmagic' + i] &&
                    attrs['rangedmagic' + i] !== '' &&
                    attrs['rangedmagic' + i] !== '0'
                        ? '+' + attrs['rangedmagic' + i] + ' magic'
                        : '');

                newRowId = generateRowID();
                attackAttr =
                    !attrs['rangedattackstat' + i] ||
                    attrs['rangedattackstat' + i] === '@{finesse_mod}'
                        ? '@{strength_mod}'
                        : attrs['rangedattackstat' + i];
                updates['repeating_attack_' + newRowId + '_options-flag'] = 0;
                updates['repeating_attack_' + newRowId + '_atkname_base'] =
                    attrs['rangedweaponname' + i];
                updates[
                'repeating_attack_' + newRowId + '_atknattr_base'
                    ] = attackAttr;
                updates['repeating_attack_' + newRowId + '_atkprofflag'] =
                    !attrs['pbranged' + i] || attrs['pbranged'] === '@{PB}'
                        ? '(@{pb})'
                        : '0';
                updates['repeating_attack_' + newRowId + '_atkmagic'] =
                    attrs['rangedmagic' + i] || '';
                updates['repeating_attack_' + newRowId + '_atkcritrange'] =
                    attrs['rangedcritdmg' + i] || '';
                updates['repeating_attack_' + newRowId + '_atkcritrange'] =
                    attrs['rangedweaponcritrange' + i] || '20';
                updates['repeating_attack_' + newRowId + '_dmgbase'] =
                    attrs['rangeddmg' + i] || '';
                updates['repeating_attack_' + newRowId + '_dmgattr'] =
                    !attrs['rangedattackstatdmg' + i] ||
                    attrs['rangedattackstatdmg' + i] === '1'
                        ? attackAttr
                        : '0';
                updates['repeating_attack_' + newRowId + '_dmgtype'] =
                    attrs['rangeddmgtype' + i] || '';
            }
        }
        updateAll(updates, 'weapons + weapon attacks');
    });
    // transfer inventory
    var baseInventoryValues = [
            'inventorycarried',
            'inventoryqty',
            'inventoryname',
            'inventoryweight',
            'inventorydescription'
        ],
        inventoryFields = [];
    for (var i = 1; i <= 60; i++) {
        inventoryFields = inventoryFields.concat(
            baseInventoryValues.map(function (inventoryValue) {
                return inventoryValue + i;
            })
        );
    }
    getAttrs(inventoryFields, function (attrs) {
        var newRowId = '',
            updates = {};
        for (var i = 1; i <= 60; i++) {
            if (
                (!attrs['inventorycarried' + i] ||
                    attrs['inventorycarried' + i] !== '0') &&
                attrs['inventoryname' + i] &&
                attrs['inventoryname' + i] !== ''
            ) {
                newRowId = generateRowID();
                updates['repeating_inventory_' + newRowId + '_itemcount'] =
                    attrs['inventorycount' + i] || 1;
                updates['repeating_inventory_' + newRowId + '_itemname'] =
                    attrs['inventoryname' + i] || '';
                updates['repeating_inventory_' + newRowId + '_itemweight'] =
                    attrs['inventoryweight' + i] &&
                    attrs['invetoryweight' + i] !== '0'
                        ? attrs['inventoryweight' + i]
                        : '';
                updates['repeating_inventory_' + newRowId + '_itemcontent'] =
                    attrs['inventorydescription' + i] || '';
            }
        }

        updateAll(updates, 'inventory');
    });

    function attrMod(value) {
        return Math.floor((parseInt(value) - 10) / 2);
    }

    var totalUpdates = 0,
        expectedUpdates = 9,
        allUpdates = {};

    function updateAll(newUpdates, updateArea) {
        console.log('update: ' + updateArea);
        console.log(newUpdates);
        allUpdates = _.extend(allUpdates, newUpdates);
        totalUpdates++;
        console.log(
            'expected: ' + expectedUpdates + ' vs actual: ' + totalUpdates
        );
        if (expectedUpdates === totalUpdates) {
            console.log('expected reached, updating');
            console.log(allUpdates);
            setAttrs(allUpdates);
            allUpdates = {};
        }
    }
};
