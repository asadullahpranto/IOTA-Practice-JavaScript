
const Mam = require('@iota/mam');
const {asciiTrytes, trytesToAscii, asciiToTrytes} = require('@iota/converter');

const mode = 'public';
const provider = 'https://nodes.devnet.iota.org';

const providerName = 'devnet';
const mamExplorerLink = 'https://utils.iota.org/mam';

let mamState = Mam.init(provider);

const publish = async packet => {
    const trytes = asciiToTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    mamState = message.state;

    await Mam.attach(message.payload, message.address, 3, 9);

    console.log('Published', packet, '\n');
    return message.root;
}

const publishAll = async () => {
    const root = await publish({
        message: 'Message from Alice',
        timestamp: (new Date()).toLocaleString()
    });

    await publish({
        message: 'Message from Charlie',
        timestamp: (new Date()).toLocaleString()
    });

    return root;
}

const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n');

publishAll()
    .then(async root => {
        await Mam.fetch(root, mode, null, logData);

    const result = await Mam.fetch(root, mode);
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));

    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}/${root}/${mode}/${providerName}\n`);
});