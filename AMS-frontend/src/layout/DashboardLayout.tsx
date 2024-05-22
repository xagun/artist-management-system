import { useStateContext } from "@/context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {

    const {user, token} = useStateContext();

    if(!token){
        return <Navigate to ="/login" />
    }


  return (
    <div>
        <Outlet />
    </div>
  )
}
