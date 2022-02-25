import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

const myAPI = "api756e8aa1";
const path = '/data';

const getData = async () => {
  const res = await API.get(myAPI, path);
  console.log(res);
}

function App() {
  return (
    <div className="App">
        <p>
          Hey there!
        </p>
        <button onClick={getData}> Get stuff </button>
    </div>
  );
}

export default App;
