// Wait for DOM to load before running game
// Get button elements and add event listeners
document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');
    
    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })

    runGame('addition');
})

/**
 * The main game loop. Called when the script is loaded 
 * and after the user has submitted an answer.
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById('answer-box').focus;

    // Creates two random numbers between one and twenty-five
    let num1 = Math.floor(Math.random() * 25) +1;
    let num2 = Math.floor(Math.random() * 25) +1;

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}


/**
 * Checks the answer against the first item in 
 * the calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert('Hey! You got it right!');
        incrementScore();
    } else {
        alert(`Awww... You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`)
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**Gets the operands and the operators 
 * directly from the DOM and returns the 
 * correct answer 
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-') {
        return [operand1 - operand2, 'subtract'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply'];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score and increments by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
}

/**
 * Gets the current number of wrong answers and increments by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion() {
    
}