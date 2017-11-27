const COMPONENT_WATCHERS = [
    'change:repeating_spell-0:components', 'change:repeating_spell-1:components', 'change:repeating_spell-2:components',
    'change:repeating_spell-3:components', 'change:repeating_spell-4:components', 'change:repeating_spell-5:components',
    'change:repeating_spell-6:components', 'change:repeating_spell-7:components', 'change:repeating_spell-8:components',
    'change:repeating_spell-9:components'
];

on(COMPONENT_WATCHERS.join(' '), (e) => {
    const id = e.sourceAttribute;

    const set = {};
    set[`${id}_verbal`] = e.newValue.includes('V') ? 'Yes' : '0';
    set[`${id}_somatic`] = e.newValue.includes('S') ? 'Yes' : '0';
    set[`${id}_material`] = e.newValue.includes('M') ? 'Yes' : '0';

    setAttrs(set);
});
