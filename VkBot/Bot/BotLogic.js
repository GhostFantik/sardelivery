const lp = require('../VkAPI/LongPollServer');
const commands = require('./commands');

exports.startBot = async function () {
    console.log('Starting bot...');
    commands.initialize();
    await lp.start();
    console.log('await completed!');
};

