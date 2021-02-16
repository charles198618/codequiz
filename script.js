var startBtn =  document.querySelector("#startQuiz")
var timeRemainingEl = document.querySelector("#timeRemaining")
var questionEl = document.querySelector("#question")
var optionOne = document.querySelector("#option1")
var optionTwo = document.querySelector("#option2")
var optionThree = document.querySelector("#option3")
var optionFour = document.querySelector("#option4")
var startBlock = document.querySelector("#startBlock")
var questionBlock = document.querySelector("#questionBlock")
var scoreBlock = document.querySelector("#scoreBlock")
var scoreTotal = document.querySelector("#scoreTotal")
var timeTakenEl = document.querySelector("#timeTaken")
var inputEl = document.querySelector("#inputInitials")
var saveBtn = document.querySelector("#saveBtn")

var originalTime = 60
var countdown;
timeRemainingEl.textContent = originalTime;
var currentQuestion;
var score;

var questionBank = [
    {
        question: "In CSS, what is the box model?",
        options: ["It's a box that wraps around every single element in HTML.", "It's a box that wraps around every code", "It's a box used to style web page", "All of answers above"],
        correct: "It's a box that wraps around every single element in HTML."
    },
    {
        question: "What does CSS stands for?",
        options: ["Cascading Super Source", "Cascading Superior Source", "Cascading Source Sheet", "Cascading Style Sheets"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "What does HTML stands for?",
        options: ["hypertext markup lower", "hypertext markup linguistic", "hypertext markup language", "hypertext made language"],
        correct: "hypertext markup language"
    },
    {
        question: "Name three languages of the modern web?",
        options: ["Java, HTML, and CSS", "JavaScript, HTML, and C++", "Java, PHP, and CSS", "JavaScript, HTML, and CSS"],
        correct: "JavaScript, HTML, and CSS"
    },
    {
        question: "What is Array in JavaScript?",
        options: ["Array is a type of variables that are in order ", "Array is a type of variables that are collections", "Array is a type of variable that is unique", "Array is a type of variables that are strings"],
        correct: "Array is a type of variables that are collections"
    },
]
function startQuiz() {
    startBlock.setAttribute("class", "hidden")
    questionBlock.setAttribute("class", "")

    currentQuestion = 0;
    countdown = 60;
    score = 0;

    timerStart()
    changeQuestion()
}

function timerStart(){
    var timerInterval = setInterval(function(){
        countdown--;
        timeRemainingEl.textContent = countdown

        if(countdown <=0 || currentQuestion > questionBank.length){
            clearInterval(timerInterval)
            scoreBlock.setAttribute("class", "");
            questionBlock.setAttribute("class", "hidden")
            scoreTest(score, questionBank.length);
        }
    }, 1000)
}

function changeQuestion(){
    if(currentQuestion< questionBank.length){
        questionEl.textContent = questionBank[currentQuestion].question
        optionOne.textContent = questionBank[currentQuestion].options[0]
        optionTwo.textContent = questionBank[currentQuestion].options[1]
        optionThree.textContent = questionBank[currentQuestion].options[2]
        optionFour.textContent = questionBank[currentQuestion].options[3]
    }

    currentQuestion++;
}

function checkAnswerAndChange (){
    var lastA = this.textContent;
    if(lastA == questionBank[currentQuestion-1].correct){
        console.log("correct Answer")
        score += 1
    }else{
        console.log("incorrect Answer")
        countdown -= 10
    }

    changeQuestion()
}


function savetolocal(){
    var scoreToSave = scoreTotal.textContent + " - " + inputEl.value
    localStorage.setItem("Highscore", scoreToSave)
}

startBtn.addEventListener("click", startQuiz)
optionOne.addEventListener("click", checkAnswerAndChange)
optionTwo.addEventListener("click", checkAnswerAndChange)
optionThree.addEventListener("click", checkAnswerAndChange)
optionFour.addEventListener("click", checkAnswerAndChange)
saveBtn.addEventListener("click", savetolocal)
// Ask each question
//function askQuestion(question) {
    //var answer = prompt(question[0], "");
    //if (answer.toUpperCase() == answer_key[i]) {
      //alert("Correct!");
//       score++;
//     } else if (answer==null || answer=="") {
//       alert("You must enter T or F!");
//       i--;
//     } else {
//       alert("Sorry. The correct answer is " + answer_key[i]);
//     }
//   }
//   for (var i = 0; i < questions.length; i++) {
//     askQuestion(questions[i]);
//   }
  
  // Caclulate score
function scoreTest(answer, questions) {
    console.log(answer, questions)
    var percentage = (answer/questions) * 100;
    scoreTotal.textContent = percentage + "%"
    var timeTaken = originalTime - countdown;
    timeTakenEl.textContent = timeTaken + " seconds"
}


