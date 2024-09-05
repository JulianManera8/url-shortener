import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./components/require-auth";
import AppLayout from "./layouts/AppLayout";
import UrlProvider from './context';

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const SingleLink = lazy(() => import("./pages/Link"));
const RedirectLink = lazy(() => import("./pages/RedirectLink"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </Suspense>
        )
      },
      {
        path: '/dashboard',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <Dashboard />
            </Suspense>
          </RequireAuth>
        )
      },
      {
        path: '/auth',
        element: (
          <Suspense fallback={<div>Loading Auth...</div>}>
            <Auth />
          </Suspense>
        )
      },
      {
        path: '/link/:id',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>Loading Single Link...</div>}>
              <SingleLink />
            </Suspense>
          </RequireAuth>
        )
      },
      {
        path: '/:id',
        element: (
          <Suspense fallback={<div>Redirecting...</div>}>
            <RedirectLink />
          </Suspense>
        )
      },
    ]
  }
]);

export default function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
  );
}
