// ye function string ka pehla letter capital karta hai
function capitalize(str) {
    // agar string empty hai to empty string return karo
    if (!str) return "";
    // pehla character capital karo aur baaki string add karo
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ye function string ko ulta karta hai
function reverseString(str) {
    // ek empty string banana hai result ke liye
    let reversed = "";
    // string ke last se first character tak loop chalao
    for (let i = str.length - 1; i >= 0; i--) {
        // har character ko reversed string me add karo
        reversed += str[i];
    }
    // ulta string return karo
    return reversed;
}

// ye function string me vowels count karta hai
function countVowels(str) {
    // counter initialize karo zero se
    let count = 0;
    // saare vowels define karo
    const vowels = "aeiouAEIOU";

    // string ke har character pe loop chalao
    for (let i = 0; i < str.length; i++) {
        // check karo ki current character vowel hai ya nahi
        if (vowels.includes(str[i])) {
            // agar vowel hai to counter badhao
            count++;
        }
    }
    // total vowels ka count return karo
    return count;
}

// functions ko export karo taaki dusri files me use kiya ja sake
module.exports = {
    capitalize,
    reverseString,
    countVowels
};
