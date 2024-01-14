import React from "react";
import './Board.css'

const Board = ({dataX, changeDataX, dataO, changeDataO, count, changeCount, verifyTurnX, result, board, changeBoard}) => {
    // CLICK FUNCTION TO SAVE THE CURRENT PLAYER'S MOVE AND PREPARE THE GAME FOR THE NEXT PLAYER TO SCORE
    const handleClick = (index, event) => {
        if(result.length > 0 || dataX.includes(index) || dataO.includes(index)){
            event.preventDefault()
        }else{
            if(verifyTurnX(count)){
                changeDataX([...dataX, index]) 
                const updatedBoard = [...board]
                updatedBoard[index] = 'X'
                changeBoard(updatedBoard)
            }else{
                changeDataO([...dataO, index])
                const updatedBoard = [...board]
                updatedBoard[index] = 'O'
                changeBoard(updatedBoard)
            }
            changeCount(count+1)
        }
        console.log(board)
    }

    return <div className="containerBoard">
        {board.map((positionBoard, index) => {
            return <div key={index} onClick={(event) => handleClick(index, event)} className="positionBoard">{positionBoard}</div>
        })}
    </div>
}

export default Board