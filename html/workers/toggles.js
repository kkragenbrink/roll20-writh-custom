function toggleValue (attr, toggle_name) {
    getAttrs([attr], (v) => {
        const toggle_value = (v[attr] && v[attr] === '1') ? 1 : 0;
        const attrs = {};
        attrs[toggle_name] = toggle_value;
        setAttrs(attrs);
    });
}

on('change:npc', () => toggleValue('npc', 'npc_toggle'));
on('change:spellcaster', () => toggleValue('spellcaster', 'spells_toggle'));
on('change:psionicist', () => toggleValue('psionicist', 'psionics_toggle'));

on('change:custom_class', () => {
    toggleValue('custom_class', 'customclass_flag');
    updateClass();
});


on('change:multiclass1_flag', function () {
    toggleValue('multiclass1_flag', 'multiclass1_showingflag');
    setlevel();
});

on('change:multiclass2_flag', function () {
    toggleValue('multiclass2_flag', 'multiclass2_showingflag');
    setlevel();
});

on('change:multiclass3_flag', function () {
    toggleValue('multiclass3_flag', 'multiclass3_showingflag');
    setlevel();
});