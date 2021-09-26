import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './Components/Routing';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>,
  document.getElementById('root')
);
