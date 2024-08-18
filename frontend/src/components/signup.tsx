import { useRecoilState ,useSetRecoilState} from "recoil"
import { loggedin } from "../store/atoms/loggedin"
import { signup } from "../store/atoms/signup"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Signup() {
    const [signUpData,setSignUpData]=useRecoilState(signup)
    const setLoggedIn=useSetRecoilState(loggedin)

    const navigate=useNavigate()

    function handleChange(event:any){
        const {name,value}=event.target
        setSignUpData(prevSignUpData => {
            return {
                ...prevSignUpData,
                [name]:value
            }
        })
    }
    // console.log(signUpData)

    async function handleSubmit(event:any){
        event.preventDefault()
        await axios({
            url: "http://localhost:3000/signup",
            method: "POST",
            data: JSON.stringify({
                name: signUpData.Name,
                email: signUpData.Email,
                phone: signUpData.Phone,
                password: signUpData.Password,
                // confirmPassword: signUpData.ConfirmPassword
            }),
        });
        setLoggedIn(true)
        navigate('/')
    }
    
    return (
        <div className="signup flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" 
                onSubmit={handleSubmit}
            >
                <label 
                    htmlFor="name" 
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    NAME
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your Name"
                    name="Name"
                    value={signUpData.Name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label 
                    htmlFor="email" 
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    EMAIL
                </label>
                <input
                    type="text"
                    id="email"
                    placeholder="Enter Email"
                    name="Email"
                    value={signUpData.Email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label 
                    htmlFor="phone" 
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Phone
                </label>
                <input
                    type="text"
                    id="phone"
                    placeholder="Enter Phone Number"
                    name="Phone"
                    value={signUpData.Phone || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label 
                    htmlFor="password" 
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    PASSWORD
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    name="Password"
                    value={signUpData.Password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label 
                    htmlFor="cnfpswd" 
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    CONFIRM PASSWORD
                </label>
                <input
                    type="password"
                    id="cnfpswd"
                    placeholder="Confirm password"
                    name="ConfirmPassword"
                    value={signUpData.ConfirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
  
}

export default Signup
