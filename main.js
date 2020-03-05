// Question Variables
var questionnaireLength = questions.length;
var questionNumber = 0;

// Timer and High Score Variables
var timer = document.getElementById("timer");
var btn_submit_initials = document.getElementById("btn_submit_initials");
var score = 0;
var interval;
var highScores =new Array();


// Functions for questions:
function displayQuestionAndAnswer(questionNumber) {

    var options;
    var question = "";
    var answer = "";
    var numberOfChoice = questions[questionNumber]['options'].length;

    question += '<p>'+questions[questionNumber]['question']+'</p>';

    options = "<ul>";
        for (i = 0; i < numberOfChoice; i++) {
        var currentChoice = questions[questionNumber]['options'][i];
        options += '<li class="options" onclick="check_answer(\''+currentChoice+'\')">'+currentChoice+'</li>';
        }
    options += "</ul>";
    // Concatanate question with question options 
    answer += question + options;

    document.getElementById("quiz").innerHTML = answer;
}


function stopTimer() {
    clearInterval(interval);
}

function scorePoint(){
    score = score + 25;
}

function checkAnswer(answer){
    if (answer === questions[questionNumber]['answer']) {

             // If answer is CORRECT we add points to total score
             scorePoint();
             questionNumber++;
             if (questionnaireLength > questionNumber){
             displayQuestionAndAnswer(questionNumber);
             }
             else { 
            getInitials();
            }
    }
    else {
        // If answer is INCORRECT we deduct 3 seconds from the timer
        questionNumber++;
        setTime = setTime -10;
    if (questionnaireLength > questionNumber) {
        displayQuestionAndAnswer(questionNumber);
    } 
    else {
        getInitials();
        }
    }
}

function storeHighScore() {
    var initials = document.getElementById("initials").value;
    localStorage.setItem("initials", initials);
    playerInitialsAndScore = localStorage.getItem('initials')+' - '+ score;
    highScores.push(playerInitialsAndScore);
    document.getElementById("quizscore").innerText = highScores.toString();
}

function getInitials() {
    stopTimer();
    gatherInitials =
    "<input type='text' id='initials' value='' placeholder='Enter Your Initials Here'><button id='btn_submit_initials'>Submit</button>";
    document.getElementById("quiz").innerHTML = gatherInitials;
    document.getElementById("btn_submit_initials").addEventListener("click", storeHighScore);
}

function startTimer() {
    document.getElementById("startQuiz").style.display = "none";
    displayQuestionAndAnswer(questionNumber);

    setTime = 23;
    interval = setInterval(function() {
        setTime = setTime - 1;
        if(setTime === 0)
        {
            getInitials();       
         }
    }, 1000);
}

startQuiz.addEventListener("click", startTimer);