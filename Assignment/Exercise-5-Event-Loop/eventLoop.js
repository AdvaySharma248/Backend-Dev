// event loop kaise kaam karta hai ye dekhna hai
console.log('yo lets see how this event loop thing works');

// start message print karo
console.log('starting now...');

// setTimeout jo timer queue me jaata hai
setTimeout(() => {
    console.log('setTimeout fired! took the slow route through timer queue');
}, 0);

// setImmediate jo check phase me execute hota hai
setImmediate(() => {
    console.log('setImmediate is here from the check phase');
});

// process.nextTick jo sabse pehle execute hota hai
process.nextTick(() => {
    console.log('nextTick jumped the line like a boss');
});

// promise jo microtask queue me jaata hai
Promise.resolve().then(() => {
    console.log('promise resolved and showed up after nextTick');
});

// ye sync code pehle execute hoga
console.log('okay all the async stuff is queued up now');

// nested callbacks test karna hai
console.log('\nnow testing nested callbacks...\n');

// setTimeout ke andar aur async operations
setTimeout(() => {
    console.log('first timer callback running');

    // nextTick ke andar bhi async operation
    process.nextTick(() => {
        console.log('nextTick from inside setTimeout');
    });

    // promise ke andar bhi async operation
    Promise.resolve().then(() => {
        console.log('promise from inside setTimeout');
    });
}, 0);

// setImmediate ke andar bhi nested operations
setImmediate(() => {
    console.log('first setImmediate running');

    // nextTick nested
    process.nextTick(() => {
        console.log('nextTick from inside setImmediate');
    });

    // promise nested
    Promise.resolve().then(() => {
        console.log('promise from inside setImmediate');
    });
});

// sab kuch setup ho gaya ab dekhte hain execution order
console.log('done setting everything up, watch em go!');
