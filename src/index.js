import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './Components/Routing';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppointmentReducer from './Components/Redux/appointmentReducer';

const appStore = createStore(AppointmentReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={appStore}>
      <Routing />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
