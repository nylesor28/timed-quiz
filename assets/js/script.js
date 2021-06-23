const highScoreLink = "./highscore.html";
const homepage = "./index.html";
var highScoreList = document.querySelector(".high-score-list");
var headerEl = document.querySelector("#header");
var containerEl = document.querySelector(".container");
var spanTimeEl;
var divElQuestionContainer;
var divIntroEl;
var divScoreEl;
var divElForm;


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
  highScoreArr.sort(function(p1, p2){
      return p2.score - p1.score;

  })
  localStorage.setItem("highScore", JSON.stringify(highScoreArr));
};

/******************************************************************
 * GameOver Function stops the clock and get users initials
 ******************************************************************/

var gameOver = function () {
  clearInterval(clock);
  var labelEl;

  if (!divElForm) {
    divElForm = document.createElement("div");
    divElForm.setAttribute("class", "high-score-form");
    var h1El = document.createElement("h1");
    h1El.textContent = "All Done!";
    var pEl = document.createElement("p");
    pEl.textContent = "Your Final Score is: " + timeRemaining;
    labelEl = document.createElement("label");
    labelEl.textContent = "Enter Initials";
    labelEl.setAttribute("for", "player-name");
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "player-name";
    inputElement.setAttribute("id", "player-name");

    var btnElement = document.createElement("button");
    btnElement.setAttribute("id", "playerNameButton");
    btnElement.textContent = "Submit";
    btnElement.addEventListener("click", function () {
      var playerName = document.querySelector("#player-name").value;
      if (!playerName) {
        alert("Please Enter a Valid Name");
      } else {
        playerInfo.name = playerName;
        playerInfo.score = timeRemaining;
        saveHighScore();
        window.location.href = highScoreLink;
      }
    });

    divElForm.appendChild(h1El);
    divElForm.appendChild(pEl);
    divElForm.appendChild(labelEl);
    divElForm.appendChild(inputElement);
    divElForm.appendChild(btnElement);
    divElQuestionContainer.replaceWith(divElForm);
  } 
};

/********************************************************************************
 * check if the response provided matches the correct answer in the question bank
 * Returns true if there is a match, false otherwise
 ***********************************************************************************/
var isCorrectAnswer = function (questNum, respNum) {
  var question = questionBank[questNum];
  return respNum === question.a;
};

var checkAnswer = function (event) {
  var targetEl = event.target;

  //TODO: document.querySelector(".validator-content").remove();
  if (!targetEl.matches(".btn-choice")) {
    return;
  }
  var dataQuestionsId = parseInt(targetEl.getAttribute("data-questions-id"));
  var dataOptionsId = parseInt(targetEl.getAttribute("id"));
  var isCorrect = false;

  
  var pElValidator = document.querySelector(".validator-content")
  if(!pElValidator){
    pElValidator = document.createElement("p");
         pElValidator.setAttribute("class", "validator-content");
         divElQuestionContainer.appendChild(pElValidator);
        }

  isCorrect = isCorrectAnswer(dataQuestionsId, dataOptionsId);

  if (isCorrect) {
    pElValidator.textContent = "Correct!";
  } else {
    pElValidator.textContent = "Wrong!";
    timeRemaining -= questionValue;
  }
  questionIndex++;
  loadQuestions();


};



/********************************************************************
 * Load the Next Question from the Bank onto the screen
 ********************************************************************/
var loadQuestions = function () {
  if (questionIndex >= questionBank.length) {
    gameOver();
    return;
  }
  var question = questionBank[questionIndex];
  var pQuestionEl;
  var divElQuestion;

  if (!divElQuestionContainer) {
    divElQuestionContainer = document.createElement("div");
    divElQuestionContainer.setAttribute("class", "questionContainer ");
    divElQuestion = document.createElement("div");
    divElQuestion.setAttribute("class", "question");
  } else {
    divElQuestionContainer = document.querySelector(".questionContainer");
    divElQuestion = document.querySelector(".question");
    divElQuestion.innerHTML = "";
  }

  var pQuestionEl = document.createElement("p");
  pQuestionEl.textContent = question.q;
  var divBtnEl = document.createElement("div");
  divBtnEl.setAttribute("class", "optionsContainer");

  for (var j = 0; j < question.o.length; j++) {
    var btnElOptions = document.createElement("button");
    btnElOptions.textContent = "" + (j + 1) + ". " + question.o[j];
    btnElOptions.setAttribute("id", j);
    btnElOptions.setAttribute("class", "btn-choice");
    btnElOptions.setAttribute("data-questions-id", questionIndex);
    btnElOptions.addEventListener("click", checkAnswer);

    divBtnEl.appendChild(btnElOptions);
  }

  divElQuestion.appendChild(pQuestionEl);
  divElQuestion.appendChild(divBtnEl);
  divElQuestionContainer.appendChild(divElQuestion);

  containerEl.appendChild(divElQuestionContainer);


};

/********************************************************************
 * TimerCountDown reduces the time remaining aftter every second
 *******************************************************************/
var timerCountDown = function () {
  clock = setInterval(function () {
    Math.max(0, timeRemaining--);
    spanTimeEl.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      gameOver();
      clearInterval(clock);
    }
  }, 1000);
};


var startQuiz = function () {
  divIntroEl.remove();
  timerCountDown();
  loadQuestions();
};

/********************************************************************
 * getHighScore Retrieves highScore key/value from local storage
 * ******************************************************************/

 var getHighScores = function () {
     highScoreArr = JSON.parse(localStorage.getItem("highScore")) || [];
    return highScoreArr;
  
  };

var loadScreen = function () {
  timeRemaining = questionBank.length * questionValue;
  getHighScores();
  var divHighScoreEl = document.createElement("div");
  var aHighScoreEl = document.createElement("a");
  aHighScoreEl.textContent = "View High Scores";
  aHighScoreEl.setAttribute("href", highScoreLink);
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


