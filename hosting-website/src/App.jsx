import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNewProject from './pages/AddNew';
import StartingPage from './pages/StartingPage';
import Callback from './components/callback';

function App() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')
    console.log("This is code param: ", code);
  }, [])

  return (
    <Router>
      <main className='max-w-5xl mx-auto'>
        <Navbar />
        <Routes>
          <Route path='/' element={<StartingPage />} />
          <Route path='/dashboard' element={<HomePage />} />
          <Route path='/addNew' element={<AddNewProject />} />
          <Route path='/callback' element={<Callback />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
