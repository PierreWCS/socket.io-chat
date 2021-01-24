import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ users, username }) => (
  <div style={{ width: '15%', backgroundColor: '#dddd', padding: '1rem', boxSizing: 'border-box' }}>
    <h4>Users in the room</h4>
    <div>
      {users.length &&
        users.map((user) => (
          <div key={user.id} style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUserCircle} />
            <p style={{ paddingLeft: '1rem' }}>
              {user.username}
              {user.username === username && ' (You)'}
            </p>
          </div>
        ))}
    </div>
  </div>
);

export default UserList;
