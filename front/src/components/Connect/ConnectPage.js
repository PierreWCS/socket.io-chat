import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import { Display1, Display2 } from 'baseui/typography';
import { useHistory, Redirect } from 'react-router-dom';

const ConnectPage = ({ username, setUsername }) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState('');

  const handleUsernameSubmit = () => {
    console.log('guess whos there');
    if (!user) {
      setIsError(true);
    } else {
      localStorage.setItem('username', user);
      setUsername(user);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {username && <Redirect to="/" />}
      <Display1 marginBottom="scale1000">Welcome !</Display1>
      <Display2 marginBottom="scale1000">Please select a username</Display2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUsernameSubmit();
        }}
        style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {isError && !user.length && (
            <label style={{ position: 'absolute', color: 'red', paddingBottom: '5.5rem' }} for="username">
              Please select a username
            </label>
          )}
          <Input
            overrides={{
              Input: {
                style: () => ({
                  paddingRight: '14px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  paddingLeft: '14px',
                }),
              },
            }}
            id="username"
            error={isError && !user.length}
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <Button size={SIZE.large} type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConnectPage;
