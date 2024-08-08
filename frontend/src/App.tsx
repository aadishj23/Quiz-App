import Firstpage from "./components/Firstpage"
import Select from "./components/Select"
import { createBrowserRouter,RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Firstpage />
    },
    {
      path: '/select',
      element: <Select />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
