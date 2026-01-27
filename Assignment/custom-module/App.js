// apna custom module import karo jisme string functions hai
const stringUtils = require("./stringUtils");

// test ke liye ek string define karo
const text = "nodejs";

// string ko capitalize karo aur print karo
console.log("Capitalized:", stringUtils.capitalize(text));
// string ko reverse karo aur print karo
console.log("Reversed:", stringUtils.reverseString(text));
// string me vowels count karo aur print karo
console.log("Vowel Count:", stringUtils.countVowels(text));
