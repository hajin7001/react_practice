import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [players, setPlayers] = useState({
    'X' : 'Player 1',
    'O' : 'Player 2'
  });
  
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    console.log(firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol);
    // 이 3가지가 모두 동일한 player인지 확인
    if(firstSquareSymbol 
      && firstSquareSymbol === secondSquareSymbol 
      && firstSquareSymbol === thirdSquareSymbol){
        winner = firstSquareSymbol;
        console.log(winner);
      }
  }

  const hasDraw = gameTurns.length == 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row:rowIndex, col:colIndex}, player:currentPlayer},...prevTurns]

      return updatedTurns;
    });
  }
  // handleSelectSquare의 정보가 gameboard를 update해야 하니까, 

  function handleRestart(){
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
        </ol>
        {(winner || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}activePlayerSymbol={activePlayer}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
