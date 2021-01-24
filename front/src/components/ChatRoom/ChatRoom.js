import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './ChatRoom.css';
import useChat from '../../useChat';
import UserList from './UserList';
import { Display3 } from 'baseui/typography';
import ChatContainer from './ChatContainer';

const ChatRoom = (props) => {
  const [newMessage, setNewMessage] = useState('');

  const username = localStorage.getItem('username');
  const { roomId } = props.match.params;
  const { messages, sendMessage, users } = useChat(roomId, username);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.length > 0) {
      sendMessage(newMessage, username);
      setNewMessage('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        height: '80vh',
        boxSizing: 'border-box',
        alignItems: 'center',
      }}
    >
      {!username && <Redirect to="/connect" />}
      <Display3 style={{ padding: '1rem 0', margin: 0 }}>Room: {roomId}</Display3>

      <div style={{ display: 'flex', height: '70%', width: '80%' }}>
        <ChatContainer
          handleNewMessageChange={handleNewMessageChange}
          handleSendMessage={handleSendMessage}
          messages={messages}
          newMessage={newMessage}
        />
        <UserList username={username} users={users} />
      </div>
    </div>
  );
};

export default ChatRoom;
