$(document).ready(function() {
    // Initialize variables
    var correctcount = 0;

    var wrongcount = 0;

    var gamerunning = false;

    var currentquestion = 0;

    var timer;

    var myanswer;

    // Object to hold array of 20 sets of questions/choices/answers
    var triviaobject = [
        {
            question: "How many feet tall was the tallest giraffe ever recorded?",
            choices: ["10", "20", "30", "40"],
            answer: "20",
        },
        {
            question: "In what year did MTV play its first music video?",
            choices: ["1961", "1971", "1981", "1991"],
            answer: "1981",
        },
        {
            question: "How many dots are there on a Pac-Man board?",
            choices: ["60", "120", "180", "240"],
            answer: "240",
        },
        {
            question: "How many bones are in the adult human body?",
            choices: ["156", "206", "256", "306"],
            answer: "206",
        },
        {
            question: "How many miles long is the Mississippi River?",
            choices: ["2302", "2402", "2502", "2602"],
            answer: "2302",
        },
        {
            question: "How many men signed the Declaration of Independence?",
            choices: ["36", "46", "56", "66"],
            answer: "56",
        },
        {
            question: "How many calories are there in a standard 12-ounce can of Coca-Cola Classic?",
            choices: ["100", "120", "140", "160"],
            answer: "140",
        },
        {
            question: "How many feel tall is the Empire State Building?",
            choices: ["1000", "1250", "1500", "1750"],
            answer: "1250",
        },
        {
            question: "In miles per hour, what is the maximum recorded speed for a mammal?",
            choices: ["71", "76", "81", "86"],
            answer: "71",
        },
        {
            question: "How many elements in the periodic table begin with the letter 'Z'?",
            choices: ["0", "1", "2", "3"],
            answer: "2",
        },
        {
            question: "How many letters are there in the Greek alphabet?",
            choices: ["20", "22", "24", "26"],
            answer: "24",
        },
        {
            question: "What is the total number of known planetary satellites of Mercury, Venus and Mars?",
            choices: ["2", "6", "10", "14"],
            answer: "2",
        },
        {
            question: "How old was Marilyn Monroe when she died?",
            choices: ["26", "31", "36", "41"],
            answer: "36",
        },
        {
            question: "In what year did the first Modern Olympic Games take place?",
            choices: ["1866", "1876", "1886", "1896"],
            answer: "1896",
        },
        {
            question: "How many laps are completed in the 'Indianapolis 500' race?",
            choices: ["200", "300", "400", "500"],
            answer: "200",
        },
        {
            question: "How many confirmed plays did William Shakespeare write?",
            choices: ["0", "38", "76", "114"],
            answer: "38",
        },
        {
            question: "What do the sum of all the numbers on a roulette wheel add up to?",
            choices: ["0", "333", "666", "999"],
            answer: "666",
        },
        {
            question: "Which age do you have to reach to be eligible to become the President of the United States?",
            choices: ["25", "35", "45", "55"],
            answer: "35",
        },
        {
            question: "How many prime numbers are there between 10 and 100?",
            choices: ["11", "16", "21", "26"],
            answer: "21",
        },
        {
            question: "In the board game Monopoly, how many 'Chance' squares are there?",
            choices: ["1", "2", "3", "4"],
            answer: "3",
        },
    ]
    
    // I decided to put the entire game into an object to get used to object in general
    var triviagame = {

        // Initial time given to answer at 30
        time: 30,

        // Function to start the game, it'll be called when the start button is clicked
        start: function() {
            // Gets rid of the start button
            $("#initial-start").empty();

            // Prints the first set of question/answers
            triviagame.questionanswers(0);

            // Run the function count
            triviagame.count();
        },

        // Function to count, this will update the time left on html, etc
        count: function() {
            // Every second, run the function clock which is defined below
            timer = setInterval(clock, 1000);

            // Function clock within the function triviagame.count
            function clock() {
                // If time reaches 0
                if (triviagame.time === 0) {
                    // Clear the interval of that time
                    clearInterval(timer);
                    // Run the function notime
                    triviagame.notime();
                }
                // If there's time left
                if (triviagame.time > 0) {
                    // Decrement time
                    triviagame.time--;
                }
                // HTML
                $("#time-slot").text("Time remaining: " + triviagame.time);
            }
        },

        // Function notime which is called when time runs out
        notime: function() {
            // Increment wrongcount
            wrongcount++;
            
            // Display the message that time ran out and the correct answer
            $("#message").text("Sorry, you ran out of time! The correct answer is " + triviaobject[currentquestion].answer);
            
            // Show the message (it's hidden while the timer is going)
            $("#after-answer").show();

            // Disable buttons so that they can't be clicked on
            $(".btn-answer").prop("disabled", true);

            // Run the function afteranswer so that it goes onto the next question after 5 seconds
            setTimeout(function() {triviagame.afteranswer();}, 5000);
        },

        // Functions win and lose are similar to notime
        win: function() {
            correctcount++;

            $("#message").text("Correct, the answer is indeed " + triviaobject[currentquestion].answer);

            $("#after-answer").show();
            
            $(".btn-answer").prop("disabled", true);

            setTimeout(function() {triviagame.afteranswer();}, 5000);
        },

        lose: function() {
            wrongcount++;

            $("#message").text("Wrong, the right answer is " + triviaobject[currentquestion].answer);

            $("#after-answer").show();
            
            $(".btn-answer").prop("disabled", true);

            setTimeout(function() {triviagame.afteranswer();}, 5000);   
        },

        afteranswer: function() {
            // If the question is not on the last question
            if (currentquestion < 19) {
                // Increment the current question's number
                currentquestion++;

                // Reset the time to 30 seconds
                triviagame.time = 30;

                // Start counting down again
                triviagame.count();

                // Displaying question/answers
                triviagame.questionanswers(currentquestion);

                // Enable buttons to be clicked on again
                $(".btn-answer").prop("disabled", false);
            }
            else {
                // End the game otherwise
                triviagame.endgame();
            }
        },

        // Function to call to display questions and answers + time
        questionanswers: function(a) {
            // Displaying time left
            $("#time-slot").text("Time remaining: " + triviagame.time);

            // Displaying the question
            $("#question-slot").text(triviaobject[a].question);

            // Putting the buttons into temporary variables
            var button1 = $("<button class='btn btn-lg btn-answer'></button>").text(triviaobject[a].choices[0]);
            var button2 = $("<button class='btn btn-lg btn-answer'></button>").text(triviaobject[a].choices[1]);
            var button3 = $("<button class='btn btn-lg btn-answer'></button>").text(triviaobject[a].choices[2]);
            var button4 = $("<button class='btn btn-lg btn-answer'></button>").text(triviaobject[a].choices[3]);

            // Displaying those buttons on HTML
            $("#first-choice").html(button1);
            $("#second-choice").html(button2);
            $("#third-choice").html(button3);
            $("#fourth-choice").html(button4);

            // Hide the message that you get after you get right/wrong answer or let the time run out
            $("#after-answer").hide();
        },

        // Function that ends the game
        endgame: function() {
            // I'm just using the time-slot ID to display the correct and wrong amount of guesses
            $("#time-slot").html("# of correct answers: " + correctcount + "<br>" + "# of wrong answers: " + wrongcount);

            // Emptying everything else
            $("#question-slot").text("");
            $("#first-choice").text("");
            $("#second-choice").text("");
            $("#third-choice").text("");
            $("#fourth-choice").text("");
            $("#message").empty();

            // Making the reset button
            var resetbutton = $("<button id='reset-button' class='btn btn-lg'></button>").text("Play again?");
            $("#reset-button").html(resetbutton)
        },
        
        // This function is for when the reset button is clicked
        reset: function() {
            // Resetting variables
            currentquestion = 0;
            correctcount = 0;
            wrongcount = 0;
            triviagame.time = 30;
            clearInterval(timer);

            // Prints the first set of question/answers
            triviagame.questionanswers(0);

            // If gamerunning is false, set 
            triviagame.count();

            // Delete the reset button
            $("#reset-button").empty();
        }
    }

    // If the start-button is clicked on, call function start from object trivia
    $("#start-button").on("click", function() {
        triviagame.start();
    })

    // If any of the choices are clicked on, win or lose that question
    $("body").on("click", ".choices", function(event) {
        myanswer = $(this).text();

        if (myanswer === triviaobject[currentquestion].answer) {
            clearInterval(timer);
            triviagame.win();
        }
        else {
            clearInterval(timer);
            triviagame.lose();
        }
    })

    // If the reset-button is clicked on, call the function triviagame.reset
    $("body").on("click", "#reset-button", function(event) {
        triviagame.reset();
    })
})