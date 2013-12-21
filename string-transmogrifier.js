#!/usr/local/bin/node

"use strict";

//http://stackoverflow.com/a/1431113/38753
String.prototype.replaceAt=function(index, character) {
      return this.substr(0, index) + character + this.substr(index+character.length);
}


exports.transmogrify = function(startWord, endWord) {

}

exports.transmogrifyRecursive = function(currentWord, endWord, currentCharacterInWord, currentCharacterInAlphabet) {
    // check for errors.
    if (currentCharacterInWord > currentWord.length) {
        throw "currentCharacterInWord is out of bounds.";
    }

    if (currentCharacterInAlphabet > 25) {
        throw "currentCharacterInAlphabet is out of bounds."
    }

    // check for the recursive base case. either we ran out of things to try...
    if (currentCharacterInWord == currentWord.length && currentCharacterInAlphabet == 25)
        return {"code": -1, "message": "Couldn't find transformation for given data"};
    // ...or we found the transmutation we were looking for.
    else if (currentWord === endWord)
        return {"code": 1, "message": "Found a transformation!", "word" : currentWord};

    // otherwise generate new data
}

// assume all lower case, a-z, 97-122 inclusive.
exports.letterShifter = function(word, charInWord, charInAlphabet) {
    var newChar = String.fromCharCode(97 + charInAlphabet);
    var newWord = word.replaceAt(charInWord, newChar);
    return newWord;

}
