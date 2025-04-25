import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MatchingGame from './components/MatchingGame'
import UnderlineComponent from './components/UnderlineComponent'
import FillInTheBlankComponent from './components/FillInTheBlankComponent'
import QuizComponent from './components/QuizComponent'
import IntroInterests from './components/IntroInterests'
import LearningPreferences from './components/LearningPreferences'
import TestingPage from './components/TestingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<IntroInterests/>} />
        <Route path="/learning-preferences" element={<LearningPreferences/>} />
        <Route path="/testing-page" element={<TestingPage/>} />
        <Route path="/quiz-component" element={<QuizComponent/>} />
      </Routes>
    </Router>
      {/* <div className = "flex w-screen h-screen justify-center items-center"> */}
        {/* <h1 className = "text-2xl font-semibold">Welcome to the Adaptive Learning Platform</h1> */}
        {/* <MatchingGame/> */}

        {/* <UnderlineComponent/> */}
        {/* <FillInTheBlankComponent/> */}
      {/* </div> */}
      {/* <QuizComponent/> */}
      {/* <IntroInterests/> */}
      {/* <LearningPreferences/> */}
      {/* <TestingPage/> */}
    </>
  )
}

export default App
