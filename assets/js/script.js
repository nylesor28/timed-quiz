var timeRemaining = 0;
var highScoreArr = [];
var questionBank = {};








/********************************************************************
 * saveHighScore Saves the highscore  into local Storage
 * ******************************************************************/ 
saveHighScore = function(){
    localStorage.setItem("highScore", JSON.stringify(highScoreArr));
}

/********************************************************************
 * getHighScore Retrieves highScore value from local
 * ******************************************************************/ 

getHighScore = functon() {
    highScoreArr = JSON.parse("highScore") || [];
}

