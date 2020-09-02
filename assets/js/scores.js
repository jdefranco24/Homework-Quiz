var highScores = [];
var highScores = document.querySelector("#scores");

function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highScores = JSON.parse(localStorage.getItem("scores"));
  if(highScores== null) existingEntries = [];
  var newScore= document.getElementById("newScore").value;
  var entryScore = document.getElementById("entryScore").value;
  var entry = {
      "score": newScore,
      "new": entryScore
  };
  localStorage.setItem("new", JSON.stringify(entry));
  // Save allEntries back to local storage
  existingScores.push(entry);
  localStorage.setItem("scores", JSON.stringify(existingScores));
  // (optional) sort highscores by score property in descending order

  // for each score
    // create li tag for each high score

    // display on page
}

function clearHighscores() {
  // (and reload)
}

// attache clear event to clear score button

// run printhighscore when page loads
