const mainPage = "./index.html";
var highScoreList = document.querySelector(".high-score-list");
var btnGoBack = document.querySelector("#go-back")
var btnClearHighScore= document.querySelector("#clear")

/********************************************************************
 * getHighScore Retrieves highScore key/value from local storage
 * ******************************************************************/

 var getHighScores = function () {
    highScoreArr = JSON.parse(localStorage.getItem("highScore")) || [];
   return highScoreArr;
 
 };


var loadHighScores = function(){
    var hsArr = getHighScores();

    for(var i =0; i<hsArr.length; i++){
        var player = hsArr[i];
        li=document.createElement("li");
        li.textContent=player.name + " - " + player.score
        highScoreList.appendChild(li)
    }
}




btnGoBack.addEventListener("click", function(){
    window.location.href=mainPage;
})
btnClearHighScore.addEventListener("click", function(){
    localStorage.removeItem("highScore")
    window.location.reload();
})




loadHighScores();



