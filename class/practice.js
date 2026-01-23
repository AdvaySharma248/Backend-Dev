const greet = () => {
    console.log("Morning");
}

function fun(cb) {
    console.log("This is fun Function");
    cb();
}
fun(greet);

fun(() => {
    console.log("This is callback function")
})