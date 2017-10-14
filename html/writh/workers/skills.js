const SKILL_WATCHERS = [
    'change:acrobatics_skill', 'change:animal_handling_skill', 'arcana_skill',
    'change:athletics_skill', 'change:deception_skill', 'change:history_skill',
    'change:insight_skill', 'change:intimidation_skill', 'change:investigation_skill',
    'change:medicine_skill', 'change:nature_skill', 'change:perception_skill',
    'change:performance_skill', 'change:persuasion_skill', 'change:religion_skill',
    'change:sleight_of_hand_skill', 'change:stealth_skill', 'change:survival_skill'
];

const SKILL = /^(.+?)_skill$/;
on(SKILL_WATCHERS.join(' '), (evt) => {
    const skill = SKILL.exec(evt.sourceAttribute)[1];
    const skill_attr = `${skill}_skill`;
    const skill_exp = `${skill}_expertise`;

    getAttrs([skill_attr, skill_exp], (attr) => {
        const set = {};
        console.log('exp:', attr[skill_exp], 'skill:', attr[skill_attr]);

        if (attr[skill_attr] === "0" && attr[skill_exp] === "1") {
            set[skill_attr] = "0";
            set[skill_exp] = "0";
        }
        else if (attr[skill_attr] === "0" && attr[skill_exp] === "0") {
            set[skill_attr] = "1";
            set[skill_exp] = "1";
        }
        // else if (attr[skill_attr] === "1" && attr[skill_exp] === "0") {
        //     set[skill_attr] = "1";
        //     set[skill_exp] = "0";
        // }

        setAttrs(set);
    });
});