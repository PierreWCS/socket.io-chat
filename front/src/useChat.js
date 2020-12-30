import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const USERS_IN_ROOM = 'usersInRoom';
const USER_LEFT_ROOM = 'userLeftTheRoom';
const USER_ENTERED = 'userEnteredTheRoom';
const USER_SENT_INFOS = 'userSentInfos';

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

    socketRef.current.on(USERS_IN_ROOM, (user) => {
      if (user.id === socketRef.current.id) {
        // If the current user is not already in the list, I add it
        setUsers((users) => (users.filter((e) => e.id === socketRef.current.id) ? users : [...users, user]));
      } else if (user.id !== socketRef.current.id) {
        // If the user is not already in the list, I add it
        setUsers((users) => {
          if (users.filter((e) => e.id === user.id)) {
            return users;
          } else {
            return [...users, user];
          }
        });
        // setUsers((users) => (users.filter((e) => e.id === user.id) ? users : [...users, user]));
      }
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

  const sendUserInfo = () => {
    socketRef.current.emit(USER_SENT_INFOS, {
      id: socketRef.current.id,
      username: username,
    });
  };

  return { messages, sendMessage, users };
};

export default useChat;
