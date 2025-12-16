import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout.jsx'
import App from './App.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Login from './pages/Login/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:'/', element:<Layout/>,
    children: [
      {index: true, element: <App/>},
      {path:'/dashboard', element:<Dashboard/>},
      {path:'/login', element:<Login/>},
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
