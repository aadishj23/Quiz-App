import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { datainput } from '../store/atoms/data';
import { datastore } from '../store/atoms/datastore';
import { loggedin } from '../store/atoms/loggedin';
import { useNavigate } from 'react-router-dom';
import { logoutpopup } from '../store/atoms/logoutpopup';
import { pastdata } from '../store/atoms/pastdata';
import LogoutPopUp from './LogoutPopUp';
import axios from 'axios';

function Select() { 
    const [data, setData] = useRecoilState(datainput);
    const isLoggedin = useRecoilValue(loggedin);
    const setDataStore = useSetRecoilState(datastore);
    const setLogPopUp = useSetRecoilState(logoutpopup);
    const setPastData = useSetRecoilState(pastdata);
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleChange(event: any) {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios({
                url: "http://localhost:3000/fetchdata",
                method: "POST",
                data: JSON.stringify({
                    category: data.category,
                    difficulty: data.difficulty,
                    questioncount: data.questioncount,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
                },
            });
            if (response.data.length > 0) {
                setDataStore(response.data[0].data);
            }
            sessionStorage.setItem('quizid', JSON.stringify(response.data[0].id));
            navigate('/question');
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const handlePastData = async () => {
        try {
            const response = await axios({
                url: "http://localhost:3000/pastdata",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
                },
            });
            sessionStorage.setItem('pastdata', JSON.stringify(response.data));
            setPastData(response.data);
        } catch (err) {
            setError('Failed to fetch past data. Please try again.');
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {isLoggedin === false ? (
                <div className="absolute top-4 right-4 flex space-x-4">
                    <button 
                        onClick={() => navigate('/signin')} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </div>
            ):(
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center p-2">
                    <p className="text-lg font-semibold text-gray-800">
                        Welcome, <span className="font-bold">{JSON.parse(localStorage.getItem('name') ?? '')}</span>
                    </p>
                    <button 
                        onClick={() => setLogPopUp(true)}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
                    > 
                        Log Out
                    </button>
                </div>
            )}

            <h1 className="mb-8 text-5xl font-bold text-blue-600">Quizzical</h1>

            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
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
                        value={data.questioncount || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 ${loading ? 'bg-blue-400 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Loading...' : 'Start Quiz'}
                </button>
            </form>

            {isLoggedin &&
                <div className="fixed bottom-4 right-4">
                    <button
                        onClick={() => {
                            navigate('/pastquizes');
                            handlePastData();
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Past Quizzes
                    </button>
                </div>
            }
            <LogoutPopUp />
        </div>
    );
}

export default Select;
