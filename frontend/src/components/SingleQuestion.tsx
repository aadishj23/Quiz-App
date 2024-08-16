// import React from 'react'
import { useRecoilValue } from "recoil"
import { datastore } from "../store/atoms/datastore"
// import { AnswersHeld } from "../types/answersheld"
import { Data } from "../types/datastoretype"
import { nanoid } from "nanoid"

function SingleQuestion(props:any) {
  const dataStore = useRecoilValue<Data[]>(datastore)
  
  const styles={
    backgroundColor: props.is_held ? "#59E391":"#FFFFFF"
  }

  return (
    <div>
      {props.question}
      <br></br>
      { Object.entries(props.answers).map(([key, value]) => {
        return (
          <button className='m-[15px]' key={nanoid()} >{value}</button>
        )
      })}
      <br></br>
      <br></br>
    </div>
  )
}

export default SingleQuestion