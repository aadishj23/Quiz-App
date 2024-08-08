import React from 'react'
import { useRecoilState } from "recoil"
import { datastore } from "../store/atoms/datastore"
import SingleQuestion from "./SingleQuestion"
import { nanoid } from "nanoid"

function Question() {
    const [dataStore, setDataStore] = useRecoilState(datastore)
    // const dataWithHeld = dataStore.map(dataWithoutHeld => {
    //   return {
    //     ...dataWithoutHeld,
    //     isHeld : false
    //   }
    // })


    React.useEffect(() => {
        const dataWithHeld = dataStore.map(dataWithoutHeld => ({
            ...dataWithoutHeld,
            isHeld: false
        }));
        setDataStore(dataWithHeld);
    }, [setDataStore]);
    console.log(dataStore)



    // function handleClick(id: any) {
    // setDataStore(prevStore => {
    //   prevStore.map(prevheld =>
    //     prevheld.id === id 
    //         ? { ...prevheld, isHeld: !prevheld.isHeld } 
    //         : prevheld
    //   )});
    // }


    const datafinal= dataStore.map(dataval=> {
        return <SingleQuestion question={dataval.question} answers={dataval.answers} key={nanoid()} 
        // onclick={handleClick(dataval.id)}
         />
    })

  return (
    <div>
        {datafinal}
    </div>
  )
}

export default Question