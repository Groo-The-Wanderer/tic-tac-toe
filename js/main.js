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

const drawInitialBoard = function ( params ) {
  // Function expects arguments as an object in the format:
  // drawInitialBoard ( { tilesize: 140, tilespacing: 5, numCols: 3 })
  const tilesize = parseInt(params.tilesize);
  const tilespacing = parseInt(params.tilespacing);
  const numCols = parseInt(params.numCols);
  const heightWidth = ( tilesize * numCols ) + ( tilespacing * 2 * numCols );
  const $gameboard = $('#gameboard');

  // Set gameboard height and width
  $gameboard.css({
    'height': `${ heightWidth }px`,
    'width': `${ heightWidth }px`
  });

  // Set message div height and width --- this is an overlay of the gameboard
  const $message = $('#message');
  const paddingTop = ( heightWidth / 2 ) - 60;
  const paddingLeftRight = 30;
  $message.css({ 
    'height': `${ heightWidth - paddingTop }px`,
    'padding': `${ paddingTop }px ${ paddingLeftRight }px 0`,
    'width': `${ heightWidth - ( paddingLeftRight * 2 ) }px`
  });
    
  for ( i = 1; i <= tictactoe.rows; i++ ) {    
    for ( j = 1; j <= tictactoe.cols; j++ ) {
      let tileId = `tile${ i }-${ j }`;
      $gameboard.append(`<div class='tile' id='${ tileId }' row='${ i }' col='${ j }'></div>`);

      // Add the span that will contain the played piece icon
      $('#' + tileId).append(`<span class='icon'></span>`);
    }
  }

  // Set width, height and margin of each tile
  const $tiles = $('.tile');
  $tiles.css({
    'height': `${ tilesize }px`,
    'width': `${ tilesize }px`,
    'margin': `${ tilespacing }px`,
    'font-size': `${ tilesize * 0.5 }px`
  });

  const $icons = $('.icon');
  $icons.css({ 'margin-top': `${ tilesize * 0.5 / 2}px`});
}

const clickHandler = function () {
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
        
    if( tictactoe.checkForWin( playerPiece )) {
      $('#message').css({ 'display': 'inline' });
      $('#message').text(`${ tictactoe[tictactoe.currentPlayer].name } has won the game`);
      tictactoe.gameOver = true;
      return true;
    } else if ( tictactoe.isGameDrawn()) {
      $('#message').css({ 'display': 'inline' });
      $('#message').text('The game is a draw');
      tictactoe.gameOver = true;
      return true;
    }
    tictactoe.currentPlayer = tictactoe.currentPlayer === 'player1' ? 'player2' : 'player1';
  }
}

$(function() {
  const tilesize = 150;
  const tilespacing = 5;

  tictactoe.initialiseGame();
  drawInitialBoard({ tilesize: tilesize, tilespacing: tilespacing, numCols: tictactoe.cols });
  tictactoe.currentPlayer = 'player1';
  tictactoe.gameOver = false;

  $('.tile').on('click', clickHandler)
});