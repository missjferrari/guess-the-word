//Unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//Button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");
//Text input where the player will guess a letter
const textInput = document.querySelector(".letter");
//Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//Paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
//Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//Empty paragraph where messages will appear when the player guesses a letter
const guessMessage = document.querySelector(".message");
//Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const list = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")

    const words = await list.text();
    //console.log(words);

    const wordArray = words.split("\n");
    //console.log(wordArray);

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //console.log(randomIndex);
    const randomWord = wordArray[randomIndex];
    
    word = randomWord.trim();
    //console.log(word);

    wordPlaceholder(word);
};

const wordPlaceholder = function(word) {

    const letterPlaceholder = [];

    for (const letter of word) {
        //console.log(letter);
        letterPlaceholder.push("●");
    };
    wordInProgress.innerText = letterPlaceholder.join("");
};
getWord();

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
        guessCounter(guess);
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

const guessCounter = function (guess) {
    word = word.toUpperCase();

    if (word.includes(guess)) {
        guessMessage.innerText = "Great guess, you're on the right track!";
    } else if (!word.includes(guess)) {
        guessMessage.innerText = "Sorry, try again!";
        remainingGuesses -= 1;
    };

    if (remainingGuesses === 0) {
        guessMessage.innerText = "Better luck next time!";
    } else if (remainingGuesses === 1) {
        guessMessage.innerText = "Tread lightly, this is your last guess!";
    } else if (remainingGuesses > 1) {
        remainingGuessesElement.innerText = `You have ${remainingGuesses} guesses left`;
    };
};

const checkForWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};