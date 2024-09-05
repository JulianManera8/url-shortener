import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./LAYOUTS/AppLayout"
import LandingPage from "./PAGES/LandingPage"
import Dashboard from "./PAGES/Dashboard"
import Auth from "./PAGES/Auth"
import SingleLink from "./PAGES/Link"
import RedirectLink from "./PAGESRedirectLink"
import RequireAuth from "./COMPONENTS/require-auth"

import UrlProvider from './context'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: 
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: 
        <RequireAuth>
          <SingleLink />
        </RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      },
    ]
  }
])

export default function App() {

  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
  )
}