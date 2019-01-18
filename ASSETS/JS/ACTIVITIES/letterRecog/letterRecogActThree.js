// word stores the alphabet
var word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// answerArray stores the answer board (starting with all _ and gradually filled in)
var answerArray = [];

function init() {

    // Set up the answer array
    answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    document.getElementById("answer").innerHTML = answerArray.join(" ");
    document.getElementById("message").innerHTML = "Type a letter in the box then press submit.  You can press reset to start over."
}
init();

function guessOne() {
    // Get a guess from the player
    var guess = document.getElementById("guess").value.toUpperCase();
    var showThisMessage = "";

    if (guess.length !== 1) {
        showThisMessage = "Please enter only a single letter";
    } else {
        // Update the game with the guess
        var i = 0; // an indexer into the array 
        for (i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                answerArray[i] = guess;
                showThisMessage = "Good job! " + guess + " is in the alphabet.  What other letters are missing?";
            }
        }

        // Update the game for remaining unknowns
        var remaining_letters = answerArray.length;
        // recount the remaining letters
        for (i = 0; i < answerArray.length; i++) {
            if (answerArray[i] !== '_') {
                remaining_letters -= 1;
            }
        }

        // if no remaining letters, hurray, you won
        if (remaining_letters == 0) {
            showThisMessage = "Great Job!  You know the alphabet!!";
        }

        // (otherwise) if we have no message, wrong guess 
        if (showThisMessage === "") {
            showThisMessage = "Sorry, " + guess + " is not a letter.";
        }

        // Update the puzzle
        document.getElementById("answer").innerHTML = answerArray.join(" ");

        // Lend a hand by clearing out their last guess
        document.getElementById("guess").value = "";
    }
    document.getElementById("message").innerHTML = showThisMessage;
}

function quit() {
    document.getElementById("message").innerHTML = "Here is the Alphabet. " + word;
    for (var j = 0; j < word.length; j++) {
        answerArray[j] = word[j];
    }
    // Solve the puzzle
    document.getElementById("answer").innerHTML = answerArray.join(" ");
    init();
}