import React from 'react'
import { useRecoilState } from "recoil"
import { datastore } from "../store/atoms/datastore"
import SingleQuestion from "./SingleQuestion"
import { nanoid } from "nanoid"
import { Data } from '../types/datastoretype'
import { AnswersHeld } from '../types/answersheld'

function Question() {
    const [dataStore, setDataStore] = useRecoilState<Data[]>(datastore)

    React.useEffect(() => {
        const dataWithHeld= dataStore.map(dataWithoutHeld => ({
            ...dataWithoutHeld,
            answers : Object.entries(dataWithoutHeld.answers).map(([key,value]) => ({
              ansno: key,
              text: value as unknown as string, // data type is inferred as AnswersHeld?
              id: nanoid(),
              isHeld: false
            })) as AnswersHeld[]
        }));
      
        const newData = dataWithHeld.map(({id,question,answers,correct_answers}) => ({id,question,answers,correct_answers}))
        console.log(newData)
        setDataStore(newData);
    }, [setDataStore]);
    // console.log(dataStore)

    const handleClick = (id: number, answerid : string) => {
      setDataStore(prevStore =>
        prevStore.map(prevheld =>
          prevheld.id === id
            ? { ...prevheld, 
                answers : prevheld.answers.map(prevOption =>
                  prevOption.id === answerid
                    ? { ...prevOption, isHeld: !prevOption.isHeld }
                    : prevOption
                )
            }
            : prevheld
        )
      );
    };

    const datafinal= dataStore.map(dataval=> {
        return (
          <SingleQuestion 
            question={dataval.question} 
            answers={dataval.answers} 
            key={dataval.id} 
            onclick={(answerid : string) => handleClick(dataval.id,answerid)}
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