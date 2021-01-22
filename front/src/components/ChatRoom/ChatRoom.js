import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button } from 'baseui/button';
import { Input } from 'baseui/input';

import './ChatRoom.css';
import useChat from '../../useChat';
import UserList from './UserList';
import isUserConnected from '../../utils/isConnected';

const ChatRoom = (props) => {
  const scrollRef = useRef(null);
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        height: '80vh',
        boxSizing: 'border-box',
      }}
    >
      {isUserConnected()}
      <h1 style={{ marginTop: 0 }}>Room: {roomId}</h1>

      <div style={{ display: 'flex', height: '70%' }}>
        <div style={{ width: '80%', height: '100%' }}>
          <div
            style={{
              flex: 1,
              height: '100%',
              overflow: 'auto',
              border: '1px solid black',
              boxSizing: 'border-box',
            }}
          >
            <ol
              style={{
                listStyleType: 'none',
                padding: 0,
              }}
            >
              {messages.map((message, i) => (
                <div ref={scrollRef} key={i}>
                  <div className={`messageInfos ${message.ownedByCurrentUser ? 'myMessageInfos' : 'receivedMessageInfos'}`}>
                    <p className={`messageUsername ${message.ownedByCurrentUser ? 'myUsername' : 'receivedUsername'}`}>
                      {message.username}
                    </p>
                    <p className={`message-time ${message.ownedByCurrentUser ? 'my-message-time' : 'received-message-time'}`}>
                      {message.time}
                    </p>
                  </div>
                  <li className={`message-item ${message.ownedByCurrentUser ? 'my-message' : 'received-message'}`}>{message.body}</li>
                </div>
              ))}
            </ol>
          </div>
          <form
            style={{ paddingTop: '.5rem' }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Input value={newMessage} onChange={handleNewMessageChange} placeholder="Write message..." />
            <Button type="submit">Send</Button>
          </form>
        </div>
        <UserList username={username} users={users} />
      </div>
    </div>
  );
};

export default ChatRoom;
