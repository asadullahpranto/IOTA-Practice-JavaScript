// 1. Require the packages
const Iota = require('@iota/core');

// 2. Connect to a node
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

// 3. Define th security level 
const securityLevel = 2;

// 4. Define the seed
const seed = 'QALHIRLEECYMKYMWJJXBNHHUXRTDRNDY9KFWVV9HXEFNKHARUSQDDRBVZ9CULGCPRJUNSMTJQRFLA9MWV';


// 5. Get unspent address 
iota.getNewAddress(seed, {index: 0, securityLevel: securityLevel, total: 1 })
.then(address => {
    console.log('Your address is: ' + address);
}).catch(err => {
    console.log(err);
});