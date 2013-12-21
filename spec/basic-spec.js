var transmogrifier = require("../string-transmogrifier");


describe("recursive helper", function() {
    describe("error handling", function(){
        it("should throw an exception when the current character is out of bounds", function() {
            var foo = function() {
                transmogrifier.transmogrifyRecursive("word", "blah", 5, 25);
            };
            expect(foo).toThrow();
        });


        it("should throw an exception when the alphabet index is out of bounds", function() {
            var foo = function() {
                transmogrifier.transmogrifyRecursive("word", "blah", 3, 26);
            };
            expect(foo).toThrow();
        });

    });

    it("should terminate properly at the end of the string", function() {
        var result = transmogrifier.transmogrifyRecursive("word", "blah", 4, 25);
        expect(result.code).toBe(-1);
    });

    it("should terminate properly when a correct transformation is found", function() {
        var result = transmogrifier.transmogrifyRecursive("word", "word", 3, 25);
        expect(result.code).toBe(1);
        expect(result.word).toBe("word");
    });
});



describe("letterShifter", function() {
    it("should produce the correct output for first letter.", function(){
        var result = transmogrifier.letterShifter("word", 0, 0);
        expect(result).toBe("aord");
    });

    it("should produce the correct output for last letter.", function(){
        var result = transmogrifier.letterShifter("word", 3, 0);
        expect(result).toBe("wora");
    });

    it("should produce the correct output for last letter in the word and last letter of the alphabet", function(){
        var result = transmogrifier.letterShifter("word", 3, 25);
        expect(result).toBe("worz");
    });



});

