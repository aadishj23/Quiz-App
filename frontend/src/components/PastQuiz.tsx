// import React from 'react'
import { pastdata } from "../store/atoms/pastdata"
import { datastore } from "../store/atoms/datastore"
import { submit } from "../store/atoms/submit"
import { useState,useEffect } from "react"
import { useRecoilState ,useSetRecoilState} from "recoil"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PastQuiz() {

  const setSubmitState = useSetRecoilState(submit)
  const setDataStore = useSetRecoilState(datastore)
  const [pastData, setPastData] = useRecoilState(pastdata)
  const [pastLoading, setPastLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});  
  const navigate = useNavigate()

  // Helper function to safely parse JSON from localStorage
  const safeJsonParse = (key: string, defaultValue: string = '') => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const handlePastData = async () => {
    try {
      setPastLoading(true)
      setMessage('Data is loading...')
      const response = await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/pastdata`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${safeJsonParse('token')}`
        },
      });
      sessionStorage.setItem('pastdata', JSON.stringify(response.data));
      setPastData(response.data);
    } catch (err) {
      setMessage('Failed to fetch past data. Please try again.');
    } finally {
      setPastLoading(false)
    }
  }

  useEffect(() => {
    handlePastData()
  }, [])

  const deleteQuiz = async(id: number) => {
    try {
      setLoadingStates(prevState => ({
        ...prevState,
        [id]: true
      }));
      await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/deletedata`,
        method: "DELETE",
        data: JSON.stringify({
          quizid: id
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${safeJsonParse('token')}`
        }
      });
      const response = await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/pastdata`,
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${safeJsonParse('token')}`
          },
      });
      sessionStorage.setItem('pastdata', JSON.stringify(response.data));
      setPastData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates(prevState => ({
        ...prevState,
        [id]: false
      }));
    }
  }

  const pastQuiz = pastData.map((item: any, index: number) => {
    const isLoading = loadingStates[item.id] || false;
    const scorePercentage = (item.score / item.questioncount) * 100;
    const isGoodScore = scorePercentage >= 70;
    const isAverageScore = scorePercentage >= 50 && scorePercentage < 70;

    return (
      <div key={item.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
        {/* Quiz Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-white font-bold text-xl">{index + 1}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                Quiz {index + 1}
              </h3>
              <p className="text-gray-500 text-sm">
                Taken on {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          {/* Score Badge */}
          <div className={`px-4 py-2 rounded-full text-white font-bold text-lg ${
            isGoodScore 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : isAverageScore 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                : 'bg-gradient-to-r from-red-500 to-pink-600'
          }`}>
            {item.score}/{item.questioncount}
          </div>
        </div>

        {/* Quiz Details */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Category</span>
            </div>
            <p className="text-gray-800 font-medium">
              {item.category === " " ? 'Any Category' : item.category}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Difficulty</span>
            </div>
            <p className="text-gray-800 font-medium">
              {item.difficulty === " " ? 'Any Difficulty' : item.difficulty}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Questions</span>
            </div>
            <p className="text-gray-800 font-medium">{item.questioncount}</p>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Performance</span>
            <span className={`text-sm font-bold ${
              isGoodScore ? 'text-green-600' : isAverageScore ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {scorePercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                isGoodScore 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : isAverageScore 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                    : 'bg-gradient-to-r from-red-500 to-pink-600'
              }`}
              style={{ width: `${Math.min(scorePercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button 
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            onClick={() => deleteQuiz(item.id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16a4 4 0 010-8V4a8 8 0 100 16v-4z"></path>
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </>
            )}
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              onClick={() => {
                setSubmitState(false)
                setDataStore(item.data)
                sessionStorage.setItem('quizid', JSON.stringify(item.id))
                navigate('/question')
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reattempt</span>
            </button>

            <button 
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              onClick={() => {
                setSubmitState(true)
                setDataStore(item.modifieddata)
                navigate('/question')
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Result</span>
            </button>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Past Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your quiz history, track your progress, and see how you've improved over time
          </p>
        </div>

        {/* Quiz List */}
        {pastQuiz.length > 0 ? (
          <div className="grid gap-8">
            {pastQuiz}
          </div>
        ) : (
          <div className="text-center py-16">
            {pastLoading ? (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                  <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16a4 4 0 010-8V4a8 8 0 100 16v-4z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">{message}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No past quizzes available yet.</p>
                <p className="text-gray-400">Complete your first quiz to see it here!</p>
              </div>
            )}
          </div>
        )}

        {/* Back to Home Button */}
        <div className="flex justify-center mt-12">
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
            onClick={() => {
              navigate('/')
              sessionStorage.removeItem('pastdata')
            }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Back to Home</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PastQuiz