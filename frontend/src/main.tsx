import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Distributors from "./pages/Distributors.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "/distributors", element: <Distributors/> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
