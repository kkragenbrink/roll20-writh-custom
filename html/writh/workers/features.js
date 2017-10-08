const FEATURE_WATCHERS = [
    'change:repeating_features'
];

on(FEATURE_WATCHERS.join(' '), () => {
    console.log('Calculating features');
    TAS.repeating('features')
        .fields('uses', 'show_uses')
        .each((row) => {
            console.log(row);

            if (row.uses !== undefined) return row.show_uses = 'on';
            return row.show_uses = '0';
        })
        .execute();
});