import Select from "./components/Select"
import Question from "./components/Question"
import Signin from "./components/signin";
import Signup from "./components/signup";
import { RecoilRoot } from "recoil"
import { createBrowserRouter,RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: 
        <RecoilRoot>
          <Select />
        </RecoilRoot>
    },
    {
      path: '/question',
      element:
        <RecoilRoot>
          <Question />
        </RecoilRoot>
    },
    {
      path: '/signin',
      element:
        <RecoilRoot>
          <Signin />
        </RecoilRoot>
    },
    {
      path: '/signup',
      element:
        <RecoilRoot>
          <Signup />
        </RecoilRoot>
    }
  ])
  
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
