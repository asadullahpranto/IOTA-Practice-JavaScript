
// 1. Require packages
const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');

// 2. Connect to a node
console.log('Connecting to Devnet...');
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});
console.log('Connected to Devnet!');

// 3. Define the bundle hash
const bundle = 'TKQFZXLREUPTEHBT9NCDLKFARRJYTVLNEVNIADADUFKRELIJ99STZNHJPMXFJEAKDDI9GCVRVOOEGFKR9';

// 4. Get the transaction module in the bundle
iota.findTransactionObjects({ bundles: [bundle] })
.then(bundle => {
    console.log(JSON.parse(Extract.extractJson(bundle)), new Date());
})
.catch(err => {
    console.log(err);
});