// npm install @iota/core
// In this guide, we connect ta node on the Devnet with the following network settings:
// Minimum weight magnitude: 9
// Depth: 3

// 1. Get test IOTA tokens 
// 1.1 Create new seed and back it up
// seed: MYZSTPDNLWGJVKBBRDYWAJGBHINHY9HPOMRWVBHDXWWUMLPXCZVVHDVTSLRNGSELOSPPIDILRVMHMEUBV
// address for this seed: F9PPXJKNGKZUKLBHTGZGRMNMB9JWWHBTHIWVNKGMZSTCXN9FRAZZEDRQQOZLXBUKNCYAKRPFFHJUXVIPC

const Iota = require('@iota/core');
const Converter = require('@iota/converter');

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

const depth = 3;
const minimumWeightMagnitude = 9;

const seed = 'QALHIRLEECYMKYMWJJXBNHHUXRTDRNDY9KFWVV9HXEFNKHARUSQDDRBVZ9CULGCPRJUNSMTJQRFLA9MWV';

const main = async () => {
    const receivingAddress = "ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW";

const transfers = [
    {
        value: 1,
        address: receivingAddress
    }
];

console.log('Sending 1 i to ' + receivingAddress);

try {
    const trytes = await iota.prepareTransfers(seed, transfers);
    const response = await iota.sendTrytes(trytes, depth, minimumWeightMagnitude);

    console.log('Bundle sent');
    response.map(tx => console.log(tx));
} catch (err) {
    console.log(err);
}
}

main();
