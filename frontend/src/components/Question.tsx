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
    }, []);
    console.log(dataStore)

    // const handleClick = (id: number, answerid : string) => {
    //   setDataStore(prevStore =>
    //     prevStore.map(prevheld =>
    //       prevheld.id === id
    //         ? { ...prevheld, 
    //             answers : prevheld.answers.map(prevOption =>
    //               prevOption.id === answerid
    //                 ? { ...prevOption, isHeld: !prevOption.isHeld }
    //                 : prevOption
    //             )
    //         }
    //         : prevheld
    //     )
    //   );
    // };

    const datafinal= dataStore.map(dataval=> {
        return (
          <SingleQuestion 
            question={dataval.question} 
            answers={dataval.answers} 
            key={dataval.id} 
            // onclick={(answerid : string) => handleClick(dataval.id,answerid)}
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