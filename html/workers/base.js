on(
    'change:class change:cust_classname change:cust_hitdietype change:cust_spellcasting_ability change:cust_spellslots change:cust_strength_save_prof change:cust_dexterity_save_prof change:cust_constitution_save_prof change:cust_intelligence_save_prof change:cust_wisdom_save_prof change:cust_charisma_save_prof',
    () => updateClass()
);

on(
    'change:base_level change:multiclass1 change:multiclass1_lvl change:multiclass2 change:multiclass2_lvl change:multiclass3 change:multiclass3_lvl change:arcane_fighter change:arcane_rogue',
    function () {
        setlevel();
    }
);
on(
    'change:repeating_tool:toolname_base change:repeating_tool:toolbonus_base change:repeating_tool:toolattr_base change:repeating_tool:tool_mod',
    function () {
        updateTool();
    }
);

on(
    'change:repeating_attack:atkflag change:repeating_attack:atkname_base change:repeating_attack:atkattr_base change:repeating_attack:atkmod change:repeating_attack:atkmagic change:repeating_attack:atkprofflag change:repeating_attack:dmgflag change:repeating_attack:dmgbase change:repeating_attack:dmgattr change:repeating_attack:dmgmod change:repeating_attack:dmgtype change:repeating_attack:dmg2flag change:repeating_attack:dmg2base change:repeating_attack:dmg2attr change:repeating_attack:dmg2mod change:repeating_attack:dmg2type change:repeating_attack:saveflag change:repeating_attack:savedc change:repeating_attack:saveflat change:repeating_attack:updateflag change:repeating_attack:dmgcustcrit change:repeating_attack:dmg2custcrit change:repeating_attack:ammo',
    function (eventinfo) {
        updateAttack(eventinfo);
    }
);

on('change:dtype', function () {
    force_refresh_attacks();
    force_refresh_npcactions();
    // getAttrs(["dtype"], function(v) {
    //     setAttrs({
    //         dflag: v.dtype
    //     });
    //     var updatepickbase = v.dtype;
    //     getSectionIDs("repeating_attack", function(idarray) {
    //         _.each(idarray, function(currentID) {
    //             getAttrs(["repeating_attack_" + currentID + "_atkflag", "repeating_attack_" + currentID + "_dmgflag"], function(v) {
    //                 update = {};
    //                 if(updatepickbase === "full") {
    //                     update["repeating_attack_" + currentID + "_hidden_pickbase"] = "full";
    //                 }
    //                 else {
    //                     if(!v["repeating_attack_" + currentID + "_atkflag"] || v["repeating_attack_" + currentID + "_atkflag"] != 0) {
    //                         update["repeating_attack_" + currentID + "_hidden_pickbase"] = "pick";
    //                     }
    //                     else if(!v["repeating_attack_" + currentID + "_dmgflag"] || v["repeating_attack_" + currentID + "_dmgflag"] != 0) {
    //                         update["repeating_attack_" + currentID + "_hidden_pickbase"] = "dmg";
    //                     }
    //                     else {
    //                         update["repeating_attack_" + currentID + "_hidden_pickbase"] = "empty";
    //                     }
    //                 }
    //                 setAttrs(update);
    //             });
    //         });
    //     });
    // });
});

on(
    'change:repeating_spell-cantrip:spellname_base change:repeating_spell-1:spellname_base change:repeating_spell-1:spellprepared change:repeating_spell-2:spellname_base change:repeating_spell-2:spellprepared change:repeating_spell-3:spellname_base change:repeating_spell-3:spellprepared change:repeating_spell-4:spellname_base change:repeating_spell-4:spellprepared change:repeating_spell-5:spellname_base change:repeating_spell-5:spellprepared change:repeating_spell-6:spellname_base change:repeating_spell-6:spellprepared change:repeating_spell-7:spellname_base change:repeating_spell-7:spellprepared change:repeating_spell-8:spellname_base change:repeating_spell-8:spellprepared change:repeating_spell-9:spellname_base change:repeating_spell-9:spellprepared change:repeating_spell-cantrip:spellrange change:repeating_spell-1:spellrange change:repeating_spell-2:spellrange change:repeating_spell-3:spellrange change:repeating_spell-4:spellrange change:repeating_spell-5:spellrange change:repeating_spell-6:spellrange change:repeating_spell-7:spellrange change:repeating_spell-8:spellrange change:repeating_spell-9:spellrange change:repeating_spell-cantrip:spelltarget change:repeating_spell-1:spelltarget change:repeating_spell-2:spelltarget change:repeating_spell-3:spelltarget change:repeating_spell-4:spelltarget change:repeating_spell-5:spelltarget change:repeating_spell-6:spelltarget change:repeating_spell-7:spelltarget change:repeating_spell-8:spelltarget change:repeating_spell-9:spelltarget change:repeating_spell-cantrip:spelldamage change:repeating_spell-1:spelldamage change:repeating_spell-2:spelldamage change:repeating_spell-3:spelldamage change:repeating_spell-4:spelldamage change:repeating_spell-5:spelldamage change:repeating_spell-6:spelldamage change:repeating_spell-7:spelldamage change:repeating_spell-8:spelldamage change:repeating_spell-9:spelldamage change:repeating_spell-cantrip:spelldamagetype change:repeating_spell-1:spelldamagetype change:repeating_spell-2:spelldamagetype change:repeating_spell-3:spelldamagetype change:repeating_spell-4:spelldamagetype change:repeating_spell-5:spelldamagetype change:repeating_spell-6:spelldamagetype change:repeating_spell-7:spelldamagetype change:repeating_spell-8:spelldamagetype change:repeating_spell-9:spelldamagetype change:repeating_spell-cantrip:spelldamage2 change:repeating_spell-1:spelldamage2 change:repeating_spell-2:spelldamage2 change:repeating_spell-3:spelldamage2 change:repeating_spell-4:spelldamage2 change:repeating_spell-5:spelldamage2 change:repeating_spell-6:spelldamage2 change:repeating_spell-7:spelldamage2 change:repeating_spell-8:spelldamage2 change:repeating_spell-9:spelldamage2 change:repeating_spell-cantrip:spelldamagetype2 change:repeating_spell-1:spelldamagetype2 change:repeating_spell-2:spelldamagetype2 change:repeating_spell-3:spelldamagetype2 change:repeating_spell-4:spelldamagetype2 change:repeating_spell-5:spelldamagetype2 change:repeating_spell-6:spelldamagetype2 change:repeating_spell-7:spelldamagetype2 change:repeating_spell-8:spelldamagetype2 change:repeating_spell-9:spelldamagetype2 change:repeating_spell-cantrip:spellhealing change:repeating_spell-1:spellhealing change:repeating_spell-2:spellhealing change:repeating_spell-3:spellhealing change:repeating_spell-4:spellhealing change:repeating_spell-5:spellhealing change:repeating_spell-6:spellhealing change:repeating_spell-7:spellhealing change:repeating_spell-8:spellhealing change:repeating_spell-9:spellhealing change:repeating_spell-cantrip:spelldmgmod change:repeating_spell-1:spelldmgmod change:repeating_spell-2:spelldmgmod change:repeating_spell-3:spelldmgmod change:repeating_spell-4:spelldmgmod change:repeating_spell-5:spelldmgmod change:repeating_spell-6:spelldmgmod change:repeating_spell-7:spelldmgmod change:repeating_spell-8:spelldmgmod change:repeating_spell-9:spelldmgmod change:repeating_spell-cantrip:spellsave change:repeating_spell-1:spellsave change:repeating_spell-2:spellsave change:repeating_spell-3:spellsave change:repeating_spell-4:spellsave change:repeating_spell-5:spellsave change:repeating_spell-6:spellsave change:repeating_spell-7:spellsave change:repeating_spell-8:spellsave change:repeating_spell-9:spellsave change:repeating_spell-cantrip:spellsavesuccess change:repeating_spell-1:spellsavesuccess change:repeating_spell-2:spellsavesuccess change:repeating_spell-3:spellsavesuccess change:repeating_spell-4:spellsavesuccess change:repeating_spell-5:spellsavesuccess change:repeating_spell-6:spellsavesuccess change:repeating_spell-7:spellsavesuccess change:repeating_spell-8:spellsavesuccess change:repeating_spell-9:spellsavesuccess change:repeating_spell-cantrip:spellhldie change:repeating_spell-1:spellhldie change:repeating_spell-2:spellhldie change:repeating_spell-3:spellhldie change:repeating_spell-4:spellhldie change:repeating_spell-5:spellhldie change:repeating_spell-6:spellhldie change:repeating_spell-7:spellhldie change:repeating_spell-8:spellhldie change:repeating_spell-9:spellhldie change:repeating_spell-cantrip:spellhldietype change:repeating_spell-1:spellhldietype change:repeating_spell-2:spellhldietype change:repeating_spell-3:spellhldietype change:repeating_spell-4:spellhldietype change:repeating_spell-5:spellhldietype change:repeating_spell-6:spellhldietype change:repeating_spell-7:spellhldietype change:repeating_spell-8:spellhldietype change:repeating_spell-9:spellhldietype change:repeating_spell-cantrip:spell_updateflag change:repeating_spell-1:spell_updateflag change:repeating_spell-2:spell_updateflag change:repeating_spell-3:spell_updateflag change:repeating_spell-4:spell_updateflag change:repeating_spell-5:spell_updateflag change:repeating_spell-6:spell_updateflag change:repeating_spell-7:spell_updateflag change:repeating_spell-8:spell_updateflag change:repeating_spell-9:spell_updateflag change:repeating_spell-cantrip:spellattack change:repeating_spell-1:spellattack change:repeating_spell-2:spellattack change:repeating_spell-3:spellattack change:repeating_spell-4:spellattack change:repeating_spell-5:spellattack change:repeating_spell-6:spellattack change:repeating_spell-7:spellattack change:repeating_spell-8:spellattack change:repeating_spell-9:spellattack change:repeating_spell-cantrip:spellhlbonus change:repeating_spell-1:spellhlbonus change:repeating_spell-2:spellhlbonus change:repeating_spell-3:spellhlbonus change:repeating_spell-4:spellhlbonus change:repeating_spell-5:spellhlbonus change:repeating_spell-6:spellhlbonus change:repeating_spell-7:spellhlbonus change:repeating_spell-8:spellhlbonus change:repeating_spell-9:spellhlbonus change:repeating_spell-npc:spellname_base change:repeating_spell-npc:spellrange change:repeating_spell-npc:spelltarget change:repeating_spell-npc:spelldamage change:repeating_spell-npc:spelldamagetype change:repeating_spell-npc:spelldamage2 change:repeating_spell-npc:spelldamagetype2 change:repeating_spell-npc:spellhealing change:repeating_spell-npc:spelldmgmod change:repeating_spell-npc:spellsave change:repeating_spell-npc:spellsavesuccess change:repeating_spell-npc:spellhldie change:repeating_spell-npc:spellhldietype change:repeating_spell-npc:spell_updateflag change:repeating_spell-npc:spellattack change:repeating_spell-npc:spellhlbonus change:repeating_spell-npc:spellprepared',
    function (eventinfo) {
        updateSpell('', '', eventinfo);
    }
);

on(
    'change:npc_name change:npc_type change:npc_ac change:npc_actype change:hp_max change:npc_hpformula change:npc_speed change:strength change:dexterity change:constitution change:intelligence change:wisdom change:charisma change:npc_str_save change:npc_dex_save change:npc_con_save change:npc_int_save change:npc_wis_save change:npc_cha_save change:npc_acrobatics change:npc_animal_handling change:npc_arcana change:npc_athletics change:npc_deception change:npc_history change:npc_insight change:npc_intimidation change:npc_investigation change:npc_medicine change:npc_nature change:npc_perception change:npc_performance change:npc_persuasion change:npc_religion change:npc_sleight_of_hand change:npc_stealth change:npc_survival change:npc_vulnerabilities change:npc_resistances change:npc_immunities change:npc_condition_immunities change:npc_senses change:npc_languages change:npc_challenge change:npc_xp change:npc_legendary_actions change:npcreactionsflag change:npcspellcastingflag',
    function () {
        updateNPC();
    }
);

on(
    'change:repeating_spell-cantrip:spellritualflag change:repeating_spell-1:spellritualflag change:repeating_spell-2:spellritualflag change:repeating_spell-3:spellritualflag change:repeating_spell-4:spellritualflag change:repeating_spell-5:spellritualflag change:repeating_spell-6:spellritualflag change:repeating_spell-7:spellritualflag change:repeating_spell-8:spellritualflag change:repeating_spell-9:spellritualflag change:repeating_spell-npc:spellritualflag',
    function () {
        getAttrs(['repeating_spell_spellritualflag'], function (v) {
            flag =
                v.repeating_spell_spellritualflag === 'Yes'
                    ? '{{ritual=1}}'
                    : '0';
            setAttrs({
                repeating_spell_spellritual: flag
            });
        });
    }
);

on(
    'change:repeating_spell-cantrip:spellconcentrationflag change:repeating_spell-1:spellconcentrationflag change:repeating_spell-2:spellconcentrationflag change:repeating_spell-3:spellconcentrationflag change:repeating_spell-4:spellconcentrationflag change:repeating_spell-5:spellconcentrationflag change:repeating_spell-6:spellconcentrationflag change:repeating_spell-7:spellconcentrationflag change:repeating_spell-8:spellconcentrationflag change:repeating_spell-9:spellconcentrationflag change:repeating_spell-npc:spellconcentrationflag',
    function () {
        getAttrs(['repeating_spell_spellconcentrationflag'], function (v) {
            flag =
                v.repeating_spell_spellconcentrationflag === 'Yes'
                    ? '{{concentration=1}}'
                    : '0';
            setAttrs({
                repeating_spell_spellconcentration: flag
            });
        });
    }
);

on(
    'change:repeating_spell-cantrip:spellcomp change:repeating_spell-1:spellcomp change:repeating_spell-2:spellcomp change:repeating_spell-3:spellcomp change:repeating_spell-4:spellcomp change:repeating_spell-5:spellcomp change:repeating_spell-6:spellcomp change:repeating_spell-7:spellcomp change:repeating_spell-8:spellcomp change:repeating_spell-9:spellcomp change:repeating_spell-npc:spellcomp',
    function () {
        getAttrs(['repeating_spell_spellcomp'], function (v) {
            spellv =
                v.repeating_spell_spellcomp.indexOf('V') > -1 ? '{{v=1}}' : '0';
            spells =
                v.repeating_spell_spellcomp.indexOf('S') > -1 ? '{{s=1}}' : '0';
            spellm =
                v.repeating_spell_spellcomp.indexOf('M') > -1 ? '{{m=1}}' : '0';
            setAttrs({
                repeating_spell_spellcomp_v: spellv,
                repeating_spell_spellcomp_s: spells,
                repeating_spell_spellcomp_m: spellm
            });
        });
    }
);

on(
    'change:repeating_spell-cantrip:spellcontent change:repeating_spell-1:spellcontent change:repeating_spell-2:spellcontent change:repeating_spell-3:spellcontent change:repeating_spell-4:spellcontent change:repeating_spell-5:spellcontent change:repeating_spell-6:spellcontent change:repeating_spell-7:spellcontent change:repeating_spell-8:spellcontent change:repeating_spell-9:spellcontent change:repeating_spell-npc:spellcontent',
    function () {
        getAttrs(['repeating_spell_spellcontent'], function (v) {
            content = v.repeating_spell_spellcontent.split('At Higher Levels:');
            if (content.length > 1) {
                spelldesc = content[0].trim();
                spellhigherlvl = content[1].trim();
            } else {
                spelldesc = v.repeating_spell_spellcontent;
                spellhigherlvl = '';
            }
            setAttrs({
                repeating_spell_spelldescription: spelldesc,
                repeating_spell_spellathigherlevels: spellhigherlvl
            });
        });
    }
);

// on("change:repeating_spell-cantrip:spellhealing change:repeating_spell-1:spellhealing change:repeating_spell-2:spellhealing change:repeating_spell-3:spellhealing change:repeating_spell-4:spellhealing change:repeating_spell-5:spellhealing change:repeating_spell-6:spellhealing change:repeating_spell-7:spellhealing change:repeating_spell-8:spellhealing change:repeating_spell-9:spellhealing", function() {
//     getAttrs(["repeating_spell_spellhealing","repeating_spell_spelldamage","repeating_spell_spelldamage2","repeating_spell_spelldmgmod"], function(v) {
//         if(v.repeating_spell_spellhealing && v.repeating_spell_spellhealing != "") {
//             update = {};
//             // castingbonus = v.repeating_spell_spelldmgmod && v.repeating_spell_spelldmgmod === "Yes" ? " + @{spellcasting_ability}" : "";
//             if(!v.repeating_spell_spelldamage || v.repeating_spell_spelldamage === "") {
//                 update["repeating_spell_spelldamage"] = v.repeating_spell_spellhealing;
//             }
//             else if(!v.repeating_spell_spelldamage2 || v.repeating_spell_spelldamage2 === "") {
//                 update["repeating_spell_spelldamage2"] = v.repeating_spell_spellhealing;
//             }
//             update["repeating_spell_spellhealing"] = "";
//             setAttrs(update);
//         }
//     });
// });

on(
    'change:repeating_spell-cantrip:spelloutput change:repeating_spell-1:spelloutput change:repeating_spell-2:spelloutput change:repeating_spell-3:spelloutput change:repeating_spell-4:spelloutput change:repeating_spell-5:spelloutput change:repeating_spell-6:spelloutput change:repeating_spell-7:spelloutput change:repeating_spell-8:spelloutput change:repeating_spell-9:spelloutput change:repeating_spell-npc:spelloutput',
    function (eventinfo) {
        var idlvl =
            '-' + eventinfo.sourceAttribute.match(/repeating_spell-(.*?)-/)[1];
        var spid = eventinfo.sourceAttribute.split('_')[2];
        var ourid = idlvl + spid;
        getAttrs(
            [
                'repeating_spell_spellattackid',
                'repeating_spell_spelloutput',
                'character_id',
                'repeating_spell_pickbase'
            ],
            function (v) {
                if (v.repeating_spell_spelloutput === 'ATTACK') {
                    // if(idlvl != "-npc_") {
                    setAttrs({repeating_spell_spellattackinfoflag: 'show'});
                    if (!v.repeating_spell_spellattackid) {
                        addspellattack(ourid);
                    } else {
                        getSectionIDs('repeating_attack', function (idarray) {
                            var existingid = _.find(idarray, function (thisid) {
                                return (
                                    thisid.toLowerCase() ===
                                    v.repeating_spell_spellattackid.toLowerCase()
                                );
                            });
                            if (!existingid) {
                                addspellattack(ourid);
                            } else {
                                getAttrs(
                                    [
                                        'repeating_attack_' +
                                        v.repeating_spell_spellattackid +
                                        '_hidden_pickbase'
                                    ],
                                    function (x) {
                                        // pbase = x["repeating_attack_" + v.repeating_spell_spellattackid + "_hidden_pickbase"];
                                        setAttrs({
                                            repeating_spell_rollcontent:
                                            '%{' +
                                            v.character_id +
                                            '|repeating_attack_' +
                                            v.repeating_spell_spellattackid +
                                            '_attack}'
                                        });
                                    }
                                );
                            }
                        });
                    }
                    // }
                    // else {
                    //     setAttrs({
                    //         repeating_spell_rollcontent: "@{rollbase}"
                    //     });
                    //     updateNPCspell(eventinfo);
                    // }
                } else {
                    setAttrs({
                        repeating_spell_rollcontent:
                            '@{wtype}&{template:spell} {{level=@{spellschool} @{spelllevel}}} {{name=@{spellname_base}}} {{castingtime=@{spellcastingtime}}} {{range=@{spellrange}}} {{target=@{spelltarget}}} @{spellcomp_v} @{spellcomp_s} @{spellcomp_m} {{material=@{spellcomp_materials}}} {{duration=@{spellduration}}} {{description=@{spelldescription}}} {{athigherlevels=@{spellathigherlevels}}} @{spellritual} @{spellconcentration} @{charname_output}',
                        repeating_spell_spellattackinfoflag: 'hide'
                    });
                }
            }
        );
    }
);

on(
    'change:repeating_spell-cantrip:spelldamage change:repeating_spell-1:spelldamage change:repeating_spell-2:spelldamage change:repeating_spell-3:spelldamage change:repeating_spell-4:spelldamage change:repeating_spell-5:spelldamage change:repeating_spell-6:spelldamage change:repeating_spell-7:spelldamage change:repeating_spell-8:spelldamage change:repeating_spell-9:spelldamage change:repeating_spell-npc:spelldamage change:repeating_spell-cantrip:spellhealing change:repeating_spell-1:spellhealing change:repeating_spell-2:spellhealing change:repeating_spell-3:spellhealing change:repeating_spell-4:spellhealing change:repeating_spell-5:spellhealing change:repeating_spell-6:spellhealing change:repeating_spell-7:spellhealing change:repeating_spell-8:spellhealing change:repeating_spell-9:spellhealing change:repeating_spell-npc:spellhealing',
    function () {
        getAttrs(
            ['repeating_spell_spelldamage', 'repeating_spell_spellhealing'],
            function (v) {
                if (
                    (v.repeating_spell_spelldamage &&
                        v.repeating_spell_spelldamage != '') ||
                    (v.repeating_spell_spellhealing &&
                        v.repeating_spell_spellhealing != '')
                ) {
                    setAttrs({
                        repeating_spell_spelloutput: 'ATTACK'
                    });
                }
            }
        );
    }
);

