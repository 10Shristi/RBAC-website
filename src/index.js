// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router } from 'react-router-dom';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById("root")
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path is correct
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root'); // Ensure the 'root' div exists in public/index.html
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

