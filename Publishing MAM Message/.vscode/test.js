const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
const { time } = require('console');

let fs = require('fs');

const mode = 'restricted';
const sideKey = 'ASADULLAHPRA'; // must be upper case and at least 8 character
const provider = 'https://nodes.devnet.iota.org';
//const providerName = 'devnet';

const mamExplorerLink = 'https://mam-explorer.firebaseapp.com';

let mamState = Mam.init(provider);
mamState = Mam.changeMode(mamState, mode, sideKey);

const publish = async packet =>
{
    const trytes = asciiToTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    mamState = message.state;
    await Mam.attach(message.payload, message.address, 3, 9);

    console.log('Published', packet, '\n');

    return message.root;
}

const inputData = [22, 75, 22, 75, 22, 75, 22, 75, 21, 75, 21, 75, 21, 75, 21, 75, 21, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75, 22, 75];

const publishAll = async () =>
{

    //const t1 = new Date();
    const root = await publish(input);
    //const t2 = new Date();

    // const t3 = new Date();
    // const result = await Mam.fetch(root, mode, sideKey);
    // const t4 = new Date();

    // // //result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));
    // console.log('Data length:', inputData.length);
    // console.log('Data size:', (inputData.length * 8) / 1024);
    // console.log('Writing time: ', (t2 - t1) / 1000, 'Seconds');
    // console.log('Reading time: ', (t4 - t3) / 1000, 'Seconds\n');

    return root;
}


publishAll();