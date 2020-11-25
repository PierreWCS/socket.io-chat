import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  const handleOnClick = () => {
    history.push('/' + roomName);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="home-container">
      <h1>Create a chat room or join one !</h1>
      <input
        type="text"
        placeholder="Room name .."
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <button
        onClick={() => {
          handleOnClick();
        }}
        type="submit"
        className="enter-room-button"
      >
        Join room
      </button>
    </form>
  );
};

export default Home;
