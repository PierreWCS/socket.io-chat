import React from 'react';

import './ChatRoom.css';
import useChat from '../../useChat';
import { useHistory } from 'react-router-dom';

import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import ArrowLeft from 'baseui/icon/arrow-left';

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState('');
  const history = useHistory();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
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
      <div className="messages-container">
        <ol className="messages-list">
          {console.log('messages', messages)}
          {messages.map((message, i) => (
            <div key={i}>
              <span
                className={`message-time ${message.ownedByCurrentUser ? 'my-message-time' : 'received-message-time'}`}
              >
                {message.time}
              </span>
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
  );
};

export default ChatRoom;
