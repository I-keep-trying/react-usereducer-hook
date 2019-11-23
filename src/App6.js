import React, { useState } from 'react'

const Square = props => {
    
  const [amount, setValue] = useState(null)

  return (
    <button className="square" onClick={() => setValue('X')}>
      {amount}
    </button>

  )
}

function squareValues(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]
      for (let line of lines) {
        const [a, b, c] = line
      }

}

const Board = props => {
    const initialSquares = Array(9).fill(null)
    const [squares, setSquares] = useState(initialSquares)

  const renderSquare = i => {
    return (
        <Square value={squares[i]}  />
    )
  }



  const status = 'Next player: X'

  return (
     
    <div>
        <div className="status">{props.value} </div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const Game = props => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

/**
 * calculateWinner (helper function)
 *
 * Parameter: squares (array of 'X', '0', or null)
 * Return value: 'X', 'O', or null
 */
function calculateWinner(squares) {
  /* Squares indexes as they appear in UI:
    0 1 2
    3 4 5
    6 7 8
    */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] // shows all of the winning combinations ("lines")

  // Iterate over all the winning line combinations to see if the input squares
  // array has one of the with all 'X's or all 'O's. If it does, return 'X' or 'O'.
  for (let line of lines) {
    const [a, b, c] = line
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  // If none of the winning line combinations is contained in input squares
  // array, return null...
  return null
}

export default Game
