import { useRecoilState, useSetRecoilState } from 'recoil'
import { signin } from '../store/atoms/signin'
import { loggedin } from '../store/atoms/loggedin'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signin() {
    const [signInData,setSignInData]=useRecoilState(signin)
    const setLoggedIn=useSetRecoilState(loggedin)

    const navigate=useNavigate()

    function handleChangeSignIn(event:any){
        const {name,value}=event.target
        setSignInData(prevSignInData => {
            return {
                ...prevSignInData,
                [name]:value
            }
        })
    }

    async function handleSubmitSignIn(event:any){
        event.preventDefault()
        const response= await axios({
            url: "http://localhost:3000/signin",
            method: "POST",
            data: JSON.stringify({
                email: signInData.Name,
                password: signInData.Password
            }),
            headers: {
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            } ,
        });
        localStorage.setItem('token', JSON.stringify(response.data));
        setLoggedIn(true)
        navigate('/')
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
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Signin