on('change:repeating_spell-cantrip:spell_damage_progression', function () {
    getAttrs(
        [
            'repeating_spell_spell_damage_progression',
            'repeating_spell_spelldamage'
        ],
        function (v) {
            if (
                v.repeating_spell_spell_damage_progression &&
                v.repeating_spell_spell_damage_progression === 'Cantrip Dice' &&
                v.repeating_spell_spelldamage &&
                v.repeating_spell_spelldamage.substring(0, 2) === '1d'
            ) {
                var damageformula =
                    '[[round((@{level} + 1) / 6 + 0.5)]]' +
                    v.repeating_spell_spelldamage.substring(1);
                setAttrs({
                    repeating_spell_spelldamage: damageformula
                });
            }
        }
    );
});

// on("change:repeating_spell-cantrip:spelldmgmod change:repeating_spell-1:spelldmgmod change:repeating_spell-2:spelldmgmod change:repeating_spell-3:spelldmgmod change:repeating_spell-4:spelldmgmod change:repeating_spell-5:spelldmgmod change:repeating_spell-6:spelldmgmod change:repeating_spell-7:spelldmgmod change:repeating_spell-8:spelldmgmod change:repeating_spell-9:spelldmgmod", function() {
//     getAttrs(["repeating_spell_spelldmgmod","repeating_spell_spelldamage","repeating_spell_spelldamage2","repeating_spell_spellhealing"], function(v) {
//         if(v.repeating_spell_spelldmgmod && v.repeating_spell_spelldmgmod != "" && (!v.repeating_spell_spellhealing) || v.repeating_spell_spellhealing ==="") {
//             update = {};
//             castingbonus = v.repeating_spell_spelldmgmod && v.repeating_spell_spelldmgmod === "Yes" ? " + @{spellcasting_ability}" : ""
//             if(v.repeating_spell_spelldamage && v.repeating_spell_spelldamage != "") {
//                 update["repeating_spell_spelldamage"] = v.repeating_spell_spelldamage + castingbonus;
//             }
//             else if(v.repeating_spell_spelldamage2 && v.repeating_spell_spelldamage2 != "") {
//                 update["repeating_spell_spelldamage2"] = v.repeating_spell_spelldamage2 + castingbonus;
//             }
//             setAttrs(update);
//         }
//     });
// });

// on("change:repeating_attack:hidden_pickbase", function(eventinfo) {
//     getAttrs(["repeating_attack_hidden_pickbase"], function(x) {
//         getSectionIDs("repeating_spell", function(idarray) {
//             attackid = eventinfo.sourceAttribute.substring(17, 37);
//             _.each(idarray, function(currentID) {
//                 getAttrs(["repeating_spell-cantrip_" + currentID + "_spelloutput","repeating_spell-cantrip_" + currentID + "_spellattackid","repeating_spell-1_" + currentID + "_spelloutput","repeating_spell-1_" + currentID + "_spellattackid","repeating_spell-2_" + currentID + "_spelloutput","repeating_spell-2_" + currentID + "_spellattackid","repeating_spell-3_" + currentID + "_spelloutput","repeating_spell-3_" + currentID + "_spellattackid","repeating_spell-4_" + currentID + "_spelloutput","repeating_spell-4_" + currentID + "_spellattackid","repeating_spell-5_" + currentID + "_spelloutput","repeating_spell-5_" + currentID + "_spellattackid","repeating_spell-6_" + currentID + "_spelloutput","repeating_spell-6_" + currentID + "_spellattackid","repeating_spell-7_" + currentID + "_spelloutput","repeating_spell-7_" + currentID + "_spellattackid","repeating_spell-8_" + currentID + "_spelloutput","repeating_spell-8_" + currentID + "_spellattackid","repeating_spell-9_" + currentID + "_spelloutput","repeating_spell-9_" + currentID + "_spellattackid","character_name"], function(v) {
//                     lvl = Object.keys(v)[0].match(/repeating_spell-(.*?)-/);
//                     if(lvl && v["repeating_spell-" + lvl[1] + currentID + "_spellattackid"] && v["repeating_spell-" + lvl[1] + currentID + "_spellattackid"].toLowerCase() === attackid && v["repeating_spell-" + lvl[1] + currentID + "_spelloutput"] === "ATTACK") {
//                         update = {};
//                         update["repeating_spell-" + lvl[1] + currentID + "_rollcontent"] = "%{" + v.character_name + "|repeating_attack_" + attackid + "_attack_" + x.repeating_attack_hidden_pickbase + "}";
//                         setAttrs(update);
//                     }
//                 });
//             });
//         });
//     })

// });

on(
    'change:repeating_npcaction:name change:repeating_npcaction:attack_flag change:repeating_npcaction:attack_type change:repeating_npcaction:attack_range change:repeating_npcaction:attack_target change:repeating_npcaction:attack_tohit change:repeating_npcaction:attack_damage change:repeating_npcaction:attack_damagetype change:repeating_npcaction:attack_damage2 change:repeating_npcaction:attack_damagetype2 change:repeating_npcaction:description change:repeating_npcaction-l:name change:repeating_npcaction-l:attack_flag change:repeating_npcaction-l:attack_type change:repeating_npcaction-l:attack_range change:repeating_npcaction-l:attack_target change:repeating_npcaction-l:attack_tohit change:repeating_npcaction-l:attack_damage change:repeating_npcaction-l:attack_damagetype change:repeating_npcaction-l:attack_damage2 change:repeating_npcaction-l:attack_damagetype2 change:repeating_npcaction-l:description change:repeating_npcaction:updateflag change:repeating_npcaction-l:updateflag',
    function (eventinfo) {
        updateNPCaction(eventinfo);
    }
);

on('change:npc_challenge', function () {
    getAttrs(['npc_challenge'], function (v) {
        var xp = 0;
        switch (v.npc_challenge) {
            case '0':
                xp = '10';
                break;
            case '1/8':
                xp = '25';
                break;
            case '1/4':
                xp = '50';
                break;
            case '1/2':
                xp = '100';
                break;
            case '1':
                xp = '200';
                break;
            case '2':
                xp = '450';
                break;
            case '3':
                xp = '700';
                break;
            case '4':
                xp = '1100';
                break;
            case '5':
                xp = '1800';
                break;
            case '6':
                xp = '2300';
                break;
            case '7':
                xp = '2900';
                break;
            case '8':
                xp = '3900';
                break;
            case '9':
                xp = '5000';
                break;
            case '10':
                xp = '5900';
                break;
            case '11':
                xp = '7200';
                break;
            case '12':
                xp = '8400';
                break;
            case '13':
                xp = '10000';
                break;
            case '14':
                xp = '11500';
                break;
            case '15':
                xp = '13000';
                break;
            case '16':
                xp = '15000';
                break;
            case '17':
                xp = '18000';
                break;
            case '18':
                xp = '20000';
                break;
            case '19':
                xp = '22000';
                break;
            case '20':
                xp = '25000';
                break;
            case '21':
                xp = '33000';
                break;
            case '22':
                xp = '41000';
                break;
            case '23':
                xp = '50000';
                break;
            case '24':
                xp = '62000';
                break;
            case '30':
                xp = '155000';
                break;
        }
        setAttrs({npc_xp: xp});
    });
});

on('change:simpleinventory', function () {
    getAttrs(['simpleinventory'], function (v) {
        setAttrs({
            inventoryflag: v.simpleinventory
        });
    });
});

on(
    'change:repeating_inventory:itemweight change:repeating_inventory:equipped change:repeating_inventory:itemcount change:cp change:sp change:ep change:gp change:pp',
    function () {
        updateitemweight();
    }
);

on('change:repeating_inventory:itemtype', function (eventinfo) {
    id = eventinfo.sourceAttribute.substring(20, 40);
    getAttrs(
        ['repeating_inventory_itemtype', 'repeating_inventory_itemname'],
        function (v) {
            if (v.repeating_inventory_itemtype) {
                updateglobalsave();
                if (v.repeating_inventory_itemtype.indexOf('Weapon') > -1) {
                    existingattacks = [];
                    getSectionIDs('repeating_attack', function (idarray) {
                        if (idarray.length > 0) {
                            _.each(idarray, function (currentID, i) {
                                getAttrs(
                                    [
                                        'repeating_attack_' +
                                        currentID +
                                        '_atkname_base'
                                    ],
                                    function (x) {
                                        if (
                                            v[
                                            'repeating_attack_' +
                                            currentID +
                                            '_atkname_base'
                                                ] &&
                                            v[
                                            'repeating_attack_' +
                                            currentID +
                                            '_atkname_base'
                                                ] != ''
                                        ) {
                                            existingattacks.push(
                                                x[
                                                'repeating_attack_' +
                                                currentID +
                                                '_atkname_base'
                                                    ].toLowerCase()
                                            );
                                        }
                                        if (
                                            i === idarray.length - 1 &&
                                            v.repeating_inventory_itemname
                                        ) {
                                            if (
                                                existingattacks.indexOf(
                                                    v.repeating_inventory_itemname.toLowerCase()
                                                ) === -1
                                            ) {
                                                additemattack(id);
                                            }
                                        }
                                    }
                                );
                            });
                        } else {
                            additemattack(id);
                        }
                    });
                } else {
                    updateac();
                }
            } else {
                updateac();
                updateitemweight();
                updateglobalsave();
            }
        }
    );
});

on(
    'remove:repeating_spell-cantrip remove:repeating_spell-1 remove:repeating_spell-2 remove:repeating_spell-3 remove:repeating_spell-4 remove:repeating_spell-5 remove:repeating_spell-6 remove:repeating_spell-7 remove:repeating_spell-8 remove:repeating_spell-9 remove:repeating_spell-npc',
    function (eventinfo) {
        id = eventinfo.sourceAttribute.split('_')[2];
        getSectionIDs('repeating_attack', function (idarray) {
            _.each(idarray, function (currentID, i) {
                getAttrs(
                    ['repeating_attack_' + currentID + '_spellid'],
                    function (v) {
                        var spellid =
                            v['repeating_attack_' + currentID + '_spellid'] &&
                            v[
                            'repeating_attack_' + currentID + '_spellid'
                                ].indexOf('_') > -1
                                ? v[
                                'repeating_attack_' +
                                currentID +
                                '_spellid'
                                    ].split('_')[1]
                                : v[
                                'repeating_attack_' +
                                currentID +
                                '_spellid'
                                    ];
                        if (spellid === id.toLowerCase()) {
                            removeRepeatingRow('repeating_attack_' + currentID);
                        }
                    }
                );
            });
        });
    }
);

on('remove:repeating_inventory', function (eventinfo) {
    id = eventinfo.sourceAttribute.substring(20, 40);
    getSectionIDs('repeating_attack', function (idarray) {
        _.each(idarray, function (currentID, i) {
            getAttrs(['repeating_attack_' + currentID + '_itemid'], function (v) {
                if (
                    v['repeating_attack_' + currentID + '_itemid'] ===
                    id.toLowerCase()
                ) {
                    removeRepeatingRow('repeating_attack_' + currentID);
                }
            });
        });
    });
    getAttrs(['other_resource_itemid'], function (v) {
        if (v['other_resource_itemid'] === id.toLowerCase()) {
            update['other_resource_itemid'] = '';
            update['other_resource'] = '';
            update['other_resource_name'] = '';
            update['other_resource_max'] = '';
            setAttrs(update);
        }
    });
    getSectionIDs('repeating_resource', function (idarray) {
        var update = {};
        _.each(idarray, function (currentID, i) {
            getAttrs(
                [
                    'repeating_resource_' + currentID + '_resource_left_itemid',
                    'repeating_resource_' + currentID + '_resource_right_itemid'
                ],
                function (v) {
                    if (
                        v[
                        'repeating_resource_' +
                        currentID +
                        '_resource_left_itemid'
                            ] === id.toLowerCase()
                    ) {
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_left_itemid'
                            ] =
                            '';
                        update[
                        'repeating_resource_' + currentID + '_resource_left'
                            ] =
                            '';
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_left_name'
                            ] =
                            '';
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_left_max'
                            ] =
                            '';
                        setAttrs(update);
                    }
                    if (
                        v[
                        'repeating_resource_' +
                        currentID +
                        '_resource_right_itemid'
                            ] === id.toLowerCase()
                    ) {
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_right_itemid'
                            ] =
                            '';
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_right'
                            ] =
                            '';
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_right_name'
                            ] =
                            '';
                        update[
                        'repeating_resource_' +
                        currentID +
                        '_resource_right_max'
                            ] =
                            '';
                        setAttrs(update);
                    }
                }
            );
        });
    });
    updateac();
    updateitemweight();
    updateglobalsave();
});

on(
    'change:dexterity change:repeating_inventory:equipped change:globalacmod change:repeating_inventory:itemmodifiers change:custom_ac_flag change:custom_ac_base change:custom_ac_part1 change:custom_ac_part2',
    function () {
        getAttrs(['simpleinventory', 'custom_ac_flag'], function (v) {
            if (v.custom_ac_flag === '1') {
                getAttrs(
                    [
                        'custom_ac_base',
                        'custom_ac_part1',
                        'custom_ac_part2',
                        'strength',
                        'dexterity',
                        'constitution',
                        'intelligence',
                        'wisdom',
                        'charisma'
                    ],
                    function (b) {
                        var base =
                            isNaN(parseInt(b.custom_ac_base, 10)) === false
                                ? parseInt(b.custom_ac_base, 10)
                                : 10;
                        var part1attr = b.custom_ac_part1.toLowerCase();
                        var part2attr = b.custom_ac_part2.toLowerCase();
                        var part1 =
                            part1attr === 'none'
                                ? 0
                                : Math.floor((parseInt(b[part1attr]) - 10) / 2);
                        var part2 =
                            part2attr === 'none'
                                ? 0
                                : Math.floor((parseInt(b[part2attr]) - 10) / 2);
                        var total = base + part1 + part2;
                        setAttrs({ac: total});
                    }
                );
            } else if (v.simpleinventory === 'complex') {
                updateac();
            }
        });
    }
);

on('change:repeating_inventory:itemmodifiers', function () {
    updateglobalsave();
    getAttrs(['repeating_inventory_itemmodifiers'], function (v) {
        if (
            v.repeating_inventory_itemmodifiers &&
            v.repeating_inventory_itemmodifiers
                .toLowerCase()
                .indexOf('spell attack') > -1
        ) {
            var spellbonus = 0;
            getSectionIDs('repeating_inventory', function (idarray) {
                if (idarray.length > 0) {
                    _.each(idarray, function (currentID, i) {
                        getAttrs(
                            [
                                'repeating_inventory_' +
                                currentID +
                                '_itemmodifiers'
                            ],
                            function (x) {
                                if (
                                    x[
                                    'repeating_inventory_' +
                                    currentID +
                                    '_itemmodifiers'
                                        ] &&
                                    x[
                                    'repeating_inventory_' +
                                    currentID +
                                    '_itemmodifiers'
                                        ]
                                        .toLowerCase()
                                        .indexOf('spell attack') > -1
                                ) {
                                    spellbonus =
                                        spellbonus +
                                        parseInt(
                                            x[
                                            'repeating_inventory_' +
                                            currentID +
                                            '_itemmodifiers'
                                                ]
                                                .toLowerCase()
                                                .split('spell attack +')[1]
                                                .substring(0, 1),
                                            10
                                        );
                                }
                                if (i === idarray.length - 1) {
                                    setAttrs({globalmagicmod: spellbonus});
                                }
                            }
                        );
                    });
                }
            });
        }
    });
});

on('change:armorwarning', function () {
    getAttrs(['armorwarning'], function (v) {
        if (v.armorwarning === 'hide') {
            setAttrs({armorwarningflag: '0'});
        }
    });
});

