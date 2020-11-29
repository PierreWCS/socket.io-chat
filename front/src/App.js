import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import './index.css';
import Home from './Home/Home';
import ChatRoom from './ChatRoom/ChatRoom';
const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:roomId" component={ChatRoom} />
          </Switch>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
