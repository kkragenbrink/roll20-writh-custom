
const CLASS_WATCHERS = [
    'change:repeating_classes', 'remove:repeating_classes', 'change:_reporder_repeating_classes'
];
const CLASS_LEVEL_JOINER = '/';
on(CLASS_WATCHERS.join(' '), () => {
    console.log('Calculating class level.');
    TAS.repeating('classes')
        .attrs('classlevel')
        .fields('name', 'level')
        .reduce((label, row, attrSet, id, rowSet) => [...label, `${row.name} ${row.level}`], '', setClassLevels)
        .execute();
});

function setClassLevels (classes, rowSet, attrSet) {
    const classlevel = classes.join(CLASS_LEVEL_JOINER);
    attrSet.classlevel = classlevel;
}