var npc_exception_actions = ['Web (Recharge 5-6)'];
on('change:npc_typebase', function () {
    getAttrs(
        [
            'npc_typebase',
            'npc_sizebase',
            'npc_alignmentbase',
            'npc_acbase',
            'npc_hpbase',
            'npc_savingthrowsbase',
            'npc_sensesbase',
            'npc_passiveperceptionbase',
            'npc_skillsbase',
            'npc_content'
        ],
        function (v) {
            if (v.npc_typebase && v.npc_typebase != '') {
                update = {};
                update['npc_typebase'] = '';
                update['npc_options-flag'] = '0';
                update['npc_type'] =
                    v.npc_sizebase +
                    ' ' +
                    v.npc_typebase.toLowerCase() +
                    ', ' +
                    v.npc_alignmentbase;
                if (v.npc_acbase.indexOf('(') > -1) {
                    update['npc_ac'] = v.npc_acbase.split(' (')[0];
                    update['npc_actype'] = v.npc_acbase
                        .split(' (')[1]
                        .slice(0, -1);
                } else {
                    update['npc_ac'] = v.npc_acbase;
                    update['npc_actype'] = '';
                }
                if (v.npc_hpbase.indexOf('(') > -1) {
                    update['hp_max'] = v.npc_hpbase.split(' (')[0];
                    update['npc_hpformula'] = v.npc_hpbase
                        .split(' (')[1]
                        .slice(0, -1);
                } else {
                    update['hp_max'] = v.npc_hpbase;
                    update['npc_hpformula'] = '';
                }
                update['npc_senses'] =
                    v.npc_sensesbase +
                    ', passive Perception ' +
                    v.npc_passiveperceptionbase;
                if (v.npc_savingthrowsbase && v.npc_savingthrowsbase != '') {
                    savearray = v.npc_savingthrowsbase.split(', ');
                    _.each(savearray, function (save) {
                        kv = save.split(' +');
                        update[
                        'npc_' + kv[0].toLowerCase() + '_save'
                            ] = parseInt(kv[1], 10);
                    });
                }
                if (v.npc_skillsbase && v.npc_skillsbase != '') {
                    skillarray = v.npc_skillsbase.split(', ');
                    _.each(skillarray, function (skill) {
                        kv = skill.split(' +');
                        update[
                        'npc_' + kv[0].toLowerCase().replace(/ /g, '_')
                            ] = parseInt(kv[1], 10);
                    });
                }
                var contentarray = v.npc_content;
                if (
                    contentarray &&
                    contentarray.indexOf('Legendary Actions') > -1
                ) {
                    if (contentarray.indexOf(/\n Legendary Actions\n/) > -1) {
                        temp = contentarray.split(/\n Legendary Actions\n/);
                    } else {
                        temp = contentarray.split(/Legendary Actions\n/);
                    }
                    var legendaryactionsarray = temp[1];
                    contentarray = temp[0];
                }
                if (contentarray && contentarray.indexOf('Reactions') > -1) {
                    if (contentarray.indexOf(/\n Reactions\n/) > -1) {
                        temp = contentarray.split(/\n Reactions\n/);
                    } else {
                        temp = contentarray.split(/Reactions\n/);
                    }
                    var reactionsarray = temp[1];
                    contentarray = temp[0];
                }
                if (contentarray && contentarray.indexOf('Actions') > -1) {
                    if (contentarray.indexOf('Lair Actions') > -1) {
                        contentarray = contentarray.replace(
                            'Lair Actions',
                            'Lair Action'
                        );
                    }
                    if (contentarray.indexOf(/\n Actions\n/) > -1) {
                        temp = contentarray.split(/\n Actions\n/);
                    } else {
                        temp = contentarray.split(/Actions\n/);
                    }
                    var actionsarray = temp[1];
                    contentarray = temp[0];
                }
                if (contentarray && contentarray.indexOf('Traits') > -1) {
                    if (contentarray.indexOf('Lair Traits') > -1) {
                        contentarray = contentarray.replace(
                            'Lair Traits',
                            'Lair Trait'
                        );
                    }
                    if (contentarray.indexOf(/\n Traits\n/) > -1) {
                        temp = contentarray.split(/\n Traits\n/);
                    } else {
                        temp = contentarray.split(/Traits\n/);
                    }
                    var traitsarray = temp[1];
                    contentarray = temp[0];
                }
                if (traitsarray) {
                    traitsarray = traitsarray.split('**');
                    traitsarray.shift();
                    var traitsobj = {};
                    traitsarray.forEach(function (val, i) {
                        if (i % 2 === 1) return;
                        traitsobj[val] = traitsarray[i + 1];
                    });
                    _.each(traitsobj, function (desc, name) {
                        newrowid = generateRowID();
                        update['repeating_npctrait_' + newrowid + '_name'] =
                            name + '.';
                        if (
                            desc.substring(0, 2) === ': ' ||
                            encodeURI(desc.substring(0, 2)) === ':%C2%A0'
                        ) {
                            desc = desc.substring(2);
                        }
                        update[
                        'repeating_npctrait_' + newrowid + '_desc'
                            ] = desc.trim();
                    });
                }
                if (actionsarray) {
                    actionsarray = actionsarray.split('**');
                    actionsarray.shift();
                    var actionsobj = {};
                    actionsarray.forEach(function (val, i) {
                        if (i % 2 === 1) return;
                        actionsobj[val] = actionsarray[i + 1];
                    });
                    _.each(actionsobj, function (desc, name) {
                        newrowid = generateRowID();
                        update[
                        'repeating_npcaction_' +
                        newrowid +
                        '_npc_options-flag'
                            ] =
                            '0';
                        update[
                        'repeating_npcaction_' + newrowid + '_name'
                            ] = name;
                        if (
                            desc.substring(0, 2) === ': ' ||
                            encodeURI(desc.substring(0, 2)) === ':%C2%A0'
                        ) {
                            desc = desc.substring(2);
                        }
                        if (desc.indexOf(' Attack:') > -1) {
                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_attack_flag'
                                ] =
                                'on';
                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_attack_display_flag'
                                ] =
                                '{{attack=1}}';
                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_attack_options'
                                ] =
                                '{{attack=1}}';
                            if (desc.indexOf(' Weapon Attack:') > -1) {
                                attacktype = desc.split(' Weapon Attack:')[0];
                            } else if (desc.indexOf(' Spell Attack:') > -1) {
                                attacktype = desc.split(' Spell Attack:')[0];
                            } else {
                                console.log(
                                    'FAILED TO IMPORT ATTACK - NO ATTACK TYPE FOUND (Weapon Attack/Spell Attack)'
                                );
                                return;
                            }

                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_attack_type'
                                ] = attacktype;
                            if (attacktype === 'Melee') {
                                update[
                                'repeating_npcaction_' +
                                newrowid +
                                '_attack_range'
                                    ] = (desc.match(/reach (.*?),/) || ['', ''])[1];
                            } else {
                                update[
                                'repeating_npcaction_' +
                                newrowid +
                                '_attack_range'
                                    ] = (desc.match(/range (.*?),/) || ['', ''])[1];
                            }
                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_attack_tohit'
                                ] = (desc.match(/\+(.*) to hit/) || ['', ''])[1];
                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_attack_target'
                                ] = (desc.match(/\.,(?!.*\.,)(.*)\. Hit:/) || [
                                '',
                                ''
                            ])[1];
                            if (
                                desc.toLowerCase().indexOf('damage') > -1 &&
                                npc_exception_actions.indexOf(name) === -1
                            ) {
                                update[
                                'repeating_npcaction_' +
                                newrowid +
                                '_attack_damage'
                                    ] = (desc.match(/\(([^)]+)\)/) || ['', ''])[1];
                                update[
                                'repeating_npcaction_' +
                                newrowid +
                                '_attack_damagetype'
                                    ] = (desc.match(/\) (.*?) damage/) || [
                                    '',
                                    ''
                                ])[1];
                                if (
                                    (desc.match(/\(/g) || []).length > 1 &&
                                    (!desc
                                            .match(/\((?!.*\()([^)]+)\)/)
                                            .indexOf(' DC')[1] ||
                                        desc
                                            .match(/\((?!.*\()([^)]+)\)/)
                                            .indexOf(' DC')[1] === -1)
                                ) {
                                    update[
                                    'repeating_npcaction_' +
                                    newrowid +
                                    '_attack_damage2'
                                        ] = (desc.match(/\((?!.*\()([^)]+)\)/) || [
                                        '',
                                        ''
                                    ])[1];
                                    update[
                                    'repeating_npcaction_' +
                                    newrowid +
                                    '_attack_damagetype2'
                                        ] = (desc.match(
                                        /\)(?!.*\)) (.*?) damage/
                                    ) || ['', ''])[1];
                                }
                                ctest1 = desc.split('damage.')[1];
                                ctest2 = desc.split('damage, ')[1];
                                if (ctest1 && ctest1.length > 0) {
                                    update[
                                    'repeating_npcaction_' +
                                    newrowid +
                                    '_description'
                                        ] = ctest1.trim();
                                } else if (ctest2 && ctest2.length > 0) {
                                    update[
                                    'repeating_npcaction_' +
                                    newrowid +
                                    '_description'
                                        ] = ctest2.trim();
                                }
                            } else {
                                update[
                                'repeating_npcaction_' +
                                newrowid +
                                '_description'
                                    ] = desc.split('Hit:')[1].trim();
                            }
                        } else {
                            update[
                            'repeating_npcaction_' +
                            newrowid +
                            '_description'
                                ] = desc;
                        }
                    });
                }
                if (reactionsarray) {
                    update['npcreactionsflag'] = 1;
                    reactionsarray = reactionsarray.split('**');
                    reactionsarray.shift();
                    var reactionsobj = {};
                    reactionsarray.forEach(function (val, i) {
                        if (i % 2 === 1) return;
                        reactionsobj[val] = reactionsarray[i + 1];
                    });
                    _.each(reactionsobj, function (desc, name) {
                        newrowid = generateRowID();
                        update['repeating_npcreaction_' + newrowid + '_name'] =
                            name + '.';
                        if (
                            desc.substring(0, 2) === ': ' ||
                            encodeURI(desc.substring(0, 2)) === ':%C2%A0'
                        ) {
                            desc = desc.substring(2);
                        }
                        update[
                        'repeating_npcreaction_' + newrowid + '_desc'
                            ] = desc.trim();
                    });
                }
                if (legendaryactionsarray) {
                    update[
                        'npc_legendary_actions'
                        ] = (legendaryactionsarray.match(/\d+/) || [''])[0];
                    legendaryactionsarray = legendaryactionsarray.split('**');
                    legendaryactionsarray.shift();
                    var actionsobj = {};
                    legendaryactionsarray.forEach(function (val, i) {
                        if (i % 2 === 1) return;
                        actionsobj[val] = legendaryactionsarray[i + 1];
                    });
                    _.each(actionsobj, function (desc, name) {
                        newrowid = generateRowID();
                        update[
                        'repeating_npcaction-l_' +
                        newrowid +
                        '_npc_options-flag'
                            ] =
                            '0';
                        update[
                        'repeating_npcaction-l_' + newrowid + '_name'
                            ] = name;
                        if (
                            desc.substring(0, 2) === ': ' ||
                            encodeURI(desc.substring(0, 2)) === ':%C2%A0'
                        ) {
                            desc = desc.substring(2);
                        }
                        if (desc.indexOf(' Attack:') > -1) {
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_flag'
                                ] =
                                'on';
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_display_flag'
                                ] =
                                '{{attack=1}}';
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_options'
                                ] =
                                '{{attack=1}}';
                            if (desc.indexOf(' Weapon Attack:') > -1) {
                                attacktype = desc.split(' Weapon Attack:')[0];
                            } else if (desc.indexOf(' Spell Attack:') > -1) {
                                attacktype = desc.split(' Spell Attack:')[0];
                            } else {
                                console.log(
                                    'FAILED TO IMPORT ATTACK - NO ATTACK TYPE FOUND (Weapon Attack/Spell Attack)'
                                );
                                return;
                            }
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_type'
                                ] = attacktype;
                            if (attacktype === 'Melee') {
                                update[
                                'repeating_npcaction-l_' +
                                newrowid +
                                '_attack_range'
                                    ] = (desc.match(/reach (.*?),/) || ['', ''])[1];
                            } else {
                                update[
                                'repeating_npcaction-l_' +
                                newrowid +
                                '_attack_range'
                                    ] = (desc.match(/range (.*?),/) || ['', ''])[1];
                            }
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_tohit'
                                ] = (desc.match(/\+(.*) to hit/) || ['', ''])[1];
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_target'
                                ] = (desc.match(/\.,(?!.*\.,)(.*)\. Hit:/) || [
                                '',
                                ''
                            ])[1];
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_damage'
                                ] = (desc.match(/\(([^)]+)\)/) || ['', ''])[1];
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_attack_damagetype'
                                ] = (desc.match(/\) (.*?) damage/) || ['', ''])[1];
                            if (
                                (desc.match(/\(/g) || []).length > 1 &&
                                (!desc
                                        .match(/\((?!.*\()([^)]+)\)/)
                                        .indexOf(' DC')[1] ||
                                    desc
                                        .match(/\((?!.*\()([^)]+)\)/)
                                        .indexOf(' DC')[1] === -1)
                            ) {
                                update[
                                'repeating_npcaction-l_' +
                                newrowid +
                                '_attack_damage2'
                                    ] = (desc.match(/\((?!.*\()([^)]+)\)/) || [
                                    '',
                                    ''
                                ])[1];
                                update[
                                'repeating_npcaction-l_' +
                                newrowid +
                                '_attack_damagetype2'
                                    ] = (desc.match(/\)(?!.*\)) (.*?) damage/) || [
                                    '',
                                    ''
                                ])[1];
                            }
                        } else {
                            update[
                            'repeating_npcaction-l_' +
                            newrowid +
                            '_description'
                                ] = desc;
                        }
                    });
                }

                setAttrs(update);
            }
        }
    );
});

on(
    'change:spellcasting_ability change:strength change:dexterity change:constitution change:intelligence change:wisdom change:charisma',
    function () {
        getSectionIDs('repeating_attack', function (idarray) {
            _.each(idarray, function (currentID, i) {
                getAttrs(
                    ['repeating_attack_' + currentID + '_updateflag'],
                    function (v) {
                        update = {};
                        toggle =
                            v[
                            'repeating_attack_' + currentID + '_updateflag'
                                ] === true
                                ? false
                                : true;
                        update[
                        'repeating_attack_' + currentID + '_updateflag'
                            ] = toggle;
                        setAttrs(update);
                    }
                );
            });
        });
    }
);

on('change:globalsavemod', function () {
    getAttrs(['globalsavemod'], function (v) {
        bonus =
            v.globalsavemod && v.globalsavemod != ''
                ? '+@{globalsavemod}[UNIV]'
                : '';
        setAttrs({globalsavingthrowbonus: bonus});
    });
});

on('change:halflingluck_flag', function () {
    getAttrs(['halflingluck_flag'], function (v) {
        toggle =
            v.halflingluck_flag && v.halflingluck_flag === '1' ? 'ro<1' : '';
        setAttrs({halflingluck: toggle});
    });
});

on(
    'change:weighttotal change:encumberance_setting change:strength',
    function () {
        getAttrs(['weighttotal', 'encumberance_setting', 'strength'], function (v) {
            var update = {};
            var str = parseInt(v.strength, 10);
            var weight = parseInt(v.weighttotal, 10);
            if (!v.encumberance_setting || v.encumberance_setting === 'on') {
                if (weight > str * 15) {
                    update['encumberance'] = 'IMMOBILE';
                } else if (weight > str * 10) {
                    update['encumberance'] = 'HEAVILY ENCUMBERED';
                } else if (weight > str * 5) {
                    update['encumberance'] = 'ENCUMBERED';
                } else {
                    update['encumberance'] = ' ';
                }
            } else {
                if (weight > str * 15) {
                    update['encumberance'] = 'OVER CARRYING CAPACITY';
                } else {
                    update['encumberance'] = ' ';
                }
            }
            setAttrs(update);
        });
    }
);

on(
    'change:repeating_inventory:useasresource change:repeating_inventory:itemcount change:repeating_inventory:itemname',
    function (eventinfo) {
        itemid = eventinfo.sourceAttribute.substring(20, 40);
        sourcetype = eventinfo.sourceType;
        var update = {};
        var newrowid = generateRowID();
        getAttrs(
            [
                'repeating_inventory_itemresourceid',
                'repeating_inventory_useasresource',
                'repeating_inventory_itemcount',
                'repeating_inventory_itemname',
                'repeating_inventory_itemattackid'
            ],
            function (v) {
                var count =
                    v['repeating_inventory_itemcount'] &&
                    v['repeating_inventory_itemcount'] != ''
                        ? v['repeating_inventory_itemcount']
                        : 0;
                var name =
                    v['repeating_inventory_itemname'] &&
                    v['repeating_inventory_itemname'] != ''
                        ? v['repeating_inventory_itemname']
                        : '';
                if (
                    v.repeating_inventory_useasresource &&
                    v.repeating_inventory_useasresource === '1'
                ) {
                    if (
                        v.repeating_inventory_itemresourceid &&
                        v.repeating_inventory_itemresourceid != ''
                    ) {
                        if (sourcetype && sourcetype === 'player') {
                            if (
                                v.repeating_inventory_itemresourceid ===
                                'other_resource'
                            ) {
                                update['other_resource'] = count;
                                update['other_resource_name'] = name;
                            } else {
                                update[
                                'repeating_resource_' +
                                v.repeating_inventory_itemresourceid
                                    ] = count;
                                update[
                                'repeating_resource_' +
                                v.repeating_inventory_itemresourceid +
                                '_name'
                                    ] = name;
                            }
                            setAttrs(update, {silent: true});
                        }
                    } else {
                        getAttrs(['other_resource_name'], function (x) {
                            if (
                                x.other_resource_name &&
                                x.other_resource_name != ''
                            ) {
                                getSectionIDs('repeating_resource', function (idarray) {
                                    if (idarray.length > 0) {
                                        var match = false;
                                        _.each(idarray, function (currentID, i) {
                                            getAttrs(
                                                [
                                                    'repeating_resource_' +
                                                    currentID +
                                                    '_resource_left_name',
                                                    'repeating_resource_' +
                                                    currentID +
                                                    '_resource_right_name'
                                                ],
                                                function (y) {
                                                    if (
                                                        (!y[
                                                            'repeating_resource_' +
                                                            currentID +
                                                            '_resource_left_name'
                                                                ] ||
                                                            y[
                                                            'repeating_resource_' +
                                                            currentID +
                                                            '_resource_left_name'
                                                                ] === '') &&
                                                        match === false
                                                    ) {
                                                        match = true;
                                                        update[
                                                            'repeating_inventory_itemresourceid'
                                                            ] =
                                                            currentID +
                                                            '_resource_left';
                                                        update[
                                                        'repeating_resource_' +
                                                        currentID +
                                                        '_resource_left_itemid'
                                                            ] = itemid;
                                                        update[
                                                        'repeating_resource_' +
                                                        currentID +
                                                        '_resource_left'
                                                            ] = count;
                                                        update[
                                                        'repeating_resource_' +
                                                        currentID +
                                                        '_resource_left_name'
                                                            ] = name;
                                                    } else if (
                                                        (!y[
                                                            'repeating_resource_' +
                                                            currentID +
                                                            '_resource_right_name'
                                                                ] ||
                                                            y[
                                                            'repeating_resource_' +
                                                            currentID +
                                                            '_resource_right_name'
                                                                ] === '') &&
                                                        match === false
                                                    ) {
                                                        match = true;
                                                        update[
                                                            'repeating_inventory_itemresourceid'
                                                            ] =
                                                            currentID +
                                                            '_resource_right';
                                                        update[
                                                        'repeating_resource_' +
                                                        currentID +
                                                        '_resource_right_itemid'
                                                            ] = itemid;
                                                        update[
                                                        'repeating_resource_' +
                                                        currentID +
                                                        '_resource_right'
                                                            ] = count;
                                                        update[
                                                        'repeating_resource_' +
                                                        currentID +
                                                        '_resource_right_name'
                                                            ] = name;
                                                    }
                                                    if (
                                                        i ===
                                                        idarray.length -
                                                        1 &&
                                                        match === false
                                                    ) {
                                                        update[
                                                            'repeating_inventory_itemresourceid'
                                                            ] =
                                                            newrowid +
                                                            '_resource_left';
                                                        update[
                                                        'repeating_resource_' +
                                                        newrowid +
                                                        '_resource_left_itemid'
                                                            ] = itemid;
                                                        update[
                                                        'repeating_resource_' +
                                                        newrowid +
                                                        '_resource_left'
                                                            ] = count;
                                                        update[
                                                        'repeating_resource_' +
                                                        newrowid +
                                                        '_resource_left_name'
                                                            ] = name;
                                                    }
                                                    setAttrs(update, {
                                                        silent: true
                                                    });
                                                }
                                            );
                                        });
                                    } else {
                                        update[
                                            'repeating_inventory_itemresourceid'
                                            ] =
                                            newrowid + '_resource_left';
                                        update[
                                        'repeating_resource_' +
                                        newrowid +
                                        '_resource_left_itemid'
                                            ] = itemid;
                                        update[
                                        'repeating_resource_' +
                                        newrowid +
                                        '_resource_left'
                                            ] = count;
                                        update[
                                        'repeating_resource_' +
                                        newrowid +
                                        '_resource_left_name'
                                            ] = name;
                                        setAttrs(update, {silent: true});
                                    }
                                });
                            } else {
                                update['repeating_inventory_itemresourceid'] =
                                    'other_resource';
                                update['other_resource_itemid'] = itemid;
                                update['other_resource'] = count;
                                update['other_resource_name'] = name;
                                setAttrs(update, {silent: true});
                            }
                        });
                    }
                } else {
                    if (
                        v.repeating_inventory_itemresourceid &&
                        v.repeating_inventory_itemresourceid != ''
                    ) {
                        update['repeating_inventory_itemresourceid'] = '';
                        if (
                            v.repeating_inventory_itemresourceid ===
                            'other_resource'
                        ) {
                            update['other_resource'] = '';
                            update['other_resource_name'] = '';
                            update['other_resource_max'] = '';
                        } else {
                            update[
                            'repeating_resource_' +
                            v.repeating_inventory_itemresourceid
                                ] =
                                '';
                            update[
                            'repeating_resource_' +
                            v.repeating_inventory_itemresourceid +
                            '_name'
                                ] =
                                '';
                            update[
                            'repeating_resource_' +
                            v.repeating_inventory_itemresourceid +
                            '_max'
                                ] =
                                '';
                        }
                        setAttrs(update, {silent: true});
                    }
                }
                if (
                    sourcetype &&
                    sourcetype === 'player' &&
                    v['repeating_inventory_itemattackid'] &&
                    v['repeating_inventory_itemattackid'] != ''
                ) {
                    update[
                    'repeating_attack_' +
                    v['repeating_inventory_itemattackid'] +
                    '_atkname_base'
                        ] = name;
                    setAttrs(update);
                }
            }
        );
    }
);

on(
    'change:other_resource change:other_resource_name change:repeating_resource:resource_left change:repeating_resource:resource_left_name change:repeating_resource:resource_right change:repeating_resource:resource_right_name',
    function (eventinfo) {
        if (eventinfo.sourceType && eventinfo.sourceType === 'player') {
            var update = {};
            if (eventinfo.sourceAttribute === 'other_resource') {
                getAttrs(
                    [
                        'other_resource_itemid',
                        'other_resource',
                        'other_resource_name'
                    ],
                    function (v) {
                        update[
                        'repeating_inventory_' +
                        v['other_resource_itemid'] +
                        '_itemcount'
                            ] =
                            v['other_resource'];
                        update[
                        'repeating_inventory_' +
                        v['other_resource_itemid'] +
                        '_itemname'
                            ] =
                            v['other_resource_name'];
                        setAttrs(update, {silent: true});
                    }
                );
            } else if (eventinfo.sourceAttribute.indexOf('left') > -1) {
                getAttrs(
                    [
                        'repeating_resource_resource_left_itemid',
                        'repeating_resource_resource_left',
                        'repeating_resource_resource_left_name'
                    ],
                    function (v) {
                        update[
                        'repeating_inventory_' +
                        v['repeating_resource_resource_left_itemid'] +
                        '_itemcount'
                            ] =
                            v['repeating_resource_resource_left'];
                        update[
                        'repeating_inventory_' +
                        v['repeating_resource_resource_left_itemid'] +
                        '_itemname'
                            ] =
                            v['repeating_resource_resource_left_name'];
                        setAttrs(update, {silent: true});
                    }
                );
            } else if (eventinfo.sourceAttribute.indexOf('right') > -1) {
                getAttrs(
                    [
                        'repeating_resource_resource_right_itemid',
                        'repeating_resource_resource_right',
                        'repeating_resource_resource_right_name'
                    ],
                    function (v) {
                        update[
                        'repeating_inventory_' +
                        v['repeating_resource_resource_right_itemid'] +
                        '_itemcount'
                            ] =
                            v['repeating_resource_resource_right'];
                        update[
                        'repeating_inventory_' +
                        v['repeating_resource_resource_right_itemid'] +
                        '_itemname'
                            ] =
                            v['repeating_resource_resource_right_name'];
                        setAttrs(update, {silent: true});
                    }
                );
            }
        }
    }
);

on('change:repeating_attack:savedc', function () {
    getAttrs(['repeating_attack_savedc'], function (v) {
        var update = {};
        if (
            v.repeating_attack_savedc &&
            v.repeating_attack_savedc === '(@{saveflat})'
        ) {
            update['repeating_attack_flatflag'] = 'show';
        } else {
            update['repeating_attack_flatflag'] = 'hide';
        }
        setAttrs(update);
    });
});

on('change:charname_output change:globalmagicmod', function () {
    force_refresh_attacks();
});

