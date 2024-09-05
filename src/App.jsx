import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./LAYOUTS/AppLayout";
import RequireAuth from "./COMPONENTS/require-auth";
import UrlProvider from './context';

// Carga dinámica (code-splitting) para las páginas
const LandingPage = lazy(() => import("./PAGES/LandingPage"));
const Dashboard = lazy(() => import("./PAGES/Dashboard"));
const Auth = lazy(() => import("./PAGES/Auth"));
const SingleLink = lazy(() => import("./PAGES/Link"));
const RedirectLink = lazy(() => import("./PAGES/RedirectLink"));

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
