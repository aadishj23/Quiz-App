import { useRecoilState, useSetRecoilState } from 'recoil'
import { signin } from '../store/atoms/signin'
import { loggedin } from '../store/atoms/loggedin'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Signin() {
    const [signInData, setSignInData] = useRecoilState(signin)
    const setLoggedIn = useSetRecoilState(loggedin)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    function handleChangeSignIn(event: any) {
        const { name, value } = event.target
        setSignInData(prevSignInData => ({
            ...prevSignInData,
            [name]: value
        }))
    }

    async function handleSubmitSignIn(event: any) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_BACKEND_URL}/signin`,
                method: "POST",
                data: JSON.stringify({
                    email: signInData.Name,
                    password: signInData.Password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('name', JSON.stringify(response.data.name))
            setLoggedIn(true)
            navigate('/')
        } catch (error) {
            console.error(error)
            setError('Invalid Credentials')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue your quiz journey</p>
                </div>

                {/* Form */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
                    <form onSubmit={handleSubmitSignIn} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email-phone"
                                className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2"
                            >
                                Email or Phone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="email-phone"
                                    placeholder="Enter your email or phone"
                                    name="Name"
                                    value={signInData.Name}
                                    onChange={handleChangeSignIn}
                                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="pswd"
                                className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="pswd"
                                    placeholder="Enter your password"
                                    name="Password"
                                    value={signInData.Password}
                                    onChange={handleChangeSignIn}
                                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 text-center font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105'
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16a4 4 0 010-8V4a8 8 0 100 16v-4z"
                                        ></path>
                                    </svg>
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 flex items-center justify-center mx-auto space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Home</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signin
