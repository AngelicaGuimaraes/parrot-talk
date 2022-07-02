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
const answer1 = document.getElementById("btn1");
const answer2 = document.getElementById("btn2");
const answer3 = document.getElementById("btn3");
const answer4 = document.getElementById("btn4");


// define variables to drive quiz

let shuffledQuestions;
let currentQuestionIndex;
let score = 0;
let i = 0;



// event listeners

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', displayNextQuestion);

// functions to start quiz

function startQuiz() {
    console.log('Started');
    currentQuestionIndex = 0;
    startButton.classList.add('hide');
    helloText.classList.add('hide');
    questionAnswerContainer.classList.remove('hide');
    scoreArea.classList.remove('hide');
    document.getElementById('right').textContent = 0;
    document.getElementById('wrong').textContent = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    displayNextQuestion();
}

//function to display questions

/**
 * removes the old content from the quiz area, selects the following question, then increments the current question index by 1
 */
function displayNextQuestion() {
    clearQuizArea();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    currentQuestionIndex++;
}

/**
 * removes the Next button, extra information and old answer buttons from the quiz area
 */
function clearQuizArea() {
    nextButton.classList.add('hide');
    extraInfo.classList.add('hide');
    answerOptionsButtons.innerHTML = '';
}

/**
 * displays the next question and creates new answer buttons for it
 */
 function showQuestion(question) {
    questionElement.innerText = question.question;
    // for each possible answer, creates a button and sets its content to the answer text, then adds the button to the answer-buttons div in the HTML
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        answerOptionsButtons.appendChild(button);
        button.addEventListener('click', checkAnswer);
        // marks the correct answer as correct in the HTML
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}