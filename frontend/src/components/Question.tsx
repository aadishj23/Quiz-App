import React from 'react'
import { useRecoilState } from "recoil"
import { datastore } from "../store/atoms/datastore"
import SingleQuestion from "./SingleQuestion"
import { nanoid } from "nanoid"
import { Data } from '../types/datastoretype'

function Question() {
    const [dataStore, setDataStore] = useRecoilState<Data[]>(datastore)

    // React.useEffect(() => {
    //     const dataWithHeld= dataStore.map(dataWithoutHeld => ({
    //         ...dataWithoutHeld,
    //         answers : dataWithoutHeld.answers.map(answer => ({
    //           ...answer,
    //           id: nanoid(),
    //           isHeld: false
    //         }))
    //     }));
      
    //     const newData = dataWithHeld.map(({answers,correct_answers,id,question}) => ({answers,correct_answers,id,question}))
    //     setDataStore(dataWithHeld);
    // }, [setDataStore]);
    // console.log(dataStore)


    const handleClick = (answerid : string) => {
      console.log("inside handleClick, selected: ", answerid)

      
      // setDataStore(prevStore =>
      //   prevStore.map(prevheld =>
      //     prevheld.id === id
      //       ? { ...prevheld, 
      //           answers : prevheld.answers.map(prevOption =>
      //             prevOption.id === answerid
      //               ? { ...prevOption, isHeld: !prevOption.isHeld }
      //               : prevOption
      //           )
      //       }
      //       : prevheld
      //   )
      // );
    };


    const datafinal= dataStore.map(dataval=> {
        return (
          <SingleQuestion 
            question={dataval.question} 
            answers={dataval.answers} 
            key={nanoid()} 
            // onclick={(answerid : string) => handleClick(dataval.id,answerid)} // TK: what is dataval.id?!
            onclick={(answerid : string) => handleClick(answerid)} 

         />)
    })

  return (
    <div>
        {datafinal}
    </div>
  )
}

export default Question