 const tictactoe = {
  rows : 3,
  cols: 3,
  neededToWin: 3,
  numMoves: 0,
  maxMoves: 0,
  currentPlayer: '',
  gameOver: false,
  player1: { piece: 'X' },
  player2: { piece: 'O' },

  initialiseGame: function ( rows, cols ) {
    for ( let row = 1; row <= this.rows; row++ ) {
      this[row] = {};
      for ( let col = 1; col <= this.cols; col++ ) {
        this[row][col] = '';
      }      
    }
    this.numMoves = 0;
    this.maxMoves = this.rows * this.cols;
  },

  alreadyFilled: function ( row, col ) {
    return this[row][col] != '';
  },

  playerMove: function ( row, col, piece ) {
    if ( !this.gameOver ) {
      if ( !this.alreadyFilled ( row, col )) {
        this[row][col] = piece;
        this.numMoves++;
        return true;
      }
      return false;
    }
  },

  isGameDrawn: function () {
    return this.numMoves === this.maxMoves;
  },
  
  checkForWin: function ( piece ) {
    let winCount = 0;

    // Check each row
    for ( let row = 1; row <= this.rows; row++ ) {
      winCount = 0;

      for ( let col = 1; col <= this.cols; col++ ) {
        winCount += this[row][col] === piece ? 1 : 0;
        
        if ( winCount === this.neededToWin ) {
          return true;
        }
      } 
    }

    // Check each col
    for ( let col = 1; col <= this.cols; col++ ) {
      winCount = 0;
      for ( let row = 1; row <= this.rows; row++ ) {
        winCount += this[row][col] === piece ? 1 : 0;
        
        if ( winCount === this.neededToWin ) {
          return true;
        }
      } 
    }
    
    // Check diagonal left to right
    winCount = 0;
    for ( let col = 1; col <= this.cols; col++ ) {
      for ( let row = 1; row <= this.rows; row++ ) {
        if ( col === row ) {          
          winCount += this[row][col] === piece ? 1 : 0;
        }
        
        if ( winCount === this.neededToWin ) {
          return true;
        }
      } 
    }

    // Check diagonal right to right
    if ( this[1][3] === piece && this[2][2] === piece && this[3][1] === piece ){
      return true;
    }
    
    return false;
  }
}

const drawInitialBoard = function () {
  let $gameboard = $('#gameboard');
  for ( i = 1; i <= tictactoe.rows; i++ ) {    
    for ( j = 1; j <= tictactoe.cols; j++ ) {
      $gameboard.append(`<div class="inner" id="inner${ i }-${ j }" row="${ i }" col="${ j }"></div>`);
    }
  }
}

const clickHandler = function () {
  const clickedSquare = event.srcElement.id;
  const row = $('#' + clickedSquare).attr('row');
  const col = $('#' + clickedSquare).attr('col');
  const playerPiece = tictactoe[tictactoe.currentPlayer].piece;

  if( tictactoe.playerMove ( row, col, playerPiece )) {
    $('#' + clickedSquare).html('<p>' + playerPiece + '</p>');
    if( tictactoe.checkForWin( playerPiece )) {
      // $('#gamemessage').text('WINNER');
      // $('#gamemessage').text(`${ tictactoe.currentPlayer } has WON the game`);
      $('#gameboard').append(`<p class="winner">${ tictactoe.currentPlayer } has WON the game</p>`);
      tictactoe.gameOver = true;
      return true;
    } else if ( tictactoe.isGameDrawn()) {
      $('#gameboard').append(`<p class="winner">The game has ended in a draw</p>`);
      tictactoe.gameOver = true;
      return true;
    }
    tictactoe.currentPlayer = tictactoe.currentPlayer === 'player1' ? 'player2' : 'player1';
  }
}

$(function() {
  tictactoe.initialiseGame();
  drawInitialBoard();
  tictactoe.currentPlayer = 'player1';
  tictactoe.gameOver = false;

  $('.inner').on('click', clickHandler)
});