on('change:rtype', function () {
    var update = {};
    getAttrs(['rtype'], function (v) {
        if (v.rtype && v.rtype === '@{advantagetoggle}') {
            update['toggleflag'] = 'show';
        } else {
            update['toggleflag'] = 'hide';
        }
        setAttrs(update);
    });
});

on(
    'change:npc_spelldc change:npc_spellattackmod change:spellcasting_ability ',
    function () {
        force_refresh_spells();
    }
);

on('change:ammotracking', function () {
    getAttrs(['ammotracking'], function (v) {
        if (v['ammotracking'] && v['ammotracking'] === 'on') {
            setAttrs({ammoflag: 'show'});
        } else {
            setAttrs({ammoflag: 'hide'});
        }
    });
});

on('change:npc_name', function () {
    getAttrs(['npc'], function (v) {
        if (v['npc'] != 1) {
            setAttrs({
                npc: '1',
                npc_toggle: '1'
            });
        }
    });
});

on('sheet:compendium-drop', function () {
    setAttrs({dtype: 'full'});
    getAttrs(['hp_max', 'npc_senses', 'token_size'], function (v) {
        var lr = '';
        var tokenwidth = 70;
        var tokenheight = 70;
        if (
            v['npc_senses']
                .toLowerCase()
                .match(/(darkvision|blindsight|tremorsense|truesight)/)
        ) {
            lr = Math.max.apply(Math, v['npc_senses'].match(/\d+/g));
        }
        if (v['token_size']) {
            var squarelength = 70;
            if (v['token_size'].indexOf(',') > -1) {
                var setwidth = !isNaN(v['token_size'].split(',')[0])
                    ? v['token_size'].split(',')[0]
                    : 1;
                var setheight = !isNaN(v['token_size'].split(',')[1])
                    ? v['token_size'].split(',')[1]
                    : 1;
                tokenwidth = setwidth * squarelength;
                tokenheight = setheight * squarelength;
            } else {
                tokenwidth = squarelength * v['token_size'];
                tokenheight = squarelength * v['token_size'];
            }
        }
        setDefaultToken({
            width: tokenwidth,
            height: tokenheight,
            bar2_link: 'npc_ac',
            bar1_value: v['hp_max'],
            bar1_max: v['hp_max'],
            showname: true,
            light_radius: lr,
            light_hassight: true
        });
    });
});

var updateitemweight = function () {
    var wtotal = 0;
    getAttrs(['cp', 'sp', 'ep', 'gp', 'pp'], function (v) {
        cp = isNaN(parseInt(v.cp, 10)) === false ? parseInt(v.cp, 10) : 0;
        sp = isNaN(parseInt(v.sp, 10)) === false ? parseInt(v.sp, 10) : 0;
        ep = isNaN(parseInt(v.ep, 10)) === false ? parseInt(v.ep, 10) : 0;
        gp = isNaN(parseInt(v.gp, 10)) === false ? parseInt(v.gp, 10) : 0;
        pp = isNaN(parseInt(v.pp, 10)) === false ? parseInt(v.pp, 10) : 0;
        wtotal = wtotal + (cp + sp + ep + gp + pp) / 50;
        getSectionIDs('repeating_inventory', function (idarray) {
            if (idarray.length > 0) {
                _.each(idarray, function (currentID, i) {
                    getAttrs(
                        [
                            'repeating_inventory_' + currentID + '_itemweight',
                            'repeating_inventory_' + currentID + '_itemcount'
                        ],
                        function (v) {
                            if (
                                v[
                                'repeating_inventory_' +
                                currentID +
                                '_itemweight'
                                    ] &&
                                isNaN(
                                    parseInt(
                                        v[
                                        'repeating_inventory_' +
                                        currentID +
                                        '_itemweight'
                                            ],
                                        10
                                    )
                                ) === false
                            ) {
                                count =
                                    v[
                                    'repeating_inventory_' +
                                    currentID +
                                    '_itemcount'
                                        ] &&
                                    isNaN(
                                        parseFloat(
                                            v[
                                            'repeating_inventory_' +
                                            currentID +
                                            '_itemcount'
                                                ]
                                        )
                                    ) === false
                                        ? parseFloat(
                                        v[
                                        'repeating_inventory_' +
                                        currentID +
                                        '_itemcount'
                                            ]
                                        )
                                        : 1;
                                wtotal =
                                    wtotal +
                                    parseFloat(
                                        v[
                                        'repeating_inventory_' +
                                        currentID +
                                        '_itemweight'
                                            ]
                                    ) *
                                    count;
                            }
                            if (i === idarray.length - 1) {
                                setAttrs({weighttotal: wtotal});
                            }
                        }
                    );
                });
            } else {
                setAttrs({weighttotal: wtotal});
            }
        });
    });
};

var updateac = function () {
    var itemtypes = [];
    getSectionIDs('repeating_inventory', function (idarray) {
        if (idarray.length > 0) {
            _.each(idarray, function (currentID, i) {
                getAttrs(
                    [
                        'repeating_inventory_' + currentID + '_itemtype',
                        'repeating_inventory_' + currentID + '_equipped'
                    ],
                    function (x) {
                        var update = {};
                        if (
                            x[
                            'repeating_inventory_' + currentID + '_equipped'
                                ] === '0'
                        ) {
                            update[
                            'repeating_inventory_' +
                            currentID +
                            '_equippedflag'
                                ] =
                                'unequipped';
                        } else {
                            update[
                            'repeating_inventory_' +
                            currentID +
                            '_equippedflag'
                                ] =
                                'equipped';
                        }
                        setAttrs(update);
                        if (
                            x[
                            'repeating_inventory_' + currentID + '_itemtype'
                                ] &&
                            (!x[
                                'repeating_inventory_' + currentID + '_equipped'
                                    ] ||
                                x[
                                'repeating_inventory_' +
                                currentID +
                                '_equipped'
                                    ] === '1')
                        ) {
                            itemtypes.push(
                                x[
                                'repeating_inventory_' +
                                currentID +
                                '_itemtype'
                                    ].toLowerCase()
                            );
                        }
                        if (i === idarray.length - 1) {
                            armorcount = itemtypes.filter(function (item) {
                                return item.indexOf('armor') > -1;
                            }).length;
                            shieldcount = itemtypes.filter(function (item) {
                                return item.indexOf('shield') > -1;
                            }).length;
                            if (armorcount > 1 || shieldcount > 1) {
                                setAttrs({
                                    armorwarningflag: 'show',
                                    armorwarning: '0'
                                });
                            } else {
                                setAttrs({
                                    armorwarningflag: 'hide',
                                    armorwarning: '0'
                                });
                                setac(itemtypes);
                            }
                        }
                    }
                );
            });
        } else {
            getAttrs(['dexterity'], function (v) {
                setAttrs({
                    ac: 10 + Math.floor((parseInt(v.dexterity, 10) - 10) / 2)
                });
            });
        }
    });
};

var setac = function (itemtypes) {
    var actotal = 0;
    getSectionIDs('repeating_inventory', function (idarray) {
        _.each(idarray, function (currentID, i) {
            getAttrs(
                [
                    'repeating_inventory_' + currentID + '_itemac',
                    'repeating_inventory_' + currentID + '_equipped',
                    'repeating_inventory_' + currentID + '_itemmodifiers',
                    'dexterity',
                    'globalacmod'
                ],
                function (v) {
                    var dexmod = Math.floor(
                        (parseInt(v.dexterity, 10) - 10) / 2
                    );
                    var globalacmod =
                        isNaN(parseInt(v.globalacmod, 10)) === false
                            ? parseInt(v.globalacmod, 10)
                            : 0;
                    if (
                        v['repeating_inventory_' + currentID + '_itemac'] &&
                        isNaN(
                            parseInt(
                                v[
                                'repeating_inventory_' +
                                currentID +
                                '_itemac'
                                    ],
                                10
                            )
                        ) === false &&
                        (!v['repeating_inventory_' + currentID + '_equipped'] ||
                            v[
                            'repeating_inventory_' + currentID + '_equipped'
                                ] === '1')
                    ) {
                        actotal =
                            actotal +
                            parseInt(
                                v[
                                'repeating_inventory_' +
                                currentID +
                                '_itemac'
                                    ],
                                10
                            );
                    }
                    if (
                        v[
                        'repeating_inventory_' +
                        currentID +
                        '_itemmodifiers'
                            ] &&
                        v['repeating_inventory_' + currentID + '_itemmodifiers']
                            .toLowerCase()
                            .indexOf('ac +') > -1 &&
                        (!v['repeating_inventory_' + currentID + '_equipped'] ||
                            v[
                            'repeating_inventory_' + currentID + '_equipped'
                                ] === '1')
                    ) {
                        newac = v[
                        'repeating_inventory_' +
                        currentID +
                        '_itemmodifiers'
                            ]
                            .toLowerCase()
                            .split('ac')[1]
                            .match(/\d/);
                        actotal = actotal + parseInt(newac[0], 10);
                    }
                    if (i === idarray.length - 1) {
                        if (itemtypes.indexOf('light armor') > -1) {
                            actotal = actotal + dexmod;
                        } else if (itemtypes.indexOf('medium armor') > -1) {
                            actotal = actotal + Math.min(dexmod, 2);
                        } else if (itemtypes.indexOf('heavy armor') > -1) {
                            actotal = actotal;
                        } else {
                            actotal = actotal + 10 + dexmod;
                        }
                        actotal = actotal + globalacmod;
                        setAttrs({ac: actotal});
                    }
                }
            );
        });
    });
};

var updateglobalsave = function () {
    var savetotal = 0;
    getSectionIDs('repeating_inventory', function (idarray) {
        _.each(idarray, function (currentID, i) {
            getAttrs(
                ['repeating_inventory_' + currentID + '_itemmodifiers'],
                function (v) {
                    if (
                        v[
                        'repeating_inventory_' +
                        currentID +
                        '_itemmodifiers'
                            ] &&
                        v['repeating_inventory_' + currentID + '_itemmodifiers']
                            .toLowerCase()
                            .indexOf('saving throws +') > -1
                    ) {
                        newmod = v[
                        'repeating_inventory_' +
                        currentID +
                        '_itemmodifiers'
                            ]
                            .toLowerCase()
                            .split('saving throws')[1]
                            .match(/\d/);
                        savetotal = savetotal + parseInt(newmod[0], 10);
                    }
                    if (i === idarray.length - 1) {
                        setAttrs({globalsavemod: savetotal});
                    }
                }
            );
        });
    });
};

var additemattack = function (id) {
    getAttrs(
        [
            'repeating_inventory_itemname',
            'repeating_inventory_itemproperties',
            'repeating_inventory_itemmodifiers',
            'repeating_inventory_itemdamage',
            'repeating_inventory_itemdamage2',
            'repeating_inventory_itemdamagetype',
            'repeating_inventory_itemrange',
            'repeating_inventory_itemtype'
        ],
        function (v) {
            var newrowid = generateRowID();
            var newrowattrs = {};
            newrowattrs['repeating_inventory_itemattackid'] = newrowid;
            newrowattrs['repeating_attack_' + newrowid + '_itemid'] = id;
            newrowattrs['repeating_attack_' + newrowid + '_options-flag'] = '0';
            if (
                v.repeating_inventory_itemname &&
                v.repeating_inventory_itemname != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_atkname_base'] =
                    v.repeating_inventory_itemname;
            }
            if (
                v.repeating_inventory_itemdamage &&
                v.repeating_inventory_itemdamage != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_dmgbase'] =
                    v.repeating_inventory_itemdamage;
            }
            if (
                v.repeating_inventory_itemdamagetype &&
                v.repeating_inventory_itemdamagetype != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_dmgtype'] =
                    v.repeating_inventory_itemdamagetype;
            }
            if (
                v.repeating_inventory_itemrange &&
                v.repeating_inventory_itemrange != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_atkrange'] =
                    v.repeating_inventory_itemrange;
            }
            if (v.repeating_inventory_itemtype.indexOf('Melee') > -1) {
                newrowattrs['repeating_attack_' + newrowid + '_atkattr_base'] =
                    '@{strength_mod}';
                newrowattrs['repeating_attack_' + newrowid + '_dmgattr'] =
                    '@{strength_mod}';
            } else {
                newrowattrs['repeating_attack_' + newrowid + '_atkattr_base'] =
                    '@{dexterity_mod}';
                newrowattrs['repeating_attack_' + newrowid + '_dmgattr'] =
                    '@{dexterity_mod}';
            }
            if (
                v.repeating_inventory_itemmodifiers.indexOf('Attacks') > -1 &&
                v.repeating_inventory_itemmodifiers.indexOf('Damage')
            ) {
                newrowattrs[
                'repeating_attack_' + newrowid + '_atkmagic'
                    ] = v.repeating_inventory_itemmodifiers
                    .replace(/(^.+\D)(\d+)(\D.+$)/i, '$2')
                    .substring(0, 1);
            }
            setAttrs(newrowattrs);
        }
    );
};

var addspellattack = function (sid) {
    getAttrs(
        [
            'repeating_spell_spelloutput',
            'repeating_spell_spellname_base',
            'repeating_spell_spellrange',
            'repeating_spell_spellattack',
            'spellcasting_ability',
            'repeating_spell_spelldamage',
            'repeating_spell_spelldamagetype',
            'repeating_spell_spelldamage2',
            'repeating_spell_spelldamagetype2',
            'repeating_spell_spellsave',
            'repeating_spell_spellsavesuccess',
            'repeating_spell_spellattackid',
            'character_id',
            'repeating_spell_spellhldie',
            'repeating_spell_spellhldietype',
            'repeating_spell_spellhlbonus',
            'repeating_spell_spelldmgmod',
            'repeating_spell_spellhealing',
            'repeating_spell_spelllevel',
            'npc_spellattackmod',
            'level',
            'npc_spelldc'
        ],
        function (v) {
            var newrowid = generateRowID();
            var newrowattrs = {};
            var npcspell = sid.substring(0, 4) === '-npc' ? true : false;
            newrowattrs['repeating_spell_spellattackid'] = newrowid;
            newrowattrs['repeating_spell_rollcontent'] =
                '%{' +
                v.character_id +
                '|repeating_attack_' +
                newrowid +
                '_attack}';
            newrowattrs['repeating_attack_' + newrowid + '_options-flag'] = '0';
            newrowattrs['repeating_attack_' + newrowid + '_atkname_base'] =
                v.repeating_spell_spellname_base;
            newrowattrs['repeating_attack_' + newrowid + '_spellid'] = sid;
            if (
                v.repeating_spell_spellrange &&
                v.repeating_spell_spellrange != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_atkrange'] =
                    v.repeating_spell_spellrange;
            }
            if (
                !v.repeating_spell_spellattack ||
                v.repeating_spell_spellattack === 'None'
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_atkflag'] = '0';
            } else {
                newrowattrs[
                'repeating_attack_' + newrowid + '_atkattr_base'
                    ] = v.spellcasting_ability.slice(0, -1);
            }
            if (
                v.repeating_spell_spelldamage &&
                v.repeating_spell_spelldamage != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_dmgbase'] =
                    v.repeating_spell_spelldamage;
                newrowattrs['repeating_attack_' + newrowid + '_dmgtype'] =
                    v.repeating_spell_spelldamagetype;
                if (
                    v.repeating_spell_spelldmgmod &&
                    v.repeating_spell_spelldmgmod === 'Yes'
                ) {
                    newrowattrs[
                    'repeating_attack_' + newrowid + '_dmgattr'
                        ] = v.spellcasting_ability.slice(0, -1);
                } else {
                    newrowattrs['repeating_attack_' + newrowid + '_dmgattr'] =
                        '0';
                }
            } else {
                newrowattrs['repeating_attack_' + newrowid + '_dmgflag'] = '0';
            }
            if (
                v.repeating_spell_spelldamage2 &&
                v.repeating_spell_spelldamage2 != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_dmg2flag'] =
                    '{{damage=1}} {{dmg2flag=1}}';
                newrowattrs['repeating_attack_' + newrowid + '_dmg2base'] =
                    v.repeating_spell_spelldamage2;
                newrowattrs['repeating_attack_' + newrowid + '_dmg2attr'] = '0';
                newrowattrs['repeating_attack_' + newrowid + '_dmg2type'] =
                    v.repeating_spell_spelldamagetype2;
            }
            if (
                v.repeating_spell_spellsave &&
                v.repeating_spell_spellsave != ''
            ) {
                newrowattrs['repeating_attack_' + newrowid + '_saveflag'] =
                    '{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}';
                newrowattrs['repeating_attack_' + newrowid + '_saveattr'] =
                    v.repeating_spell_spellsave;
                newrowattrs['repeating_attack_' + newrowid + '_saveeffect'] =
                    v.repeating_spell_spellsavesuccess;
            }
            if (
                v.repeating_spell_spellhldie &&
                v.repeating_spell_spellhldie != '' &&
                v.repeating_spell_spellhldietype &&
                v.repeating_spell_spellhldietype != ''
            ) {
                var bonus = '';
                var query = '?{Cast at what level?';
                for (i = 0; i < 10 - v.repeating_spell_spelllevel; i++) {
                    query =
                        query +
                        '|Level ' +
                        (parseInt(i, 10) +
                            parseInt(v.repeating_spell_spelllevel, 10)) +
                        ',' +
                        i;
                }
                query = query + '}';
                if (
                    v.repeating_spell_spellhlbonus &&
                    v.repeating_spell_spellhlbonus != ''
                ) {
                    bonus =
                        '+(' +
                        v.repeating_spell_spellhlbonus +
                        '*' +
                        query +
                        ')';
                }
                newrowattrs['repeating_attack_' + newrowid + '_hldmg'] =
                    '{{hldmg=[[(' +
                    v.repeating_spell_spellhldie +
                    '*' +
                    query +
                    ')' +
                    v.repeating_spell_spellhldietype +
                    bonus +
                    ']]}}';
            }
            if (
                v.repeating_spell_spellhealing &&
                v.repeating_spell_spellhealing != ''
            ) {
                if (
                    !v.repeating_spell_spelldamage ||
                    v.repeating_spell_spelldamage === ''
                ) {
                    newrowattrs['repeating_attack_' + newrowid + '_dmgflag'] =
                        '{{damage=1}} {{dmg1flag=1}}';
                    newrowattrs['repeating_attack_' + newrowid + '_dmgbase'] =
                        v.repeating_spell_spellhealing;
                    newrowattrs['repeating_attack_' + newrowid + '_dmgtype'] =
                        'Healing';
                    if (
                        v.repeating_spell_spelldmgmod &&
                        v.repeating_spell_spelldmgmod === 'Yes'
                    ) {
                        newrowattrs[
                        'repeating_attack_' + newrowid + '_dmgattr'
                            ] = v.spellcasting_ability.slice(0, -1);
                    } else {
                        newrowattrs[
                        'repeating_attack_' + newrowid + '_dmgattr'
                            ] =
                            '0';
                    }
                } else if (
                    !v.repeating_spell_spelldamage2 ||
                    v.repeating_spell_spelldamage2 === ''
                ) {
                    newrowattrs['repeating_attack_' + newrowid + '_dmg2flag'] =
                        '{{damage=1}} {{dmg2flag=1}}';
                    newrowattrs['repeating_attack_' + newrowid + '_dmg2base'] =
                        v.repeating_spell_spellhealing;
                    newrowattrs['repeating_attack_' + newrowid + '_dmg2type'] =
                        'Healing';
                    if (
                        v.repeating_spell_spelldmgmod &&
                        v.repeating_spell_spelldmgmod === 'Yes'
                    ) {
                        newrowattrs[
                        'repeating_attack_' + newrowid + '_dmg2attr'
                            ] = v.spellcasting_ability.slice(0, -1);
                    } else {
                        newrowattrs[
                        'repeating_attack_' + newrowid + '_dmg2attr'
                            ] =
                            '0';
                    }
                }
            }
            if (npcspell === true) {
                var pb = Math.ceil(v.level / 1e10) + Math.ceil(v.level / 4);
                pb = isNaN(pb) === false ? pb : 0;
                newrowattrs['repeating_attack_' + newrowid + '_atkattr_base'] =
                    '0';
                newrowattrs['repeating_attack_' + newrowid + '_atkmod'] =
                    v.npc_spellattackmod &&
                    isNaN(parseInt(v.npc_spellattackmod, 10)) === false
                        ? parseInt(v.npc_spellattackmod, 10) - pb
                        : 0 - pb;
                newrowattrs['repeating_attack_' + newrowid + '_savedc'] =
                    '(@{saveflat})';
                newrowattrs['repeating_attack_' + newrowid + '_saveflat'] =
                    v.npc_spelldc &&
                    isNaN(parseInt(v.npc_spelldc, 10)) === false
                        ? parseInt(v.npc_spelldc, 10)
                        : 0;
            }
            setAttrs(newrowattrs);
        }
    );
};

