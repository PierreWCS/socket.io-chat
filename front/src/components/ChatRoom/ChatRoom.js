import React, { useState } from 'react';

import './ChatRoom.css';
import useChat from '../../useChat';
import { useHistory } from 'react-router-dom';

import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import ArrowLeft from 'baseui/icon/arrow-left';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ChatRoom = (props) => {
  const username = localStorage.getItem('username');
  const { roomId } = props.match.params;
  const { messages, sendMessage, users } = useChat(roomId, username);
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, username);
    setNewMessage('');
  };

  return (
    <div className="chat-room-container">
      <div style={{ width: '15rem' }}>
        <Button
          startEnhancer={() => <ArrowLeft size={24} />}
          onClick={() => {
            history.push('/');
          }}
        >
          Back to home
        </Button>
      </div>
      <h1 className="room-name">Room: {roomId}</h1>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '80%', height: '75vh' }}>
          <div className="messages-container">
            <ol className="messages-list">
              {messages.map((message, i) => (
                <div key={i}>
                  <div
                    className={`messageInfos ${message.ownedByCurrentUser ? 'myMessageInfos' : 'receivedMessageInfos'}`}
                  >
                    <p className={`messageUsername ${message.ownedByCurrentUser ? 'myUsername' : 'receivedUsername'}`}>
                      {message.username}
                    </p>
                    <p
                      className={`message-time ${
                        message.ownedByCurrentUser ? 'my-message-time' : 'received-message-time'
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                  <li className={`message-item ${message.ownedByCurrentUser ? 'my-message' : 'received-message'}`}>
                    {message.body}
                  </li>
                </div>
              ))}
            </ol>
          </div>
          <form
            style={{ paddingTop: '1rem' }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Input value={newMessage} onChange={handleNewMessageChange} placeholder="Write message..." />
            <Button type="submit">Send</Button>
          </form>
        </div>
        <div style={{ width: '20%', backgroundColor: '#dddd', padding: '1rem', boxSizing: 'border-box' }}>
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
      </div>
    </div>
  );
};

export default ChatRoom;
