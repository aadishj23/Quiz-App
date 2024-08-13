// import React from 'react'
import { useRecoilValue } from "recoil"
import { datastore } from "../store/atoms/datastore"
// import { AnswersHeld } from "../types/answersheld"
import { Data } from "../types/datastoretype"
import Answers from "./Answers"

function SingleQuestion(props:any) {
  const dataStore = useRecoilValue<Data[]>(datastore)
  
  const styles={
    backgroundColor: props.answers.isHeld ? "#59E391":"#FFFFFF"
  }
  // const answermap = dataStore.map(data => {
  //   return data.answers.map(finaldata => (
  //       <button  key= {finaldata.id} onClick={() => props.onclick(finaldata.id)}>{finaldata.text}</button>
  //     )
  //   )
  // })

  // const answermap = dataStore.map(data => {
  //   return data.answers.map(finaldata => (
  //       <Answers key= {finaldata.id} onclick={() => props.onclick(finaldata.id)} val={finaldata.text} isHeld={finaldata.isHeld} />
  //     )
  //   )
  // })

  // const answermap = dataStore.map(data => {
  //   if (!Array.isArray(data.answers)) {
  //     console.error("data.answers is not an array", data.answers);
  //     return null;
  //   }
  //   return data.answers.map(finaldata => (
  //     <button key={finaldata.id} onClick={() => props.onclick(finaldata.id)} style={styles}> {finaldata.text}</button>
  //   ));
  // });


  // console.log(dataStore[0].answers)

  return (
    <div>
      {props.question}
      <br></br>
      {/* {answermap} */}
      {/* <button className='m-[15px]' onClick={() => props.onclick(props.answers[0].id)} style={styles}>{props.answers[0].text}</button>
      <button className='m-[15px]' onClick={() => props.onclick(props.answers[1].id)} style={styles}>{props.answers[1].text}</button>
      <button className='m-[15px]' onClick={() => props.onclick(props.answers[2].id)} style={styles}>{props.answers[2].text}</button>
      <button className='m-[15px]' onClick={() => props.onclick(props.answers[3].id)} style={styles}>{props.answers[3].text}</button>
      <button className='m-[15px]' onClick={() => props.onclick(props.answers[4].id)} style={styles}>{props.answers[4].text}</button>
      <button className='m-[15px]' onClick={() => props.onclick(props.answers[5].id)} style={styles}>{props.answers[5].text}</button> */}
      <br></br>
      <br></br>
    </div>
  )
}

export default SingleQuestion