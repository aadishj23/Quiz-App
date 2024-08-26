import Select from "./components/Select"
import Question from "./components/Question"
import Signin from "./components/signin";
import Signup from "./components/signup";
import PastQuiz from "./components/PastQuiz";
import ErrorPage from "./components/ErrorPage";
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
    },
    {
      path: '/pastquizes',
      element:
        <RecoilRoot>
          <PastQuiz />
        </RecoilRoot>
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ])
  
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
