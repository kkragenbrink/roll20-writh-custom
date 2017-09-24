

var transferNPCShaped = function () {
    getAttrs(
        [
            'character_name',
            'speed',
            'speed_fly',
            'speed_burrow',
            'speed_swim',
            'speed_climb',
            'prolanguages',
            'wisdom',
            'blindsight',
            'darkvision',
            'tremorsense',
            'truesight',
            'challenge',
            'xp',
            'multiattack',
            'npc_traits',
            'lair_actions',
            'legendary_action_notes',
            'reactions',
            'damage_vulnerability',
            'damage_resistance',
            'damage_immunity',
            'condition_immunity'
        ],
        function (attrs) {
            var updates = {},
                senses = [],
                newRowId = '';

            updates.npc = '1';
            //updates['npc_options-flag'] = 0;
            updates.npc_name = attrs.character_name;
            updates.npc_speed =
                attrs.speed +
                (attrs.speed_fly && attrs.speed_fly !== ''
                    ? ' | ' + attrs.speed_fly + ' fly'
                    : '') +
                (attrs.speed_climb && attrs.speed_climb !== ''
                    ? ' | ' + attrs.speed_climb + ' climb'
                    : '') +
                (attrs.speed_swim && attrs.speed_swim !== ''
                    ? ' | ' + attrs.speed_swim + ' swim'
                    : '') +
                (attrs.speed_burrow && attrs.speed_burrow !== ''
                    ? ' | ' + attrs.speed_burrow + ' burrow'
                    : '');

            updates.npc_vulnerabilities = attrs.damage_vulnerability;
            updates.npc_resistances = attrs.damage_resistance;
            updates.npc_immunities = attrs.damage_immunity;
            updates.npc_condition_immunities = attrs.condition_immunity;

            updates.npc_languages = attrs.prolanguages;

            updates.npc_senses =
                'pass Perc: ' +
                attrMod(attrs.wisdom) +
                (attrs.blindsight && attrs.blindsight !== ''
                    ? ' | blindsight: ' + attrs.blindsight
                    : '') +
                (attrs.darkvision && attrs.darkvision !== ''
                    ? ' | darkvision: ' + attrs.darkvision
                    : '') +
                (attrs.tremorsense && attrs.tremorsense !== ''
                    ? ' | tremorsense: ' + attrs.tremorsense
                    : '') +
                (attrs.truesight && attrs.truesight !== ''
                    ? ' | truesight: ' + attrs.truesight
                    : '');

            updates.npc_challenge = attrs.challenge;
            updates.npc_xp = attrs.xp;

            if (attrs.multiattack && attrs.multiattack !== '') {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'Multiattack';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.multiattack;
            }
            if (attrs.npc_traits && attrs.npc_traits !== '') {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'NPC Traits';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.npc_traits;
            }
            if (attrs.lair_actions && attrs.lair_actions !== '') {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'Lair Actions';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.lair_actions;
            }
            if (
                attrs.legendary_action_notes &&
                attrs.legendary_action_notes !== ''
            ) {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'Legendary Actions Notes';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.legendary_action_notes;
                updates.npc_legendary_actions = 3;
            }
            if (attrs.reactions && attrs.reactions !== '') {
                newRowId = generateRowID();
                updates['repeating_npctrait_' + newRowId + '_name'] =
                    'Reactions';
                updates['repeating_npctrait_' + newRowId + '_desc'] =
                    attrs.reactions;
            }

            // var npcActionBase = ['name','emote','reach','range','target','tohit','dmg','dmg_type','crit_dmg','crit_range','second_dmg','second_dmg_type','second_crit_dmg','save_dc','save_stat','save_dmg','save_dmg_type','save_success','effect','recharge'],
            //     npcActionAttrs = [];

            // // Lair Actions
            // for(var i = 0; i < 4; i++) {
            //     npcActionAttrs = npcActionAttrs.concat(npcActionBase.map(function(attr) { return 'repeating_lair_actions_'+i+'_'+attr; }));
            // }
            // getAttrs(npcActionAttrs,function(attrs) {
            //     console.log('Lair Actions');
            //     console.log(attrs);
            // });

            // // Legendary Actions
            // npcActionAttrs = [];
            // for(var i = 0; i < 4; i++) {
            //     npcActionAttrs = npcActionAttrs.concat(npcActionBase.map(function(attr) { return 'repeating_legendary_actions_'+i+'_'+attr; }));
            // }
            // getAttrs(npcActionAttrs,function(attrs) {
            //     console.log('Legendary Actions');
            //     console.log(attrs);
            // });

            // // Actions
            // npcActionAttrs = [];
            // for(var i = 0; i < 4; i++) {
            //     npcActionAttrs = npcActionAttrs.concat(npcActionBase.map(function(attr) { return 'repeating_actions_'+i+'_'+attr; }));
            // }
            // getAttrs(npcActionAttrs,function(attrs) {
            //     console.log('Actions');
            //     console.log(attrs);
            // });

            setAttrs(JSON.parse(JSON.stringify(updates)));
        }
    );

    function attrMod(value) {
        return Math.floor((parseInt(value) - 10) / 2);
    }
};
