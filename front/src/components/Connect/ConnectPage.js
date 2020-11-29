import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import { Display1, Display2 } from 'baseui/typography';
import { Redirect } from 'react-router-dom';

const ConnectPage = () => {
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleUsernameSubmit = () => {
    if (!username) {
      setIsError(true);
    } else {
      localStorage.setItem('username', username);
      setIsUserLoggedIn(true);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {isUserLoggedIn && <Redirect to="/" />}
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
          {isError && !username.length && (
            <label style={{ position: 'absolute', color: 'red', paddingBottom: '5.5rem' }} for="username">
              Please select a username
            </label>
          )}
          <Input
            overrides={{
              Input: {
                style: () => ({
                  padding: '.9rem',
                }),
              },
            }}
            id="username"
            error={isError && !username.length}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
