// import React from 'react'

function Answers(props:any) {
    const styles={
        backgroundColor: props.isHeld ? "#59E391":"#FFFFFF"
    }
  return (
    <div>
        <button onClick={props.onclick} style={styles}>{props.val} </button>
    </div>
  )
}

export default Answers