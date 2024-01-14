import React from 'react'
import Board from './Components/Board.jsx'
import './App.css'

const winPossibilities = [
  // ROWS
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // COLUMNS
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // DIAGONALS
  [0, 4, 8],
  [2, 4, 6]
] // Array with arrays with all wins possibilities

function App() {
  // STATES AND VARIABLES DECLARATIONS
  const [dataX, changeDataX] = React.useState([]) // Player X moves
  const [dataO, changeDataO] = React.useState([]) // Player O moves
  const [count, changeCount] = React.useState(0) // Moves count
  const [result, changeResult] = React.useState('') // Result state
  const [waitMessage, changeWaitMessage] = React.useState('')
  const initialBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ] // Initial board

  const [board, changeBoard] = React.useState(initialBoard) // Board state

  React.useEffect(() => {
    verifyResult()
  }, [dataX, dataO])

  const finishedGame = (count) => {
    if(count >= 0){
      setTimeout(() => {
        changeWaitMessage(`Wait ${count} seconds to refresh game!`)
        finishedGame(count-1)
      }, 1000)
    }else{
      reset()
    }
  }

  //  FUNCTION TO VERIFY PLAYER TURN
  const verifyTurnX = (value) => {
    if(value % 2 === 0){
      return true
    }else{
      return false
    }
  }

  // FUNCTION TO VERIFY IF SOME PLAYER WIN THE GAME
  const verifyResult = () => {
    if(winPossibilities.some(possibility => 
    possibility.every(position => dataX.includes(position)))){
      changeResult('The winner is player X!')
      finishedGame(3)
    }else if(winPossibilities.some(possibility => 
    possibility.every(position => dataO.includes(position)))){
      changeResult('The winner is player O!')
      finishedGame(3)
    }else if(dataX.length === 5 && dataO.length === 4 && result.length === 0){
      changeResult('Draw!')
      finishedGame(3)
    }
  }

  // FUNCTION TO RESET ALL STATES
  const reset = () => {
    changeDataO([])
    changeDataX([])
    changeCount(0)
    changeResult('')
    changeBoard(initialBoard)
    changeWaitMessage('')
  }

  return <>
    {waitMessage ? <p className='waitMessageBoard'>{waitMessage}</p> : null}
    <h1 className='titleBoard'>Tic Tac Toe</h1>
    {result.length > 0 ? <p className='resultBoard'>{result}</p> : <p className='turnBoard'>Player Turn: {verifyTurnX(count) ? 'X' : 'O'}</p>}
    <Board dataX={dataX} changeDataX={changeDataX} dataO={dataO} changeDataO={changeDataO} count={count} changeCount={changeCount} verifyTurnX={verifyTurnX} result={result} board={board} changeBoard={changeBoard}/>
    <button className='buttonBoard' onClick={reset}>Reset</button>
  </>
}

export default App