var setlevel = function () {
    getAttrs(
        [
            'base_level',
            'multiclass1_flag',
            'multiclass2_flag',
            'multiclass3_flag',
            'multiclass1_lvl',
            'multiclass2_lvl',
            'multiclass3_lvl',
            'class',
            'multiclass1',
            'multiclass2',
            'multiclass3',
            'arcane_fighter',
            'arcane_rogue',
            'custom_class',
            'cust_spellslots'
        ],
        function (v) {
            var multiclass = false;
            var casterlevel = 0;
            var m1casterlevel = 0;
            var m2casterlevel = 0;
            var m3casterlevel = 0;
            var m1hitdie = '';
            var m2hitdie = '';
            var m3hitdie = '';
            var d10class = ['fighter', 'paladin', 'ranger'];
            var d8class = [
                'bard',
                'cleric',
                'druid',
                'monk',
                'rogue',
                'warlock'
            ];
            var d6class = ['sorcerer', 'wizard'];
            var charclass =
                v.custom_class && v.custom_class != '0'
                    ? v.cust_spellslots
                    : v.class;
            var full = [
                'bard',
                'cleric',
                'druid',
                'sorcerer',
                'wizard',
                'full'
            ];
            var half = ['paladin', 'ranger', 'half'];
            var finallevel =
                v.base_level && v.base_level > 0
                    ? parseInt(v.base_level, 10)
                    : 1;

            if (v.multiclass1_flag && v.multiclass1_flag === '1') {
                finallevel = finallevel + parseInt(v.multiclass1_lvl, 10);
                multiclass = true;
                if (full.indexOf(v.multiclass1) != -1) {
                    m1casterlevel = parseInt(v.multiclass1_lvl, 10);
                } else if (half.indexOf(v.multiclass1) != -1) {
                    m1casterlevel = Math.floor(
                        parseInt(v.multiclass1_lvl, 10) / 2
                    );
                } else if (
                    (v.multiclass1 === 'fighter' && v.arcane_fighter === '1') ||
                    (v.multiclass1 === 'rogue' && v.arcane_rogue === '1')
                ) {
                    m1casterlevel = Math.floor(
                        parseInt(v.multiclass1_lvl, 10) / 3
                    );
                }
                if (v.multiclass1 === 'barbarian') {
                    m1hd = '12';
                } else if (d10class.indexOf(v.multiclass1) != -1) {
                    m1hd = '10';
                } else if (d8class.indexOf(v.multiclass1) != -1) {
                    m1hd = '8';
                } else if (d6class.indexOf(v.multiclass1) != -1) {
                    m1hd = '6';
                }
                let classname = v.multiclass1; // temporary fix until we can translate query strings via i18n tools
                m1hitdie =
                    '|' +
                    classname.substring(0, 1).toUpperCase() +
                    classname.substring(1) +
                    ',' +
                    m1hd;
            }
            if (v.multiclass2_flag && v.multiclass2_flag === '1') {
                finallevel = finallevel + parseInt(v.multiclass2_lvl, 10);
                multiclass = true;
                if (full.indexOf(v.multiclass2) != -1) {
                    m2casterlevel = parseInt(v.multiclass2_lvl, 10);
                } else if (half.indexOf(v.multiclass2) != -1) {
                    m2casterlevel = Math.floor(
                        parseInt(v.multiclass2_lvl, 10) / 2
                    );
                } else if (
                    (v.multiclass2 === 'fighter' && v.arcane_fighter === '1') ||
                    (v.multiclass2 === 'rogue' && v.arcane_rogue === '1')
                ) {
                    m2casterlevel = Math.floor(
                        parseInt(v.multiclass2_lvl, 10) / 3
                    );
                }
                if (v.multiclass2 === 'barbarian') {
                    m2hd = '12';
                } else if (d10class.indexOf(v.multiclass2) != -1) {
                    m2hd = '10';
                } else if (d8class.indexOf(v.multiclass2) != -1) {
                    m2hd = '8';
                } else if (d6class.indexOf(v.multiclass2) != -1) {
                    m2hd = '6';
                }
                let classname = v.multiclass2; // temporary fix until we can translate query strings via i18n tools
                m2hitdie =
                    '|' +
                    classname.substring(0, 1).toUpperCase() +
                    classname.substring(1) +
                    ',' +
                    m2hd;
            }
            if (v.multiclass3_flag && v.multiclass3_flag === '1') {
                finallevel = finallevel + parseInt(v.multiclass3_lvl, 10);
                multiclass = true;
                if (full.indexOf(v.multiclass3) != -1) {
                    m3casterlevel = parseInt(v.multiclass3_lvl, 10);
                } else if (half.indexOf(v.multiclass3) != -1) {
                    m3casterlevel = Math.floor(
                        parseInt(v.multiclass3_lvl, 10) / 2
                    );
                } else if (
                    (v.multiclass3 === 'fighter' && v.arcane_fighter === '1') ||
                    (v.multiclass3 === 'rogue' && v.arcane_rogue === '1')
                ) {
                    m3casterlevel = Math.floor(
                        parseInt(v.multiclass3_lvl, 10) / 3
                    );
                }
                if (v.multiclass3 === 'barbarian') {
                    m3hd = '12';
                } else if (d10class.indexOf(v.multiclass3) != -1) {
                    m3hd = '10';
                } else if (d8class.indexOf(v.multiclass3) != -1) {
                    m3hd = '8';
                } else if (d6class.indexOf(v.multiclass3) != -1) {
                    m3hd = '6';
                }
                let classname = v.multiclass3; // temporary fix until we can translate query strings via i18n tools
                m3hitdie =
                    '|' +
                    classname.substring(0, 1).toUpperCase() +
                    classname.substring(1) +
                    ',' +
                    m3hd;
            }

            if (multiclass === false) {
                if (full.indexOf(charclass.toLowerCase()) != -1) {
                    casterlevel = finallevel;
                } else if (half.indexOf(charclass.toLowerCase()) != -1) {
                    casterlevel =
                        finallevel === 1 ? 0 : Math.ceil(finallevel / 2);
                } else if (
                    (charclass === 'Fighter' && v.arcane_fighter === '1') ||
                    (charclass === 'Rogue' && v.arcane_rogue === '1') ||
                    charclass === 'third'
                ) {
                    casterlevel =
                        finallevel < 3 ? 0 : Math.ceil(finallevel / 3);
                }
                hitdie_final = '@{hitdietype}';
            } else {
                if (full.indexOf(charclass.toLowerCase()) != -1) {
                    casterlevel = parseInt(v.base_level, 10);
                } else if (half.indexOf(charclass.toLowerCase()) != -1) {
                    casterlevel = Math.floor(parseInt(v.base_level, 10) / 2);
                } else if (
                    (charclass === 'Fighter' && v.arcane_fighter === '1') ||
                    (charclass === 'Rogue' && v.arcane_rogue === '1') ||
                    charclass === 'third'
                ) {
                    casterlevel = Math.floor(parseInt(v.base_level, 10) / 3);
                }
                casterlevel =
                    casterlevel + m1casterlevel + m2casterlevel + m3casterlevel;
                hitdie_final =
                    '?{Hit Die Class|' +
                    charclass +
                    ',@{hitdietype}' +
                    m1hitdie +
                    m2hitdie +
                    m3hitdie +
                    '}';
            }

            setAttrs({
                level: finallevel,
                caster_level: casterlevel,
                hitdie_final: hitdie_final
            });

            updateSpellSlots(casterlevel);
        }
    );
};

var updateClass = function () {
    getAttrs(
        [
            'class',
            'base_level',
            'custom_class',
            'cust_classname',
            'cust_hitdietype',
            'cust_spellcasting_ability',
            'cust_strength_save_prof',
            'cust_dexterity_save_prof',
            'cust_constitution_save_prof',
            'cust_intelligence_save_prof',
            'cust_wisdom_save_prof',
            'cust_charisma_save_prof',
            'strength_save_prof',
            'dexterity_save_prof',
            'constitution_save_prof',
            'intelligence_save_prof',
            'wisdom_save_prof',
            'charisma_save_prof'
        ],
        function (v) {
            if (v.custom_class && v.custom_class != '0') {
                setAttrs({
                    hitdietype: v.cust_hitdietype,
                    spellcasting_ability: v.cust_spellcasting_ability,
                    strength_save_prof: v.cust_strength_save_prof,
                    dexterity_save_prof: v.cust_dexterity_save_prof,
                    constitution_save_prof: v.cust_constitution_save_prof,
                    intelligence_save_prof: v.cust_intelligence_save_prof,
                    wisdom_save_prof: v.cust_wisdom_save_prof,
                    charisma_save_prof: v.cust_charisma_save_prof
                });
            } else {
                update = {};
                switch (v.class) {
                    case 'Barbarian':
                        update['hitdietype'] = 12;
                        update['spellcasting_ability'] = '0*';
                        if (
                            !v.strength_save_prof ||
                            v.strength_save_prof != '(@{pb})' ||
                            !v.constitution_save_prof ||
                            v.constitution_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = '(@{pb})';
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = '(@{pb})';
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = 0;
                            update['class_resource_name'] = 'Rage';
                        }
                        break;
                    case 'Bard':
                        update['hitdietype'] = 8;
                        update['spellcasting_ability'] = '@{charisma_mod}+';
                        if (
                            !v.dexterity_save_prof ||
                            v.dexterity_save_prof != '(@{pb})' ||
                            !v.charisma_save_prof ||
                            v.charisma_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = '(@{pb})';
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = '(@{pb})';
                            update['class_resource_name'] =
                                'Bardic Inspiration';
                        }
                        break;
                    case 'Cleric':
                        update['hitdietype'] = 8;
                        update['spellcasting_ability'] = '@{wisdom_mod}+';
                        if (
                            !v.wisdom_save_prof ||
                            v.wisdom_save_prof != '(@{pb})' ||
                            !v.charisma_save_prof ||
                            v.charisma_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = '(@{pb})';
                            update['charisma_save_prof'] = '(@{pb})';
                            update['class_resource_name'] = 'Channel Divinity';
                        }
                        break;
                    case 'Druid':
                        update['hitdietype'] = 8;
                        update['spellcasting_ability'] = '@{wisdom_mod}+';
                        if (
                            !v.wisdom_save_prof ||
                            v.wisdom_save_prof != '(@{pb})' ||
                            !v.intelligence_save_prof ||
                            v.intelligence_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = '(@{pb})';
                            update['wisdom_save_prof'] = '(@{pb})';
                            update['charisma_save_prof'] = 0;
                            update['class_resource_name'] = 'Wild Shape';
                        }
                        break;
                    case 'Fighter':
                        update['hitdietype'] = 10;
                        update['spellcasting_ability'] = '0*';
                        if (
                            !v.strength_save_prof ||
                            v.strength_save_prof != '(@{pb})' ||
                            !v.constitution_save_prof ||
                            v.constitution_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = '(@{pb})';
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = '(@{pb})';
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = 0;
                            update['class_resource_name'] = 'Second Wind';
                        }
                        break;
                    case 'Monk':
                        update['hitdietype'] = 8;
                        update['spellcasting_ability'] = '0*';
                        if (
                            !v.strength_save_prof ||
                            v.strength_save_prof != '(@{pb})' ||
                            !v.dexterity_save_prof ||
                            v.dexterity_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = '(@{pb})';
                            update['dexterity_save_prof'] = '(@{pb})';
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = 0;
                            update['class_resource_name'] = 'Ki';
                        }
                        break;
                    case 'Paladin':
                        update['hitdietype'] = 10;
                        update['spellcasting_ability'] = '@{charisma_mod}+';
                        if (
                            !v.wisdom_save_prof ||
                            v.wisdom_save_prof != '(@{pb})' ||
                            !v.charisma_save_prof ||
                            v.charisma_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = '(@{pb})';
                            update['charisma_save_prof'] = '(@{pb})';
                            update['class_resource_name'] = 'Channel Divinity';
                        }
                        break;
                    case 'Ranger':
                        update['hitdietype'] = 10;
                        update['spellcasting_ability'] = '@{wisdom_mod}+';
                        if (
                            !v.strength_save_prof ||
                            v.strength_save_prof != '(@{pb})' ||
                            !v.dexterity_save_prof ||
                            v.dexterity_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = '(@{pb})';
                            update['dexterity_save_prof'] = '(@{pb})';
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = 0;
                        }
                        break;
                    case 'Rogue':
                        update['hitdietype'] = 8;
                        update['spellcasting_ability'] = '0*';
                        if (
                            !v.intelligence_save_prof ||
                            v.intelligence_save_prof != '(@{pb})' ||
                            !v.dexterity_save_prof ||
                            v.dexterity_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = '(@{pb})';
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = '(@{pb})';
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = 0;
                        }
                        break;
                    case 'Sorcerer':
                        update['hitdietype'] = 6;
                        update['spellcasting_ability'] = '@{charisma_mod}+';
                        if (
                            !v.constitution_save_prof ||
                            v.constitution_save_prof != '(@{pb})' ||
                            !v.charisma_save_prof ||
                            v.charisma_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = '(@{pb})';
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = 0;
                            update['charisma_save_prof'] = '(@{pb})';
                            update['class_resource_name'] = 'Sorcery Points';
                        }
                        break;
                    case 'Warlock':
                        update['hitdietype'] = 8;
                        update['spellcasting_ability'] = '@{charisma_mod}+';
                        if (
                            !v.wisdom_save_prof ||
                            v.wisdom_save_prof != '(@{pb})' ||
                            !v.charisma_save_prof ||
                            v.charisma_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = 0;
                            update['wisdom_save_prof'] = '(@{pb})';
                            update['charisma_save_prof'] = '(@{pb})';
                        }
                        break;
                    case 'Wizard':
                        update['hitdietype'] = 6;
                        update['spellcasting_ability'] = '@{intelligence_mod}+';
                        if (
                            !v.wisdom_save_prof ||
                            v.wisdom_save_prof != '(@{pb})' ||
                            !v.intelligence_save_prof ||
                            v.intelligence_save_prof != '(@{pb})'
                        ) {
                            update['strength_save_prof'] = 0;
                            update['dexterity_save_prof'] = 0;
                            update['constitution_save_prof'] = 0;
                            update['intelligence_save_prof'] = '(@{pb})';
                            update['wisdom_save_prof'] = '(@{pb})';
                            update['charisma_save_prof'] = 0;
                        }
                        break;
                }
                setAttrs(update);
            }
        }
    );
    setlevel();
};

var updateTool = function () {
    getAttrs(
        [
            'repeating_tool_toolname_base',
            'repeating_tool_toolbonus_base',
            'repeating_tool_tool_mod',
            'level',
            'repeating_tool_toolattr_base',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma'
        ],
        function (v) {
            var pb = Math.ceil(v.level / 1e10) + Math.ceil(v.level / 4);
            if (v.repeating_tool_toolbonus_base === '(@{pb})') {
                bonus = pb;
            } else if (v.repeating_tool_toolbonus_base === '(@{pb}*2)') {
                bonus = pb * 2;
            } else if (v.repeating_tool_toolbonus_base === '(floor(@{pb}/2))') {
                bonus = Math.floor(pb / 2);
            }
            var attr = v.repeating_tool_toolattr_base
                .substring(0, v.repeating_tool_toolattr_base.length - 5)
                .substr(2)
                .toUpperCase();
            var mod =
                v.repeating_tool_tool_mod &&
                isNaN(parseInt(v.repeating_tool_tool_mod, 10)) === false
                    ? parseInt(v.repeating_tool_tool_mod, 10)
                    : 0;
            var bonus =
                bonus +
                Math.floor((parseInt(v[attr.toLowerCase()], 10) - 10) / 2) +
                mod;
            setAttrs({
                repeating_tool_toolname: v.repeating_tool_toolname_base,
                repeating_tool_toolbonus: bonus,
                repeating_tool_toolattr: attr
            });
        }
    );
};

