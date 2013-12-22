#!/usr/local/bin/node

"use strict";


var dictionary = require('./dictionary');
var processedMap = {};
var results = [];
var originalStartWord;

//http://stackoverflow.com/a/1431113/38753
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


exports.transmogrify = function(startWord, endWord) {
    console.log("From " + startWord + " to " + endWord);
    originalStartWord = startWord;
    processedMap[startWord] = true;

    var result = exports.transmogrifyRecursive(startWord, endWord, 0,0);
    console.log(result);
    console.log("There are a total of " + result.length + " transformations possible.");
    for(var i = 0; i < result.length; ++i) {
        console.log("Chain=" + result[i].wordlist.length);
    }

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

    processedMap[currentWord] = true;

    // otherwise generate new data
    for(var j = 0; j < currentWord.length; ++j) {
        for(var i = 0; i < 26; ++i) {
            var newWord = exports.letterShifter(currentWord, j, i);

            var validWord = exports.isValidWord(newWord);


            if (validWord && newWord != currentWord && !processedMap[newWord]) {
                var newCurrentCharacter = Number(currentCharacterInWord) + 1;
                var tabstop = "";
                for (var k = 0; k < newCurrentCharacter; ++k) {
                    tabstop = tabstop + "\t";
                }
                //console.log(tabstop + "Proceeding with " + newWord + " " + newCurrentCharacter);
                var result = exports.transmogrifyRecursive(newWord, endWord, 0, 0);
                if (result.code === 1) {
                    //console.log("Found word ="+ newWord + " " + result.word);
                    result.wordlist.push(currentWord);
                    if (currentWord === originalStartWord){
                        results.push(result);
                    } else {
                        return result;
                    }

                }
            }
        }
    }


    return results;
    //return {"code": -1, "message": "Couldn't find transformation for given data"};

}

// assume all lower case, a-z, 97-122 inclusive.
exports.letterShifter = function(word, charInWord, charInAlphabet) {
    var newChar = String.fromCharCode(97 + charInAlphabet);
    var newWord = word.replaceAt(charInWord, newChar);
    return newWord;

}

var dumbIsValid = function(word) {
    //var validWords = ["abc", "acc", "acb"];
    var validWords = dictionary.dictionary;
    for (var i = 0; i < validWords.length; ++i) {
        if (validWords[i] === word) {
            return true;
        }
    }

    return false;
}

exports.isValidWord = dumbIsValid;
