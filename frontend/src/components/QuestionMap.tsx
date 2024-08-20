import React from 'react'
import { useRecoilValue ,useRecoilState} from "recoil"
import { datastore } from "../store/atoms/datastore"
import { Data } from "../types/datastoretype"
import { nanoid } from "nanoid"
import { submit } from "../store/atoms/submit"

function QuestionMap() {
  const [dataStore,setDataStore] = useRecoilState<Data[]>(datastore)
  const submitState = useRecoilValue(submit)
  
  React.useEffect(() => {
    sessionStorage.setItem('dataStore', JSON.stringify(dataStore));
  }, [dataStore]);

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
  
  return (
    <div className="p-6 space-y-8">
      {dataStore.map((item,index) => {
        return (
          <div key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-md">
            <p className="font-bold text-xl text-blue-600 mb-4">
              Question {index+1}
            </p>
            <p className="text-gray-700 mb-6">
              {item.question}
            </p>
            <div className="flex flex-wrap justify-start gap-4">
              {Object.entries(item.answers).map(([key, value]) => {
                return (
                  value && (
                    <button 
                      className={`p-3 w-full md:w-auto rounded-lg border-2 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 ${
                        submitState === false ? 
                          ((item.is_held?.[`${key}_held`])
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-[#FFFFFF] border-gray-300")
                          :
                          ((item.is_held?.[`${key}_held`]) ? 
                            ((item.correct_answers[`${item.selected_answer}_correct`] === "true") ? 
                              "bg-green-500 border-green-500 text-white"
                              : "bg-red-500 border-red-500 text-white")
                            : ("bg-[#FFFFFF] border-gray-300"))
                      }`}
                      disabled={submitState}
                      key={nanoid()}
                      onClick={() => handleClick(item.id,key)} 
                    >
                      {value as React.ReactNode}
                    </button>
                  )
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QuestionMap