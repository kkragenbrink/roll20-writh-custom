const CLASS_WATCHERS = [
    'change:repeating_classes', 'remove:repeating_classes', 'change:_reporder_repeating_classes'
];
const CLASS_LEVEL_JOINER = '/';

on(CLASS_WATCHERS.join(' '), () => {
    console.log('Calculating class level.');
    TAS.repeating('classes')
        .attrs('level', 'proficiency_bonus', 'classlevel')
        .fields('name', 'level')
        .reduce(calculateLevels, {level: 0, labels: []}, setClassLevels)
        .execute();
});

function calculateLevels(levels, row, attrSet, id, rowSet) {
    levels.level += parseInt(row.level);
    levels.labels = [...levels.labels, `${row.name} ${row.level}`];

    return levels;
}

function setClassLevels(levels, rowSet, attrSet) {
    attrSet.classlevel = levels.labels.join(CLASS_LEVEL_JOINER);
    attrSet.level = levels.level;
    console.log(`Setting level to: ${levels.level}.`);

    const proficiency = Math.floor((levels.level - 1) / 4) + 2;
    attrSet.proficiency_bonus = `+${proficiency}`;
    console.log(`Setting proficiency bonus to: ${proficiency}`);
}
