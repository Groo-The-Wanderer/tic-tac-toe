 const tictactoe = {
  rows : 3,
  cols: 3,
  neededToWin: 3,
  numMoves: 0,
  maxMoves: 0,
  currentPlayer: '',
  gameOver: false,
  player1: { 
    name: 'Player 1',
    piece: 'fas fa-times',
    color: 'rgb(255, 153, 0)',
  },
  player2: {
    name: 'Player 2',
    piece: 'far fa-circle',
    color: 'rgb(0, 153, 51)',
  },

  initialiseGame: function ( rows, cols ) {
    for ( let row = 1; row <= this.rows; row++ ) {
      this[row] = {};
      for ( let col = 1; col <= this.cols; col++ ) {
        this[row][col] = '';
      }      
    }
    this.numMoves = 0;
    this.maxMoves = this.rows * this.cols;
  }, // END initialiseGame

  alreadyFilled: function ( row, col ) {
    return this[row][col] != '';
  }, // END alreadyFilled

  playerMove: function ( row, col, piece ) {
    if ( !this.gameOver ) {
      if ( !this.alreadyFilled ( row, col )) {
        this[row][col] = piece;
        this.numMoves++;
        return true;
      }
      return false;
    }
  }, // END playerMove

  isGameDrawn: function () {
    return this.numMoves === this.maxMoves;
  }, // END isGameDrawn
  
  checkForWin: function ( row, col, piece ) {
    let rowCount = 0;
    let colCount = 0;
    let diagCount = 0;
    let revDiagCount = 0;
    let winCount = this.neededToWin;

    for ( let i = 1; i <= this.cols; i++ ) {
      rowCount += this[row][i] === piece ? 1 : 0;
      colCount += this[i][col] === piece ? 1 : 0;
      diagCount += this[i][i] === piece ? 1 : 0;
      revDiagCount += this[i][winCount - i + 1] === piece ? 1 : 0;
    
      if (( rowCount === winCount ) || ( colCount === winCount ) || ( diagCount === winCount ) || ( revDiagCount === winCount )) {
        return true;
      }
    }
    return false;
  }, // END checkForWin
 }

const drawInitialBoard = function ( numRows, numCols ) {
  const $gameboard = $('#gameboard');
  const gameboardWidth = parseInt($gameboard.width());
  const tileSpacing = 5;
  const tileSize = ( gameboardWidth / numCols ) - ( tileSpacing * 2 );

  // Set header message
  $('#gameheader > h5').text(`Match ${ tictactoe.neededToWin } in a row to win`);

  // Set message div height and width --- this is an overlay of the gameboard
  const $endmessage = $('#gameendmessage');
  const paddingTop = ( gameboardWidth / 2 ) - 60;
  const paddingLeftRight = 30;
  $endmessage.css({ 
    'height': `${ gameboardWidth - paddingTop }px`,
    'padding': `${ paddingTop }px ${ paddingLeftRight }px 0`,
    'width': `${ gameboardWidth - ( paddingLeftRight * 2 ) }px`
  });
    
  for ( i = 1; i <= numRows; i++ ) {    
    for ( j = 1; j <= numCols; j++ ) {
      let tileId = `tile${ i }-${ j }`;
      $gameboard.append(`<div class='tile' id='${ tileId }' row='${ i }' col='${ j }'></div>`);

      // Add the div that will contain the played piece icon
      $('#' + tileId).append(`<div class='icon'></span>`);
    }
  }

  // Set width, height and margin of each tile
  const $tiles = $('.tile');
  $tiles.css({
    'height': `${ tileSize }px`,
    'width': `${ tileSize }px`,
    'margin': `${ tileSpacing }px`,
    'font-size': `${ tileSize * 0.5 }px`
  });

  const $icons = $('.icon');
  $icons.css({ 'margin-top': `${ tileSize * 0.5 / 2}px`});
} // END drawInitialBoard

const tileClickHandler = function () {
  const clickedSquareId = event.srcElement.id
  const $clickedSquare = $('#' + clickedSquareId);
  const row = $clickedSquare.attr('row');
  const col = $clickedSquare.attr('col');
  const playerPiece = tictactoe[tictactoe.currentPlayer].piece;

  if( tictactoe.playerMove ( row, col, playerPiece )) {
    const $icon = $('#' + clickedSquareId + ' .icon');
    $icon.addClass( playerPiece );

    const playerColor = tictactoe[tictactoe.currentPlayer].color;
    $clickedSquare.css({ 'background-color': playerColor });
        
    if( tictactoe.checkForWin( row, col, playerPiece )) {
      const $message = $('#gameendmessage');
      $message.css({ 'display': 'inline' });
      $message.text(`${ tictactoe[tictactoe.currentPlayer].name } has won the game`);
      tictactoe.gameOver = true;
      return true;
    } else if ( tictactoe.isGameDrawn()) {
      const $message = $('#gameendmessage');
      $message.css({ 'display': 'inline' });
      $message.text('The game is a draw');
      tictactoe.gameOver = true;
      return true;
    }
    tictactoe.currentPlayer = tictactoe.currentPlayer === 'player1' ? 'player2' : 'player1';
  }
} // END tileClickHandler

const restartButtonHandler = function () {
  tictactoe.initialiseGame();

  // Make the gameendmessage invisible
  $('#gameendmessage').css({ 'display': 'none' });

  // Reset to the default tile color
  $('.tile').css({ "background-color": "" });

  // Remove player pieces from the board
  let $icons = $('.icon');
  $icons.removeClass( tictactoe.player1.piece );
  $icons.removeClass( tictactoe.player2.piece );

  tictactoe.currentPlayer = 'player1';
  tictactoe.gameOver = false;  
} // END restartButtonHandler

$(function() {
  tictactoe.initialiseGame();
  drawInitialBoard( tictactoe.rows, tictactoe.cols );
  tictactoe.currentPlayer = 'player1';
  tictactoe.gameOver = false;

  // Add tile click handler
  $('.tile').on('click', tileClickHandler);

  // Add restart button handler
  $('#gamerestart').on('click', restartButtonHandler);
});