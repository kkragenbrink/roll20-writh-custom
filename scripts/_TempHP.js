/**
 * Automatically removes temp HP if they exist.
 *
 * When a token has its HP reduced the script checks to see if there are any
 * temp HP available. If it does those are removed first and the real HP is
 * updated to reflect the temp HP absorbing the hit.
 *
 * THPBAR - The bar used to track temp HP [1, 2, 3]
 * HPBAR - The bar used top track real HP [1, 2, 3]
 */
const THPBAR = 3;
const HPBAR = 1;

function setBar(obj, bar, value) {
    const link = obj.get('_bar' + bar + '_link');

    if (link !== '') {
        const attr = findObjs({_type: 'attribute', _id: link})[0];
        attr.set({current: value});
    }
    obj.set('bar' + bar + '_value', value);
}

on('change:token', (obj, prev) => {
    const HPVALUE = 'bar' + HPBAR + '_value';
    const THPVALUE = 'bar' + THPBAR + '_value';

    const hp = {
        new: parseInt(obj.get(HPVALUE)),
        old: parseInt(prev[HPVALUE])
    };
    const thp = parseInt(obj.get(THPVALUE));
    const target = {};

    if (hp.new !== NaN && hp.new !== hp.old && thp > 0) {
        // HP changed and we have THP to spend.

        hp.change = hp.new - hp.old;

        if (hp.change < 0) {
            // HP decreased
            hp.abschange = Math.abs(hp.change);
            target[THPVALUE] = thp > hp.abschange ? thp - hp.abschange : 0;
            target[HPVALUE] =
                thp > hp.abschange ? hp.old : hp.old - (hp.abschange - thp);

            setBar(obj, HPBAR, target[HPVALUE]);
            setBar(obj, THPBAR, target[THPVALUE]);
        }
    }
});
