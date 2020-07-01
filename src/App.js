import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Hub.listen('auth', (data) => {
      console.log(data);
      const { payload } = data;
      switch (payload.event) {
        case 'signIn':
          checkUser();
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
      .then((data) => {
        setUser(data.user);
        console.log({ data });
      })
      .catch((err) => console.log(err));
  }

  const submitRegistration = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {renderUsername()}

        <div className='App'>
          <p>
            <button
              onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
            >
              Open Facebook
            </button>
            <button onClick={() => Auth.signOut()}>Sign Out</button>
            <button onClick={checkUser}>Check User</button>
          </p>
          <h2>Work in progress: forms</h2>
          <div>
            <form id='registerForm' onSubmit={submitRegistration}>
              <input
                type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type='submit' value='sign up' />
            </form>
          </div>
          <div>
            <form id='loginForm' onSubmit={submitLogin}>
              <input
                type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type='submit' value='sign in' />
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
