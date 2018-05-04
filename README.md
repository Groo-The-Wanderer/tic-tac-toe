# Tic Tac Toe with a Twist

Tic Tac Toe based game that runs entirely in the browser. The underlying tools used are HTML, CSS and Javascript (some external Javascript libraries are used).

## Getting Started

The game is available live via the following GitHub link:

https://groo-the-wanderer.github.io/tic-tac-toe/index.html

## Game Rules

The game is modeled on the classic Tic Tac Toe game where 2 players take turns placing either an 'X' or an 'O' on a grid. The grid is subdivided into smaller squares that provide the grid dimensions.

Classic Tic Tac Toe (i.e. offline on a piece of paper) is played on a 3 x 3 square grid with the winner being the first to complete a contiguous line of either 'Xs' or 'Os'. The winning line can be in a row or a column or either diagonal (top-left to lower right or top-right to lower left).

Note that for the duration of each game the player piece doesn't change. So Player 1 will always be placing 'Xs' on the grid and Player 2 will always be placing 'Os'. However, it is customary that when playing more than 1 game in a row Player 1 in the previous game is Player 2 this time around and so on.

The key twist on the classic with this game is that the grid size can vary; as can the number of contiguous pieces needed to win the game.

## Features of Tic Tac Toe with a Twist

* The game supports any size grid but will default to a 4 x 4
* The winning line can be configured to any number of contiguous pieces in a row but will default to 3. Therefore, if playing in the default configuration the first player to place his or her piece 3 times in a row that runs either vertically, horizontally or across any of the available diagonals is the winner
* When a game is over (via a win or a draw) the winner is announced on a screen that overlays the game board. In order to play another game the Restart button must be pressed to clear the winner announcement and reset the game grid
  * Whilst the winner announcement is visible the config button is disabled (see below for config button information)
* The game is played tournament style with the default being 3 rounds. There is a score table to the right of the game grid that keeps a tally
* Tournament points are awarded as 1 for a win, 0 for a loss or draw - draws are fairly common by the way
* The winner of the tournament is announced with fanfare and confetti raining down for 5 seconds
* If a round is abandoned (i.e. the Restart button is used before the game ends in a win or draw) a tournament score for that round isn't recorded
* The starting player for each game toggles - so play an even number of games and both players start the same number of games each
* The config button (a little cog icon) appears above the game grid to the right. The config button will display a config popup that can be used to:
  * *Change the name of each player*. After saving the config the score table is updated as will future game and tournament win announcements
  * *Change the grid size*. After saving, the grid redraws, the score tally table is reset and the tournament restarts from round 1
  * *Change the winning combination size*. After saving the number of contiguous tiles to win the game is adjusted, the grid redraws, the score tally table is reset and the tournament restarts from round 1
  
### Notes regarding Tournament Play

* If the grid size or number of pieces to win is changed mid tournament (via the config button popup) the tournament is restarted. So consider a tournament to be based on the same sized grid and winning line size for all rounds
* All rounds in the tournament must be played even if it's mathematically impossible for a player to win. So play for pride and skill development even if you can't win --- there's always next time

## Known Bugs

* There is no validation on changes to the grid size or winning combination size in the config form. So at present you can have a winning combination bigger than the size of the grid

## Feature Wishlist

* Add validation to the config form. In fact lots needs to happen to the config form, primarily validation (see Known Bugs above) and styling
* Move the config form definition out of the index.html file and back into the main.js file using jQuery methods to create the form dynamically
  * At present the config form contents are hardcoded into index.html but the defaults are set on-the-fly when the form is opened
* Style the config form - probably ideal to incorporate an external library like bootstrap.js that has lots of inherent modal functionality that would be useful
* Refactor DOM manipulation code in main.js - there are pockets of repetition - and so an overall restructure of the DOM manipulation code is necessary
* Make the styling responsive to support different devices and browser / screen sizes

## Built With the Following Libraries

* [jQuery](http://jquery.com/) - The web library used for DOM manipulation
* [jQuery Confetti](https://www.jqueryscript.net/animation/Confetti-Animation-jQuery-Canvas-Confetti-js.html) - Used to produce eye-candy fanfare to announce tournament winner

## Author

* **Brendan Leonard** - *Initial work*

## License

This project is licensed under the MIT License

## Acknowledgments

* Help / 2nd Pair of Eyes / Inspiration [ Text Chimp (Luke) and Grant ]
* Debugging help / Ideas / Sanity [ Anna, Nathan, Ana, Bhagi, Scott & Linna - WDi27 Sydney ]
