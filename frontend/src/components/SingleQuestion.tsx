// import React from 'react'
import { useRecoilValue } from "recoil"
import { datastore } from "../store/atoms/datastore"
// import { AnswersHeld } from "../types/answersheld"
import { Data } from "../types/datastoretype"

function SingleQuestion(props:any) {
  const dataStore = useRecoilValue<Data[]>(datastore)
  
  const styles={
    backgroundColor: props.held ? "#59E391":"#FFFFFF"
  }

  // const answermap = dataStore.map(data => {
  //   return data.answers.map(finaldata => (
  //       <button  key= {finaldata.id} onClick={() => props.onclick(finaldata.id)}>{finaldata.text}</button>
  //     )
  //   )
  // })

  return (
    <div>
      {props.question}
      <br></br>
      {/* {answermap} */}
      <button className='m-[15px]' onClick={() => props.onclick()} style={styles}>{props.answers.answer_a}</button>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_b}</button>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_c}</button>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_d}</button>
      <br></br>
      <br></br>
    </div>
  )
}

export default SingleQuestion