import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './components/layout/Main';
import Home from './components/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pages from './components/pages/Pages';
import Invoice from './components/pages/Invoice';
import EditPage from './components/pages/EditPage';

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
        path:'/editpage/:id',
        element:<EditPage/>
      }
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
