import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  let [user, setUser] = useState();
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <div className='App'>
        <button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
          Open Facebook
        </button>
        <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
          Open Google
        </button>
        <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
