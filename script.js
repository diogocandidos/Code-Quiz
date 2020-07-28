
//Declare the variables (score and time)
var score = 0;
var currentQuestion = -1;
var timeRem = 0;
var timer;

//Set the function (start button)
function start() {
    timeRem = 75;
    document.getElementById("time").innerHTML = timeRem;

    timer = setInterval(function() {
    timeRem--;
    document.getElementById("time").innerHTML = timeRem;

    if (timeRem <= 0) {
        clearInterval(timer);
        endGame(); 
    }ƒ
}, 1000);

next();
}

//Function and For-Loops (questions)
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var cqCont = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var btnLoop = 0; btnLoop < questions[currentQuestion].alternatives.length; btnLoop++) {
    var btnCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    btnCode = btnCode.replace("[CHOICE]", questions[currentQuestion].alternatives[btnLoop]);
    if (questions[currentQuestion].alternatives[btnLoop] == questions[currentQuestion].answer) {
        btnCode = btnCode.replace("[ANS]", "correct()");
    } else {
        btnCode = btnCode.replace("[ANS]", "incorrect()");
    }
    cqCont += btnCode
}

document.getElementById("cqBody").innerHTML = cqCont;
}

//Penalty (Reduce the timer if the user piks a wrong answer).
    function incorrect() {
    timeRem -= 10; 
    next();
    }
    
//The user wins 20 points for each right answer
    function correct() {
    score += 20;
    next();
    }

//Save the initial and score
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("scoreName",  document.getElementById('name').value);
getScore();
}

function getScore() {
var cqCont = `
<h2>` + localStorage.getItem("scoreName") + `'s punctuation:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 
</button><button onclick="resetGame()">Play Again!</button>`;

document.getElementById("cqBody").innerHTML = cqCont;
}

//Stop the timer to end the game 
function endGame() {
clearInterval(timer);

var cqCont = `<h2>All Done!</h2>
<h3>Final score ` + score +  `/100!</h3>
<input type="text" id="name" placeholder="Enter initials"> 
<button onclick="setScore()">Submit!</button>`;

document.getElementById("cqBody").innerHTML = cqCont;
}
//Reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeRem = 0;
timer = null;

document.getElementById("time").innerHTML = timeRem;

var cqCont = `<h1 id="codeQ">Coding Quiz Challenge!</h1>
<h3>Try to answer the following questions with the time limit. Incorrect answers will penalize your score/time by ten seconds.</h3>
<h3> Click in the button below to start the game!</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("cqBody").innerHTML = cqCont;
}