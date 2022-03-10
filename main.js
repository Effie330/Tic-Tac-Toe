let currentMove = "X";
let moveCount = 0;
let topRow = ["N", "N", "N"];
let middleRow = ["N", "N", "N"];
let bottomRow = ["N", "N", "N"];
let winnerPlayerIs, winPos = "none";
let gameWon = false;
function displayMove(moveLocation) {
  //Only checking win states after minimum number of moves is played
  if(moveCount >= 5){checkWinStates();}

  //Checking if Tie
  if((moveCount == 9) && !gameWon) {
    document.getElementById("displayWinner").innerHTML = "The game has tied!";
  }

  //If someone won the game, displaying the message at the top
  if(gameWon){
    //winPos is changed with checkWinState
    let winningLine = document.getElementById("none");
    winningLine.id = winPos;

    if(winnerPlayerIs == "X") document.getElementById("displayWinner").innerHTML = "Player X has won!";
    else document.getElementById("displayWinner").innerHTML = "Player O has won!";
  }

  //Writing the Move to the screen
  document.getElementById(moveLocation).innerHTML = currentMove;
  
  //Switching the current player for next turn
  if(currentMove == "X") currentMove = "O";
  else currentMove = "X";

}

function calcMove(moveLocation){
  if(!gameWon){
    let validMove = false
    let row = moveLocation.slice(0,1);
    let column = moveLocation.slice(1,2);
    let columnInt = -1
    
    //Changing the Column to the array position number
    switch(column){
      case("L"): columnInt = 0; break;
      case("M"): columnInt = 1; break;
      case("R"): columnInt = 2; break;
    }

    //Placing the move in the proper row array
    switch(row) {
      case("T"): 
        if(topRow[columnInt] == "N"){
          topRow[columnInt] = currentMove;
          validMove = true;
        }
      break;
      case("M"): 
        if(middleRow[columnInt] == "N"){
          middleRow[columnInt] = currentMove;
          validMove = true;
        }
      break;
      case("B"): 
        if(bottomRow[columnInt] == "N"){
          bottomRow[columnInt] = currentMove;
          validMove = true;
        }
      break;
    }

    //incrementing move count only if the move is valid
    if(validMove){
      moveCount += 1;
      displayMove(moveLocation);
    } 
  }
}

//CHECKING THE 8 DIFFERENT WIN STATES AFTER 5 TOTAL MOVES HAVE BEEN PLAYED
function checkWinStates(){

  //Vertical Win states
  if((topRow[0] != "N")&&(topRow[0] == middleRow[0])&&(middleRow[0] == bottomRow[0])){winPos = "vertical_1";}
  else if((topRow[1] != "N")&&(topRow[1] == middleRow[1])&&(middleRow[1] == bottomRow[1])){winPos = "vertical_2";}
  else if((topRow[2] != "N")&&(topRow[2] == middleRow[2])&&(middleRow[2] == bottomRow[2])){winPos = "vertical_3";}
  //Horizontal Win states
  else if ((topRow[0] != "N")&&(topRow[0] == topRow[1])&&(topRow[1] == topRow[2])){winPos = "horizontal_1";}
  else if ((middleRow[0] != "N")&&(middleRow[0] == middleRow[1])&&(middleRow[1] == middleRow[2])){winPos = "horizontal_2";}
  else if ((bottomRow[0] != "N")&&(bottomRow[0] == bottomRow[1])&&(bottomRow[1] == bottomRow[2])){winPos = "horizontal_3";}
  //Diagonal Win states
  else if ((topRow[0] != "N")&&(topRow[0] == middleRow[1])&&(middleRow[1] == bottomRow[2])){winPos = "diagonal_1";}
  else if ((topRow[2] != "N")&&(topRow[2] == middleRow[1])&&(middleRow[1] == bottomRow[0])){winPos = "diagonal_1";}

  if(winPos != "none"){
    gameWon = true;
    winnerPlayerIs = currentMove;
  }
}