var updateAttack = function (eventinfo) {
    var sourcetype = eventinfo.sourceType;
    var attackid = eventinfo.sourceAttribute.substring(17, 37);
    getAttrs(
        [
            'level',
            'repeating_attack_atkflag',
            'repeating_attack_atkname_base',
            'repeating_attack_atkattr_base',
            'repeating_attack_atkmod',
            'repeating_attack_atkprofflag',
            'repeating_attack_atkmagic',
            'repeating_attack_dmgflag',
            'repeating_attack_dmgbase',
            'repeating_attack_dmgattr',
            'repeating_attack_dmgmod',
            'repeating_attack_dmgtype',
            'repeating_attack_dmg2flag',
            'repeating_attack_dmg2base',
            'repeating_attack_dmg2attr',
            'repeating_attack_dmg2mod',
            'repeating_attack_dmg2type',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
            'spellcasting_ability',
            'repeating_attack_dmgcustcrit',
            'repeating_attack_dmg2custcrit',
            'repeating_attack_saveflag',
            'repeating_attack_savedc',
            'repeating_attack_saveeffect',
            'repeating_attack_saveflat',
            'dtype',
            'repeating_attack_hldmg',
            'repeating_attack_spellid',
            'repeating_attack_atkrange',
            'repeating_attack_itemid',
            'globalmagicmod',
            'repeating_attack_ammo'
        ],
        function (v) {
            var update = {};
            var quietupdate = {};
            var hbonus = '';
            var hdmg1 = '';
            var hdmg2 = '';
            var dmg = '';
            var dmg2 = '';
            var rollbase = '';
            var spellattack = false;
            var magicattackmod = 0;
            var spelllevel = '';
            if (
                v.repeating_attack_spellid &&
                v.repeating_attack_spellid != ''
            ) {
                spellattack = true;
                magicattackmod = parseInt(v.globalmagicmod, 10);
                spelllevel =
                    '{{spelllevel=' +
                    v['repeating_attack_spellid'].split('_')[0].substr(1) +
                    '}}';
            }
            if (v.repeating_attack_atkattr_base === '0') {
                atkattr_base = 0;
            } else {
                atkattr_base = Math.floor(
                    (v[
                            v.repeating_attack_atkattr_base
                                .substring(
                                    0,
                                    v.repeating_attack_atkattr_base.length - 5
                                )
                                .substr(2)
                            ] -
                        10) /
                    2
                );
            }
            if (v.repeating_attack_dmgattr === '0') {
                dmgattr = 0;
            } else {
                dmgattr = Math.floor(
                    (v[
                            v.repeating_attack_dmgattr
                                .substring(0, v.repeating_attack_dmgattr.length - 5)
                                .substr(2)
                            ] -
                        10) /
                    2
                );
            }
            if (v.repeating_attack_dmg2attr === '0') {
                dmg2attr = 0;
            } else {
                dmg2attr = Math.floor(
                    (v[
                            v.repeating_attack_dmg2attr
                                .substring(
                                    0,
                                    v.repeating_attack_dmg2attr.length - 5
                                )
                                .substr(2)
                            ] -
                        10) /
                    2
                );
            }
            var dmgbase =
                v.repeating_attack_dmgbase && v.repeating_attack_dmgbase != ''
                    ? v.repeating_attack_dmgbase
                    : 0;
            var dmg2base =
                v.repeating_attack_dmg2base && v.repeating_attack_dmg2base != ''
                    ? v.repeating_attack_dmg2base
                    : 0;
            var dmgmod =
                v.repeating_attack_dmgmod &&
                isNaN(parseInt(v.repeating_attack_dmgmod, 10)) === false
                    ? parseInt(v.repeating_attack_dmgmod, 10)
                    : 0;
            var dmg2mod =
                v.repeating_attack_dmg2mod &&
                isNaN(parseInt(v.repeating_attack_dmg2mod, 10)) === false
                    ? parseInt(v.repeating_attack_dmg2mod, 10)
                    : 0;
            var dmgtype = v.repeating_attack_dmgtype
                ? v.repeating_attack_dmgtype + ' '
                : '';
            var dmg2type = v.repeating_attack_dmg2type
                ? v.repeating_attack_dmg2type + ' '
                : '';
            var pb =
                v.repeating_attack_atkprofflag &&
                v.repeating_attack_atkprofflag != 0
                    ? Math.ceil(v.level / 1e10) + Math.ceil(v.level / 4)
                    : 0;
            var atkmod =
                v.repeating_attack_atkmod && v.repeating_attack_atkmod != ''
                    ? parseInt(v.repeating_attack_atkmod, 10)
                    : 0;
            var atkmag =
                v.repeating_attack_atkmagic && v.repeating_attack_atkmagic != ''
                    ? parseInt(v.repeating_attack_atkmagic, 10)
                    : 0;
            var dmgmag =
                isNaN(atkmag) === false &&
                atkmag != 0 &&
                ((v.repeating_attack_dmgflag &&
                    v.repeating_attack_dmgflag != 0) ||
                    (v.repeating_attack_dmg2flag &&
                        v.repeating_attack_dmg2flag != 0))
                    ? '+ ' + atkmag + ' Magic Bonus'
                    : '';
            var name = v.repeating_attack_atkname_base
                ? v.repeating_attack_atkname_base
                : '-';
            if (v.repeating_attack_atkflag && v.repeating_attack_atkflag != 0) {
                bonus_mod =
                    atkattr_base + atkmod + pb + atkmag + magicattackmod;
                plus_minus = bonus_mod > -1 ? '+' : '';
                bonus = plus_minus + bonus_mod;
            } else if (
                v.repeating_attack_saveflag &&
                v.repeating_attack_saveflag != 0
            ) {
                savedcattr =
                    v.repeating_attack_savedc.indexOf('spell') > -1
                        ? v.spellcasting_ability
                        : v.repeating_attack_savedc;
                savedcattr = savedcattr
                    .replace(/^[^{]*{/, '')
                    .replace(/\_.*$/, '');
                if (
                    v.repeating_attack_savedc &&
                    v.repeating_attack_savedc === '(@{saveflat})'
                ) {
                    var tempdc =
                        isNaN(parseInt(v.repeating_attack_saveflat)) === false
                            ? parseInt(v.repeating_attack_saveflat)
                            : '0';
                } else {
                    var tempdc =
                        isNaN(
                            Math.floor((parseInt(v[savedcattr], 10) - 10) / 2) +
                            8 +
                            pb
                        ) === false
                            ? Math.floor(
                            (parseInt(v[savedcattr], 10) - 10) / 2
                            ) +
                            8 +
                            pb
                            : '0';
                }
                bonus = 'DC' + tempdc;
            } else {
                bonus = '-';
            }
            if (v.repeating_attack_dmgflag && v.repeating_attack_dmgflag != 0) {
                if (spellattack === true && dmgbase.indexOf('@{level}') > -1) {
                    // SPECIAL CANTRIP DAMAGE
                    dmgdiestring = Math.round(
                        (parseInt(v.level, 10) + 1) / 6 + 0.5
                    ).toString();
                    dmg =
                        dmgdiestring +
                        dmgbase.substring(dmgbase.lastIndexOf('d')) +
                        ' ' +
                        dmgtype;
                } else {
                    if (dmgbase === 0 && dmgattr + dmgmod === 0) {
                        dmg = 0;
                    }
                    if (dmgbase != 0) {
                        dmg = dmgbase;
                    }
                    if (dmgbase != 0 && dmgattr + dmgmod != 0) {
                        dmg = dmgattr + dmgmod > 0 ? dmg + '+' : dmg;
                    }
                    if (dmgattr + dmgmod != 0) {
                        dmg = dmg + (dmgattr + dmgmod);
                    }
                    dmg = dmg + ' ' + dmgtype;
                }
            } else {
                dmg = '';
            }
            if (
                v.repeating_attack_dmg2flag &&
                v.repeating_attack_dmg2flag != 0
            ) {
                if (dmg2base === 0 && dmg2attr + dmg2mod === 0) {
                    dmg2 = 0;
                }
                if (dmg2base != 0) {
                    dmg2 = dmg2base;
                }
                if (dmg2base != 0 && dmg2attr + dmg2mod != 0) {
                    dmg2 = dmg2attr + dmg2mod > 0 ? dmg2 + '+' : dmg2;
                }
                if (dmg2attr + dmg2mod != 0) {
                    dmg2 = dmg2 + (dmg2attr + dmg2mod);
                }
                dmg2 = dmg2 + ' ' + dmg2type;
            } else {
                dmg2 = '';
            }
            dmgspacer =
                v.repeating_attack_dmgflag &&
                v.repeating_attack_dmgflag != 0 &&
                v.repeating_attack_dmg2flag &&
                v.repeating_attack_dmg2flag != 0
                    ? '+ '
                    : '';
            crit1 =
                v.repeating_attack_dmgcustcrit &&
                v.repeating_attack_dmgcustcrit != ''
                    ? v.repeating_attack_dmgcustcrit
                    : dmgbase;
            crit2 =
                v.repeating_attack_dmg2custcrit &&
                v.repeating_attack_dmg2custcrit != ''
                    ? v.repeating_attack_dmg2custcrit
                    : dmg2base;
            r1 =
                v.repeating_attack_atkflag && v.repeating_attack_atkflag != 0
                    ? '1d20'
                    : '0d20';
            r2 =
                v.repeating_attack_atkflag && v.repeating_attack_atkflag != 0
                    ? '@{rtype}'
                    : '{{r2=[[0d20';
            if (v.repeating_attack_atkflag && v.repeating_attack_atkflag != 0) {
                if (magicattackmod != 0) {
                    hbonus = ' + ' + magicattackmod + '[SPELLATK]' + hbonus;
                }
                if (atkmag != 0) {
                    hbonus = ' + ' + atkmag + '[MAGIC]' + hbonus;
                }
                if (pb != 0) {
                    hbonus = ' + ' + pb + '[PROF]' + hbonus;
                }
                if (atkmod != 0) {
                    hbonus = ' + ' + atkmod + '[MOD]' + hbonus;
                }
                if (atkattr_base != 0) {
                    hbonus =
                        ' + ' +
                        atkattr_base +
                        '[' +
                        v.repeating_attack_atkattr_base
                            .substring(2, 5)
                            .toUpperCase() +
                        ']' +
                        hbonus;
                }
            } else {
                hbonus = '';
            }
            if (v.repeating_attack_dmgflag && v.repeating_attack_dmgflag != 0) {
                if (atkmag != 0) {
                    hdmg1 = ' + ' + atkmag + '[MAGIC]' + hdmg1;
                }
                if (dmgmod != 0) {
                    hdmg1 = ' + ' + dmgmod + '[MOD]' + hdmg1;
                }
                if (dmgattr != 0) {
                    hdmg1 =
                        ' + ' +
                        dmgattr +
                        '[' +
                        v.repeating_attack_dmgattr
                            .substring(2, 5)
                            .toUpperCase() +
                        ']' +
                        hdmg1;
                }
                hdmg1 = dmgbase + hdmg1;
            } else {
                hdmg1 = '0';
            }
            if (
                v.repeating_attack_dmg2flag &&
                v.repeating_attack_dmg2flag != 0
            ) {
                if (dmg2mod != 0) {
                    hdmg2 = ' + ' + dmg2mod + '[MOD]' + hdmg2;
                }
                if (dmg2attr != 0) {
                    hdmg2 =
                        ' + ' +
                        dmg2attr +
                        '[' +
                        v.repeating_attack_dmg2attr
                            .substring(2, 5)
                            .toUpperCase() +
                        ']' +
                        hdmg2;
                }
                hdmg2 = dmg2base + hdmg2;
            } else {
                hdmg2 = '0';
            }
            if (v.dtype === 'full') {
                pickbase = 'full';
                rollbase =
                    '@{wtype}&{template:atkdmg} {{mod=@{atkbonus}}} {{rname=@{atkname}}} {{r1=[[@{hidden_r1base}@{halflingluck}cs>@{atkcritrange}@{hidden_atkbonus}]]}} @{hidden_r2base}@{halflingluck}cs>@{atkcritrange}@{hidden_atkbonus}]]}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[@{hidden_dmg1}]]}} {{dmg1type=@{hidden_dmg1type}}} @{dmg2flag} {{dmg2=[[@{hidden_dmg2}]]}} {{dmg2type=@{hidden_dmg2type}}} {{crit1=[[@{hidden_crit1}]]}} {{crit2=[[@{hidden_crit2}]]}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} @{spelllevel} ammo=@{ammo} @{charname_output}';
            } else if (
                v.repeating_attack_atkflag &&
                v.repeating_attack_atkflag != 0
            ) {
                pickbase = 'pick';
                rollbase =
                    '@{wtype}&{template:atk} {{mod=@{atkbonus}}} {{rname=[@{atkname}](~repeating_attack_attack_dmg)}} {{rnamec=[@{atkname}](~repeating_attack_attack_crit)}} {{r1=[[@{hidden_r1base}@{halflingluck}cs>@{atkcritrange}@{hidden_atkbonus}]]}} @{hidden_r2base}@{halflingluck}cs>@{atkcritrange}@{hidden_atkbonus}]]}} {{range=@{atkrange}}} {{desc=@{atk_desc}}} @{spelllevel} ammo=@{ammo} @{charname_output}';
            } else if (
                v.repeating_attack_dmgflag &&
                v.repeating_attack_dmgflag != 0
            ) {
                pickbase = 'dmg';
                rollbase =
                    '@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[@{hidden_dmg1}]]}} {{dmg1type=@{hidden_dmg1type}}} @{dmg2flag} {{dmg2=[[@{hidden_dmg2}]]}} {{dmg2type=@{hidden_dmg2type}}} @{saveflag} {{desc=@{atk_desc}}} @{hldmg} @{spelllevel} ammo=@{ammo} @{charname_output}';
            } else {
                pickbase = 'empty';
                rollbase =
                    '@{wtype}&{template:dmg} {{rname=@{atkname}}} @{atkflag} {{range=@{atkrange}}} @{saveflag} {{desc=@{atk_desc}}} @{spelllevel} ammo=@{ammo} @{charname_output}';
            }
            update['repeating_attack_atkname'] = name;
            update['repeating_attack_atkbonus'] = bonus;
            update['repeating_attack_atkdmgtype'] =
                dmg + dmgspacer + dmg2 + dmgmag + ' ';
            update['repeating_attack_hidden_r1base'] = r1;
            update['repeating_attack_hidden_r2base'] = r2;
            update['repeating_attack_hidden_atkbonus'] = hbonus;
            update['repeating_attack_hidden_dmg1'] = hdmg1;
            update['repeating_attack_hidden_dmg2'] = hdmg2;
            update['repeating_attack_hidden_dmg1type'] = dmgtype;
            update['repeating_attack_hidden_dmg2type'] = dmg2type;
            update['repeating_attack_hidden_crit1'] = crit1 + '[CRIT]';
            update['repeating_attack_hidden_crit2'] = crit2 + '[CRIT]';
            update['repeating_attack_hidden_pickbase'] = pickbase;
            update['repeating_attack_spelllevel'] = spelllevel;
            update['repeating_attack_rollbase'] = rollbase;
            if (
                sourcetype &&
                sourcetype === 'player' &&
                v.repeating_attack_spellid &&
                v.repeating_attack_spellid != ''
            ) {
                var spellid = v.repeating_attack_spellid;
                quietupdate[
                'repeating_spell' + spellid + '_spellname_base'
                    ] = name;
                if (
                    v.repeating_attack_atkrange &&
                    v.repeating_attack_atkrange != ''
                ) {
                    quietupdate['repeating_spell' + spellid + '_spellrange'] =
                        v.repeating_attack_atkrange;
                }
                if (dmgbase && dmgbase != 0) {
                    quietupdate[
                    'repeating_spell' + spellid + '_spelldamage'
                        ] = dmgbase;
                    quietupdate[
                    'repeating_spell' + spellid + '_spelldamagetype'
                        ] = dmgtype;
                }
                if (dmg2base && dmg2base != 0) {
                    quietupdate[
                    'repeating_spell' + spellid + '_spelldamage2'
                        ] = dmg2base;
                    quietupdate[
                    'repeating_spell' + spellid + '_spelldamagetype2'
                        ] = dmg2type;
                }
                if (
                    v.repeating_attack_saveflag &&
                    v.repeating_attack_saveflag != '0'
                ) {
                    quietupdate[
                    'repeating_spell' + spellid + '_spellsave'
                        ] = savedcattr;
                    quietupdate[
                    'repeating_spell' + spellid + '_spellsavesuccess'
                        ] =
                        v.repeating_attack_saveeffect;
                }
            }
            if (
                sourcetype &&
                sourcetype === 'player' &&
                v.repeating_attack_itemid &&
                v.repeating_attack_itemid != ''
            ) {
                var itemid = v.repeating_attack_itemid;
                quietupdate[
                'repeating_inventory_' + itemid + '_itemname'
                    ] = name;
            }
            setAttrs(quietupdate, {silent: true});
            setAttrs(update);
        }
    );
};

var updateSpell = function (spellid, category, eventinfo, forceupdate) {
    var sourcetype = eventinfo ? eventinfo.sourceType : '';
    var cat = category ? '-' + category : '';
    var repid = spellid ? spellid + '_' : '';
    var update = {};
    var quietupdate = {};
    var npcspell = false;
    if (
        (eventinfo &&
            eventinfo.sourceAttribute &&
            eventinfo.sourceAttribute.split('_')[1] === 'spell-npc') ||
        (category && category === 'npc')
    ) {
        npcspell = true;
    }
    getAttrs(
        [
            'npc_spellattackmod',
            'level',
            'npc_spelldc',
            'repeating_spell' + cat + '_' + repid + 'spellname_base',
            'repeating_spell' + cat + '_' + repid + 'spellprepared',
            'repeating_spell' + cat + '_' + repid + 'spellrange',
            'repeating_spell' + cat + '_' + repid + 'spelltarget',
            'repeating_spell' + cat + '_' + repid + 'spellattack',
            'repeating_spell' + cat + '_' + repid + 'spelldamage',
            'repeating_spell' + cat + '_' + repid + 'spelldamagetype',
            'repeating_spell' + cat + '_' + repid + 'spelldamage2',
            'repeating_spell' + cat + '_' + repid + 'spelldamagetype2',
            'repeating_spell' + cat + '_' + repid + 'spellhealing',
            'repeating_spell' + cat + '_' + repid + 'spelldmgmod',
            'repeating_spell' + cat + '_' + repid + 'spellsave',
            'repeating_spell' + cat + '_' + repid + 'spellsavesuccess',
            'repeating_spell' + cat + '_' + repid + 'spellhldie',
            'repeating_spell' + cat + '_' + repid + 'spellhldietype',
            'repeating_spell' + cat + '_' + repid + 'spellhlbonus',
            'repeating_spell' + cat + '_' + repid + 'spellattackid',
            'character_id',
            'repeating_spell' + cat + '_' + repid + 'spelloutput',
            'repeating_spell' + cat + '_' + repid + 'spelllevel',
            'spellcasting_ability',
            'repeating_spell' + cat + '_' + repid + 'spell_damage_progression'
        ],
        function (v) {
            update['repeating_spell' + cat + '_' + repid + 'spellname'] = v[
            'repeating_spell' + cat + '_' + repid + 'spellname_base'
                ]
                ? v['repeating_spell' + cat + '_' + repid + 'spellname_base']
                : '';
            update['repeating_spell' + cat + '_' + repid + 'prep'] = v[
            'repeating_spell' + cat + '_' + repid + 'spellprepared'
                ]
                ? v['repeating_spell' + cat + '_' + repid + 'spellprepared']
                : 1;
            update[
            'repeating_spell' + cat + '_' + repid + 'spellattackinfoflag'
                ] =
                v['repeating_spell' + cat + '_' + repid + 'spelloutput'] &&
                v['repeating_spell' + cat + '_' + repid + 'spelloutput'] ===
                'ATTACK'
                    ? 'show'
                    : 'hide';
            if (
                v['repeating_spell' + cat + '_' + repid + 'spellattackid'] &&
                v['repeating_spell' + cat + '_' + repid + 'spellattackid'] != ''
            ) {
                atkid =
                    v['repeating_spell' + cat + '_' + repid + 'spellattackid'];
                quietupdate[
                'repeating_spell' + cat + '_' + repid + 'rollcontent'
                    ] =
                    '%{' +
                    v.character_id +
                    '|repeating_attack_' +
                    atkid +
                    '_attack}';
                if (
                    (sourcetype && sourcetype === 'player') ||
                    (forceupdate && forceupdate === true)
                ) {
                    quietupdate['repeating_attack_' + atkid + '_options-flag'] =
                        '0';
                    quietupdate['repeating_attack_' + atkid + '_atkname_base'] =
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellname_base'
                            ];
                    if (
                        v[
                        'repeating_spell' + cat + '_' + repid + 'spellrange'
                            ] &&
                        v[
                        'repeating_spell' + cat + '_' + repid + 'spellrange'
                            ] != ''
                    ) {
                        quietupdate['repeating_attack_' + atkid + '_atkrange'] =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellrange'
                                ];
                    }
                    if (
                        !v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellattack'
                            ] ||
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellattack'
                            ] === 'None'
                    ) {
                        quietupdate['repeating_attack_' + atkid + '_atkflag'] =
                            '0';
                    } else {
                        quietupdate[
                        'repeating_attack_' + atkid + '_atkattr_base'
                            ] = v.spellcasting_ability.slice(0, -1);
                        quietupdate['repeating_attack_' + atkid + '_atkflag'] =
                            '{{attack=1}}';
                    }
                    if (
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spelldamage'
                            ] &&
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spelldamage'
                            ] != ''
                    ) {
                        quietupdate['repeating_attack_' + atkid + '_dmgbase'] =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamage'
                                ];
                        quietupdate[
                        'repeating_attack_' + atkid + '_dmgtype'
                            ] = v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spelldamagetype'
                            ]
                            ? v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamagetype'
                                ]
                            : '';
                        quietupdate['repeating_attack_' + atkid + '_dmgflag'] =
                            '{{damage=1}} {{dmg1flag=1}}';
                        if (
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldmgmod'
                                ] &&
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldmgmod'
                                ] === 'Yes'
                        ) {
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmgattr'
                                ] = v.spellcasting_ability.slice(0, -1);
                        } else {
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmgattr'
                                ] =
                                '0';
                        }
                    } else {
                        quietupdate['repeating_attack_' + atkid + '_dmgflag'] =
                            '0';
                        quietupdate['repeating_attack_' + atkid + '_dmgbase'] =
                            '';
                        quietupdate['repeating_attack_' + atkid + '_dmgtype'] =
                            '';
                    }
                    if (
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spelldamage2'
                            ] &&
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spelldamage2'
                            ] != ''
                    ) {
                        quietupdate['repeating_attack_' + atkid + '_dmg2flag'] =
                            '{{damage=1}} {{dmg2flag=1}}';
                        quietupdate['repeating_attack_' + atkid + '_dmg2base'] =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamage2'
                                ];
                        quietupdate['repeating_attack_' + atkid + '_dmg2attr'] =
                            '0';
                        quietupdate['repeating_attack_' + atkid + '_dmg2type'] =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamagetype2'
                                ];
                    } else {
                        quietupdate['repeating_attack_' + atkid + '_dmg2flag'] =
                            '0';
                        quietupdate['repeating_attack_' + atkid + '_dmg2base'] =
                            '';
                        quietupdate['repeating_attack_' + atkid + '_dmg2type'] =
                            '';
                    }
                    if (
                        v[
                        'repeating_spell' + cat + '_' + repid + 'spellsave'
                            ] &&
                        v[
                        'repeating_spell' + cat + '_' + repid + 'spellsave'
                            ] != ''
                    ) {
                        quietupdate['repeating_attack_' + atkid + '_saveflag'] =
                            '{{save=1}} {{saveattr=@{saveattr}}} {{savedesc=@{saveeffect}}} {{savedc=[[[[@{savedc}]][SAVE]]]}}';
                        quietupdate['repeating_attack_' + atkid + '_saveattr'] =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellsave'
                                ];
                        quietupdate[
                        'repeating_attack_' + atkid + '_saveeffect'
                            ] =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellsavesuccess'
                                ];
                    }
                    if (
                        v[
                        'repeating_spell' + cat + '_' + repid + 'spellhldie'
                            ] &&
                        v[
                        'repeating_spell' + cat + '_' + repid + 'spellhldie'
                            ] != '' &&
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellhldietype'
                            ] &&
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellhldietype'
                            ] != ''
                    ) {
                        var bonus = '';
                        var spelllevel =
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelllevel'
                                ];
                        if (!spelllevel) {
                            spelllevel = eventinfo.sourceAttribute
                                .split('_')[1]
                                .replace('spell-', '');
                        }
                        var query = '?{Cast at what level?';
                        for (i = 0; i < 10 - spelllevel; i++) {
                            query =
                                query +
                                '|Level ' +
                                (parseInt(i, 10) + parseInt(spelllevel, 10)) +
                                ',' +
                                i;
                        }
                        query = query + '}';
                        if (
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellhlbonus'
                                ] &&
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellhlbonus'
                                ] != ''
                        ) {
                            bonus =
                                '+(' +
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spellhlbonus'
                                    ] +
                                '*' +
                                query +
                                ')';
                        }
                        quietupdate['repeating_attack_' + atkid + '_hldmg'] =
                            '{{hldmg=[[(' +
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellhldie'
                                ] +
                            '*' +
                            query +
                            ')' +
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spellhldietype'
                                ] +
                            bonus +
                            ']]}}';
                    } else {
                        quietupdate['repeating_attack_' + atkid + '_hldmg'] =
                            '';
                    }
                    if (
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellhealing'
                            ] &&
                        v[
                        'repeating_spell' +
                        cat +
                        '_' +
                        repid +
                        'spellhealing'
                            ] != ''
                    ) {
                        if (
                            !v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamage'
                                ] ||
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamage'
                                ] === ''
                        ) {
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmgflag'
                                ] =
                                '{{damage=1}} {{dmg1flag=1}}';
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmgbase'
                                ] =
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spellhealing'
                                    ];
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmgtype'
                                ] =
                                'Healing';
                            if (
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spelldmgmod'
                                    ] &&
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spelldmgmod'
                                    ] === 'Yes'
                            ) {
                                quietupdate[
                                'repeating_attack_' + atkid + '_dmgattr'
                                    ] = v.spellcasting_ability.slice(0, -1);
                            } else {
                                quietupdate[
                                'repeating_attack_' + atkid + '_dmgattr'
                                    ] =
                                    '0';
                            }
                        } else if (
                            !v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamage2'
                                ] ||
                            v[
                            'repeating_spell' +
                            cat +
                            '_' +
                            repid +
                            'spelldamage2'
                                ] === ''
                        ) {
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmg2flag'
                                ] =
                                '{{damage=1}} {{dmg2flag=1}}';
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmg2base'
                                ] =
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spellhealing'
                                    ];
                            quietupdate[
                            'repeating_attack_' + atkid + '_dmg2type'
                                ] =
                                'Healing';
                            if (
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spelldmgmod'
                                    ] &&
                                v[
                                'repeating_spell' +
                                cat +
                                '_' +
                                repid +
                                'spelldmgmod'
                                    ] === 'Yes'
                            ) {
                                quietupdate[
                                'repeating_attack_' + atkid + '_dmg2attr'
                                    ] = v.spellcasting_ability.slice(0, -1);
                            } else {
                                quietupdate[
                                'repeating_attack_' + atkid + '_dmg2attr'
                                    ] =
                                    '0';
                            }
                        }
                    }
                    if (npcspell === true) {
                        var pb =
                            Math.ceil(v.level / 1e10) + Math.ceil(v.level / 4);
                        pb = isNaN(pb) === false ? pb : 0;
                        quietupdate[
                        'repeating_attack_' + atkid + '_atkattr_base'
                            ] =
                            '0';
                        quietupdate['repeating_attack_' + atkid + '_atkmod'] =
                            v.npc_spellattackmod &&
                            isNaN(parseInt(v.npc_spellattackmod, 10)) === false
                                ? parseInt(v.npc_spellattackmod, 10) - pb
                                : 0 - pb;
                        quietupdate['repeating_attack_' + atkid + '_savedc'] =
                            '(@{saveflat})';
                        quietupdate['repeating_attack_' + atkid + '_saveflat'] =
                            v.npc_spelldc &&
                            isNaN(parseInt(v.npc_spelldc, 10)) === false
                                ? parseInt(v.npc_spelldc, 10)
                                : 0;
                    }
                }
            }
            setAttrs(quietupdate, {silent: true});
            setAttrs(update);
        }
    );
};

