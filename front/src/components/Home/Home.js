import { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Display2 } from 'baseui/typography';

import './Home.css';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
  const history = useHistory();

  const isUserConnected = () => {
    let stockUsername = localStorage.getItem('username');
    if (!stockUsername) {
      setIsNotLoggedIn(true);
    } else {
      setIsNotLoggedIn(false);
    }
  };

  useEffect(() => {
    isUserConnected();
  }, []);

  const handleOnClick = () => {
    history.push('/' + roomName);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="home-container">
      {isNotLoggedIn && <Redirect to="/connect" />}

      <Display2 marginBottom="scale1000">Create a chat room or join one !</Display2>

      <div className="inputContainerHome">
        <div style={{ width: '70%' }}>
          <Input type="text" placeholder="Room name .." value={roomName} onChange={handleRoomNameChange} />
        </div>
        <Button
          onClick={() => {
            handleOnClick();
          }}
          type="submit"
        >
          Join room
        </Button>
      </div>
    </form>
  );
};

export default Home;
