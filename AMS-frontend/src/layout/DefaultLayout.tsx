import { useStateContext } from "@/context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";


export default function DefaultLayout() {

    const {token} = useStateContext();

    if(token){
        return <Navigate to = "/dashboard" />
    }

  return (
    <div>
        Welcome to the Artist Management System
        {/* This Outlet is used to render child route elements here which is defined in routes.tsx*/}
        <Outlet />
    </div>
  )
}
