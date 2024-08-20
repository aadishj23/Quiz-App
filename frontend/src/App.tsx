import Select from "./components/Select"
import Question from "./components/Question"
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
    }
  ])
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
