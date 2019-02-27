/* Javascript code for word guess game. */

// Array of words to guess.   Yeah, this is limited but at this point calling out to an API
// is beyond my abilities.   (there's a couple of those that seemed cool..)
console.log("Starting javaascript");
var wordsToGuess=["cat","dog","airplane","mouse","driveway","pneumonoultramicroscopicsilicovolcanoconiosis",
                  "elephant","lion","trout","bass","trumpet","pipe","train","ocean","elevator","akward","dwarves"];

var guessesLeft = 5;
var wordLettersElement = document.getElementById("word-letters");
var wordLetterCountElement = document.getElementById("letter-count");
var lettersGuessed = [];
var lettersGuessedElement = document.getElementById("guessed-letters");
var guessesLeftElement = document.getElementById("guesses-left");
var computersWord = "";
var wordLettersUnguessed = 0;

function initializeGame() {
    computersWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    // Console log deliberately left in for 'easy mode' (quickest win condition test)
    console.log("[Deliberately left in code for testing] Computer's word: " + computersWord);
    wordLetterCountElement.textContent = computersWord.length;
    lettersGuessedElement.textContent = "";

    // Right now this will be the number of characters in the word.  Can be computed differently.
    guessesLeft = computersWord.length;
    guessesLeftElement.textContent = guessesLeft;
    wordLettersUnguessed = computersWord.length;
    lettersGuessed = [];

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

initializeGame();

var playingGame = true;


document.onkeyup = function(event) {
    playerChoice = event.key.toLowerCase();

    if (!playingGame) {
        // Ignore the input.  Unless it's an 'n' for 'new game'.
        if (playerChoice === 'n') {
            playingGame = true;
            initializeGame();
        }
    }
    else if (lettersGuessed.indexOf(playerChoice) >= 0) {
        alert("You have already guessed " + playerChoice);
    }
    else if (computersWord.indexOf(playerChoice) >= 0) {
        lettersGuessed += playerChoice;
        lettersGuessedElement.textContent += playerChoice + ",";

        var idx = computersWord.indexOf(playerChoice);
        var letterId;
        var letterIdElement;
        while (idx >= 0) {            
            letterId = "word-letter-" + idx;
            letterIdElement = document.getElementById(letterId);
            letterIdElement.textContent = playerChoice;
            idx = computersWord.indexOf(playerChoice,idx+1);
            wordLettersUnguessed--;
        }
        
        // If there is only one guess left and they guessed correctly, leave the count at one.
        //   This allows the player to enter in the rest of the letters if they can guess them exactly.
        if (guessesLeft > 1) {
            guessesLeft--;
        }
    }
    else {
        // Incorrect guess always decrements the counter.
        guessesLeft--;
        lettersGuessed += playerChoice;
        lettersGuessedElement.textContent += playerChoice + ",";
    }  
   
    guessesLeftElement.textContent = guessesLeft;

    if (wordLettersUnguessed <= 0) {
        alert("You guessed the word!");
        var ans = confirm("Do you want to play again?");
        if (ans === true) {
            initializeGame();
        }
        else {
            playingGame = false;  // Ignore input from now on.
            return;
        }
    }
    else if (guessesLeft <= 0) {
        alert("You did not guess the word!");
        var ans = confirm("Do you want to play again?");
        if (ans === true) {
            initializeGame();
        }
        else {
            playingGame = false;  // Ignore input from now on.
            return;
        }
    }
}
