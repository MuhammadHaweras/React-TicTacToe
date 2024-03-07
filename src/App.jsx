import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinantions";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedPlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function derivedWinner(gameBoard, player) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareElement =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareElement =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareElement =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareElement &&
      firstSquareElement === secondSquareElement &&
      firstSquareElement === thirdSquareElement
    ) {
      winner = player[firstSquareElement];
    }
  }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS);

  const activePlayer = derivedPlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, player);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleMarkGameSquare(rowIndex, colIndex) {
    // setActivePlayer((currState) => (currState === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const currentPlayer = derivedPlayer(prevTurns);
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurn;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleRenamePlayer(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleRenamePlayer}
          />
          <Player
            playerName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleRenamePlayer}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onHandleGameBoardSquare={handleMarkGameSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
