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
        const token = localStorage.getItem('token');
        (async () => {
          await axios({
            url: "https://quiz-app-d0dc.onrender.com/updatedata",
            method: "PUT",
            data: JSON.stringify({
              quizid: sessionStorage.getItem('quizid'),
              modifiedData: dataStore,
              score: score,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(token ?? '')}`,
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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-8">
        <QuestionMap />
        { submitState === false ? 
          (<button 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit
          </button> )
          : 
          (<div className="flex flex-col items-center space-y-4">
            <p className="text-2xl font-bold text-gray-800 bg-white p-4 rounded-lg shadow-md border border-gray-200">
              Your total score is 
              <span className="text-blue-600 font-extrabold text-3xl ml-2">
                {calculateScore()}
              </span>
            </p>            
            <button 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition transform hover:scale-105"
              onClick={handleHome}
            >
              Home
            </button> 
          </div>)
        }
      <PopUp />  
    </div>
  )
}

export default Question