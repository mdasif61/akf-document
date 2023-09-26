import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './components/layout/Main';
import Home from './components/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pages from './components/pages/Pages';
import Invoice from './components/pages/Invoice';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/pages',
        element:<Pages/>
      },
      {
        path:'/invoice/:id',
        element:<Invoice/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      }
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster/>
    </QueryClientProvider>
  </React.StrictMode>,
)
