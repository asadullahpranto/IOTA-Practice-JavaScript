// send a zero-valued transaction with a 'hello world' message

// 1. require the packages
const Iota = require('@iota/core');
const Converter = require('@iota/converter');

// 2. connect to a node
console.log('Connecting to Devnet...');
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

console.log('Connected to Devnet!');

// 3. Define the depth and the minimum weight magnitude 
const depth = 3;
const minimumWeightMagnitude = 9;


// define the seed and address.
// These do not need to belong to anyone or have IOTA tokens.
// They must only contain a maximum of 81 trytes
// or 90 trytes with a valid checksum

// 4. Define the address
const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';

// 5. Define the seed
const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

// 6. Define a message to send.This message must include only ASCII characters. 
const message = JSON.stringify({"message": "Hello World"});

// Convert the message to trytes
const messageInTrytes =  Converter.asciiToTrytes(message);

// 7. Define a zero-value transaction object that sends the message to the address
const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
];

// Create a bundle from the transfers array and send the transaction to the node
iota.prepareTransfers(seed, transfers).then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
}).then(bundle => {
    console.log(`Bundle hash: ${bundle[0].bundle}`);
}).catch(err => {
    console.errror(err)
});
