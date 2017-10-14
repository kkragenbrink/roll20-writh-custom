'use strict';

function processCommand(evt) {
    const [command, ...args] = evt.content.split(' ');

    debug(`${evt.who} sent ${command}${args ? ' ' + args.join(' ') : null}.`);

    switch (command) {
        case '!shapechanger':
            shapechange(evt);
            break;
        case '!resize':
            resize(evt, args);
            break;
        case '!follow':
            follow(evt, ...args);
            break;
        case '!debug':
            debugTokenProperties(evt, ...args);
            break;
        case '!searchForTokenAnomalies':
            searchForTokenAnomalies(evt, ...args);
            break;
        case '!cleanupTokenAnomalies':
            cleanupTokenAnomalies(evt, ...args);
            break;
        case '!resetOrdinals':
            resetOrdinals(evt);
            break;
    }
}

function debugTokenProperties(evt, selectedId) {
    const tokens = getSelectedTokens(evt);
    tokens.forEach(token => {
        const represents = token.get('represents');
        const name = token.get('name');
        debug(`Token For ${name} (${represents})`);
        const attributes = getAllSheetAttributes(represents);
        attributes.forEach(attribute => {
            const attrName = attribute.get('name');
            debug(`  - ${attrName}`);
        });
    });
}

function searchForTokenAnomalies(evt, selectedId) {
    const tokens = getSelectedTokens(evt);

    tokens.forEach(token => {
        const represents = token.get('represents');
        const name = token.get('name');
        debug(`Token For ${name} (${represents})`);
        const attributes = getAllSheetAttributes(represents);
        attributes
            .map(attribute => attribute.get('name'))
            .filter(filterAnomalousAttributes)
            .forEach(attribute => {
                const attrObj = getSheetAttribute(represents, attribute);
                const value = attrObj.get('current');
                debug(`  - ${attribute}: ${value}`);
            });
    });
}

function cleanupTokenAnomalies(evt, selectedId) {
    const tokens = getSelectedTokens(evt);

    tokens.forEach(token => {
        const represents = token.get('represents');
        const name = token.get('name');
        debug(`Token For ${name} (${represents})`);
        const attributes = getAllSheetAttributes(represents);
        attributes
            .map(attribute => attribute.get('name'))
            .filter(filterAnomalousAttributes)
            .forEach(attribute => {
                const attrObj = getSheetAttribute(represents, attribute);
                attrObj.remove();
                debug(`  - removed: ${attribute}`);
            });
    });
}

function filterAnomalousAttributes(attribute) {
    return (
        /pb$/i.test(attribute) ||
        /(.*?)_(bonus$|save_bonus$|mod$|mod_with_sign$|mod_formula$)/i.test(
            attribute
        )
    );
}
