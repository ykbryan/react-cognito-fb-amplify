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

        <div className='App'>
          <button
            onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
          >
            Open Facebook
          </button>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </div>
      </header>
    </div>
  );
}

export default App;
