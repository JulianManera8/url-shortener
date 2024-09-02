import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./LAYOUTS/AppLayout"
import LandingPage from "./PAGES/LandingPage"
import Dashboard from "./PAGES/dashboard"
import Auth from "./PAGES/auth"
import Link from "./PAGES/Link"
import RedirectLink from "./PAGES/redirectLink"
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
          <Link />
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