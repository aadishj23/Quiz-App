import { useRecoilState } from "recoil"
import { datastore } from "../store/atoms/datastore"
import SingleQuestion from "./SingleQuestion"
import { submit } from '../store/atoms/submit'
import { useNavigate } from 'react-router-dom'

function Question() {
    const [dataStore, setDataStore] = useRecoilState(datastore)
    const [submitState, setSubmitState] = useRecoilState(submit)
    const navigate = useNavigate();

    const handleClick = (id: number, answerkey : string) => {
      setDataStore(prevStore =>
        prevStore.map(prevheld =>
          prevheld.id === id
            ? { ...prevheld, 
              selected_answer: answerkey,
              is_held: Object.fromEntries(
                Object.keys(prevheld.is_held || {}).map(key => [
                  key,
                  key === `${answerkey}_held`
                    ? !prevheld.is_held?.[key]
                    : false,
                ])
              ),
            }
            : prevheld
        )
      );
      console.log(dataStore)
    };

    const datafinal= dataStore.map(dataval=> {
        return (
          <SingleQuestion 
            question={dataval.question} 
            answers={dataval.answers} 
            key={dataval.id} 
            onclick={(answerkey : string) => handleClick(dataval.id,answerkey)}
            className="p-4 bg-white shadow-md rounded-md mb-4"
         />)
    })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        {datafinal}
        { submitState === false ? 
          (<button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto mr-auto block" 
            onClick={() => {
              const unansweredQuestions = dataStore.filter(question => question.selected_answer === null);
              if (unansweredQuestions.length === 0) {
                setSubmitState(true);
              } else {
                alert("Please answer all questions before submitting.");
              }
            }}
          >
            Submit
          </button> )
          : 
          (<button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-auto mr-auto block" 
            onClick={() => {
              setSubmitState(false);
              navigate('/');
              localStorage.removeItem('dataStore');
              setDataStore([]);
            }}
          >
            Home
          </button> )
        }
    </div>
  )
}

export default Question