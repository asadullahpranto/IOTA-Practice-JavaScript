// Require the IOTA libraries
const Iota = require('@iota/core');

//Create a new instance of the IOTA object
// use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})

//confirmed transaction
iota.getLatestInclusion(['JIKPMLNBUQMNWHTRCTGQARPKENFDLNQMGKKGROOFQCKJXPFJUZLVGCPZCARTLXUELGKOVUSFFCZHYT999'])
.then(states => console.log('This transaction is confirmed? ' + states));