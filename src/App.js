
import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import {buildQuery, createPostInfo, arweave} from './lib/api'
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';


const mine = () => arweave.api.get('mine');




function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

 

  return (
    <div id="main">
        <nav>
          <Layout 
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          />
          </nav>

        <Routes>
            <Route path="/Home" element={<Home/>} />
            <Route path="/Tutorial" element={<Tutorial />} />
        </Routes>

    </div>
  );
}

export default App;
