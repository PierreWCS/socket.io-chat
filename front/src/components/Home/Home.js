import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Display2 } from 'baseui/typography';

const Home = ({ username }) => {
  const [roomName, setRoomName] = useState('');
  const history = useHistory();

  const handleOnClick = () => {
    history.push('/room/' + roomName);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      {username ? null : <Redirect to="/connect" />}
      <Display2 style={{ textAlign: 'center' }} marginBottom="scale1000">
        Create a chat room or join one !
      </Display2>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '70%' }}>
          <Input type="text" placeholder="Room name .." value={roomName} onChange={handleRoomNameChange} />
        </div>
        <Button
          onClick={() => {
            handleOnClick();
          }}
          type="submit"
        >
          Ok
        </Button>
      </div>
    </form>
  );
};

export default Home;
