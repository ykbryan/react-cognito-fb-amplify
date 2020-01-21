import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    Hub.listen('auth', data => {
      console.log(data);
      const { payload } = data;
      switch (payload.event) {
        case 'signIn':
          setUser(payload.data);
          break;

        default:
          setUser(null);
          break;
      }
    });
  }, []);

  function renderUsername() {
    if (user) return <h2>{user.username}</h2>;
  }

  function checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => console.log({ user }))
      .catch(err => console.log(err));
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {renderUsername()}

        <div className='App'>
          <button
            onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
          >
            Open Facebook
          </button>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
          <button onClick={checkUser}>Check User</button>
        </div>
      </header>
    </div>
  );
}

export default App;
