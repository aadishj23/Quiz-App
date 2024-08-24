// import React from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { datainput } from '../store/atoms/data';
import { datastore } from '../store/atoms/datastore';
import { loggedin } from '../store/atoms/loggedin';
import { useNavigate } from 'react-router-dom';
import { logoutpopup } from '../store/atoms/logoutpopup'
import LogoutPopUp from './LogoutPopUp'
import axios from 'axios';

function Select() { 
    const [data, setData] = useRecoilState(datainput);
    const isLoggedin = useRecoilValue(loggedin);
    const setDataStore = useSetRecoilState(datastore);
    const setLogPopUp = useSetRecoilState(logoutpopup)

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
        const response= await axios({
            url: "http://localhost:3000/updatedata",
            method: "POST",
            data: JSON.stringify({
                category: data.category,
                difficulty: data.difficulty,
                questioncount: data.questioncount,
            }),
            headers: {
                'Content-Type': 'application/json' 
            } ,
        });
        if (response.data.length > 0) {
            setDataStore(response.data[0].data);
        }
        console.log(response.data[0].data);
        navigate('/question');
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {isLoggedin === false ? (
                <div className="absolute top-4 right-4 flex space-x-4">
                    <button 
                        onClick={()=>{
                            navigate('/signin')
                        }} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={()=>{
                            navigate('/signup')
                        }} 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </div>
            ):(
                <div className="absolute top-4 right-4 flex space-x-4">
                    <p className="text-center text-lg font-semibold">Welcome</p>
                    <button 
                        onClick={() => {
                            setLogPopUp(true)
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    > 
                        LogOut
                    </button>
                </div>
            )}

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
            <LogoutPopUp />
        </div>
    );
}

export default Select;
