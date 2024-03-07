import { useState } from "react";

export default function Player({ playerName, symbol, isActive }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editPlayerName, setEditPlayerName] = useState(playerName);

  function handleEdit() {
    setIsEdit((edit) => !edit);
  }

  function handleEditPlayerName(e) {
    setEditPlayerName(e.target.value);
  }

  let playerField = <span className="player-name">{editPlayerName}</span>;

  if (isEdit) {
    playerField = (
      <input
        type="text"
        required
        value={editPlayerName}
        onChange={handleEditPlayerName}
      />
    );
  }
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}
