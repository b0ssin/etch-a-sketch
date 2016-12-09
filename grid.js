//initialize some vars
var width = 0;
var height = 0;
var boxWidth = 0;
var boxHeight = 0;
var userInput = "";
var wrapper = document.getElementById("wrapper")
function getWandH() {
  width = wrapper.offsetWidth;
  height = wrapper.offsetHeight;
}


function getBoxWandH(userInput) {
  if(userInput === "") {
    boxWidth = width / 16;
    boxHeight = width / 16;
  } else {
    boxWidth = width / userInput;
    boxHeight = width / userInput;
  }
  
}
// 16 rows with 16 boxes inside
var rowsAndBoxes = "";
function makeRowsAndBoxes(userInput) {
  rowsAndBoxes = "";
  if(userInput === "") {
    for(var i = 0; i < 16; i++) {
      rowsAndBoxes += '<div class="row">';
    for(var j = 0; j < 16; j++) {
      rowsAndBoxes += '<div class="box"></div>';
    };
    rowsAndBoxes += "</div>"
    }
  } else if(typeof userInput === "string") {
    console.log("userInput was a string");
  } else {
    for(var i = 0; i < userInput; i++) {
      rowsAndBoxes += '<div class="row">';
    for(var j = 0; j < userInput; j++) {
      rowsAndBoxes += '<div class="box"></div>';
    };
    rowsAndBoxes += "</div>"
    }
  }
  addBoxes();
}

function addBoxes() {
  wrapper.innerHTML = rowsAndBoxes;
}
var boxes = document.getElementsByClassName("box")
var rows = "";
var marginValue = 2;
function appendBoxStyles() {
  boxes = document.getElementsByClassName("box")
  for(var i = 0; i < boxes.length; i++) {
    $(boxes[i]).hover(
      function () {
        $(this).addClass('active');
    });
    boxes[i].style.border = "1px solid white";
    boxes[i].style.width = (boxWidth - 2) + "px";
    boxes[i].style.height = (boxHeight - 2) + "px";
  };
  rows = document.getElementsByClassName("row");
  for(i = 0; i < rows.length; i++) {
    rows[i].style.height = boxHeight + "px";
  }
}

function resetButton() {
  for(var i = 0; i < boxes.length; i++) {
    $(boxes[i]).removeClass('active');
  }
}

var reset = $("#reset");
//reset board
var resetBoard = reset.on("click", function() {
  for(var i = 0; i < boxes.length; i++) {
    $(boxes[i]).removeClass('active');
  }
});
resetBoard;

reset.on("click", function() {
  userInput = Number(prompt("Enter the amount of boxes in a row you want(16-64):"));
  //clear inner html
  wrapper.innerHTML = "";
  //populate w/ X div rows and X div boxes
  makeRowsAndBoxes(userInput);
  //set box w & h. 1) get w & h 2)append styles
  getBoxWandH(userInput);
  appendBoxStyles();
});

var opacityOption = $("#opacity")
opacityOption.on("click", function() {

  for(var i = 0; i < boxes.length; i++) {
    $(boxes[i]).removeClass('active');
  }

  for(var i = 0; i < boxes.length; i++) {
    $(boxes[i]).unbind("mouseenter mouseleave");
    $(boxes[i]).hover(function() {
      var changedOpacity = Number($(this).css("opacity")) - .1;
      $(this).fadeTo(0, changedOpacity);
    });
  }
});

var reset = document.getElementById("reset")
// populating default 16x16 grid
getWandH();
getBoxWandH(userInput);
makeRowsAndBoxes(userInput);
addBoxes();
appendBoxStyles();
