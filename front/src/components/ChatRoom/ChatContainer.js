import React, { useEffect, useRef } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const ChatContainer = ({ messages, handleSendMessage, newMessage, handleNewMessageChange }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          flex: 1,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <ol style={{ listStyleType: 'none', padding: 0 }}>
          {messages.map((message, i) => (
            <div ref={scrollRef} key={i}>
              <div className={`messageInfos ${message.ownedByCurrentUser ? 'myMessageInfos' : 'receivedMessageInfos'}`}>
                <p className={`messageUsername ${message.ownedByCurrentUser ? 'myUsername' : 'receivedUsername'}`}>{message.username}</p>
                <p className={`message-time ${message.ownedByCurrentUser ? 'my-message-time' : 'received-message-time'}`}>{message.time}</p>
              </div>
              <li className={`message-item ${message.ownedByCurrentUser ? 'my-message' : 'received-message'}`}>{message.body}</li>
            </div>
          ))}
        </ol>
      </div>
      <form
        style={{ paddingTop: '.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
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

export default ChatContainer;
