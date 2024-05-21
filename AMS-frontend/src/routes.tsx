import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";


const router = createBrowserRouter(
    [
        {
            path:"/login",
            element: <Login />
        },
        {
            path:"/register",
            element: <Register />
        },
        {
            path:"/dashboard",
            element: <Dashboard />
        },
        {
            path:"*",
            element: <NotFound />
        },

    ]
)

export default router;
