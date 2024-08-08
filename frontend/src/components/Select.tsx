import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { datainput } from '../store/atoms/data';
import { datastore } from '../store/atoms/datastore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Select() {
    const [data, setData] = useRecoilState(datainput)
    const setDataStore = useSetRecoilState(datastore)

    const navigate = useNavigate();

    function handleChange(event:any){
        const {name,value}=event.target;
        setData(prevData => {
            return {
                ...prevData,
                [name]:value
            }
        })
    }

    async function handleSubmit(event:any){
        event.preventDefault();
        const baseURL = "https://quizapi.io/api/v1/questions?apiKey=UINipDkO8Dl0yUKerqUErhb8O65OQAgLMTna6lC1"
        const fetcheddata = await axios({
            url: `${baseURL}&category=${data.category}&difficulty=${data.difficulty}&limit=${data.questioncount}`,
            method: "GET"
        })  
        const datares=fetcheddata.data
        setDataStore(datares)
        navigate('/question')
        console.log(datares)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category"> Select Category </label>
                    <select value={data.category} name='category' id="category" onChange={handleChange}>
                        <option value="">Any Category</option>
                        <option value="linux">Linux</option>
                        <option value="bash">Bash</option>
                        <option value="uncategorized">Uncategorized</option>
                        <option value="docker">Docker</option>
                        <option value="sql">SQL</option>
                        <option value="cms">CMS</option>
                        <option value="code">Code</option>
                        <option value="devops">DevOps</option>
                </select>
                </div>
                <div>
                    <label htmlFor="difficulty"> Select Difficulty </label>
                    <select value={data.difficulty} name='difficulty' id="difficulty" onChange={handleChange}>
                        <option value="">Any Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="questioncount"> Number of Questions </label>
                    <input 
                        type="text" 
                        id="questioncount"
                        placeholder='Number of Questions'
                        name="questioncount"
                        value={data.questioncount}
                        onChange={handleChange}
                    />
                </div>
                <input type='submit' />
            </form>
        </div>
    )
}

export default Select