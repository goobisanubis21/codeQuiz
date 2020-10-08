 // function to render highscore page when clicking on highscore buttion
 function highscorePage() {

    // clears body of webpage
    document.body.textContent = "";

    // creation of h1 element an id for styling
    var highscoreTitle = document.createElement("h1");
    highscoreTitle.setAttribute("class", "highscore-title");
    highscoreTitle.textContent = "Highscores:";
    document.body.appendChild(highscoreTitle);

    // setting variable of local storage's scores
    var high_scores = localStorage.getItem("scores");

    // returns highscore string as an object
    high_scores = JSON.parse(high_scores);

    // sorts all names and their scores in decsending order
    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    // creating an ul in the dom and setting it to the variable contentUL
    var contentUL = document.createElement("ul");
    contentUL.setAttribute("id", "content-ul");

    // loops through the highscore to create the list items of names and scores
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

    var back = document.createElement("h3");
    back.setAttribute("id", "back-btn");
    back.textContent = "Back";
    document.body.appendChild(back);

    back.addEventListener("click", function() {
        window.location.href = "index.html";
    });
};

highscorePage();