import { useState } from "react";

export default function Player({initialName, symbol, isActive}){
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
  }

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };
  const editablePlayerName = <span className="player-name">{playerName}</span>;
  
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player"> 
        {isEditing ? 
          <input type="text" required value={playerName} onChange={handleChange}/>: editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
    </li>
  )
}