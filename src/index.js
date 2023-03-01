import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss'
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotifications />
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
