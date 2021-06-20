var headerEl = document.querySelector("#header");
var containerEl = document.querySelector(".container");
var spanTimeEl;
var divQuestionEl = null;
var divIntroEl;
var divScoreEl;

var clock;
var timeRemaining = 0;
const questionValue = 10;
var questionIndex = 0;
const questionBank = [
  {
    q: "Inside which HTML element do we put the JavaScript?",
    o: ["<javascript>", "<js>", "<script>", "<src>"],
    a: 2,
  },

  {
    q: "How does a WHILE loop start?",
    o: [
      "while i = 1 to 10",
      "while (i <= 10) ",
      "while (i <= 10; i++)",
      "while{i<=10}",
    ],
    a: 1,
  },
  {
    q: "What is the correct way to write a JavaScript array?",
    o: [
      'var colors = ["red", "green", "blue"] ',
      'var colors = "red", "green", "blue"',
      'var colors = ("red", "green", "blue")',
      'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
    ],
    a: 0,
  },
  {
    q: "Which operator is used to assign a value to a variable?",
    o: ["===", "==", "=", "{}"],
    a: 2,
  },
  {
    q: "What will the following code return: Boolean(10 > 9)",
    o: ["true", "false", "NaN", "null"],
    a: 0,
  },
];

var playerInfo = {
  name: "",
  score: 0,
};

var highScoreArr = [];

/********************************************************************
 * saveHighScore Saves the highscore  into local Storage
 * ******************************************************************/
 var saveHighScore = function () {
    highScoreArr.push(playerInfo);
    localStorage.setItem("highScore", JSON.stringify(highScoreArr));
  };

/******************************************************************
 * 
 ******************************************************************/

var gameOver = function(){
    //TODO: Add Gave Over Store in local Storage
}


/********************************************************************************
 * check if the response provided matches the correct answer in the question bank
 * Returns true if there is a match, false otherwise
 ***********************************************************************************/
 var isCorrectAnswer = function (questNum, respNum) {
    var question = questionBank[questNum];
    return respNum === question.a;
  };

var checkAnswer = function(event) {
    var targetEl = event.target
    console.log(targetEl);
    if(!targetEl.matches(".btn-choice")){
        return;
    }
    var dataQuestionsId = parseInt(targetEl.getAttribute("data-questions-id"));
    var dataOptionsId = parseInt(targetEl.getAttribute("id"))
    var isCorrect = false;
    var pElValidator = document.createElement("p")
    pElValidator.setAttribute("class", "validator-content")

   
   isCorrect = isCorrectAnswer(dataQuestionsId, dataOptionsId)

   if(isCorrect){
        pElValidator.textContent = "Correct!"
   }
   else {
       pElValidator.textContent = "Wrong!"
       timeRemaining -= questionValue;
   }

   divQuestionEl.appendChild(pElValidator);
   questionIndex++;
   loadQuestions();

}


/********************************************************************
 * Load the Next Question from the Bank onto the screen
 ********************************************************************/
var loadQuestions = function () {
  var question = questionBank[questionIndex];
  var pQuestionEl;

  // TODO: check if index is less than question index
  console.log(divQuestionEl);
  if (!divQuestionEl) {
    divQuestionEl = document.createElement("div");
    divQuestionEl.setAttribute("class", "questionContainer ");
  } else {
    divQuestionEl = document.querySelector(".questionContainer");
  }
 

  var pQuestionEl = document.createElement("p");
  pQuestionEl.textContent = question.q;
  var divBtnEl = document.createElement("div");
  divBtnEl.setAttribute("class","optionsContainer")


  
  for (var j = 0; j < question.o.length; j++) {
    var btnElOptions = document.createElement("button");
    btnElOptions.textContent = "" + (j+1) + ". " + question.o[j];
    btnElOptions.setAttribute("id", j )
    btnElOptions.setAttribute("class", "btn-choice")
    btnElOptions.setAttribute("data-questions-id", questionIndex);
    btnElOptions.addEventListener("click", checkAnswer)
    
    divBtnEl.appendChild(btnElOptions);
  }

  divQuestionEl.appendChild(pQuestionEl);
  divQuestionEl.appendChild(divBtnEl);

  containerEl.appendChild(divQuestionEl);
};



/********************************************************************
 * TimerCountDown reduces the time remaining aftter every second
 *******************************************************************/
var timerCountDown = function () {
    
    clock = setInterval(function () {
    spanTimeEl.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      clearInterval(clock);
    }
    Math.max(0, timeRemaining--);
  }, 1000);
};



/********************************************************************
 * getHighScore Retrieves highScore key/value from local storage
 * ******************************************************************/

var getHighScore = function () {
  highScoreArr = JSON.parse(localStorage.getItem("highScore")) || [];
  console.log("Parsed High Score Array: ", highScoreArr);
};

var startQuiz = function () {
  timeRemaining = questionBank.length * questionValue;
  divIntroEl.remove();
  timerCountDown();
  loadQuestions();
};

var loadScreen = function () {
  var divHighScoreEl = document.createElement("div");
  var aHighScoreEl = document.createElement("a");
  aHighScoreEl.textContent = "View High Scores";
  aHighScoreEl.setAttribute("href", "./highScore.html");
  divHighScoreEl.appendChild(aHighScoreEl);

  headerEl.appendChild(divHighScoreEl);

  var divTimeEl = document.createElement("div");
  divTimeEl.textContent = "Time Remaining: ";

  spanTimeEl = document.createElement("span");
  spanTimeEl.textContent = timeRemaining;

  divTimeEl.appendChild(spanTimeEl);
  headerEl.appendChild(divTimeEl);

  divIntroEl = document.createElement("div");
  var h2IntroEl = document.createElement("h2");
  var pIntroEl = document.createElement("p");
  divIntroEl.setAttribute("class", "intro");
  h2IntroEl.textContent = "Coding Quiz Challenge";
  divIntroEl.appendChild(h2IntroEl);
  pIntroEl.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds!";
  divIntroEl.appendChild(pIntroEl);

  var btnEl = document.createElement("button");
  btnEl.textContent = "Start Quiz";
  divIntroEl.appendChild(btnEl);

  containerEl.appendChild(divIntroEl);

  btnEl.addEventListener("click", startQuiz);
};

loadScreen();

saveHighScore();
