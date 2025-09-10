import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MatchingGame from '../components/MatchingGame';
import UnderlineComponent from '../components/UnderlineComponent';
import FillInTheBlankComponent from '../components/FillInTheBlankComponent';
import QuizComponent from '../components/QuizComponent';
import IntroInterests from '../components/IntroInterests';
import LearningPreferences from '../components/LearningPreferences';
import TestingPage from '../components/TestingPage';
import JapaneseFlashcardManager from '../components/JapaneseFlashcardManager';

const NavigationPage = () => {
    return (
            <div style={{ padding: '20px' }}>
                <h1 className = "text-3xl font-bold my-4">Debug Navigation Page</h1>
                <hr></hr>
                <ul>
                    <li><Link to="/matching-game">Matching Game</Link></li>
                    <li><Link to="/underline">Underline Component</Link></li>
                    <li><Link to="/fill-in-the-blank">Fill In The Blank</Link></li>
                    <li><Link to="/quiz">Quiz Component</Link></li>
                    <li><Link to="/intro-interests">Intro Interests</Link></li>
                    <li><Link to="/learning-preferences">Learning Preferences</Link></li>
                    <li><Link to="/testing-page">Testing Page</Link></li>
                    <li><Link to="/japanese-flashcards">Japanese Flashcards</Link></li>
                </ul>

                {/* <Routes>
                    <Route path="/matching-game" element={<MatchingGame />} />
                    <Route path="/underline" element={<UnderlineComponent />} />
                    <Route path="/fill-in-the-blank" element={<FillInTheBlankComponent />} />
                    <Route path="/quiz" element={<QuizComponent />} />
                    <Route path="/intro-interests" element={<IntroInterests />} />
                    <Route path="/learning-preferences" element={<LearningPreferences />} />
                    <Route path="/testing-page" element={<TestingPage />} />
                    <Route path="/japanese-flashcards" element={<JapaneseFlashcardManager />} />
                </Routes> */}
            </div>
    );
};

export default NavigationPage;
