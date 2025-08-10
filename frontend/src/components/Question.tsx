import React from 'react'
import { useRecoilState,useSetRecoilState} from "recoil"
import { datastore } from "../store/atoms/datastore"
import QuestionMap from "./QuestionMap"
import { submit } from '../store/atoms/submit'
import { useNavigate } from 'react-router-dom'
import { PopUpAtom } from '../store/atoms/popup'
import PopUp from './PopUp'
import axios from 'axios'

function Question() {
    const [dataStore, setDataStore] = useRecoilState(datastore)
    const [submitState, setSubmitState] = useRecoilState(submit)
    const setPopup = useSetRecoilState(PopUpAtom)

    const navigate = useNavigate();

    // Helper function to safely parse JSON from localStorage
    const safeJsonParse = (key: string, defaultValue: string = '') => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    };

    React.useEffect(() => {
      sessionStorage.setItem('submit', JSON.stringify(submitState));
    }, [submitState]);

    const calculateScore = () => {
      let score = 0;
      dataStore.forEach(question => {
        if (question.is_correct) {
          score++;
        }
      });
      return score;
    };

    const countIsCorrect = () => {
      const updatedDataStore = dataStore.map(question => {
        const correctAnswer = question.correct_answers[`${question.selected_answer}_correct`];
        return {
          ...question,
          is_correct: correctAnswer === "true" ? true : false,
        };
      });
      setDataStore(updatedDataStore);
    }

    const handleSubmit = () => {
      const unansweredQuestions = dataStore.filter(question => question.selected_answer === null);
      if (unansweredQuestions.length === 0) {
        setSubmitState(true);
        countIsCorrect();
      } else {
        setPopup(true);
      }
    }

    React.useEffect(() => {
      if (submitState) {
        const score = calculateScore();
        (async () => {
          await axios({
            url: `${import.meta.env.VITE_BACKEND_URL}/updatedata`,
            method: "PUT",
            data: JSON.stringify({
              quizid: sessionStorage.getItem('quizid'),
              modifiedData: dataStore,
              score: score,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${safeJsonParse('token')}`,
            },
          });
        })();
      }
    }, [dataStore, submitState]);
    
    const handleHome = () => {
      setSubmitState(false);
      navigate('/');
      sessionStorage.removeItem('dataStore');
      sessionStorage.removeItem('submit');
      sessionStorage.removeItem('quizid');
      setDataStore([]);
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Quiz Time!
                </h1>
                <p className="text-gray-600 text-lg">
                    {submitState ? 'Quiz completed! Here are your results.' : 'Answer all questions to complete the quiz.'}
                </p>
            </div>

            {/* Questions */}
            <div className="mb-8">
                <QuestionMap />
            </div>

            {/* Action Buttons */}
            { submitState === false ? (
                <div className="text-center">
                    <button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 font-bold text-lg"
                        onClick={handleSubmit}
                    >
                        🚀 Submit Quiz
                    </button>
                </div>
            ) : (
                <div className="text-center space-y-6">
                    {/* Score Display */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md mx-auto">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                            <p className="text-gray-600 mb-4">Your total score is</p>
                            <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {calculateScore()}
                            </div>
                            <p className="text-gray-500 text-sm mt-2">
                                out of {dataStore.length} questions
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 font-bold text-lg"
                            onClick={handleHome}
                        >
                            🏠 Back to Home
                        </button>
                        <button 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 font-bold text-lg"
                            onClick={() => navigate('/pastquizes')}
                        >
                            📚 View Past Quizzes
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        <PopUp />
    </div>
  )
}

export default Question