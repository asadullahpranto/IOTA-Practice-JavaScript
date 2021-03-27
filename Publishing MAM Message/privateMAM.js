const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
const { time } = require('console');

const mode = 'restricted';
const sideKey = 'ASADULLAHPRA'; // must be upper case and at least 8 character
const provider = 'https://nodes.devnet.iota.org';
//const providerName = 'devnet';

const mamExplorerLink = 'https://mam-explorer.firebaseapp.com';

let mamState = Mam.init(provider);
mamState = Mam.changeMode(mamState, mode, sideKey);

const publish = async packet => {
    const trytes = asciiToTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);

    mamState = message.state;
    await Mam.attach(message.payload, message.address, 3, 9);

    console.log('Published', packet, '\n');
    return message.root;
}



const publishAll = async () => {
    
        const root = await publish([1, 2, 3, 4, 5]);

        return root;
    }
    
    const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n');

    let t1 = new Date(); // Take time just before publish

    publishAll()
        .then(async root => {

        let t2 = new Date(); // take time just after publish

        console.log('Time taken for publishing:', (t2-t1)/1000, '\n');
                //await Mam.fetch(root, mode, sideKey, logData);

        let t3 = new Date(); // taking time just before Fetching

        const result = await Mam.fetch(root, mode, sideKey);
        result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));

        let t4 = new Date(); // Taking time just after Fetching

        console.log('Time taken for Fecthing:', (t4 - t3)/1000);
        console.log(`\nVerify with MAM Explorer:\nWebsite: ${mamExplorerLink}\nRoot: ${root}\nsideKey:${sideKey}\n`);
    })