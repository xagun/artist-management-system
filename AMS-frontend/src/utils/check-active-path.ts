import { useLocation } from "react-router-dom";



export const checkActivePath = (path:string) =>{
const location = useLocation();

const pathName = location.pathname;

    return pathName.includes(path);

}
