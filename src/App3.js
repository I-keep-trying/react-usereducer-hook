import React, { useState } from 'react'

/* Initial setup
const Square = props => {
  return <button 
  className="square">{}</button>
} */

const Square = props => {
  // const [value, setValue] = useState(null)

  return (
    <>
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
      
    </>
    
  )
}

const Board = props => {
  /*   const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setXIsNext] = useState(true) */

  /*   const handleClick = i => {
    const newSquares = [...squares]

    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareAlreadyFilled = Boolean(newSquares[i])
    if (winnerDeclared || squareAlreadyFilled) return

    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  } */

  /*   const reset = () => {
    setSquares(initialSquares)
  }
 */
  const renderSquare = i => {
    // console.log(props.squares[i])
    return (
      /*       <Square value={squares[i]} onClick={() => handleClick(i)} /> */
      <Square
        value={props.squares[i]} /* updated line */
        onClick={() => props.onClick(i)} /* updated line */
      />
    )
  }

  /*   const winner = calculateWinner(squares)
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}` */

  return (
    <div>
      {/*       <button onClick={() => reset()}>Reset</button>
      <div className="status">{status}</div> */}
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
  
  const initialHistory = [{ squares: Array(9).fill(null) }]
  const [history, setHistory] = useState(initialHistory)
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const handleClick = i => {
    const slicedHistory = history.slice(0, stepNumber + 1)
    const finalStepInSlicedHistory =
      slicedHistory[slicedHistory.length - 1]
    const newSquares = [...finalStepInSlicedHistory.squares]

    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareAlreadyFilled = Boolean(newSquares[i])
    if (winnerDeclared || squareAlreadyFilled) return

    newSquares[i] = xIsNext ? 'X' : 'O'
    const newStep = { squares: newSquares }
    const newHistory = [...slicedHistory, newStep]

    setHistory(newHistory)
    setXIsNext(!xIsNext)
    setStepNumber(slicedHistory.length)
  }

  const jumpTo = step => {
    setStepNumber(step)

    const isEvenStepNumber = step % 2 === 0
    setXIsNext(isEvenStepNumber)
  }

  const reset = () => {
    setHistory(initialHistory)
    setStepNumber(0)
    setXIsNext('X')
  }



  /*   const currentStep = history[history.length - 1] */
  const currentStep = history[stepNumber]
  const winner = calculateWinner(currentStep.squares)
   const winningRow = calculateWinner()
  console.log(winningRow)
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`

    const moves = history.map((step, move) => {
   
      const description = Boolean(move)
        ? `Go to move #${move}`
        : `Go to game start`
      return (
        <>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description} {currentStep.squares}</button>
        </li>
             
            </>
      )
    })

  return (
    <div className="game">
      
      <div className="game-board">
        <Board
          squares={currentStep.squares}
          
          onClick={i => handleClick(i)}
        />
        {winner}
      </div>

      <div className="game-info">
     
        <div>{status}</div>
        <ol>{moves}</ol>
        <button onClick={() => reset()}>Reset</button>
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
function calculateWinner(square) {
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

  // Iterate over all the winning line combinations to see if the
  // input squares array has one of the with all 'X's or all 'O's.
  // If it does, return 'X' or 'O'.
  for (let line of lines) {
    const [a, b, c] = line
    if (
      square[a] &&
      square[a] === square[b] &&
      square[a] === square[c]
    )
     {
       // const winningRow = line
    // console.log(winningRow) // array [0,1,2] 
      return square[a]
    }
    
  }
  
  // If none of the winning line combinations is contained in
  // input squares array, return null...
  return null
}

export default Game
