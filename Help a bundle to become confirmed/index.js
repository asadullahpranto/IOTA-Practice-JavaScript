
const Iota = require('@iota/core');

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

var tails = ["AMKCSQBZGCLSDQEET9WHABSAPMOBMJPLZUFHHCYZO99HWH9JLTDIZNKFUKVVGXUHOTHQVKBPBZSEVS999"];

var seconds = 0;

var anonymousMainFunction = autoConfirm.bind(null, tails);

var interval = setInterval(anonymousMainFunction, 30000);

var timer = setInterval(stopWatch, 1000);
function stopWatch (){
    seconds++
}

console.log("Started autoConfirm() function");

function autoPromoteReattach(tail) {
    iota.isPromotable(tail)
    .then(promote => promote ? iota.promoteTransaction(tail, 3, 14)
    .then(() => {
        console.log(`Promoted transaction hash: ${tail}`);
    })
    : iota.replayBundle(tail, 3, 14)
    .then(([reattachedTail]) => {
        const newTailHash = reattachedTail.hash
        console.log(`Reattached transaction hash: ${tail}`);

        tails.push(newTailHash);
    })
  ).catch((error) => {
      console.log(error);
  });
}


function autoConfirm(tails) {
    iota.getLatestInclusion(tails).then(states => {
        if(states.indexOf(true) === -1) {
            const tail = tails[tails.length - 1]
            autoPromoteReattach(tail);
        } else {
            console.log(JSON.stringify(states, null, 1));
            clearInterval(interval);
            clearInterval(timer);

            var minutes = (seconds / 60).toFixed(2);
            var confirmedTail = tails[states.indexOf(true)];
            console.log(`Confirmed transaction hash in ${minutes} minutes: ${confirmedTail}`);

            return;
        }
    }).catch(error => {
        console.log(error);
    }
    );
}