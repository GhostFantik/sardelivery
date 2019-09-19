const vk = require('./methodsManager');

let callbackPool = {
    messageNew: [],
};

exports.start = async function() {
    let lpData = (await vk.getLongPollServer()).response;
    print('LPDATA: ', lpData);
    while (true) {
        const response = await vk.startLongPollServer({
            key: lpData.key,
            server: lpData.server,
            ts: lpData.ts,
        });
        lpData.ts = response.ts;
        if (Array.isArray(response.updates)) {
            for (const update of response.updates) {
                if (update.type === 'message_new'){
                    for (const callback of callbackPool.messageNew) {
                        callback(update); // ASYNC???
                    }
                }
            }
        }
    }
};
exports.on = function (event, callback) {
    if (event === 'message_new') callbackPool.messageNew.push(callback);
};