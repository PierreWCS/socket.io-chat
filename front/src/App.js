import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import './index.css';
import Home from './components/Home/Home';
import ChatRoom from './components/ChatRoom/ChatRoom';
import ConnectPage from './components/Connect/ConnectPage';
import NavBar from './components/NavBar/NavBar';

const engine = new Styletron();

function App() {
  const localData = localStorage.getItem('username');
  const [username, setUsername] = useState(localData || '');

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Router>
          <NavBar username={username} setUsername={setUsername} />
          <Route exact path="/" component={() => <Home username={username} />} />
          <Route path="/connect" component={() => <ConnectPage username={username} setUsername={setUsername} />} />
          <Route path="/room/:roomId" component={ChatRoom} />
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
