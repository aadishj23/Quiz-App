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
  };
  
  return (
    <div className="space-y-8">
      {dataStore.map((item,index) => {
        return (
          <div key={item.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Question {index + 1}
                </h3>
              </div>
              {item.selected_answer && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Answered</span>
                </div>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {item.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid gap-4">
              {Object.entries(item.answers).map(([key, value]) => {
                if (!value) return null;
                
                const isSelected = item.is_held?.[`${key}_held`];
                const isCorrect = item.correct_answers[`${key}_correct`] === "true";
                const isSubmitted = submitState;
                
                let buttonClasses = "p-4 w-full rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 font-medium text-left";
                
                if (submitState === false) {
                  // Quiz in progress
                  buttonClasses += isSelected 
                    ? " bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg" 
                    : " bg-white border-gray-200 hover:border-blue-300 hover:shadow-md";
                } else {
                  // Quiz completed - show results
                  if (isSelected) {
                    buttonClasses += isCorrect 
                      ? " bg-gradient-to-r from-green-500 to-green-600 border-green-500 text-white shadow-lg" 
                      : " bg-gradient-to-r from-red-500 to-red-600 border-red-500 text-white shadow-lg";
                  } else {
                    if (isCorrect) {
                      buttonClasses += " bg-green-100 border-green-300 text-green-800";
                    } else {
                      buttonClasses += " bg-gray-50 border-gray-200 text-gray-600";
                    }
                  }
                }

                return (
                  <button 
                    className={buttonClasses}
                    disabled={submitState}
                    key={nanoid()}
                    onClick={() => handleClick(item.id, key)} 
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        submitState === false 
                          ? (isSelected ? "border-white" : "border-gray-300")
                          : (isSelected 
                              ? (isCorrect ? "border-white" : "border-white")
                              : (isCorrect ? "border-green-500" : "border-gray-300"))
                      }`}>
                        {submitState === false ? (
                          isSelected && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )
                        ) : (
                          isSelected && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )
                        )}
                      </div>
                      <span className="flex-1">{value as React.ReactNode}</span>
                      {submitState && isCorrect && (
                        <div className="text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      {submitState && isSelected && !isCorrect && (
                        <div className="text-red-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QuestionMap