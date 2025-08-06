import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import Loader from "./components/Loader"
import { Suspense } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { Toaster } from "./components/ui/sonner"
import AuthProvider from "./providers/AuthProvider"

const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    children: [
      { index: true, element: <Home /> },
    ]
  }
])

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </Suspense>
  )
}

export default App
