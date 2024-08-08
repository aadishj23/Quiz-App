import React from 'react'

function SingleQuestion(props:any) {
  const styles={
    backgroundColor: props.held ? "#59E391":"#FFFFFF"
  }
  return (
    <div>
      {props.question}
      <br></br>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_a}</button>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_b}</button>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_c}</button>
      <button className='m-[15px]' onClick={props.onclick} style={styles}>{props.answers.answer_d}</button>
      <br></br>
      <br></br>
    </div>
  )
}

export default SingleQuestion