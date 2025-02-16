import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Verify from "./pages/Verify";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/signin",
        element: <Signin />,
    },
    {
        path: "/verify",
        element: <Verify />,
    },
]);

const Routes = () => {
    return <RouterProvider router={router} />;
};

export default Routes;
