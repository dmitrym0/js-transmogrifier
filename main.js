#!/usr/local/bin/node


var transmogrifier = require("./string-transmogrifier");



if (process.argv.length != 4) {
   throw ("2 args required");
}
   
transmogrifier.transmogrify(process.argv[2], process.argv[3]);

//transmogrifier.transmogrify('bear', 'meat');
//transmogrifier.transmogrify('beer', 'seat');
//transmogrifier.transmogrify('head', 'tail');
//transmogrifier.transmogrify('dock', 'face');
//transmogrifier.transmogrify('dock', 'face');
//transmogrifier.transmogrify('deal', 'heal');
