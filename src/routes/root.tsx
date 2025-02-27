import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import Login from "../pages/login-page";
import { NotFoundPage } from "../pages/not-found-page";
import RegisterPage from "../pages/register-page";
import routeDashboard from "./dashboard";


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
    ...routeDashboard,
]);


export default router;