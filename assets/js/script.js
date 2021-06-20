var headerEl = document.querySelector("#header");
var containerEl = document.querySelector(".container");
var spanTimeEl;


var timeRemaining = 0;
var questionIndex = 0;
const questionBank = [
    {"q" : "Inside which HTML element do we put the JavaScript?",
     "o" : ["<javascript>","<js>" ,"<script>","<src>"],
     "a" : 2
    },

    {"q" : "How does a WHILE loop start?",
    "o" : ["while i = 1 to 10","while (i <= 10) " ,"while (i <= 10; i++)","while{i<=10}"],
    "a" : 1
    },
    {"q" : "What is the correct way to write a JavaScript array?",
    "o" : ["var colors = [\"red\", \"green\", \"blue\"] ",
            "var colors = \"red\", \"green\", \"blue\"" ,
            "var colors = (\"red\", \"green\", \"blue\")"
            ,"var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")" 
        ],
    "a" : 0
    },
    {"q" : "Which operator is used to assign a value to a variable?",
    "o" : ["===","==" ,"=","{}"],
    "a" : 2
    },
    {"q" : "What will the following code return: Boolean(10 > 9)",
    "o" : ["true","false" ,"NaN","null"],
    "a" : 0
    }
];

var playerInfo = 
{
     "name": "",
     "score": 0
}


var highScoreArr = [];

/********************************************************************
 * Load the Next Question from the Bank onto the screen
 ********************************************************************/
var loadQuestions = function(){

        var question = questionBank[questionIndex];
        console.log(question.q);
        for(var j =0; j<question.o.length; j++){
            console.log(question.o[j])
        }
        console.log("");
    
}

/********************************************************************************
 * check if the response provided matches the correct answer in the question bank
 * Returns true if there is a match, false otherwise
 ***********************************************************************************/
var isCorrectAnswer = function(questNum, respNum){
    var question = questionBank[questNum];
    return  (respNum === question.a)
   
}

/********************************************************************
 * TimerCountDown reduces the time remaining aftter every second 
 *******************************************************************/
var timerCountDown = function () {

    var clock = setInterval(function(){
        spanTimeEl.textContent= timeRemaining;
        if (timeRemaining <=0 ){
            timeRemaining = 0;
            clearInterval(clock);
        }
       Math.max(0, timeRemaining--); 
     
    },1000)
}

/********************************************************************
 * saveHighScore Saves the highscore  into local Storage
 * ******************************************************************/ 
var saveHighScore = function(){
    highScoreArr.push(playerInfo);
    localStorage.setItem("highScore", JSON.stringify(highScoreArr));
}

/********************************************************************
 * getHighScore Retrieves highScore key/value from local storage
 * ******************************************************************/ 

var getHighScore = function() {
    highScoreArr = JSON.parse(localStorage.getItem("highScore")) || [];
    console.log("Parsed High Score Array: " , highScoreArr );
}

var startQuiz = function(){
   timeRemaining= questionBank.length*15;
    timerCountDown();
}


var loadScreen = function(){
    var divHighScoreEl = document.createElement("div");
    var aHighScoreEl = document.createElement("a");
    aHighScoreEl.textContent ="View High Scores";
    aHighScoreEl.setAttribute("href","./highScore.html");
    divHighScoreEl.appendChild(aHighScoreEl);

    headerEl.appendChild(divHighScoreEl);

    var divTimeEl = document.createElement("div");
    divTimeEl.textContent = "Time Remaining: ";

    spanTimeEl = document.createElement("span");
    spanTimeEl.textContent = timeRemaining;

    divTimeEl.appendChild(spanTimeEl);
    headerEl.appendChild(divTimeEl);

    var divIntroEl = document.createElement("div");
    var h2IntroEl = document.createElement("h2")
    var pIntroEl = document.createElement("p");
    divIntroEl.setAttribute("class", "intro")
    h2IntroEl.textContent= "Coding Quiz Challenge"
    divIntroEl.appendChild(h2IntroEl)
    pIntroEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds!";
    divIntroEl.appendChild(pIntroEl);

    var btnEl = document.createElement("button");
    btnEl.textContent="Start Quiz"
    divIntroEl.appendChild(btnEl);
    
    containerEl.appendChild(divIntroEl);

    btnEl.addEventListener("click", startQuiz);

}


loadScreen();

saveHighScore();
timerCountDown();
getHighScore();
loadQuestions();
