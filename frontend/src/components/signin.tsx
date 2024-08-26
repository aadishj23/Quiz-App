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
                url: "https://quiz-app-d0dc.onrender.com/signin",
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
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="signin flex justify-center items-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
                onSubmit={handleSubmitSignIn}
            >
                <label
                    htmlFor="email-phone"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    EMAIL/PHONE
                </label>
                <input
                    type="text"
                    id="email-phone"
                    placeholder="Enter Email/Phone"
                    name="Name"
                    value={signInData.Name}
                    onChange={handleChangeSignIn}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label
                    htmlFor="pswd"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    PASSWORD
                </label>
                <input
                    type="password"
                    id="pswd"
                    placeholder="Enter Password"
                    name="Password"
                    value={signInData.Password}
                    onChange={handleChangeSignIn}
                    className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className={`w-full py-2 rounded-lg text-white transition duration-200 ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
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
                            Signing In...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>
        </div>
    )
}

export default Signin
