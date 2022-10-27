import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './Fonts/HalyardTextBook.otf';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootId
    );
  });
}
