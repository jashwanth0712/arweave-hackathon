import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LicensePage from './pages/LicensePage'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNewProject from './pages/AddNew';
import StartingPage from './pages/StartingPage';
import Callback from './components/Callback';
import Details from './pages/details/details'
import ProtectedRoute from './utils/ProtectedRoutes'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import DeployForm from './pages/deployform/deployform'
import Success from './pages/Success'

function App() {

  return (
    <Router>
      <main className='max-w-5xl mx-auto'>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
          </Route>
          <Route path='/' element={<StartingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<HomePage />} />
          <Route path='/addNew' element={<AddNewProject />} />
          <Route path='/import' element={<DeployForm />} />
          <Route path='/success' element={<Success />} />
          <Route path='/callback' element={<Callback />} />
          <Route path='/license' element={<LicensePage />} />
          <Route path='/details' element={<Details />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
