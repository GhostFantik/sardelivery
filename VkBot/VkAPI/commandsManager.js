const lp = require('./LongPollServer');

let commands = {};
let noCommandHandlers = [];
let otherCommandsHandlers = [];
lp.on('message_new', data => {
    if ('payload' in data.object) { // for keyboard
        const payload = JSON.parse(data.object.payload);
        if ('command' in payload){
            if (payload.command[0] !== '/') payload.command = '/' + payload.command;
            if (payload.command in commands)
                commands[payload.command].forEach(command => command(data.object));
        }
    }
    else {
        if (data.object.text[0] === '/')
            if (data.object.text in commands)
                commands[data.object.text].forEach(command => command(data.object));
            else
                otherCommandsHandlers.forEach(command => command(data.object));
        else noCommandHandlers.forEach(handler => handler(data.object));
    }
});

exports.on = function (command, callback) {
    if (command === 'nocmd') { noCommandHandlers.push(callback); return; }
    if (command === 'other') {otherCommandsHandlers.push(callback); return;}
    if (commands[command] === undefined) commands[command] = [callback];
    else commands[command].push(callback);
};
