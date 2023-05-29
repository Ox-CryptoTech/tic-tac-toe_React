import { useState } from "react";

let winner;

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Roll({ resetGame }) {
  if (winner) {
    return (
      <button className="re-run" onClick={resetGame}>
        play again!
      </button>
    );
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true); // xIsNext = true | false
  // const [squares, setSquares] = useState(Array(9).fill(null)); // [,,,,,,,,]

  winner = calculateWinner(squares); // we have the winner
  let status;

  /*
  if we have the winner, we will return it and display the winner.
  otherwise we continue the game with displaying what user turn is.
  */

  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "next player turn is : " + (xIsNext ? "x" : "o");
  }

  function handleClick(i) {
    // checking the filling index and winning user
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); // build a copy of the array without any argument

    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "o";
    }

    // setSquares(nextSquares); // call setSquares function
    // setXIsNext(!xIsNext); // flip it
    onPlay(nextSquares);
  }
  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// calculating the fucking winner\

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; // the last history that we have

  function handlePlay(nextSquares) {
    const nextHistory = [...history(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setHistory([...history, nextSquares]);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol></ol>
        </div>
      </div>
    </>
  );
}
