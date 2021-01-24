import React, { useState } from 'react';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { DeleteAlt } from 'baseui/icon';
import { useHistory } from 'react-router-dom';

import './NavBar.css';
import isUserConnected from '../../utils/isConnected';

const NavBar = ({ username, setUsername }) => {
  const history = useHistory();
  const [mainItems, setMainItems] = useState([
    { label: 'Rooms', link: '/' },
    { label: 'About us', link: '/about' },
  ]);

  const handleUserItem = (selectedItem) => {
    console.log(selectedItem);
    if (selectedItem.label === 'Disconnect') {
      localStorage.clear();
      setUsername('');
      history.push('/connect');
    }
  };

  const handleMainBarItem = (selectedItem) => {
    console.log(selectedItem);
  };

  return (
    <AppNavBar
      title={
        <p
          className="navBarTitle"
          onClick={() => {
            console.log('back to main');
            history.push('/');
          }}
        >
          Chat app
        </p>
      }
      mainItems={mainItems}
      onMainItemSelect={(item) => {
        history.push(item.link);
        setMainItems((prev) => setItemActive(prev, item));
        handleMainBarItem(item);
      }}
      username={username && username.length && username}
      userItems={username ? [{ icon: DeleteAlt, label: 'Disconnect' }] : []}
      onUserItemSelect={(item) => handleUserItem(item)}
    />
  );
};

export default NavBar;
