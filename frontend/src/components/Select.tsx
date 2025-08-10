import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { datainput } from '../store/atoms/data';
import { datastore } from '../store/atoms/datastore';
import { loggedin } from '../store/atoms/loggedin';
import { useNavigate } from 'react-router-dom';
import { logoutpopup } from '../store/atoms/logoutpopup';
import LogoutPopUp from './LogoutPopUp';
import axios from 'axios';

function Select() { 
    const [data, setData] = useRecoilState(datainput);
    const isLoggedin = useRecoilValue(loggedin);
    const setDataStore = useSetRecoilState(datastore);
    const setLogPopUp = useSetRecoilState(logoutpopup);
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Helper function to safely parse JSON from localStorage
    const safeJsonParse = (key: string, defaultValue: string = '') => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    };

    function handleChange(event: any) {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        if(isLoggedin === false) {
            setError('Please Login First Before Starting the Quiz');
            return;
        } else {
            setLoading(true);
            setError('');
            try {
                const response = await axios({
                    url: `${import.meta.env.VITE_BACKEND_URL}/fetchdata`,
                    method: "POST",
                    data: JSON.stringify({
                        category: data.category,
                        difficulty: data.difficulty,
                        questioncount: data.questioncount,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${safeJsonParse('token')}`
                    },
                });
                if (response.data.length > 0) {
                    setDataStore(response.data[0].data);
                }
                sessionStorage.setItem('quizid', JSON.stringify(response.data[0].id));
                navigate('/question');
            } catch (err) {
                setError('Please Login First Before Starting the Quiz');
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header Navigation */}
            {isLoggedin === false ? (
                <div className="absolute top-6 right-6 flex space-x-4 z-10">
                    <button 
                        onClick={() => navigate('/signin')} 
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-blue-600 hover:border-blue-700"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-emerald-600 hover:border-emerald-700"
                    >
                        Sign Up
                    </button>
                </div>
            ):(
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                    <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/20">
                        <p className="text-lg font-semibold text-gray-800">
                            Welcome back, <span className="font-bold text-blue-600">{safeJsonParse('name')}</span>! 👋
                        </p>
                    </div>
                    <button 
                        onClick={() => setLogPopUp(true)}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-red-500 hover:border-red-600"
                    > 
                        Log Out
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Quizzical
                    </h1>
                    <p className="text-xl text-gray-600 max-w-md mx-auto">
                        Test your knowledge with our interactive quizzes. Choose your category, difficulty, and get started!
                    </p>
                </div>

                {/* Quiz Configuration Form */}
                <div className="w-full max-w-2xl">
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20"
                    >
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Category
                                </label>
                                <select
                                    value={data.category}
                                    name="category"
                                    id="category"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                                >
                                    <option value="">Any Category</option>
                                    <option value="linux">🐧 Linux</option>
                                    <option value="bash">💻 Bash</option>
                                    <option value="uncategorized">❓ Uncategorized</option>
                                    <option value="docker">🐳 Docker</option>
                                    <option value="sql">🗄️ SQL</option>
                                    <option value="cms">📝 CMS</option>
                                    <option value="code">💻 Code</option>
                                    <option value="devops">⚡ DevOps</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Difficulty
                                </label>
                                <select
                                    value={data.difficulty}
                                    name="difficulty"
                                    id="difficulty"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                                >
                                    <option value="">Any Difficulty</option>
                                    <option value="Easy">🟢 Easy</option>
                                    <option value="Medium">🟡 Medium</option>
                                    <option value="Hard">🔴 Hard</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <label htmlFor="questioncount" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                                Number of Questions
                            </label>
                            <input
                                type="number"
                                id="questioncount"
                                placeholder="Enter number of questions (1-50)"
                                name="questioncount"
                                value={data.questioncount || ""}
                                onChange={handleChange}
                                min="1"
                                max="50"
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                                required
                            />
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 text-center font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 px-6 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200 ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16a4 4 0 010-8V4a8 8 0 100 16v-4z"></path>
                                    </svg>
                                    <span>Preparing Quiz...</span>
                                </div>
                            ) : (
                                <span className="text-lg">🚀 Start Quiz</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Past Quizzes Button */}
                {isLoggedin && (
                    <div className="mt-8">
                        <button
                            onClick={() => {
                                navigate('/pastquizes');
                            }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            📚 View Past Quizzes
                        </button>
                    </div>
                )}
            </div>
            
            <LogoutPopUp />
        </div>
    );
}

export default Select;
