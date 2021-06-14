//Unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//Button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");
//Text input where the player will guess a letter
const textInput = document.querySelector(".letter");
//Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//Paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//Empty paragraph where messages will appear when the player guesses a letter
const guessMessage = document.querySelector(".message");
//Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const wordPlaceholder = function(word) {

    const letterPlaceholder = [];

    for (const letter of word) {
        console.log(letter);
        letterPlaceholder.push("●");
    };
    wordInProgress.innerText = letterPlaceholder.join("");
};
wordPlaceholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    guessMessage.innerText = "";
    const userGuess = textInput.value;
    console.log(userGuess);
    textInput.value = "";
    
    
    validateGuess(userGuess);
    //console.log(userGuess);

    makeGuess(userGuess);
});

const validateGuess = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    
    if (input.length === 0) {
        //Is the input blank?
        guessMessage.innerText = "I'm not telepathic, you have to enter a guess!";
    } else if (input.length > 1) {
        //Is the input more than one letter?
        guessMessage.innerText = "One letter at a time, please!";
    } else if (!input.match(acceptedLetter)) {
        //Is the input a number or symbol?
        guessMessage.innerText = "That's not a letter, silly!";
    } else {
        return input;
    };
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = "You already guessed that letter, try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);

        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    };
}

const showGuessedLetters = function () {
    //Empty the innerHTML of the unordered list where the player's guessed letters will display.
    guessedLettersElement.innerHTML = "";
    //Create a new list item for each letter inside the array
    for (const letter of guessedLetters) {
        const li = document.createElement("li")
        li.innerText = letter;
        //Add guess to the unordered list
        guessedLettersElement.append(li);
    };
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
        showWord.push("●");
        }
    }
    wordInProgress.innerText = showWord.join("");

    checkForWin();
};

const checkForWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};