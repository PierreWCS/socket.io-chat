import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const USER_LEFT_ROOM = 'userLeftTheRoom';
const USER_ENTERED = 'userEnteredTheRoom';

const SOCKET_SERVER_URL = 'http://localhost:4000';

const useChat = (roomId, username) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, username },
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    socketRef.current.on(USER_ENTERED, (roomInfo) => {
      setUsers(roomInfo.connectedClients);
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(USER_LEFT_ROOM, (userID) => {
      setUsers((users) => users.filter((user) => user.id !== userID));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody, username) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      username: username,
    });
  };

  return { messages, sendMessage, users };
};

export default useChat;
