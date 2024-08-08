import React from 'react'
import { Link } from 'react-router-dom'

function Firstpage() {
  return (
    <div className='text-center'>
        <h1 className='mt-[280px] font-bold text-7xl'>Quizzical</h1>
        <Link to='/select'><button className='mt-[30px] text-2xl'> Start Quiz</button></Link>
    </div>
  )
}

export default Firstpage