var updateSpellSlots = function (lvl) {
    if (lvl < 1) {
        l1 = 0;
        l2 = 0;
        l3 = 0;
        l4 = 0;
        l5 = 0;
        l6 = 0;
        l7 = 0;
        l8 = 0;
        l9 = 0;
    } else {
        l1 = Math.min(lvl + 1, 4);
        if (lvl < 3) {
            l2 = 0;
        } else if (lvl === 3) {
            l2 = 2;
        } else {
            l2 = 3;
        }
        if (lvl < 5) {
            l3 = 0;
        } else if (lvl === 5) {
            l3 = 2;
        } else {
            l3 = 3;
        }
        if (lvl < 7) {
            l4 = 0;
        } else if (lvl === 7) {
            l4 = 1;
        } else if (lvl === 8) {
            l4 = 2;
        } else {
            l4 = 3;
        }
        if (lvl < 9) {
            l5 = 0;
        } else if (lvl === 9) {
            l5 = 1;
        } else if (lvl < 18) {
            l5 = 2;
        } else {
            l5 = 3;
        }
        if (lvl < 11) {
            l6 = 0;
        } else if (lvl < 19) {
            l6 = 1;
        } else {
            l6 = 2;
        }
        if (lvl < 13) {
            l7 = 0;
        } else if (lvl < 20) {
            l7 = 1;
        } else {
            l7 = 2;
        }
        if (lvl < 15) {
            l8 = 0;
        } else {
            l8 = 1;
        }
        if (lvl < 17) {
            l9 = 0;
        } else {
            l9 = 1;
        }
    }

    setAttrs({
        lvl1_slots_total: l1,
        lvl2_slots_total: l2,
        lvl3_slots_total: l3,
        lvl4_slots_total: l4,
        lvl5_slots_total: l5,
        lvl6_slots_total: l6,
        lvl7_slots_total: l7,
        lvl8_slots_total: l8,
        lvl9_slots_total: l9
    });
};

var updateNPC = function () {
    getAttrs(
        [
            'npc_name',
            'npc_type',
            'npc_ac',
            'npc_actype',
            'hp_max',
            'npc_hpformula',
            'npc_speed',
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
            'npc_str_save',
            'npc_dex_save',
            'npc_con_save',
            'npc_int_save',
            'npc_wis_save',
            'npc_cha_save',
            'npc_acrobatics',
            'npc_animal_handling',
            'npc_arcana',
            'npc_athletics',
            'npc_deception',
            'npc_history',
            'npc_insight',
            'npc_intimidation',
            'npc_investigation',
            'npc_medicine',
            'npc_nature',
            'npc_perception',
            'npc_performance',
            'npc_persuasion',
            'npc_religion',
            'npc_sleight_of_hand',
            'npc_stealth',
            'npc_survival',
            'npc_vulnerabilities',
            'npc_resistances',
            'npc_immunities',
            'npc_condition_immunities',
            'npc_senses',
            'npc_languages',
            'npc_challenge',
            'npc_xp',
            'npc_legendary_actions',
            'npcreactionsflag',
            'npcspellcastingflag'
        ],
        function (v) {
            var rollbase = '';
            var first_save = 0;
            var first_skill = 0;
            var hp_max =
                isNaN(parseInt(v.hp_max, 10)) === false
                    ? parseInt(v.hp_max, 10)
                    : 0;
            var actype =
                v.npc_actype && v.npc_actype != ''
                    ? '(' + v.npc_actype + ')'
                    : '';
            var hpformula =
                v.npc_hpformula && v.npc_hpformula != ''
                    ? '(' + v.npc_hpformula + ')'
                    : '';
            var str_mod_base =
                v.strength && isNaN(v.strength) === false
                    ? Math.floor((parseInt(v.strength, 10) - 10) / 2)
                    : 0;
            var str_mod =
                str_mod_base > -1
                    ? '(+' + str_mod_base + ')'
                    : '(' + str_mod_base + ')';
            var dex_mod_base =
                v.dexterity && isNaN(v.dexterity) === false
                    ? Math.floor((parseInt(v.dexterity, 10) - 10) / 2)
                    : 0;
            var dex_mod =
                dex_mod_base > -1
                    ? '(+' + dex_mod_base + ')'
                    : '(' + dex_mod_base + ')';
            var con_mod_base =
                v.constitution && isNaN(v.constitution) === false
                    ? Math.floor((parseInt(v.constitution, 10) - 10) / 2)
                    : 0;
            var con_mod =
                con_mod_base > -1
                    ? '(+' + con_mod_base + ')'
                    : '(' + con_mod_base + ')';
            var int_mod_base =
                v.intelligence && isNaN(v.intelligence) === false
                    ? Math.floor((parseInt(v.intelligence, 10) - 10) / 2)
                    : 0;
            var int_mod =
                int_mod_base > -1
                    ? '(+' + int_mod_base + ')'
                    : '(' + int_mod_base + ')';
            var wis_mod_base =
                v.wisdom && isNaN(v.wisdom) === false
                    ? Math.floor((parseInt(v.wisdom, 10) - 10) / 2)
                    : 0;
            var wis_mod =
                wis_mod_base > -1
                    ? '(+' + wis_mod_base + ')'
                    : '(' + wis_mod_base + ')';
            var cha_mod_base =
                v.charisma && isNaN(v.charisma) === false
                    ? Math.floor((parseInt(v.charisma, 10) - 10) / 2)
                    : 0;
            var cha_mod =
                cha_mod_base > -1
                    ? '(+' + cha_mod_base + ')'
                    : '(' + cha_mod_base + ')';
            if (v.npc_vulnerabilities && v.npc_vulnerabilities) {
                vulnerabilities_flag = 1;
                vulnerabilities = v.npc_vulnerabilities;
            } else {
                vulnerabilities_flag = 0;
                vulnerabilities = 0;
            }
            if (v.npc_resistances && v.npc_resistances) {
                resistances_flag = 1;
                resistances = v.npc_resistances;
            } else {
                resistances_flag = 0;
                resistances = 0;
            }
            if (v.npc_immunities && v.npc_immunities) {
                immunities_flag = 1;
                immunities = v.npc_immunities;
            } else {
                immunities_flag = 0;
                immunities = 0;
            }
            if (v.npc_condition_immunities && v.npc_condition_immunities) {
                condition_immunities_flag = 1;
                condition_immunities = v.npc_condition_immunities;
            } else {
                condition_immunities_flag = 0;
                condition_immunities = 0;
            }
            var senses =
                v.npc_senses && v.npc_senses != '' ? v.npc_senses : '-';
            var languages =
                v.npc_languages && v.npc_languages != ''
                    ? v.npc_languages
                    : '-';
            var challenge =
                v.npc_challenge && v.npc_challenge != ''
                    ? v.npc_challenge
                    : '-';
            var xp =
                v.npc_xp && v.npc_xp != '' ? '(' + v.npc_xp + ' XP)' : '(-)';
            // 1 = First Entry Single Digit, 2 = First Entry Double Digit, 3 = Later Entry Single Digit, 4 = Later Entry Double Digit, 5 = Negative Bonus
            if (v.npc_str_save && v.npc_str_save != '') {
                str_save = parseInt(v.npc_str_save, 10);
                if (str_save < 0) {
                    str_save_flag = 5;
                } else if (first_save === 0 && str_save < 10) {
                    str_save_flag = 1;
                } else if (first_save === 0 && str_save > 9) {
                    str_save_flag = 2;
                } else if (first_save === 1 && str_save < 10) {
                    str_save_flag = 3;
                } else if (first_save === 1 && str_save > 9) {
                    str_save_flag = 4;
                }
                first_save = 1;
            } else {
                str_save_flag = 0;
                str_save = '';
            }
            if (v.npc_dex_save && v.npc_dex_save != '') {
                dex_save = parseInt(v.npc_dex_save, 10);
                if (dex_save < 0) {
                    dex_save_flag = 5;
                } else if (first_save === 0 && dex_save < 10) {
                    dex_save_flag = 1;
                } else if (first_save === 0 && dex_save > 9) {
                    dex_save_flag = 2;
                } else if (first_save === 1 && dex_save < 10) {
                    dex_save_flag = 3;
                } else if (first_save === 1 && dex_save > 9) {
                    dex_save_flag = 4;
                }
                first_save = 1;
            } else {
                dex_save_flag = 0;
                dex_save = '';
            }
            if (v.npc_con_save && v.npc_con_save != '') {
                con_save = parseInt(v.npc_con_save, 10);
                if (con_save < 0) {
                    con_save_flag = 5;
                } else if (first_save === 0 && con_save < 10) {
                    con_save_flag = 1;
                } else if (first_save === 0 && con_save > 9) {
                    con_save_flag = 2;
                } else if (first_save === 1 && con_save < 10) {
                    con_save_flag = 3;
                } else if (first_save === 1 && con_save > 9) {
                    con_save_flag = 4;
                }
                first_save = 1;
            } else {
                con_save_flag = 0;
                con_save = '';
            }
            if (v.npc_int_save && v.npc_int_save != '') {
                int_save = parseInt(v.npc_int_save, 10);
                if (int_save < 0) {
                    int_save_flag = 5;
                } else if (first_save === 0 && int_save < 10) {
                    int_save_flag = 1;
                } else if (first_save === 0 && int_save > 9) {
                    int_save_flag = 2;
                } else if (first_save === 1 && int_save < 10) {
                    int_save_flag = 3;
                } else if (first_save === 1 && int_save > 9) {
                    int_save_flag = 4;
                }
                first_save = 1;
            } else {
                int_save_flag = 0;
                int_save = '';
            }
            if (v.npc_wis_save && v.npc_wis_save != '') {
                wis_save = parseInt(v.npc_wis_save, 10);
                if (wis_save < 0) {
                    wis_save_flag = 5;
                } else if (first_save === 0 && wis_save < 10) {
                    wis_save_flag = 1;
                } else if (first_save === 0 && wis_save > 9) {
                    wis_save_flag = 2;
                } else if (first_save === 1 && wis_save < 10) {
                    wis_save_flag = 3;
                } else if (first_save === 1 && wis_save > 9) {
                    wis_save_flag = 4;
                }
                first_save = 1;
            } else {
                wis_save_flag = 0;
                wis_save = '';
            }
            if (v.npc_cha_save && v.npc_cha_save != '') {
                cha_save = parseInt(v.npc_cha_save, 10);
                if (cha_save < 0) {
                    cha_save_flag = 5;
                } else if (first_save === 0 && cha_save < 10) {
                    cha_save_flag = 1;
                } else if (first_save === 0 && cha_save > 9) {
                    cha_save_flag = 2;
                } else if (first_save === 1 && cha_save < 10) {
                    cha_save_flag = 3;
                } else if (first_save === 1 && cha_save > 9) {
                    cha_save_flag = 4;
                }
                first_save = 1;
            } else {
                cha_save_flag = 0;
                cha_save = '';
            }
            if (v.npc_acrobatics && v.npc_acrobatics != '') {
                acrobatics = parseInt(v.npc_acrobatics, 10);
                if (acrobatics < 0) {
                    acrobatics_flag = 5;
                } else if (first_skill === 0 && acrobatics < 10) {
                    acrobatics_flag = 1;
                } else if (first_skill === 0 && acrobatics > 9) {
                    acrobatics_flag = 2;
                } else if (first_skill === 1 && acrobatics < 10) {
                    acrobatics_flag = 3;
                } else if (first_skill === 1 && acrobatics > 9) {
                    acrobatics_flag = 4;
                }
                first_skill = 1;
            } else {
                acrobatics_flag = 0;
                acrobatics = '';
            }
            if (v.npc_animal_handling && v.npc_animal_handling != '') {
                animal_handling = parseInt(v.npc_animal_handling, 10);
                if (animal_handling < 0) {
                    animal_handling_flag = 5;
                } else if (first_skill === 0 && animal_handling < 10) {
                    animal_handling_flag = 1;
                } else if (first_skill === 0 && animal_handling > 9) {
                    animal_handling_flag = 2;
                } else if (first_skill === 1 && animal_handling < 10) {
                    animal_handling_flag = 3;
                } else if (first_skill === 1 && animal_handling > 9) {
                    animal_handling_flag = 4;
                }
                first_skill = 1;
            } else {
                animal_handling_flag = 0;
                animal_handling = '';
            }
            if (v.npc_arcana && v.npc_arcana != '') {
                arcana = parseInt(v.npc_arcana, 10);
                if (arcana < 0) {
                    arcana_flag = 5;
                } else if (first_skill === 0 && arcana < 10) {
                    arcana_flag = 1;
                } else if (first_skill === 0 && arcana > 9) {
                    arcana_flag = 2;
                } else if (first_skill === 1 && arcana < 10) {
                    arcana_flag = 3;
                } else if (first_skill === 1 && arcana > 9) {
                    arcana_flag = 4;
                }
                first_skill = 1;
            } else {
                arcana_flag = 0;
                arcana = '';
            }
            if (v.npc_athletics && v.npc_athletics != '') {
                athletics = parseInt(v.npc_athletics, 10);
                if (athletics < 0) {
                    athletics_flag = 5;
                } else if (first_skill === 0 && athletics < 10) {
                    athletics_flag = 1;
                } else if (first_skill === 0 && athletics > 9) {
                    athletics_flag = 2;
                } else if (first_skill === 1 && athletics < 10) {
                    athletics_flag = 3;
                } else if (first_skill === 1 && athletics > 9) {
                    athletics_flag = 4;
                }
                first_skill = 1;
            } else {
                athletics_flag = 0;
                athletics = '';
            }
            if (v.npc_deception && v.npc_deception != '') {
                deception = parseInt(v.npc_deception, 10);
                if (deception < 0) {
                    deception_flag = 5;
                } else if (first_skill === 0 && deception < 10) {
                    deception_flag = 1;
                } else if (first_skill === 0 && deception > 9) {
                    deception_flag = 2;
                } else if (first_skill === 1 && deception < 10) {
                    deception_flag = 3;
                } else if (first_skill === 1 && deception > 9) {
                    deception_flag = 4;
                }
                first_skill = 1;
            } else {
                deception_flag = 0;
                deception = '';
            }
            if (v.npc_history && v.npc_history != '') {
                history = parseInt(v.npc_history, 10);
                if (history < 0) {
                    history_flag = 5;
                } else if (first_skill === 0 && history < 10) {
                    history_flag = 1;
                } else if (first_skill === 0 && history > 9) {
                    history_flag = 2;
                } else if (first_skill === 1 && history < 10) {
                    history_flag = 3;
                } else if (first_skill === 1 && history > 9) {
                    history_flag = 4;
                }
                first_skill = 1;
            } else {
                history_flag = 0;
                history = '';
            }
            if (v.npc_insight && v.npc_insight != '') {
                insight = parseInt(v.npc_insight, 10);
                if (insight < 0) {
                    insight_flag = 5;
                } else if (first_skill === 0 && insight < 10) {
                    insight_flag = 1;
                } else if (first_skill === 0 && insight > 9) {
                    insight_flag = 2;
                } else if (first_skill === 1 && insight < 10) {
                    insight_flag = 3;
                } else if (first_skill === 1 && insight > 9) {
                    insight_flag = 4;
                }
                first_skill = 1;
            } else {
                insight_flag = 0;
                insight = '';
            }
            if (v.npc_intimidation && v.npc_intimidation != '') {
                intimidation = parseInt(v.npc_intimidation, 10);
                if (intimidation < 0) {
                    intimidation_flag = 5;
                } else if (first_skill === 0 && intimidation < 10) {
                    intimidation_flag = 1;
                } else if (first_skill === 0 && intimidation > 9) {
                    intimidation_flag = 2;
                } else if (first_skill === 1 && intimidation < 10) {
                    intimidation_flag = 3;
                } else if (first_skill === 1 && intimidation > 9) {
                    intimidation_flag = 4;
                }
                first_skill = 1;
            } else {
                intimidation_flag = 0;
                intimidation = '';
            }
            if (v.npc_investigation && v.npc_investigation != '') {
                investigation = parseInt(v.npc_investigation, 10);
                if (investigation < 0) {
                    investigation_flag = 5;
                } else if (first_skill === 0 && investigation < 10) {
                    investigation_flag = 1;
                } else if (first_skill === 0 && investigation > 9) {
                    investigation_flag = 2;
                } else if (first_skill === 1 && investigation < 10) {
                    investigation_flag = 3;
                } else if (first_skill === 1 && investigation > 9) {
                    investigation_flag = 4;
                }
                first_skill = 1;
            } else {
                investigation_flag = 0;
                investigation = '';
            }
            if (v.npc_medicine && v.npc_medicine != '') {
                medicine = parseInt(v.npc_medicine, 10);
                if (medicine < 0) {
                    medicine_flag = 5;
                } else if (first_skill === 0 && medicine < 10) {
                    medicine_flag = 1;
                } else if (first_skill === 0 && medicine > 9) {
                    medicine_flag = 2;
                } else if (first_skill === 1 && medicine < 10) {
                    medicine_flag = 3;
                } else if (first_skill === 1 && medicine > 9) {
                    medicine_flag = 4;
                }
                first_skill = 1;
            } else {
                medicine_flag = 0;
                medicine = '';
            }
            if (v.npc_nature && v.npc_nature != '') {
                nature = parseInt(v.npc_nature, 10);
                if (nature < 0) {
                    nature_flag = 5;
                } else if (first_skill === 0 && nature < 10) {
                    nature_flag = 1;
                } else if (first_skill === 0 && nature > 9) {
                    nature_flag = 2;
                } else if (first_skill === 1 && nature < 10) {
                    nature_flag = 3;
                } else if (first_skill === 1 && nature > 9) {
                    nature_flag = 4;
                }
                first_skill = 1;
            } else {
                nature_flag = 0;
                nature = '';
            }
            if (v.npc_perception && v.npc_perception != '') {
                perception = parseInt(v.npc_perception, 10);
                if (perception < 0) {
                    perception_flag = 5;
                } else if (first_skill === 0 && perception < 10) {
                    perception_flag = 1;
                } else if (first_skill === 0 && perception > 9) {
                    perception_flag = 2;
                } else if (first_skill === 1 && perception < 10) {
                    perception_flag = 3;
                } else if (first_skill === 1 && perception > 9) {
                    perception_flag = 4;
                }
                first_skill = 1;
            } else {
                perception_flag = 0;
                perception = '';
            }
            if (v.npc_performance && v.npc_performance != '') {
                sperformance = parseInt(v.npc_performance, 10);
                if (sperformance < 0) {
                    performance_flag = 5;
                } else if (first_skill === 0 && sperformance < 10) {
                    performance_flag = 1;
                } else if (first_skill === 0 && sperformance > 9) {
                    performance_flag = 2;
                } else if (first_skill === 1 && sperformance < 10) {
                    performance_flag = 3;
                } else if (first_skill === 1 && sperformance > 9) {
                    performance_flag = 4;
                }
                first_skill = 1;
            } else {
                performance_flag = 0;
                sperformance = '';
            }
            if (v.npc_persuasion && v.npc_persuasion != '') {
                persuasion = parseInt(v.npc_persuasion, 10);
                if (persuasion < 0) {
                    persuasion_flag = 5;
                } else if (first_skill === 0 && persuasion < 10) {
                    persuasion_flag = 1;
                } else if (first_skill === 0 && persuasion > 9) {
                    persuasion_flag = 2;
                } else if (first_skill === 1 && persuasion < 10) {
                    persuasion_flag = 3;
                } else if (first_skill === 1 && persuasion > 9) {
                    persuasion_flag = 4;
                }
                first_skill = 1;
            } else {
                persuasion_flag = 0;
                persuasion = '';
            }
            if (v.npc_religion && v.npc_religion != '') {
                religion = parseInt(v.npc_religion, 10);
                if (religion < 0) {
                    religion_flag = 5;
                } else if (first_skill === 0 && religion < 10) {
                    religion_flag = 1;
                } else if (first_skill === 0 && religion > 9) {
                    religion_flag = 2;
                } else if (first_skill === 1 && religion < 10) {
                    religion_flag = 3;
                } else if (first_skill === 1 && religion > 9) {
                    religion_flag = 4;
                }
                first_skill = 1;
            } else {
                religion_flag = 0;
                religion = '';
            }
            if (v.npc_sleight_of_hand && v.npc_sleight_of_hand != '') {
                sleight_of_hand = parseInt(v.npc_sleight_of_hand, 10);
                if (sleight_of_hand < 0) {
                    sleight_of_hand_flag = 5;
                } else if (first_skill === 0 && sleight_of_hand < 10) {
                    sleight_of_hand_flag = 1;
                } else if (first_skill === 0 && sleight_of_hand > 9) {
                    sleight_of_hand_flag = 2;
                } else if (first_skill === 1 && sleight_of_hand < 10) {
                    sleight_of_hand_flag = 3;
                } else if (first_skill === 1 && sleight_of_hand > 9) {
                    sleight_of_hand_flag = 4;
                }
                first_skill = 1;
            } else {
                sleight_of_hand_flag = 0;
                sleight_of_hand = '';
            }
            if (v.npc_stealth && v.npc_stealth != '') {
                stealth = parseInt(v.npc_stealth, 10);
                if (stealth < 0) {
                    stealth_flag = 5;
                } else if (first_skill === 0 && stealth < 10) {
                    stealth_flag = 1;
                } else if (first_skill === 0 && stealth > 9) {
                    stealth_flag = 2;
                } else if (first_skill === 1 && stealth < 10) {
                    stealth_flag = 3;
                } else if (first_skill === 1 && stealth > 9) {
                    stealth_flag = 4;
                }
                first_skill = 1;
            } else {
                stealth_flag = 0;
                stealth = '';
            }
            if (v.npc_survival && v.npc_survival != '') {
                survival = parseInt(v.npc_survival, 10);
                if (survival < 0) {
                    survival_flag = 5;
                } else if (first_skill === 0 && survival < 10) {
                    survival_flag = 1;
                } else if (first_skill === 0 && survival > 9) {
                    survival_flag = 2;
                } else if (first_skill === 1 && survival < 10) {
                    survival_flag = 3;
                } else if (first_skill === 1 && survival > 9) {
                    survival_flag = 4;
                }
                first_skill = 1;
            } else {
                survival_flag = 0;
                survival = '';
            }
            leg_act =
                v.npc_legendary_actions && v.npc_legendary_actions != ''
                    ? v.npc_legendary_actions
                    : 0;
            react =
                v.npcreactionsflag && v.npcreactionsflag != '0'
                    ? v.npcreactionsflag
                    : 0;
            npcspells =
                v.npcspellcastingflag && v.npcspellcastingflag != '0'
                    ? v.npcspellcastingflag
                    : 0;
            // legendary_actions_display = "The " + v.npc_name + " can take " + leg_act + " legendary actions, choosing from the options below. Only one legendary option can be used at a time and only at the end of another creature's turn. The " + v.npc_name + " regains spent legendary actions at the start of its turn."

            setAttrs({
                npcd_name: v.npc_name,
                npcd_type: v.npc_type,
                npcd_ac: v.npc_ac,
                npcd_actype: actype,
                npcd_hp: hp_max,
                npcd_hpformula: hpformula,
                npcd_speed: v.npc_speed,
                npcd_str: v.strength,
                npcd_str_mod: str_mod,
                npcd_dex: v.dexterity,
                npcd_dex_mod: dex_mod,
                npcd_con: v.constitution,
                npcd_con_mod: con_mod,
                npcd_int: v.intelligence,
                npcd_int_mod: int_mod,
                npcd_wis: v.wisdom,
                npcd_wis_mod: wis_mod,
                npcd_cha: v.charisma,
                npcd_cha_mod: cha_mod,
                npcd_str_save: str_save,
                npc_str_save_flag: str_save_flag,
                npcd_dex_save: dex_save,
                npc_dex_save_flag: dex_save_flag,
                npcd_con_save: con_save,
                npc_con_save_flag: con_save_flag,
                npcd_int_save: int_save,
                npc_int_save_flag: int_save_flag,
                npcd_wis_save: wis_save,
                npc_wis_save_flag: wis_save_flag,
                npcd_cha_save: cha_save,
                npc_cha_save_flag: cha_save_flag,
                npc_saving_flag: first_save,
                npcd_acrobatics: acrobatics,
                npc_acrobatics_flag: acrobatics_flag,
                npcd_animal_handling: animal_handling,
                npc_animal_handling_flag: animal_handling_flag,
                npcd_arcana: arcana,
                npc_arcana_flag: arcana_flag,
                npcd_athletics: athletics,
                npc_athletics_flag: athletics_flag,
                npcd_deception: deception,
                npc_deception_flag: deception_flag,
                npcd_history: history,
                npc_history_flag: history_flag,
                npcd_insight: insight,
                npc_insight_flag: insight_flag,
                npcd_intimidation: intimidation,
                npc_intimidation_flag: intimidation_flag,
                npcd_investigation: investigation,
                npc_investigation_flag: investigation_flag,
                npcd_medicine: medicine,
                npc_medicine_flag: medicine_flag,
                npcd_nature: nature,
                npc_nature_flag: nature_flag,
                npcd_perception: perception,
                npc_perception_flag: perception_flag,
                npcd_performance: sperformance,
                npc_performance_flag: performance_flag,
                npcd_persuasion: persuasion,
                npc_persuasion_flag: persuasion_flag,
                npcd_religion: religion,
                npc_religion_flag: religion_flag,
                npcd_sleight_of_hand: sleight_of_hand,
                npc_sleight_of_hand_flag: sleight_of_hand_flag,
                npcd_stealth: stealth,
                npc_stealth_flag: stealth_flag,
                npcd_survival: survival,
                npc_survival_flag: survival_flag,
                npc_skills_flag: first_skill,
                npcd_vulnerabilities: vulnerabilities,
                npc_vulnerabilities_flag: vulnerabilities_flag,
                npcd_resistances: resistances,
                npc_resistances_flag: resistances_flag,
                npcd_immunities: immunities,
                npc_immunities_flag: immunities_flag,
                npcd_condition_immunities: condition_immunities,
                npc_condition_immunities_flag: condition_immunities_flag,
                npcd_senses: senses,
                npcd_languages: languages,
                npcd_challenge: challenge,
                npcd_xp: xp,
                legendary_flag: leg_act,
                // legendary_actions_display: legendary_actions_display,
                reaction_flag: react,
                npcspell_flag: npcspells
            });
        }
    );
};

