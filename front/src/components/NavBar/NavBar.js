import React, { useState } from 'react';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { DeleteAlt } from 'baseui/icon';
import { Redirect, useHistory } from 'react-router-dom';

import './NavBar.css';
import isUserConnected from '../../utils/isConnected';

const NavBar = () => {
  const history = useHistory();
  const [mainItems, setMainItems] = useState([
    { label: 'Rooms', link: '/' },
    { label: 'About us', link: '/about' },
  ]);

  const handleUserItem = (selectedItem) => {
    console.log(selectedItem);
    if (selectedItem.label === 'Disconnect') {
      localStorage.clear();
      history.push('/');
    }
  };

  const handleMainBarItem = (selectedItem) => {
    console.log(selectedItem);
  };

  const userInfos = localStorage.getItem('username');

  return (
    <>
      {isUserConnected()}
      <AppNavBar
        title={
          <p
            className="navBarTitle"
            onClick={() => {
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
        username={userInfos && userInfos.length && userInfos}
        userItems={userInfos ? [{ icon: DeleteAlt, label: 'Disconnect' }] : []}
        onUserItemSelect={(item) => handleUserItem(item)}
      />
    </>
  );
};

export default NavBar;
