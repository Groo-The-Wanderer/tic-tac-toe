 const tictactoe = {
  rows : 3,
  cols: 3,
  neededToWin: 3,
  round: 0,
  numMoves: 0,
  maxMoves: 0,
  currentPlayer: '',
  gameOver: false,
  tournamentRounds: 3,
  tournamentOver: false,
  confettiDuration: 5000,
  player1: { 
    name: 'Player 1',
    piece: 'fas fa-times',
    color: 'rgb(255, 153, 0)',
    score: 0,
  },
  player2: {
    name: 'Player 2',
    piece: 'far fa-circle',
    color: 'rgb(0, 153, 51)',
    score: 0,
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
    this.currentPlayer = 'player1';
    this.gameOver = false;
    this.tournamentOver = false;
    this.round++;
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
  $('#gameheadermessage > h5').text(`Match ${ tictactoe.neededToWin } in a row to win`);

  // Set endmessage div height and width --- this is an overlay of the gameboard
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

  // Setup an empty score table
  setupScoreTable();
} // END drawInitialBoard

const setupScoreTable = function () {
  // Empty the score table if needed
  const $scoreTable = $('#scoretable');
  $scoreTable.empty();
  $scoreTable.append('<thead></thead>').append('<tbody></tbody>').append('<tfoot></tfoot>');

  // Initialise score table
  const tournamentRounds = tictactoe.tournamentRounds;
  $('#scoreheadermessage > h5').text(`Best of ${ tournamentRounds } ${ tournamentRounds === 1 ? ' round' : ' rounds' } Tournament`)
  const player1name = tictactoe.player1.name;
  const player2name = tictactoe.player2.name;
  $('#scoretable > thead').append(`<tr><th>#</th><th>${ player1name }</th><th>${ player2name }</th></tr>`);
  $('#scoretable > tfoot').append(`<tr><td>Total</td><td id="player1score">0</td><td id="player2score">0</td></tr>`);

  // Reset the footer message
  $('#scorefooter > h2').empty();
} // END setupScoreTable

const updateScoreTable = function ( winningPlayer ) {
  const round = tictactoe.round;
  let player1score = 'draw';
  let player2score = 'draw';

  // Determine scoring for the current round
  if ( winningPlayer === 'player1' || winningPlayer === 'player2' ) {
    tictactoe[winningPlayer].score++;
    player1score = winningPlayer === 'player1' ? 1 : '';
    player2score = winningPlayer === 'player2' ? 1 : '';  
  }

  // Update round score in table  
  $('#scoretable > tbody').append(`<tr><td>${ round }</td><td>${ player1score }</td><td>${ player2score }</td></tr>`);

  // Update total score in table footer
  $('#player1score').text( tictactoe.player1.score );
  $('#player2score').text( tictactoe.player2.score );

  // Tournament winner
  let tournamentWinner = '';
  let tournamentWinnerName = '';

  if ( round === tictactoe.tournamentRounds ) {
    tictactoe.tournamentOver = true;

    if ( tictactoe.player1.score === tictactoe.player2.score ) {
      // Update tournament winner message
      $('#scorefooter > h2').text('The tournament ended in a draw');
    } else {
      tournamentWinner = tictactoe.player1.score > tictactoe.player2.score ? 'player1' : 'player2';
      tournamentWinnerName = tictactoe[tournamentWinner].name;

      // Update tournament winner message
      $('#scorefooter > h2').text(`${ tournamentWinnerName } has WON the tournament`);

      // Display confetti animation
      const mp = 150;
      const particleColors = {
            colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
            colorIndex: 0,
            colorIncrementer: 0,
            colorThreshold: 10
      }

      // Run confetti animation
      $.confetti.restart();
      setTimeout( function() { $.confetti.stop(); }, tictactoe.confettiDuration );
    }
  }
} // END updateScoreTable

const tileClickHandler = function () {
  const clickedSquareId =  this.id;
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
      const playerName = tictactoe[tictactoe.currentPlayer].name;
      $('#gameendmessage').css({ 'display': 'inline' }).text(`${ playerName } has won the game`)
      tictactoe.gameOver = true;
      updateScoreTable ( tictactoe.currentPlayer );
      return true;
    } else if ( tictactoe.isGameDrawn()) {
      $('#gameendmessage').css({ 'display': 'inline' }).text('The game is a draw');
      tictactoe.gameOver = true;
      updateScoreTable ();
      return true;
    }
    tictactoe.currentPlayer = tictactoe.currentPlayer === 'player1' ? 'player2' : 'player1';
  }
} // END tileClickHandler

const restartButtonHandler = function () {
  // If round was abandoned we don't count the round
  if ( !tictactoe.gameOver ){
    tictactoe.round--;
  }

  // If tournament is over we blitz the score table
  if ( tictactoe.tournamentOver ) {
    // Reset the score table
    setupScoreTable();

    // Reset the round counter to 0
    tictactoe.round = 0;

    // Reset player scores to 0
    tictactoe.player1.score = 0;
    tictactoe.player2.score = 0;
  }

  // Now initialise everything in the game object
  tictactoe.initialiseGame();

  // Make the gameendmessage invisible
  $('#gameendmessage').css({ 'display': 'none' });

  // Reset to the default tile color
  $('.tile').css({ "background-color": "" });

  // Remove player pieces from the board
  let $icons = $('.icon');
  $icons.removeClass( tictactoe.player1.piece );
  $icons.removeClass( tictactoe.player2.piece );
} // END restartButtonHandler

$(function() {
  tictactoe.initialiseGame();
  drawInitialBoard( tictactoe.rows, tictactoe.cols );

  // Add tile click handler
  $('.tile').on('click', tileClickHandler);

  // Add restart button handler
  $('#restartbutton').on('click', restartButtonHandler);
});