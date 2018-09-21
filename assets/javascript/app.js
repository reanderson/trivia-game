//VARIABLES
var questionsHTML = $("#questionText")
var answersHTML = $("#answerOptions")
var countdownHTML = $("#timeRemaining")

var correctCount = 0;
var incorrectCount = 0;

var currentQIndex = 0;

var startButton = $("<button></button>").attr("type", "button").addClass("btn btn-outline-primary my-3 btn-block").text("Click to Start!")

var countdown;

// Array of Questions and Answers
var questions = [{
  question: "Which of these characters is not played by Sam Riegel?",
  correctAnswer: "Caleb Widogast",
  options: ["Scanlan Shorthalt", "Taryon Darrington", "Nott the Brave", "Caleb Widogast"]
}, {
  question: "Which of these characters is not played by Taliesin Jaffe?",
  correctAnswer: "Tiberius Stormwind",
  options: ["Percival de Rolo", "Mollymauk Tealeaf", "Caduceus Clay", "Tiberius Stormwind"]
}, {
  question: "What do the following characters have in common? <br/> Vex'ahlia, Vax'ildan, Keyleth, Calianna",
  correctAnswer: "They're all Half-Elves",
  options: ["They're all Half-Elves", "They're all female", "They all appeared during Campaign 1", "They're all played by members of the main cast"]
}, {
  question: "Including both Pumat Prime and each simulacrum, how many Pumat Sols are there?",
  correctAnswer: "Four",
  options: ["Three", "Four", "Five", "Infinite Pumats"]
}, {
  question: "Who was the last member of Vox Machina to die for the first time?",
  correctAnswer: "Keyleth",
  options: ["Pike Trickfoot", "Vax'ildan", "Keyleth", "Grog Strongjaw"]
}, {
  question: "Which of the following of Matthew Mercer's homebrewed character options has not been used in Critical Role (as of 9/20/18)?",
  correctAnswer: "College of the Maestro",
  options: ["Totem of the Duck", "Blood Hunter", "Monk of the Cobalt Soul", "College of the Maestro"]
}, {
  question: "Which Campaign 2 Guest Character has only appeared in one episode (as of 9/20/18)?",
  correctAnswer: "Calianna",
  options: ["Shakäste", "Calianna", "Keg", "Nila"]
}, {
  question: "Counting characters from both campaigns, and both guest and main cast characters, alive or dead, which race has been represented by the most player characters?",
  correctAnswer: "Human",
  options: ["Half-Elf", "Human", "Tiefling", "Gnome"]
}, {
  question: "Which of the following deities is illegal to worship in the Dwendalian Empire?",
  correctAnswer: "Kord, the Stormlord",
  options: ["Kord, the Stormlord", "Pelor, the Dawnfather", "Moradin, the Allhammer", "Ioun, the Knowing Mistress"]
}, {
  question: "Which city is not in Tal'Dorei?",
  correctAnswer: "Zadash",
  options: ["Emon", "Kymal", "Westruun", "Zadash"]
}, ]

//=====================================================================================================
// FUNCTIONS

function randOrder(len) {
  // This function aids in randomizing the order answers are displayed in.
  // Takes the length of our options array (integer, "len")
  // I need a random order array, too! (This is our result)
  // then, while the random order array's length is less than the length of the options array,
  // I need to get a random number from 0 through the length of the options array,
  // Then, if the number isn't already in the random order array,
  // push that number to the random order array.
  // Otherwise, just start from the top.
  // returns an array of numbers, with length "len"
  var result = []
  while (result.length < len) {
    var randNum = Math.floor(Math.random() * len);
    console.log(randNum)
    if (!result.includes(randNum)) {
      result.push(randNum)
    }

  }
  console.log(result)
  return result
}

