on('change:hp_max', () => {
    getAttrs(['hp', 'hp_max'], ({hp, hp_max}) => {
        if (typeof hp === 'undefined') {
            setAttrs({
                hp: hp_max
            });
        }
    });
});
