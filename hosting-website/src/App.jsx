import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNewProject from './pages/AddNewProject';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <main className='max-w-5xl mx-auto'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/addNew' element={<AddNewProject />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
