// import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { datainput } from '../store/atoms/data';
import { datastore } from '../store/atoms/datastore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Select() {
    const [data, setData] = useRecoilState(datainput);
    const setDataStore = useSetRecoilState(datastore);
    const navigate = useNavigate();

    function handleChange(event: any) {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const baseURL = "https://quizapi.io/api/v1/questions?apiKey=UINipDkO8Dl0yUKerqUErhb8O65OQAgLMTna6lC1";
        const fetchedData = await axios({
            url: `${baseURL}&category=${data.category}&difficulty=${data.difficulty}&limit=${data.questioncount}`,
            method: "GET",
        });
        const dataRes = fetchedData.data;
        setDataStore(dataRes);
        navigate('/question');
    }

    async function getData(){
        const response= await axios({
            url: "http://localhost:5000/api/quiz",
            method: "POST",
            data: {
                category: data.category,
                difficulty: data.difficulty,
                questioncount: data.questioncount,
            },
        });
        // setDataStore(response.data);
    }
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-8 text-7xl font-bold text-blue-600">Quizzical</h1>
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                        Select Category
                    </label>
                    <select
                        value={data.category}
                        name="category"
                        id="category"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
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
                <div className="mb-4">
                    <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-700">
                        Select Difficulty
                    </label>
                    <select
                        value={data.difficulty}
                        name="difficulty"
                        id="difficulty"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Any Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="questioncount" className="block mb-2 text-sm font-medium text-gray-700">
                        Number of Questions
                    </label>
                    <input
                        type="text"
                        id="questioncount"
                        placeholder="Number of Questions"
                        name="questioncount"
                        value={data.questioncount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <input
                    type="submit"
                    value="Start Quiz"
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                />
            </form>
        </div>
    );
}

export default Select;
