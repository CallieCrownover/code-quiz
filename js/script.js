const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById ("question-container");
const questionElement = document.getElementById ("question");
const answerButtonsElement = document.getElementById("answer-buttons");
var timeLeft = 60;

let shuffledQuestions, currentQuestionIndex

//timer and all the ticks that go with it
document.addEventListener("DOMContentLoaded", () => {
    const timeLeftDisplay = document.querySelector("#time-left")
    const startBtn = document.querySelector("#start-btn")
    

    function countDown() {
        setInterval(function() {
            if(timeLeft <= 0 ) {
                clearInterval(timeLeft = 0)
            }
            timeLeftDisplay.innerHTML = timeLeft
            timeLeft-=1
        }, 1000)
    }

    startBtn.addEventListener('click', countDown)

})


//starting your quiz
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})



function startGame() {
    console.log("started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide");

    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");

}


//quiz questions and answers
const questions = [
    {
        question: "how do you comfort a javascript bug?",
        answers: [
            { text: "do jumping jacks with it", correct: false },
            { text: "you feed it peeled grapes", correct: false },
            { text: "you console it.", correct: true },
            { text: "give it a back massage", correct: false }
        ]
    },
    {
        question: "why was the javascript developer sad?",
        answers: [
            { text: "because his girlfriend left him", correct: false },
            { text: "because he didn't node how to express himself", correct: true },
            { text: "his javascript bug died", correct: false },
            { text: "he was overwhelmed and just couldn't handle anymore", correct: false }
        ]
    },
    {
        question: "why did the developer go broke?",
        answers: [
            { text: "he used up all his cache", correct: true },
            { text: "times are hard", correct: false },
            { text: "his wife bled him dry of all his money", correct: false },
            { text: "he never had money to begin with", correct: false }
        ]
    },
    {
        question: "why did the jquery developer never have financial problems?",
        answers: [
            { text: "she was a trust fund baby", correct: false },
            { text: "she married rich", correct: false },
            { text: "she hit the lotto", correct: false },
            { text: "she was in #.noConflict() mode", correct: true }
        ]
    },
    {
        question: "why couldn’t the react component understand the joke?",
        answers: [
            { text: "it didn't get the context", correct: true },
            { text: "it was too drunk to understand", correct: false },
            { text: "it didn't hear the joke", correct: false },
            { text: "it didn't know and didn't care", correct: false }
        ]
    }
]

