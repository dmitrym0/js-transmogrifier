#!/usr/local/bin/node

"use strict";


var spellcheck = require('node-aspell-spellchecker');

//http://stackoverflow.com/a/1431113/38753
String.prototype.replaceAt=function(index, character) {
      return this.substr(0, index) + character + this.substr(index+character.length);
}


exports.transmogrify = function(startWord, endWord) {
    for (var i = 0; i < startWord.length; ++i) {
        var result = exports.transmogrifyRecursive(startWord, endWord, i,0);
        if (result.code === 1) {
            console.log(" ***** ", result.wordlist);
            return result;
        }
    }
    return undefined;
}

exports.transmogrifyRecursive = function(currentWord, endWord, currentCharacterInWord, currentCharacterInAlphabet) {
    // we found the transmutation we were looking for.
    if (currentWord === endWord)
        return {"code": 1, "message": "Found a transformation!", "word" : currentWord, "wordlist" : [currentWord]};

    // check for the recursive base case. either we ran out of things to try...
    else if (currentCharacterInWord === currentWord.length)
        return {"code": -1, "message": "Couldn't find transformation for given data"};
    
    // check for errors.
    if (currentCharacterInWord > currentWord.length) {
        throw "currentCharacterInWord is out of bounds.";
    }

    if (currentCharacterInAlphabet > 25) {
        throw "currentCharacterInAlphabet is out of bounds."
    }



    // otherwise generate new data
    for(var i = 0; i < 3; ++i) {
        var newWord = exports.letterShifter(currentWord, currentCharacterInWord, i);
        console.log("Trying new word \"" + newWord + "\", current character is " + currentCharacterInWord);
        if (exports.isValidWord(newWord) && newWord != currentWord) {
            var newCurrentCharacter = Number(currentCharacterInWord) + 1;
            console.log("Proceeding with " + newWord + " " + newCurrentCharacter);
            var result = exports.transmogrifyRecursive(newWord, endWord, newCurrentCharacter, 0);
            if (result.code === 1) {
                console.log("Found word ="+ newWord + " " + result.word);
                result.wordlist.push(currentWord);
                return result;
            }
        }
    }


    return {"code": -1, "message": "Couldn't find transformation for given data"};

}

// assume all lower case, a-z, 97-122 inclusive.
exports.letterShifter = function(word, charInWord, charInAlphabet) {
    var newChar = String.fromCharCode(97 + charInAlphabet);
    var newWord = word.replaceAt(charInWord, newChar);
    return newWord;

}

var dumbIsValid = function(word) {
    var validWords = ["abc", "acc", "acb"];
    for (var i = 0; i < validWords.length; ++i) {
        if (validWords[i] === word) {
            return true;
        }
    }

    return false;
}

var aSpellIsValid = function(word, callback) {
    console.log("Checking " + word);
    var req = {};
    req.body = {};
    req.body.action = "get_incorrect_words";
    req.body.text = [word];


    spellcheck(req, function(result){
        var result =  ((result.outcome == 'success') && result.data[0].length == 0);
        if (callback)
            callback(result);
    });
    return false;
}

exports.isValidWord =  aSpellIsValid;
