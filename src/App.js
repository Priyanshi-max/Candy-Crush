import React, { useState, useEffect } from "react"
import ScoreBoard from "./components/scoreBoard"

import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'



const width = 8
const candyColors = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy,
]
const initialGameState = {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
};
const App = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 1)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }


  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if ((currentColorArrangement[i + width]) === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }

  const dragStart = (e) => {
    //console.log("Drag Start")
    setSquareBeingDragged(e.target)

  }

  const dragDrop = (e) => {
    //console.log("Drag Drop")
    setSquareBeingReplaced(e.target)

  }

  const dragEnd = (e) => {
    //console.log("Drag End")
    const squareBeingDraggedID = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedID = parseInt(squareBeingReplaced.getAttribute('data-id'))

    //console.log('SquareBeingDraggedID',squareBeingDraggedID)
    //console.log('SquareBeingReplacedID',squareBeingReplacedID)


    currentColorArrangement[squareBeingReplacedID] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedID] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedID - 1,
      squareBeingDraggedID - width,
      squareBeingDraggedID + 1,
      squareBeingDraggedID + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedID)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedID && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangement[squareBeingReplacedID] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingDraggedID] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  const createBoard = () => {
    const randomColorManagement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorManagement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorManagement)
  }
  const resetGame = () => {
    const newGamesPlayed = gameState.gamesPlayed + 1;
    let newGamesWon = gameState.gamesWon;
    let newGamesLost = gameState.gamesLost;
  
    if (scoreDisplay > 0) {
      newGamesWon += 1;
    } else {
      newGamesLost += 1;
    }
  
    setGameState({
      gamesPlayed: newGamesPlayed,
      gamesWon: newGamesWon,
      gamesLost: newGamesLost,
    });
  
    createBoard();
    setScoreDisplay(0);
    setSquareBeingDragged(null);
    setSquareBeingReplaced(null);
  };
  
  
  useEffect(() => {
    createBoard()

  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])


  //console.log(currentColorArrangement)
  return (
    <div className="app">
      <div className='game'>
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <div style={{ marginLeft: '130px' }}>
        <ScoreBoard score={scoreDisplay} />
        <div>
          <button onClick={resetGame}>New Game</button>
        </div>
        <div>
          <p>Games Played: {gameState.gamesPlayed}</p>
          <p>Games Won: {gameState.gamesWon}</p>
          <p>Games Lost: {gameState.gamesLost}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
