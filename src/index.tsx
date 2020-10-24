import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
import { store, StoreProvider } from './store/mobx';

ReactDOM.render(
  <StoreProvider value={store}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root'),
);
