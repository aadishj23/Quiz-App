import React from 'react'
import { useRecoilState } from "recoil"
import { datastore } from "../store/atoms/datastore"
import SingleQuestion from "./SingleQuestion"
import { nanoid } from "nanoid"
// import { Data } from '../types/datastoretype'

function Question() {
    const [dataStore, setDataStore] = useRecoilState(datastore)

    React.useEffect(() => {
        const dataWithHeld= dataStore.map(dataWithoutHeld => ({
            ...dataWithoutHeld,
            selected_answer: null,
            is_correct: false,
            is_held: {
              answer_a_held: false,
              answer_b_held: false,
              answer_c_held: false,
              answer_d_held: false,
              answer_e_held: false,
              answer_f_held: false,
            },
            answer_id:{
              answer_a_id: nanoid(),
              answer_b_id: nanoid(),
              answer_c_id: nanoid(),
              answer_d_id: nanoid(),
              answer_e_id: nanoid(),
              answer_f_id: nanoid(),
            }
        }));
        // console.log(dataWithHeld);
        setDataStore(dataWithHeld);
    }, [setDataStore]);
    console.log(dataStore)

    const handleClick = (id: number, answerkey : string) => {
      setDataStore(prevStore =>
        prevStore.map(prevheld =>
          prevheld.id === id
            ? { ...prevheld, 
              selected_answer: answerkey,
              is_held: {
                ...prevheld.is_held ,
                [`${answerkey}_held`]: !prevheld.is_held[`${answerkey}_held`],
              },
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
    </div>
  )
}

export default Question