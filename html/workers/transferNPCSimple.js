
var transferNPCSimple = function () {
    getAttrs(
        [
            'npc_type',
            'npc_size',
            'npc_alignment',
            'character_name',
            'npc_hp',
            'npc_HP_hit_dice',
            'npc_AC_note',
            'npc_strength',
            'npc_dexterity',
            'npc_constitution',
            'npc_intelligence',
            'npc_wisdom',
            'npc_charisma',
            'npc_strength_save_bonus',
            'npc_dexterity_save_bonus',
            'npc_constitution_save_bonus',
            'npc_intelligence_save_bonus',
            'npc_wisdom_save_bonus',
            'npc_charisma_save_bonus',
            'npc_speed',
            'npc_speed_fly',
            'npc_speed_climb',
            'npc_speed_swim',
            'npc_damage_immunity',
            'npc_damage_resistance',
            'npc_condition_immunity',
            'npc_damage_vulnerability',
            'npc_acrobatics_bonus',
            'npc_animalhandling_bonus',
            'npc_arcana_bonus',
            'npc_athletics_bonus',
            'npc_deception_bonus',
            'npc_history_bonus',
            'npc_insight_bonus',
            'npc_intimidation_bonus',
            'npc_investigation_bonus',
            'npc_medicine_bonus',
            'npc_nature_bonus',
            'npc_perception_bonus',
            'npc_performance_bonus',
            'npc_persuasion_bonus',
            'npc_religion_bonus',
            'npc_sleightofhand_bonus',
            'npc_stealth_bonus',
            'npc_survival_bonus',
            'npc_multiattack',
            'npc_traits'
        ],
        function (attrs) {
            var updates = {},
                newRowId = '';

            updates.npc = '1';
            //updates['npc_options-flag'] = 0;
            updates.npc_name = attrs.character_name;
            updates.hp_max = attrs.npc_hp;
            updates.npc_hpformula = attrs.npc_HP_hit_dice;
            updates.npc_actype = attrs.npc_AC_note;
            updates.npc_type =
                (attrs.npc_size || '') +
                ' ' +
                (attrs.npc_type || '') +
                (attrs.npc_alignment && attrs.npc_alignment !== ''
                    ? (attrs.npc_size || attrs.npc_type ? ', ' : '') +
                    attrs.npc_alignment
                    : '');

            updates.strength = attrs.npc_strength;
            updates.dexterity = attrs.npc_dexterity;
            updates.constitution = attrs.npc_constitution;
            updates.intelligence = attrs.npc_intelligence;
            updates.wisdom = attrs.npc_wisdom;
            updates.charisma = attrs.npc_charisma;

            updates.npc_str_save =
                attrs.npc_strength_save_bonus === '0'
                    ? ''
                    : attrs.npc_strength_save_bonus;
            updates.npc_dex_save =
                attrs.npc_dexterity_save_bonus === '0'
                    ? ''
                    : attrs.npc_dexterity_save_bonus;
            updates.npc_con_save =
                attrs.npc_constitution_save_bonus === '0'
                    ? ''
                    : attrs.npc_constitution_save_bonus;
            updates.npc_int_save =
                attrs.npc_intelligence_save_bonus === '0'
                    ? ''
                    : attrs.npc_intelligence_save_bonus;
            updates.npc_wis_save =
                attrs.npc_wisdom_save_bonus === '0'
                    ? ''
                    : attrs.npc_wisdom_save_bonus;
            updates.npc_cha_save =
                attrs.npc_charisma_save_bonus === '0'
                    ? ''
                    : attrs.npc_charisma_save_bonus;

            updates.npc_speed =
                attrs.npc_speed +
                (attrs.npc_speed_fly && attrs.npc_speed_fly !== ''
                    ? ' | ' + attrs.npc_speed_fly + ' fly'
                    : '') +
                (attrs.npc_speed_climb && attrs.npc_speed_climb !== ''
                    ? ' | ' + attrs.npc_speed_climb + ' climb'
                    : '') +
                (attrs.npc_speed_swim && attrs.npc_speed_swim !== ''
                    ? ' | ' + attrs.npc_speed_swim + ' swim'
                    : '');

            updates.npc_vulnerabilities =
                attrs.npc_damage_vulnerability === 'None'
                    ? ''
                    : attrs.npc_damage_vulnerability;
            updates.npc_resistances =
                attrs.npc_damage_resistance === 'None'
                    ? ''
                    : attrs.npc_damage_resistance;
            updates.npc_immunities =
                attrs.npc_damage_immunity === 'None'
                    ? ''
                    : attrs.npc_damage_immunity;
            updates.npc_condition_immunities =
                attrs.npc_condition_immunity === 'None'
                    ? ''
                    : attrs.npc_condition_immunity;

            updates.npc_acrobatics = attrs.npc_acrobatics_bonus;
            updates.npc_animal_handling = attrs.npc_animalhandling_bonus;
            updates.npc_arcana = attrs.npc_arcana_bonus;
            updates.npc_athletics = attrs.npc_athletics_bonus;
            updates.npc_deception = attrs.npc_deception_bonus;
            updates.npc_history = attrs.npc_history_bonus;
            updates.npc_insight = attrs.npc_insight_bonus;
            updates.npc_intimidation = attrs.npc_intimidation_bonus;
            updates.npc_investigation = attrs.npc_investigation_bonus;
            updates.npc_medicine = attrs.npc_medicine_bonus;
            updates.npc_nature = attrs.npc_nature_bonus;
            updates.npc_perception = attrs.npc_perception_bonus;
            updates.npc_performance = attrs.npc_performance_bonus;
            updates.npc_persuasion = attrs.npc_persuasion_bonus;
            updates.npc_religion = attrs.npc_religion_bonus;
            updates.npc_sleight_of_hand = attrs.npc_sleightofhand_bonus;
            updates.npc_stealth = attrs.npc_stealth_bonus;
            updates.npc_survival = attrs.npc_survival_bonus;

            updates.wtype =
                attrs.npc_output_option && attrs.npc_output_option !== '/w GM '
                    ? ''
                    : '/w gm ';

            if (attrs.npc_multiattack && attrs.npc_multiattack !== '') {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'Multiattack';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.npc_multiattack;
            }
            if (
                attrs.npc_traits &&
                attrs.npc_traits !== '' &&
                attrs.npc_traits !== 'None'
            ) {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'NPC Traits';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.npc_traits;
            }

            setAttrs(JSON.parse(JSON.stringify(updates)));
        }
    );

    // set NPC Actions
    var npcActions = [];
    for (var i = 1; i <= 20; i++) {
        npcActions.push('npc_action_name' + i);
        npcActions.push('npc_action_type' + i);
        npcActions.push('npc_action_description' + i);
        npcActions.push('npc_action_effect' + i);
    }
    getAttrs(npcActions, function (attrs) {
        var updates = {};
        for (var i = 1; i <= 20; i++) {
            var actionName = attrs['npc_action_name' + i],
                actionType = (attrs['npc_action_type' + i] || '(Normal Action)'
                ).trim(),
                actionDescription = attrs['npc_action_description' + i],
                actionEffect = attrs['npc_action_effect' + i],
                newRowId = generateRowID();

            if (
                actionName &&
                actionName !== '' &&
                ((actionDescription && actionDescription !== '') ||
                    (actionEffect && actionEffect !== ''))
            ) {
                if (
                    actionType &&
                    (actionType === '(Legendary Action)' ||
                        actionType === '(Lair Action)')
                ) {
                    updates.npc_legendary_actions = '3';

                    updates[
                    'repeating_npcaction-l_' +
                    newRowId +
                    '_npc_options-flag'
                        ] = 0;
                    updates[
                    'repeating_npcaction-l_' + newRowId + '_name'
                        ] = actionName;
                    updates[
                    'repeating_npcaction-l_' + newRowId + '_description'
                        ] =
                        actionType +
                        (actionDescription && actionDescription !== ''
                            ? '\n' + actionDescription
                            : '') +
                        (actionEffect && actionEffect !== ''
                            ? '\n' + actionEffect
                            : '');
                } else {
                    updates[
                    'repeating_npcaction_' + newRowId + '_npc_options-flag'
                        ] = 0;
                    updates[
                    'repeating_npcaction_' + newRowId + '_name'
                        ] = actionName;
                    updates[
                    'repeating_npcaction_' + newRowId + '_description'
                        ] =
                        actionType +
                        (actionDescription && actionDescription !== ''
                            ? '\nDescription:\n' + actionDescription
                            : '') +
                        (actionEffect && actionEffect !== ''
                            ? '\nEffect:\n' + actionEffect
                            : '');
                }
            }
        }

        setAttrs(updates);
    });
};

