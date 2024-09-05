import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./COMPONENTS/require-auth";
import AppLayout from "./LAYOUTS/AppLayout";
import UrlProvider from "./context";

import LoadingCard from "./COMPONENTS/loadingCard";

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
        path: "/",
        element: (
          <Suspense fallback={<LoadingCard msg={'Loading...'}/>}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Suspense fallback={<LoadingCard />}>
              <Dashboard />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<LoadingCard />}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Suspense fallback={<LoadingCard />}>
              <SingleLink />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: (
          <Suspense fallback={<LoadingCard />}>
            <RedirectLink />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}
