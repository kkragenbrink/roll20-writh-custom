function processCommand(evt) {
    const [command, ...args] = evt.content.split(' ');

    debug(`${evt.who} sent ${command}${args ? ' ' + args.join(' ') : null}.`);

    switch (command) {
        case '!shapechanger': shapechange(evt); break;
        case '!resize': resize(evt, args); break;
        case '!follow': follow(evt, ...args); break;
    }
}