function genQ(index, arr) {
  // takes the current question index, and the array of questions
  // write the active question to the question div
  questionsHTML.html("<h3>" + arr[index].question + "</h3>")

  // get the order that the answers will be written in
  var ansOrder = randOrder(arr[index].options.length)
  // To write out the answer options...
  for (var i = 0; i < ansOrder.length; i++) {
    var ansBtn = $("<button></button>").attr({
      type: "button",
    }).addClass("btn btn-outline-primary mx-y ansBtn btn-block").text(arr[index].options[ansOrder[i]])
    if (arr[index].options[ansOrder[i]] === arr[index].correctAnswer) {
      ansBtn.attr("value", "1")
    } else {
      ansBtn.attr("value", "0")
    }
    answersHTML.append(ansBtn)
  }
  $(".ansBtn").on("click", function () {
    answerButton(this)
  })
  qCountdown()
}

function qCountdown() {
  // starts a 30-second countdown, using the countdown variable
  // Writes the time remaining to the page
  var t = 30
  var timeHTML = $("<p>").text(t)
  countdownHTML.html("<h5>Time Remaining:</h5>")
  countdownHTML.append(timeHTML)

  // Clear Interval on countdown just in case something goes terribly wrong and it's not already clear
  clearInterval(countdown)

  countdown = setInterval(function () {
    t--;
    timeHTML.text(t);

    if (t === 0) {
      // if out of time, clear the interval and move on to the quesiton timeout
      clearInterval(countdown)
      questionTimeOut()
    }

  }, 1000)
}

function questionTimeOut() {
  // this function runs if you run out of time on a question
  // empties the answer buttons
  answersHTML.empty()

  // Increment incorrect answers
  incorrectCount++;

  questionsHTML.html("<h4>Time's up!</h4>")
  toNextQ()
}

function toNextQ() {
  // increases question index
  currentQIndex++;

  if (currentQIndex < questions.length) {
    // starts a 5-second countdown, using the countdown variable
    // Writes the time remaining to the page
    var t = 5
    var timeHTML = $("<p>").text(t)
    countdownHTML.html("<h5>To Next Question:</h5>")
    countdownHTML.append(timeHTML)

    // Clear Interval on countdown just in case something goes terribly wrong and it's not already clear
    clearInterval(countdown)

    countdown = setInterval(function () {
      t--;
      timeHTML.text(t);

      if (t === 0) {
        // if out of time, clear the interval and move on to the quesiton timeout
        clearInterval(countdown)
        genQ(currentQIndex, questions)
      }

    }, 1000)
  } else {
    endgame()
  }
}

function gameStart() {
  // reset correct/incorrect counters and current question
  correctCount = 0;
  incorrectCount = 0;
  currentQIndex = 0;

  // start the game by displaying the first question
  genQ(currentQIndex, questions)
}

function endgame() {
  countdownHTML.empty()
  questionsHTML.html("<h3>Game Over!</h3> <p>Questions Correct: " + correctCount + "</p><p>Questions Incorrect: " + incorrectCount + "</p>")
  var newGameBtn = $("<button></button>").attr("type", "button").addClass("btn btn-outline-primary my-3 btn-block").text("Play Again?")
  newGameBtn.on("click", gameStart)
  questionsHTML.append(newGameBtn)
}

function answerButton(btn) {
  // takes a button object

  // when an answer is selected, stop the countdown
  clearInterval(countdown);

  // check the value of the button pressed
  // The correct answer has a value of 1, while the rest have a value of 0
  var btnVal = $(btn).val()
  console.log(btnVal)


  if (parseInt(btnVal) === 1) {
    // increment correct answers
    correctCount++;
    questionsHTML.html("<h4>Correct!</h4>")
    answersHTML.empty()
    toNextQ()
  } else {
    // increment incorrect answer count
    incorrectCount++;
    questionsHTML.html("<h4>Incorrect!</h4>")
    answersHTML.empty()
    toNextQ()
  }
}

//=====================================================================================================
// BUTTONS
startButton.on("click", gameStart)

// ====================================================================================================
questionsHTML.html(startButton)