const ATTACK_WATCHERS = [
    'change:repeating_attacks'
];

on(ATTACK_WATCHERS.join(' '), () => {
    console.log('Calculating attacks.');
    TAS.repeating('attacks')
        .fields(
            'roll',
            'attack_roll', 'save_dc', 'save_roll', 'damage_roll', 'attack_display', 'damage_display',
            'is_attack', 'attack_ability', 'attack_modifier', 'attack_proficient',
            'is_save', 'save_ability', 'save_dc_ability', 'use_flat_save_dc', 'flat_dc',
            'has_damage', 'damage_base', 'damage_ability', 'damage_modifier', 'damage_type'
        )
        .attrs('strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'proficiency_bonus')
        .each((row, attrSet) => {
            row.attack_display = '—';
            row.attack_roll = '';
            row.save_roll = '';
            row.damage_roll = '';

            if (row.is_attack === 'on') configureAttack(row, attrSet);
            if (row.is_save === 'on') configureSave(row, attrSet);
            if (row.has_damage === 'on') configureDamage(row, attrSet);

            row.roll = '&{template:writh-attack} {{title=@{name}}} {{characterName=@{character_name}}}}}';
            if (row.attack_roll.length > 0) row.roll += ' {{attack=[[@{attack_roll}]]}}';
            if (row.save_roll.length > 0) row.roll += ' @{save_roll}';
            if (row.damage_roll.length > 0) row.roll += ' {{damage=[[@{damage_roll}]]}} {{damage_type=@{damage_type}}}';

            console.log(row);
        })
        .execute();
});

function configureAttack(row, attrSet) {
    const formula = ['@{advantage_query}'];
    let atk = 0;

    const ability = row.attack_ability;
    const abbreviation = ability.substr(0, 3).toUpperCase();
    const modifier = `${ability}_modifier`;
    atk += Math.floor((attrSet[ability] - 10) / 2);
    formula.push(`[[@{${modifier}}]][${abbreviation}]`);

    atk += parseInt(row.attack_modifier) || 0;
    formula.push(`[[${row.attack_modifier || 0}]][MOD]`);

    if (row.attack_proficient === 'on') {
        atk += +attrSet.proficiency_bonus;
        formula.push('[[@{proficiency_bonus}]][PROF]');
    }

    row.attack_roll = formula.join('+');
    row.attack_display = atk > 0 ? `+${atk}` : `${atk}`;
}

function configureSave(row, attrSet) {
    let dc = 10;
    const formula = [];

    if (row.save_dc_ability === 'flat') {
        dc = row.flat_dc;

        row.use_flat_save_dc = 'on';
        formula.push(`[[${dc}]][FLAT]`);
    }
    else {
        const ability = row.save_dc_ability;
        const abbreviation = ability.substr(0, 3).toUpperCase();
        const modifier = `${ability}_modifier`;

        row.use_flat_save_dc = '0';

        dc = 8;
        formula.push(8);

        dc += +attrSet.proficiency_bonus;
        formula.push('[[@{proficiency_bonus}]][PROF]');

        dc += Math.floor((attrSet[ability] - 10) / 2);
        formula.push(`[[@{${modifier}}]][${abbreviation}]`);
    }

    row.save_dc = formula.join('+');
    row.save_roll = `{{save_ability=${row.save_ability}}} {{save=DC [[@{save_dc}]]}}`;
    if (row.is_attack !== 'on') row.attack_display = `DC ${dc}`;
}

function configureDamage(row, attrSet) {
    const formula = [];

    let dmg = row.damage_base;
    formula.push(row.damage_base);

    if (row.damage_ability !== 'none') {
        const ability = row.damage_ability;
        const abbreviation = ability.substr(0, 3).toUpperCase();
        const modifier = `${ability}_modifier`;
        const value = Math.floor((attrSet[ability] - 10) / 2);

        if (value > 0) dmg = `${dmg}+${value}`;
        else dmg = `${dmg}${value}`;

        formula.push(`[[@{${modifier}}]][${abbreviation}]`);
    }

    if (row.damage_modifier) {
        if (+row.damage_modifier > 0) dmg = `${dmg}+${row.damage_modifier}`;
        else dmg = `${dmg}${row.damage_modifier}`;
        formula.push(`[[@{${row.damage_modifier}}]][MOD]`);
    }

    dmg = `${dmg} ${row.damage_type}`;
    row.damage_roll = formula.join('+');
    row.damage_display = dmg;
}