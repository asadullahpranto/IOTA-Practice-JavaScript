
// 1. Require the packages
const Iota = require('@iota/core');

// 2. connect to a node
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

// 3. define the address whose balance you want to check
const address = 'UYLKOSBI99IDYGKWTESAWASIOSWXBSHRQMYQUNXPJLFWUGAALNVZJTXXSOGFDOQSOKZWEIBQSHAJVYKMA';

// 4. Checking current balance
iota.getBalances([address], 100)
.then(({ balances }) => {
    console.log(balances);
}).catch(err => {
    console.error(err);
});