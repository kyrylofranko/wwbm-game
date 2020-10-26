import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Game } from './pages/Game';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/questions" component={Game} />
    </Switch>
  );
}

export default App;
