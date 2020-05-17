var timerEl = document.getElementById("timer");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var answerListEl = document.getElementById("answer-list");
var startButtonEl = document.getElementById("start")
var scoreEl = document.getElementById("submitScore")
var userScoreEl = document.getElementById("userScore")
var highScoreEl = document.getElementById("highScore")
var userAnswer = '';
var userIdEl = document.querySelector("#userInitials")
var submitEl = document.getElementById("submit");
var userInt = '';
var bodyEl =document.querySelectorAll("body");
var highScoreButEl = document.getElementById("highScoreButtons")
var clearHighScoreEl = document.getElementById("clearHigh")
var restartQuizEl = document.getElementById("restart")
let timeLeft;
var questionNumber = 0;
var score = 0;
var mainHighScoreButEl = document.getElementById("highscoreButton")
var highScoreArray = [];
var quizInProgress = false;
var answerEl = document.getElementById("answer")


// function to start quiz by hiding the start button and unhiding the quiz
startButtonEl.addEventListener("click", startGame)
function startGame(){
    console.log(questions.length);
    console.log("Start");
    startButtonEl.classList.add("hide");
    quizEl.classList.remove("hide");
    answerEl.classList.remove("hide");
    quizTimer();  
    setNextQuestion(); 
    quizInProgress = true;
    }

// // timer script
function quizTimer(){
    timeLeft=59
    var timeInterval = setInterval(function(){
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;    
 
    if (timeLeft <= 0){
        timerEl.textContent = "";
        clearInterval(timeInterval);
        enterHighscore();
        
    }
    }, 1000);
}

// Set up next question
function setNextQuestion (){
    resetState()
    // showQuestion()
    questionEl.innerText = questions[questionNumber].question;
    for (i=0; i < questions[questionNumber].answer.length; i++){
        button = document.createElement("button")
        button.innerText = questions[questionNumber].answer[i]
        answerListEl.appendChild(button)
    }   
    console.log(questions[questionNumber].correctAnswer)
    
}

function resetState() {
        while (answerListEl.firstChild) {
            answerListEl.removeChild(answerListEl.firstChild)
        }
}   

// Answer question  
    answerListEl.addEventListener("click",function(event){
        event.preventDefault();
        var correctChoice =  questions[questionNumber].correctAnswer   
        console.log(questionNumber)
        if(event.target.matches("button")){
            console.log(event.target.innerText)
            var userAnswer = event.target.innerText
            questionNumber++
        }
            if(userAnswer === correctChoice){
                console.log("Correct")
                score = score + 10;
                userScoreEl.textContent = score
                if(questionNumber < questions.length){
                    setNextQuestion()
                    answerEl.textContent = "correct"
                }
                else{
                    timeLeft = 0
                    enterHighscore()   
                }
                
            }
            else {
                console.log("rong")          
                if(questionNumber < questions.length){
                    setNextQuestion()
                    timeLeft = timeLeft -5
                    answerEl.textContent = "wrong"
                }
                else{
                    timeLeft = 0
                    enterHighscore()
                }
            }    
    });


function enterHighscore(){
    quizEl.classList.add("hide");
    answerEl.classList.add("hide");
    scoreEl.classList.remove("hide");
    
}

submitEl.addEventListener("click", recordHighscore)

function recordHighscore (event){    
    var userIdEl = document.querySelector("#userInitials")
    event.preventDefault();   
    userInt = userIdEl.value
    console.log(userInt)
    retrieveHighscore() 
    highScoreArray.push({name:userInt,score:score})
    highScoreArray.sort(function(a,b){
        return b.score - a.score
        })    
    storeHighscore()
    console.log("Check")
    scoreEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    highScoreEl.classList.remove("hide");
    highScoreButEl.classList.remove("hide");
    showHighScores()
    console.log(highScoreArray)
   
}

function storeHighscore(){
    localStorage.setItem("highScoreArray",JSON.stringify(highScoreArray));
}

