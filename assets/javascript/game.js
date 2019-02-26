/* Javascript code for word guess game. */

// Array of words to guess.   Yeah, this is limited but at this point calling out to an API
// is beyond my abilities.   (there's a couple of those that seemed cool..)
console.log("Starting javaascript");
var wordsToGuess=["cat","dog","airplane","mouse","driveway","pneumonoultramicroscopicsilicovolcanoconiosis",
                  "elephant","lion","trout","bass","trumpet","pipe","train","ocean","elevator","akward","dwarves"];

var guessesLeft = 5;
var wordLettersElement = document.getElementById("word-letters");
var wordLetterCountElement = document.getElementById("letter-count");
var lettersGuessedElement = document.getElementById("guessed-letters");
var guessesLeftElement = document.getElementById("guesses-left");
var computersWord = "";

console.log("Defining function");
function initializeGame() {
    computersWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    // Console log deliberately left in for 'easy mode' (quickest win condition test)
    console.log("Computer's word: " + computersWord);
    wordLetterCountElement.textContent = computersWord.length;
    lettersGuessedElement.textContent = "";

    // Right now this will be the number of characters in the word.  Can be computed differently.
    guessesLeft = computersWord.length;
    guessesLeftElement.textContent = guessesLeft;

    // Remove the elements - we can calculate their names.  
    var childCount = wordLettersElement.childElementCount;
    var childElement;
    for (var i=0; i<childCount; i++) {
        childElement=document.getElementById("word-letter-"+i);
        wordLettersElement.removeChild(childElement);
    }

    // https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript
    for (var i=0; i<computersWord.length; i++) {
        var newElement = document.createElement("span");
        newElement.setAttribute('id', "word-letter-" + i);
        newElement.setAttribute('class', "word-letter");
        newElement.appendChild(document.createTextNode("_"));
        wordLettersElement.appendChild(newElement);
    }

}

console.log("Calling initialize");
initializeGame();
