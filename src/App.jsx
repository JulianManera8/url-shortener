import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./LAYOUTS/AppLayout"
import LandingPage from "./PAGES/LandingPage"
import Dashboard from "./PAGES/dashboard"
import Auth from "./PAGES/auth"
import Link from "./PAGES/Link"
import RedirectLink from "./PAGES/redirectLink"

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
        element: <Dashboard />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link:id',
        element: <Link />
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
    <RouterProvider router={router}/>
  )
}