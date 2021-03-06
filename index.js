console.log("Connected!");
// Variables Section

var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userPattern = [];
var openingLine = $("#level-title");
var gameOn = false;
var delay = 100;


// Event Listeners

$(".spacebar").click(function(){
  if(!gameOn){
    $(".spacebar").addClass("pressedBar");
    setTimeout(function(){
      $(".spacebar").removeClass("pressedBar");
    }, 200);
    nextSequence();
    gameOn = true;
  }
});

$("body").on("keydown", function(evt) {

  if (!gameOn && evt.key === " ") {
    nextSequence();
    // console.log(evt.key);
    gameOn = true;
  }
});


$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  validate(userPattern.length - 1);
  if (gameOn) {
      Play(userChosenColor);
      animateClick(userChosenColor);
      console.log(userPattern);
    }
 

});


// Functions Section

function validate(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {

    if (gamePattern.length === userPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    $(openingLine).text("Game Over, press spacebar to restart");

    $("body").addClass("game-over")
    Play("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    restart();
  }
}

function nextSequence() {
  userPattern = [];
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];

  gamePattern.push(randomChosenColor);
  animate(randomChosenColor);
  Play(randomChosenColor);
  $(openingLine).text("Level " + level);
  level++;
  console.log(gamePattern, level);
}

function Play(randomChosenColor) {

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3").play();
}

function animate(color) {
  $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animateClick(userChosenColor) {
  $("#" + userChosenColor).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
  });
}


function restart() {
  gamePattern = [];
  level = 0;
  gameOn = false;
}



console.log(userPattern.length, gamePattern.length);
