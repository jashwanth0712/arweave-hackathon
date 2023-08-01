import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='max-w-5xl mx-auto'>
      <Navbar />
      <HomePage />
    </main>
  )
}

export default App
