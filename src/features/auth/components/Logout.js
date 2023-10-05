import { Navigate } from "react-router-dom";
import { selectLoggedInUser, setLogout, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// {!user && <Navigate to={'/login'} replace={true}></Navigate>}

function LogOut() {
    const dispatch=useDispatch()
    const user=useSelector(selectLoggedInUser)
    console.log('userlogout',user)
    dispatch(setLogout())



    return ( 
       <div>
        {!user && <Navigate to={'/login'} replace={true}></Navigate>} 
       </div>
     );
}

export default LogOut;