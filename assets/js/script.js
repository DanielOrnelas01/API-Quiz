// ON CLICK EVENT FOR START BUTTON TO LOAD A QUESTION AND HIDE THE START BUTTON 
$(".btn-dark").on("click", function () {
    // remove homepage from view 
    $(".card").hide();
    console.log("user clicked start");
    //Get the first question
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
    document.getElementById('userInput').value = " ";
})

// ON CLICK FOR RESET BUTTON - RESETS GAME
$(".btn-secondary").on("click", function () {
    console.log("user clicked Restart");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;

    quizQuestion.getQuestion();
})

$("#submitInitials").on("click", function () {
    console.log("user clicked submit initials for high scores");
    $(".highScorePage").show();
    quizQuestion.highScorePage();
})

$("#resetScores").on("click", function () {
    console.log("user clicked reset high scores");
    localStorage.clear();
    $("#hsArray").hide();
})

$("#goBack").on("click", function () {
    console.log("user clicked to return from high scores high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 75");

    $(".highScore").show();
    $("#hsArray").empty();

})


//Determine high score to be replaced
$(".highScore").on("click", function () {
    console.log("user clicked highScore");
    quizQuestion.counter = 0;
    quizQuestion.highScorePage();
})


// ON CLICK FOR ANSWER BUTTONS
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})

// Global Variables
var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quizQuestion = {
    // current question
    currentQuestion: "",
    // correct answers 
    correctGuesses: 0,
    // incorrect answers 
    incorrectGuesses: 0,
    // counter 
    counter: 0,
    countDownTimer: null,
    // question number 
    questionNumber: 0,


    // QUESTIONS OBJECT WHICH INCLUDES AN ARRAY OF QUESTIONS
    questions: [
        {
            // question text
            questionText: "Inside which HTML element do we put the JavaScript?",
            // question answers array
            questionAnswer: ["<scripting>", "<script>", "<js>", "<javascript>"],
            // correct answer 
            answer: "<script>"
        },
        {
            questionText: "Where is the correct place to insert a JavaScript?",
            questionAnswer: ["Both in the <head> section and the <body> section are correct", "The <head> section", "The <body> section", "The <javascript> section"],
            answer: "Both in the <head> section and the <body> section are correct"
        },
        {
            questionText: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            questionAnswer: ['<script name = "xxx.js">', '<script src = "xxx.js">', '<script href = "xxx.js">', '<script call = "xxx.js">'],
            answer: '<script src = "xxx.js">',
        },
        {
            questionText: 'How do you write "Hello World" in an alert box?',
            questionAnswer: ['msg("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");'],
            answer: 'alert("Hello World");',
        },
   
        {
            questionText: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
            questionAnswer: ["if(i <> 5)", "if i <> 5", "if i =! 5 then", "if (i != 5)"],
            answer: "if (i != 5)",
        },
  
    ],

    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quizQuestion.counter = 75;
    },

    decrement: function () {
        quizQuestion.counter--;
        $(".timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            $("#timeout")[0].play();
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.finalPage();
            
            //$("#initials").html("Sorry!  You timed out.")
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },

   