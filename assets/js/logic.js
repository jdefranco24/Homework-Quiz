var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var score = 0;
// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var questionTitle = document.getElementById("question-title")
// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var myInterval;

function startQuiz() {
  // hide start screen
  document.getElementById("start-screen").style.display = "none";
  // un-hide questions section
  document.getElementById("questions").style.display = "block";
  // start timer
  // var seconds = 75;
  myInterval = setInterval(function () {
    time--
    timerEl.textContent = time;
    if (time <= 0) {
      alert("Game Over ");
      clearInterval(myInterval);
    }
  }, 1000);
  getQuestion();
}
function getQuestion() {
  // get current question object from array
  questions[currentQuestionIndex];
  // update title with current question
  questionTitle.innerText = questions[currentQuestionIndex].title;
  // clear out any old question choices
  choicesEl.innerHTML = "";
  // loop over choices
  for (var i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
    // create new button for each choice
    var answerButton = document.createElement("button");
    answerButton.innerText = questions[currentQuestionIndex].choices[i];
    // display on the page
    choicesEl.append(answerButton);
    // // attach click event listener to each choice
    answerButton.addEventListener("click", function (e) {
      var input = e.target.textContent
      console.log(input)
      // answerClick(input)
      if (questions[currentQuestionIndex].answer !== input) {
        // reduce 10 from the counter
        time = time - 10
      }
      currentQuestionIndex++
      if (currentQuestionIndex === questions.length) {
        // got to results
        alert("Game Over ");
        clearInterval(myInterval);
        quizEnd()
      }
      else {
        getQuestion()
      }
    })
  }
}
function questionClick(event) {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    // play "wrong" sound effect
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.textContent = "Correct!"
  }
  // flash right/wrong feedback on page for half a second
  // move to next question
  // check if we've run out of questions
  // quizEnd
  // else
  // getQuestion
}
function quizEnd() {
  // stop timer
  // show end screen
  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");
  // show final score
  var final = document.getElementById("final-score");
  final.textContent = time
  // hide questions section
  questionsEl.setAttribute("class", "hide");
  // show a form the get the initialss and save the initial + score in the localstoraget
}
function clockTick() {
  // update time
  // check if user ran out of time
}
function saveHighscore() {
  // get value of input box
  var initials = document.getElementById("initials").value.trim()
  // make sure value wasn't empty
  if (initials !== "") {
    var highScore = JSON.parse(localStorage.getItem("highscores")) || []
    var newScore = {
      score: time,
      initials: initials
    }
    highScore.push(newScore)
    localStorage.setItem("highscores", JSON.stringify(highScore))
    window.location.href = "highscores.html"
  }
}
// get saved scores from localstorage, or if not any, set to empty array
// format new score object for current user
// save to localstorage
// redirect to next page
function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
  if (event.key === "Enter") {
    saveHighscore();
  }
}
// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
// user clicks button to start quiz
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;