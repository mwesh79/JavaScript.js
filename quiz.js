//select the DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital city of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "jupiter", correct: false },
            { text: "saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answer: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of the following is not a programming language?",
        answer: [
            { text: "Java", correct: false },
            { text: "Kotlin", correct: false },
            { text: "french", correct: true },
            { text: "Python", correct: true },
        ],
    },
    {
        question: "What is the chemical symbol of gold?",
        answer: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];

//Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//add all the event listeners

//start Quiz eventListener
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
function startQuiz() {
        
        //reset the variables
        currentQuestionIndex = 0;
        scoreSpan.textContent = 0;

        startScreen.classList.remove("active");
        quizScreen.classList.add("active");

        showQuestion()
}
 
function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    //if the percent is 50, the width of the progressBar will be 50%

    questionText.textContent = currentQuestion.question;

    
    
    answersContainer.innerHTML = "";
  

    //creating a button for answer each answer
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        //creating a dataset of the answer button for the to make the progress bar and the code know that is the correct answer
        //property of BUTTON element that allows you to store custom data 
        //it can also be used to add element directly to HTML
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);


    });
}

function selectAnswer(event) {
    // optimization check 
    if (answersDisabled) return



    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
  
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        score ++;
        scoreSpan.textContent = score
    }
    //set a timeout element which will take the call back function
    setTimeout(() => {
        currentQuestionIndex++;
//check if there are more questions or  if the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }
    }, 1000)
    
    //results screen
    function showResults() {
        quizScreen.classList.remove("active");
        resultScreen.classList.add("active");

        finalScoreSpan.textContent = score;

        const percentage = (score / quizQuestions.length) * 100

        if (percentage === 100) {
            resultMessage.textContent = "Perfect you're a genius";
        } else if (percentage >= 80) {
            resultMessage.textContent = "Great job! You  know your stuff!";
        } else if (percentage >= 60) {
            resultMessage.textContent = "Good trial! Keep it Up";
        } else if (percentage >= 40) {
            resultMessage.textContent = "Not bad! Try again to improve";
        } else {
            resultMessage.textContent = "Keep studying! You'll get better";
        }
    }
}
    function restartQuiz() {
        resultScreen.classList.remove("active");

        startQuiz();
}
  
