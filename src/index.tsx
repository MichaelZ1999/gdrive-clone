import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { BrowserRouter } from 'react-router-dom';
import '../src/index.css';
const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  root
);