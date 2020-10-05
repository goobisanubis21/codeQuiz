var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Parentheses",
    },
    {
        question:
            "Arrays in JavaScript can be used to store ____.",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "All of the Above",
    },
    {
        question:
            "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Quotes",
    },
    {
        question:
            "A very useful tool during development and debugging for printing content to the debugger is ____.",
        choices: ["Javascript", "Terminal/Bash", "For Loops", "Console.log"],
        answer: "Console.log"
    }
];

//variables to call upon html ids
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var highscoreTab = document.createElement("h3");
highscoreTab.setAttribute("id", "highscore-tab");
highscoreTab.textContent = "Highscores";
document.body.appendChild(highscoreTab);

//creating a highscore button
highscoreTab.addEventListener("click", highscorePage);

//function to render highscore page when clicking on highscore buttion
function highscorePage() {
    // clears body of webpage
    document.body.textContent = "";
    var highscoreTitle = document.createElement("h1");
    highscoreTitle.setAttribute("id", "highscore-title");
    highscoreTitle.textContent = "Highscores:";
    document.body.appendChild(highscoreTitle);
    //setting variable of local storage's scores
    var high_scores = localStorage.getItem("scores");
    //returns highscore string as an object
    high_scores = JSON.parse(high_scores);
    //sorts all names and their scores in decsending order
    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    //creating an ul in the dom and setting it to the variable contentUL
    var contentUL = document.createElement("ul");
    contentUL.setAttribute("id", "content-ul");

    //loops through the highscore to create the list items of names and scores
    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = document.createElement("li");
        contentLI.textContent =
            "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
        contentUL.appendChild(contentLI);
    }

    // appends new ul content to the body of the webpage
    document.body.appendChild(contentUL);

    // creation of clear button
    var clear = document.createElement("h2");
    clear.textContent = "Clear Scores";
    document.body.appendChild(clear);

    // button to clear local storage (highscores)
    clear.addEventListener("click", function () {
        localStorage.clear();
        contentUL.style.display = "none";
    });
}


//variables to set the question index, 
var questionIndex = 0;
//the correct answer counts,
var correctCount = 0;
//the amount of time on the clock,
var time = 11000;
//and the amount of time it takes for the countdown to descend
var intervalId;

//function to end the quiz and call upon the function to display the highscore
function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
    setTimeout(showHighScore, 2);
}

//function for the highscore
function showHighScore() {
    //prompts for players name
    var name = prompt("Please enter your name");
    //setting variable of local storage's scores
    var high_scores = localStorage.getItem("scores");

    //if statement to check if high scores for user exsits. if not highscore is set to empty array, if so then high score is then set to whats stored as an object in the local storage
    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    //highscores is then updated to new score
    high_scores.push({ name: name, score: correctCount });

    //stores highscores into local storage as a string
    localStorage.setItem("scores", JSON.stringify(high_scores));

    //sorts all names and their scores in decsending order
    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    //creating an ul in the dom and setting it to the variable contentUL
    var contentUL = document.createElement("ul");
    contentUL.setAttribute("id", "content-ul");

    //loops through the highscore to create the list items of names and scores
    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = document.createElement("li");
        contentLI.textContent =
            "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
        contentUL.appendChild(contentLI);
    }

    // appends new ul content to the body of the webpage
    document.body.appendChild(contentUL);

    // creation of clear button
    var clear = document.createElement("h2");
    clear.textContent = "Clear Scores";
    document.body.appendChild(clear);

    // button to clear local storage (highscores)
    clear.addEventListener("click", function () {
        localStorage.clear();
        contentUL.style.display = "none";
    });

    // creation of play again button
    var goBack = document.createElement("h3");
    goBack.setAttribute("id", "play-again")
    goBack.textContent = "Play Again";
    document.body.appendChild(goBack);
    document.addEventListener("click", function () {
        location.reload()
    });

}

//function to count down time left in the game
function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

//function to render the current question
function renderQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    //setting the amount of time is takes to count down, in this case its set to per second or 1000 ms
    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    //setting variables for choices and the length of the choices
    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    //for loop to render the array of choices
    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    }
}

//function to render the next question in line
function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        time = 0;
    }
    renderQuestion();
}

//function to check if chosen answer is the correct one to add a correct point to score
function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
            //if incorrect subtract two seconds from time clock
        } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    //allows clock to pause for two seconds inbetween questions
    setTimeout(nextQuestion, 2000);
}

//calls the render question function
renderQuestion();
//adds and event listener to options listen to store which options is clicked on
optionListEl.addEventListener("click", checkAnswer);