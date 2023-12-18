import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react"


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  const handleSelectSquare = (rowIndex, colIndex) => {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        currentPlayer = 'O';
      }

      const updatedTurns = [{square: {row:rowIndex, col:colIndex}, player:currentPlayer},...prevTurns]

      return updatedTurns;
    });

  
  }
  // handleSelectSquare의 정보가 gameboard를 update해야 하니까, 
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
