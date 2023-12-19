


export default function GameBoard({onSelectSquare, board}){

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setGameBoard((prevGameBoard) => {
  //     // copy를 저장하는데 nested array이므로 array안의 array들에 대해서도 copy를 하기 위해 
  //     // [...innerArray]를 해주고 있는것

  //     const updatedBoard = [...prevGameBoard.map((innerArray) => (
  //       [...innerArray]
  //     ))];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }

  return(
    <ol id="game-board">
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => (
              <li key={colIdx}>
                <button onClick={()=>onSelectSquare(rowIdx, colIdx)}
                        disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}