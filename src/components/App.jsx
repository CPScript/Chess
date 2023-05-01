import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// import { Database } from '@replit/database'

import { SocketProvider } from '../contexts/SocketContext'
import { UserProvider } from '../contexts/UserContext'
import { GamesProvider } from '../contexts/GamesContext'


import GamePage from './GamePage'
import Menu from './Menu'
import Login from './Login'

function App() {
  return (
    <main className='main'>
        <UserProvider>
          <SocketProvider>
            <Router>
              <Routes>
                <Route exact path='/' element={<Menu />} />
                <Route path='/game/:gameId' element={<GamesProvider><GamePage /></GamesProvider>} />
                <Route path='*' element={<Menu />} />
              </Routes>
            </Router>
          </SocketProvider>
        </UserProvider>
    </main>
  );
}

export default App;