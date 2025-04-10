import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MatchingGame from './components/MatchingGame'
import UnderlineComponent from './components/UnderlineComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className = "flex w-screen h-screen justify-center items-center"> */}
        {/* <h1 className = "text-2xl font-semibold">Welcome to the Adaptive Learning Platform</h1> */}
        {/* <MatchingGame/> */}

        <UnderlineComponent/>
      {/* </div> */}
    </>
  )
}

export default App
