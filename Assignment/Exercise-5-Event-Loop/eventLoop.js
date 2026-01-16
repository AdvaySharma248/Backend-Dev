console.log('yo lets see how this event loop thing works');

console.log('starting now...');

setTimeout(() => {
    console.log('setTimeout fired! took the slow route through timer queue');
}, 0);

setImmediate(() => {
    console.log('setImmediate is here from the check phase');
});

process.nextTick(() => {
    console.log('nextTick jumped the line like a boss');
});

Promise.resolve().then(() => {
    console.log('promise resolved and showed up after nextTick');
});

console.log('okay all the async stuff is queued up now');

console.log('\nnow testing nested callbacks...\n');

setTimeout(() => {
    console.log('first timer callback running');

    process.nextTick(() => {
        console.log('nextTick from inside setTimeout');
    });

    Promise.resolve().then(() => {
        console.log('promise from inside setTimeout');
    });
}, 0);

setImmediate(() => {
    console.log('first setImmediate running');

    process.nextTick(() => {
        console.log('nextTick from inside setImmediate');
    });

    Promise.resolve().then(() => {
        console.log('promise from inside setImmediate');
    });
});

console.log('done setting everything up, watch em go!');