function retrieveHighscore(){
    highScoreArray = JSON.parse(localStorage.getItem("highScoreArray") || "[]")
}

// Create Highscore List
function showHighScores(){
    while (highScoreEl.firstChild) {
        highScoreEl.removeChild(highScoreEl.firstChild)
    }
    var rowEl = document.createElement("div")
        rowEl.setAttribute("class","row")
        var intials = document.createElement("strong")
        intials.setAttribute("class","col-6")
        intials.textContent =  "Initials"
        var score = document.createElement("strong")
        score.setAttribute("class","col-6")
        score.textContent = "Score"
        rowEl.appendChild(intials)
        rowEl.appendChild(score)
        highScoreEl.appendChild(rowEl)
    for(var i =0; i<highScoreArray.length;i++){

        var rowEl = document.createElement("div")
        rowEl.setAttribute("class","row")
        var intials = document.createElement("div")
        intials.setAttribute("class","col-6")
        intials.textContent =  highScoreArray[i].name 
        var score = document.createElement("div")
        score.setAttribute("class","col-6")
        score.textContent = highScoreArray[i].score
        rowEl.appendChild(intials)
        rowEl.appendChild(score)
        highScoreEl.appendChild(rowEl)
    }
}


restartQuizEl.addEventListener("click",function(){
    console.log("restart")
    event.preventDefault();  
    highScoreEl.classList.add("hide");
    highScoreButEl.classList.add("hide");
    questionNumber = 0
    timeLeft = 59
    score = 0
    answerEl.textContent = ""
    startGame()
});

clearHighScoreEl.addEventListener("click",function(){
    event.preventDefault() 
    console.log("clear")
    localStorage.clear()
    while (highScoreEl.firstChild) {
        highScoreEl.removeChild(highScoreEl.firstChild)
    }
    var rowEl = document.createElement("div")
        rowEl.setAttribute("class","row")
        var intials = document.createElement("strong")
        intials.setAttribute("class","col-6")
        intials.textContent =  "Initials"
        var score = document.createElement("strong")
        score.setAttribute("class","col-6")
        score.textContent = "Score"
        rowEl.appendChild(intials)
        rowEl.appendChild(score)
        highScoreEl.appendChild(rowEl)
});

mainHighScoreButEl.addEventListener("click",function(){
    if(quizInProgress){
        timeLeft = 0
        userScoreEl.textContent = score
    }
    else{
    console.log("Check")
    scoreEl.classList.add("hide");
    startButtonEl.classList.add("hide");
    highScoreEl.classList.remove("hide");
    highScoreButEl.classList.remove("hide");
    showHighScores()  
    }  

})


//quiz questions and answers
var questions = [
    {   question: "how do you comfort a javascript bug?",
        answer:["do jumping jacks with it", "you feed it peeled grapes", "you console it", "give it a back massage"],
        correctAnswer: "you console it",
    },
    {   question: "why was the javascript developer sad?",
        answer:["because his girlfriend left him", "because he didn't node how to express himself", "his javascript bug died", "he was overwhelmed and just couldn't handle anymore"],
        correctAnswer: "because he didn't node how to express himself",
    },
    {   question: "why did the developer go broke?",
        answer:["he used up all his cache", "times are hard" , "his wife bled him dry of all his money", "he never had money to begin with"],
        correctAnswer: "he used up all his cache",
    },
    {   question: "why did the jquery developer never have financial problems?",
        answer:["she was a trust fund baby", "she married rich" , "she hit the lotto", "she was in #.noConflict() mode"],
        correctAnswer: "she was in #.noConflict() mode",
    },
    {   question:"why couldn’t the react component understand the joke?",
        answer:["it didn't get the context", "it was too drunk to understand", "it didn't hear the joke", "it didn't know and didn't care"],
        correctAnswer: "it didn't get the context",
    }
];
