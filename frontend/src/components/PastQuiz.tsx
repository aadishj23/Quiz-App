// import React from 'react'
import { pastdata } from "../store/atoms/pastdata"
import { datastore } from "../store/atoms/datastore"
import { submit } from "../store/atoms/submit"
import { useRecoilState ,useSetRecoilState} from "recoil"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PastQuiz() {

  const setSubmitState = useSetRecoilState(submit)
  const setDataStore = useSetRecoilState(datastore)
  const [pastData, setPastData] = useRecoilState(pastdata)
  const navigate = useNavigate()

  const deleteQuiz = async(id: number) => {
    try {
      await axios({
        url: "https://quiz-app-d0dc.onrender.com/deletedata",
        method: "DELETE",
        data: JSON.stringify({
          quizid: id
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
        }
      });
      const response = await axios({
        url: "https://quiz-app-d0dc.onrender.com/pastdata",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
      });
      sessionStorage.setItem('pastdata', JSON.stringify(response.data));
      setPastData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const pastQuiz = pastData.map((item: any, index: number) => {
    return (
      <div key={item.id} className="p-6 bg-white rounded-lg shadow-lg mb-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-gray-800">
            Quiz {index + 1}
          </p>
          <p className="text-sm text-gray-500">
            Taken on: {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-gray-700 text-sm mb-4">
          Category: <span className="font-medium">{item.category === " " ? 'Not Selected' : item.category }</span>
        </p>
        <p className="text-gray-700 text-sm mb-4">
          Difficulty: <span className="font-medium">{item.difficulty === " " ?  'Not Selected':item.difficulty}</span>
        </p>
        <p className="text-gray-700 text-sm mb-4">
          Number of Questions: <span className="font-medium">{item.questioncount}</span>
        </p>
        <p className="text-gray-700 text-sm mb-4">
          Score: <span className={`font-bold ${item.score >= (item.questioncount/2) ? 'text-green-600' : 'text-red-600'}`}>{item.score}</span>
        </p>
        <div className="flex justify-between items-center">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200 ease-in-out"
            onClick={() => deleteQuiz(item.id)}
          >
            Delete
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200 ease-in-out"
            onClick={() => {
              setSubmitState(false)
              setDataStore(item.data)
              sessionStorage.setItem('quizid', JSON.stringify(item.id))
              navigate('/question')
            }}
          >
            Reattempt
          </button>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200 ease-in-out"
            onClick={() => {
              setSubmitState(true)
              setDataStore(item.modifieddata)
              navigate('/question')
            }}
          >
            View Result
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Past Quizzes
      </h1>
      {pastQuiz.length > 0 ? (
        <div className="grid gap-6">
          {pastQuiz}
        </div>
      ) : (
        <p className="text-center text-gray-500">No past quizzes available.</p>
      )}
      <div className="flex justify-center mt-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 ease-in-out"
          onClick={() => {
            navigate('/')
            sessionStorage.removeItem('pastdata')
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default PastQuiz