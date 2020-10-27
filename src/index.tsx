import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
import { gameStore, StoreProvider } from './store';

ReactDOM.render(
  <StoreProvider value={gameStore}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root'),
);