var updateNPCaction = function (eventinfo) {
    getAttrs(
        [
            'repeating_npcaction_name',
            'repeating_npcaction_attack_flag',
            'repeating_npcaction_attack_type',
            'repeating_npcaction_attack_range',
            'repeating_npcaction_attack_target',
            'repeating_npcaction_attack_tohit',
            'repeating_npcaction_attack_damage',
            'repeating_npcaction_attack_damagetype',
            'repeating_npcaction_attack_damage2',
            'repeating_npcaction_attack_damagetype2',
            'repeating_npcaction_description',
            'dtype'
        ],
        function (v) {
            var onhit = '';
            var damage_flag = '';
            description_flag =
                v.repeating_npcaction_description &&
                v.repeating_npcaction_description != ''
                    ? Math.max(
                    Math.ceil(
                        v.repeating_npcaction_description.length / 57
                    ),
                    1
                    )
                    : 0;
            attack_flag =
                v.repeating_npcaction_attack_flag &&
                v.repeating_npcaction_attack_flag != '0'
                    ? '{{attack=1}}'
                    : 0;
            attack_type = v.repeating_npcaction_attack_type + ' Weapon Attack:';
            tohit =
                v.repeating_npcaction_attack_tohit &&
                isNaN(parseInt(v.repeating_npcaction_attack_tohit, 10)) ===
                false
                    ? parseInt(v.repeating_npcaction_attack_tohit, 10)
                    : 0;
            if (
                v.repeating_npcaction_attack_range &&
                v.repeating_npcaction_attack_range
            ) {
                if (v.repeating_npcaction_attack_type === 'Melee') {
                    rangetype = 'Reach';
                } else {
                    rangetype = 'Range';
                }
                range =
                    ', ' + rangetype + ' ' + v.repeating_npcaction_attack_range;
            } else {
                range = '';
            }
            target =
                v.repeating_npcaction_attack_target &&
                v.repeating_npcaction_attack_target != ''
                    ? ', ' + v.repeating_npcaction_attack_target
                    : '';
            attack_tohitrange = '+' + tohit + range + target + '.';
            dmg1 =
                v.repeating_npcaction_attack_damage &&
                v.repeating_npcaction_attack_damage != ''
                    ? v.repeating_npcaction_attack_damage
                    : '';
            dmg1type =
                v.repeating_npcaction_attack_damagetype &&
                v.repeating_npcaction_attack_damagetype != ''
                    ? ' ' + v.repeating_npcaction_attack_damagetype
                    : '';
            dmg2 =
                v.repeating_npcaction_attack_damage2 &&
                v.repeating_npcaction_attack_damage2 != ''
                    ? v.repeating_npcaction_attack_damage2
                    : '';
            dmg2type =
                v.repeating_npcaction_attack_damagetype2 &&
                v.repeating_npcaction_attack_damagetype2 != ''
                    ? ' ' + v.repeating_npcaction_attack_damagetype2
                    : '';
            dmgspacer = dmg1 != '' && dmg2 != '' ? ' plus ' : '';
            if (dmg1 != '') {
                dmg1t = dmg1.replace(/\s/g, '').split(/d|(?=\+|\-)/g);
                dmg1t2 = isNaN(eval(dmg1t[1])) === false ? eval(dmg1t[1]) : 0;
                if (dmg1t.length < 2) {
                    onhit =
                        onhit +
                        dmg1t[0] +
                        ' (' +
                        dmg1 +
                        ')' +
                        dmg1type +
                        ' damage';
                } else if (dmg1t.length < 3) {
                    onhit =
                        onhit +
                        Math.floor(dmg1t[0] * (dmg1t2 / 2 + 0.5)) +
                        ' (' +
                        dmg1 +
                        ')' +
                        dmg1type +
                        ' damage';
                } else {
                    onhit =
                        onhit +
                        (Math.floor(dmg1t[0] * (dmg1t2 / 2 + 0.5)) +
                            parseInt(dmg1t[2], 10)) +
                        ' (' +
                        dmg1 +
                        ')' +
                        dmg1type +
                        ' damage';
                }
            }
            dmgspacer = dmg1 != '' && dmg2 != '' ? ' plus ' : '';
            onhit = onhit + dmgspacer;
            if (dmg2 != '') {
                dmg2t = dmg2.replace(/\s/g, '').split(/[d+]+/);
                dmg2t2 = isNaN(eval(dmg2t[1])) === false ? eval(dmg2t[1]) : 0;
                if (dmg2t.length < 2) {
                    onhit =
                        onhit +
                        dmg2t[0] +
                        ' (' +
                        dmg2 +
                        ')' +
                        dmg2type +
                        ' damage';
                } else if (dmg2t.length < 3) {
                    onhit =
                        onhit +
                        Math.floor(dmg2t[0] * (dmg2t2 / 2 + 0.5)) +
                        ' (' +
                        dmg2 +
                        ')' +
                        dmg2type +
                        ' damage';
                } else {
                    onhit =
                        onhit +
                        (Math.floor(dmg2t[0] * (dmg2t2 / 2 + 0.5)) +
                            parseInt(dmg2t[2], 10)) +
                        ' (' +
                        dmg2 +
                        ')' +
                        dmg2type +
                        ' damage';
                }
            }
            if (dmg1 != '' || dmg2 != '') {
                damage_flag = damage_flag + '{{damage=1}} ';
            }
            if (dmg1 != '') {
                damage_flag = damage_flag + '{{dmg1flag=1}} ';
            }
            if (dmg2 != '') {
                damage_flag = damage_flag + '{{dmg2flag=1}} ';
            }
            crit1 =
                dmg1 != '' && dmg1t.length > 1 ? dmg1t[0] + 'd' + dmg1t[1] : '';
            crit2 =
                dmg2 != '' && dmg2t.length > 1 ? dmg2t[0] + 'd' + dmg2t[1] : '';
            if (v.dtype === 'full') {
                rollbase =
                    '@{wtype}&{template:npcaction} @{attack_display_flag} @{damage_flag} {{name=@{npc_name}}} {{rname=@{name}}} {{r1=[[1d20+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} {{description=@{description}}} @{charname_output}';
            } else if (
                v.repeating_npcaction_attack_flag &&
                v.repeating_npcaction_attack_flag != '0'
            ) {
                if (eventinfo.sourceAttribute.indexOf('npcaction-l') === -1) {
                    rollbase =
                        '@{wtype}&{template:npcatk} @{attack_display_flag} @{damage_flag} {{name=@{npc_name}}} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{r1=[[1d20+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{description}}} @{charname_output}';
                } else {
                    rollbase =
                        '@{wtype}&{template:npcatk} @{attack_display_flag} @{damage_flag} {{name=@{npc_name}}} {{rname=[@{name}](~repeating_npcaction-l_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction-l_npc_crit)}} {{r1=[[1d20+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{description}}} @{charname_output}';
                }
            } else if (
                v.repeating_npcaction_attack_damage &&
                v.repeating_npcaction_attack_damage != ''
            ) {
                rollbase =
                    '@{wtype}&{template:npcdmg} @{damage_flag} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} @{charname_output}';
            } else {
                rollbase =
                    '@{wtype}&{template:npcaction} {{name=@{npc_name}}} {{rname=@{name}}} {{description=@{description}}} @{charname_output}';
            }

            setAttrs({
                repeating_npcaction_name_display:
                v.repeating_npcaction_name + '.',
                repeating_npcaction_attack_display_flag: attack_flag,
                repeating_npcaction_attack_options: attack_flag,
                repeating_npcaction_attack_type_display: attack_type,
                repeating_npcaction_attack_tohitrange: attack_tohitrange,
                repeating_npcaction_attack_onhit: onhit,
                repeating_npcaction_description_flag: description_flag,
                repeating_npcaction_damage_flag: damage_flag,
                repeating_npcaction_attack_crit: crit1,
                repeating_npcaction_attack_crit2: crit2,
                repeating_npcaction_rollbase: rollbase
            });
        }
    );
};

// var updateNPCspell = function(eventinfo) {
//     var id = eventinfo.sourceAttribute.split("_")[2];
//     console.log(id);
//     var update = {};
//     var rollbase = "";
//     getAttrs(["dtype","spellcasting_ability","npc_spelldc","character_id","npc_spellattackmod","repeating_spell-npc_"+id+"_spelloutput","repeating_spell-npc_"+id+"_spellattack","repeating_spell-npc_"+id+"_spellattack","repeating_spell-npc_"+id+"_spellname_base"], function(v) {
//         var atk_flag = v["repeating_spell-npc_"+id+"_spellattack"] != "None" ? "{{attack=1}} " : "";
//         var dmg_flag = v["repeating_spell-npc_"+id+"_spelldamage"] != "" ? "{{damage=1}} " : "";
//         if(v["repeating_spell-npc_"+id+"_spelloutput"] === "ATTACK") {
//             if(v.dtype === "full") {
//                 rollbase = "@{wtype}&{template:npcaction} " + atk_flag + dmg_flag + "{{name=@{npc_name}}} {{rname=" + v["repeating_spell-npc_"+id+"_spellname_base"] + "}} {{r1=[[1d20+(@{npc_spellattackmod}+0)]]}} @{rtype}+(@{npc_spellattackmod}+0)]]}} {{dmg1=[[@{spelldamage}+0]]}} {{dmg1type=@{spelldamagetype}}} {{dmg2=[[@{spelldamage2}+0]]}} {{dmg2type=@{spelldamagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} {{description=@{spelldescription}}}";
//             }
//             // else if(v.repeating_npcaction_attack_flag && v.repeating_npcaction_attack_flag != "0") {
//             //     if(eventinfo.sourceAttribute.indexOf("npcaction-l") === -1) {
//             //         rollbase = "@{wtype}&{template:npcatk} @{attack_display_flag} @{damage_flag} {{name=@{npc_name}}} {{rname=[@{name}](~repeating_npcaction_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction_npc_crit)}} {{r1=[[1d20+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{description}}} @{charname_output}";
//             //     }
//             //     else {
//             //         rollbase = "@{wtype}&{template:npcatk} @{attack_display_flag} @{damage_flag} {{name=@{npc_name}}} {{rname=[@{name}](~repeating_npcaction-l_npc_dmg)}} {{rnamec=[@{name}](~repeating_npcaction-l_npc_crit)}} {{r1=[[1d20+(@{attack_tohit}+0)]]}} @{rtype}+(@{attack_tohit}+0)]]}} {{description=@{description}}} @{charname_output}"
//             //     }
//             // }
//             // else if(v.repeating_npcaction_attack_damage && v.repeating_npcaction_attack_damage != "") {
//             //     rollbase = "@{wtype}&{template:npcdmg} @{damage_flag} {{dmg1=[[@{attack_damage}+0]]}} {{dmg1type=@{attack_damagetype}}} {{dmg2=[[@{attack_damage2}+0]]}} {{dmg2type=@{attack_damagetype2}}} {{crit1=[[@{attack_crit}+0]]}} {{crit2=[[@{attack_crit2}+0]]}} @{charname_output}"
//             // }
//             // else {
//             //     rollbase = "@{wtype}&{template:npcaction} {{name=@{npc_name}}} {{rname=@{name}}} {{description=@{description}}} @{charname_output}"
//             }
//             update["repeating_spell-npc_"+id+"_rollbase"] = rollbase;
//             setAttrs(update);
//         }
//     });
// }

var force_refresh_spells = function () {
    spellcats = ['cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'npc'];
    _.each(spellcats, function (cat) {
        getSectionIDs('repeating_spell-' + cat, function (idarray) {
            _.each(idarray, function (currentID, i) {
                updateSpell(currentID, cat, '', true);
            });
        });
    });
};

var force_refresh_attacks = function () {
    getSectionIDs('repeating_attack', function (idarray) {
        _.each(idarray, function (currentID, i) {
            getAttrs(
                ['repeating_attack_' + currentID + '_updateflag'],
                function (v) {
                    var update = {};
                    var toggle =
                        v['repeating_attack_' + currentID + '_updateflag'] ===
                        true
                            ? false
                            : true;
                    update[
                    'repeating_attack_' + currentID + '_updateflag'
                        ] = toggle;
                    setAttrs(update);
                }
            );
        });
    });
};

var force_refresh_npcactions = function () {
    getSectionIDs('repeating_npcaction-l', function (idarray) {
        legendaryarray = idarray;
        if (legendaryarray.length > 0) {
            _.each(legendaryarray, function (currentID, i) {
                getAttrs(
                    ['repeating_npcaction-l_' + currentID + '_updateflag'],
                    function (v) {
                        var update_l = {};
                        var toggle_l =
                            v[
                            'repeating_npcaction-l_' +
                            currentID +
                            '_updateflag'
                                ] === true
                                ? false
                                : true;
                        update_l[
                        'repeating_npcaction-l_' + currentID + '_updateflag'
                            ] = toggle_l;
                        setAttrs(update_l);
                    }
                );
            });
        }
    });

    getSectionIDs('repeating_npcaction', function (idarray) {
        cleanarray = idarray.filter(function (el) {
            return legendaryarray.indexOf(el) < 0;
        });
        if (cleanarray.length > 0) {
            _.each(cleanarray, function (currentID, i) {
                getAttrs(
                    ['repeating_npcaction_' + currentID + '_updateflag'],
                    function (v) {
                        var update = {};
                        var toggle =
                            v[
                            'repeating_npcaction_' +
                            currentID +
                            '_updateflag'
                                ] === true
                                ? false
                                : true;
                        update[
                        'repeating_npcaction_' + currentID + '_updateflag'
                            ] = toggle;
                        setAttrs(update);
                    }
                );
            });
        }
    });
};
