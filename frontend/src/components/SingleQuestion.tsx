import React from 'react'
import { useRecoilValue } from "recoil"
import { datastore } from "../store/atoms/datastore"
import { Data } from "../types/datastoretype"
import { nanoid } from "nanoid"
import { submit } from "../store/atoms/submit"

function SingleQuestion(props:any) {
  const dataStore = useRecoilValue<Data[]>(datastore)
  const submitState = useRecoilValue(submit)
   
  React.useEffect(() => {
    localStorage.setItem('dataStore', JSON.stringify(dataStore));
  }, [dataStore]);

  return (
    <div className="p-4">
      <p className="font-semibold text-lg mb-4">Question {props.questionNumber}</p> 
      {props.question}
      <br></br>
      {Object.entries(props.answers).map(([key, value]) => {
        return (
          value && (
            <button 
              className={`m-[15px] p-2 rounded-lg border-2 transition-all ${
                submitState === false ? 
                  (dataStore.some((item) => item.is_held?.[`${key}_held`] && item.question === props.question)
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-[#FFFFFF] border-gray-300")
                 :
                 (
                  dataStore.some((item) => item.is_held?.[`${key}_held`] && item.question === props.question)
                    ? (dataStore.some((item) => item.selected_answer === key && item.correct_answers[`${key}_correct`] === "true")
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-red-500 border-red-500 text-white")
                    : ("bg-[#FFFFFF] border-gray-300")
                 )
              }`}
              disabled={submitState}
              key={nanoid()}
              onClick={() => props.onclick(key)} 
            >
              {value as React.ReactNode}
            </button>
          )
        )
      })}
      <br></br>
      <br></br>
    </div>
  )
}

export default SingleQuestion