// import React from 'react'
import { useRecoilValue } from "recoil"
import { datastore } from "../store/atoms/datastore"
import SingleQuestion from "./SingleQuestion"
import { nanoid } from "nanoid"

function Question() {
    const dataStore = useRecoilValue(datastore)
    const datafinal= dataStore.map(dataval=> {
        return <SingleQuestion question={dataval.question} answers={dataval.answers} key={nanoid()}/>
    })
  return (
    <div>
        {datafinal}
    </div>
  )
}

export default Question