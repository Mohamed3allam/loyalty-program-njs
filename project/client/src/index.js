import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Root from './Root';
import { AuthContextProvider } from './App/context/AuthContext';
import { ClientAuthContextProvider } from './App/context/ClientAuthContext';
import { UserAuthContextProvider } from './Dashboard/context/AuthContext';
import { OrderUserAuthContextProvider } from './OrderPanel/context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserAuthContextProvider>
    <OrderUserAuthContextProvider>
      <AuthContextProvider>
        <ClientAuthContextProvider>
          <React.StrictMode>
            <Root />
          </React.StrictMode>
        </ClientAuthContextProvider>
      </AuthContextProvider>
    </OrderUserAuthContextProvider>
  </UserAuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
