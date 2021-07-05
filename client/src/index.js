import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StudentContextProvider from './studentContext'
ReactDOM.render(
  <React.StrictMode>
    <StudentContextProvider>
      <App />
    </StudentContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
