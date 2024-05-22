import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import DefaultLayout from "./layout/DefaultLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./views/Users";
import Artists from "./views/Artists";


const router = createBrowserRouter(
    [

        {
            path:"/",
            element:<DefaultLayout />,
            children:[
                 {
                    path:"/",
                    element:<Login/>
                },
                {
                    path:"/login",
                    element: <Login />
                },
                {
                    path:"/register",
                    element: <Register />
                },
            ]
        },
        {
            path:"/",
            element:<DashboardLayout />,
            children:[
                {
                    path:"/dashboard",
                    element: <Dashboard />,
                },
                {
                    path:"/users",
                    element: <Users />
                },
                {
                    path:"/artists",
                    element: <Artists />
                },
            ]
        },

        {
            path:"*",
            element: <NotFound />
        },

    ]
)

export default router;
