// define variables to select elements

const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const restartButton = document.getElementById("restart");
const helloText = document.getElementById("hello");
const questionAnswerContainer = document.getElementById("question-answer-container");
const questionElement = document.getElementById("question-text");
const answerOptionsButtons = document.getElementById("options-buttons");
const scoreArea = document.getElementById("score-area");
const answerInfo = document.getElementById("answer-info");
const infoText = document.getElementById("info");
const quizFeedback = document.getElementById("quiz-feedback");
const feedbackText = document.getElementById("feedback-text");
const scoreFeedback = document.getElementById("score-feedback");
const restartText = document.getElementById("restart-text");


// define variables to drive quiz

let shuffledQuestions;
let currentQuestionIndex;
let score = 0;

// event listeners

startButton.addEventListener('click', startQuiz);
//restartButton.addEventListener('click', startQuiz);
//finishButton.addEventListener('click', endQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayNextQuestion();
});
// answerOptionsButtons.addEventListener('click', showAnswerInfo);

// functions to start quiz

function startQuiz() {
    currentQuestionIndex = 0;
    startButton.classList.add('hide');
    helloText.classList.add('hide');
    questionAnswerContainer.classList.remove('hide');
    scoreArea.classList.remove('hide');
    document.getElementById('right').textContent = 0;
    document.getElementById('wrong').textContent = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    displayNextQuestion();
}

//function to display questions

/**
 * removes the old content from the quiz area, selects the following question, then increments the current question index by 1
 */
function displayNextQuestion() {
    clearQuizArea();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    //currentQuestionIndex++;
}

/**
 * removes the Next button, extra information and old answer buttons from the quiz area
 */
function clearQuizArea() {
    nextButton.classList.add('hide');
    infoText.classList.add('hide');
    answerInfo.classList.add('hide');
    answerOptionsButtons.innerHTML = '';
}

/**
 * displays the next question and creates new answer buttons for it
 */
function showQuestion(question) {
    questionElement.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn-option');
        answerOptionsButtons.appendChild(button);
        button.addEventListener('click', selectAnswer);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        // button.removeEventListener('click', once) //Add
    });
    
}

/**
 * checks whether the selected answer is correct, chooses whether to increment the score or the number of incorrect answers and calls the function to display extra info about all possible answers
 */
function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerOptionsButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    /**
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    **/
    shuffledQuestions.length > currentQuestionIndex ? nextButton.classList.remove('hide') : finishQuiz();
    correct ? addCorrect() : addIncorrect();
    //answerInfo.classList.remove('hide');
    infoText.classList.remove('hide');
    
    showInfoText(shuffledQuestions[currentQuestionIndex]);
}

function showInfoText(question) {
    answerInfo.classList.remove('hide');
    infoText.innerText = question.info;
    console.log(question.info);
    removeEventListener('click', showInfoText);
}

function addCorrect() {
    let oldCorrect = parseInt(document.getElementById('right').innerText);
    document.getElementById('right').innerText = oldCorrect + 1;
}

function addIncorrect() {
    let oldWrong = parseInt(document.getElementById('wrong').innerText);
    document.getElementById('wrong').innerText = oldWrong + 1;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function finishQuiz() {
    finishButton.classList.remove('hide');
    restartButton.classList.remove('hide');
    finishButton.addEventListener('click', endQuiz);
    restartButton.addEventListener('click', startQuiz);
}