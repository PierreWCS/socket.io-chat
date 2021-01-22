import { Redirect } from 'react-router-dom';

const username = localStorage.getItem('username');

export default function isUserConnected() {
  console.log('username', username);
  if (!username) {
    return <Redirect to="/connect" />;
  } else return true;
}
