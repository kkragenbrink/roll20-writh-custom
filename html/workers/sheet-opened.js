on('sheet:opened', function () {
    versioning();

    getAttrs(
        [
            'meleedmg1',
            'rangeddmg1',
            'pro_weapons',
            'pro_armor',
            'inventoryname1',
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
            'npc_type',
            'npc_size',
            'npc_alignment',
            'npc_hp',
            'npc_HP_hit_dice',
            'npc_AC_note',
            'npc_strength',
            'npc_dexterity',
            'npc_constitution',
            'npc_intelligence',
            'npc_wisdom',
            'npc_charisma',
            'speed',
            'speed_fly',
            'speed_burrow',
            'speed_swim',
            'speed_climb',
            'prolanguages',
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
            'damage_vulnerability',
            'damage_resistance',
            'damage_immunity',
            'condition_immunity'
        ],
        (attrs) => {
            let hasOldData = false;
            const updates = {};
            _.each(attrs, (value) => {
                if (value) {
                    hasOldData = true;
                }
            });
            if (!hasOldData) {
                updates.already_transitioned = '1';
            }
            setAttrs(updates);
        }
    );

    getAttrs(['multiclass1', 'multiclass2', 'multiclass3'], (attrs) => {
        const updates = {};
        let updated = false;
        if (typeof attrs['multiclass1'] !== 'undefined') {
            updates.multiclass1 = attrs['multiclass1'].toLowerCase();
            updated = true;
        }
        if (typeof attrs['multiclass2'] !== 'undefined') {
            updates.multiclass2 = attrs['multiclass2'].toLowerCase();
            updated = true;
        }
        if (typeof attrs['multiclass3'] !== 'undefined') {
            updates.multiclass3 = attrs['multiclass3'].toLowerCase();
            updated = true;
        }
        if (updated) {
            setlevel();
        }
        setAttrs(updates);
    });
});