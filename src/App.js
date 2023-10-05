
import Home from "./pages/Home";

import {createBrowserRouter, RouterProvider, Route, Link} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchCartItemByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrder";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserOrderSideAsync, fetchLoggedInUserOrdersAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/Logout";
import ForgotPassword from "./features/auth/components/ForgetPassword";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import ProductForm from "./features/admin/component/ProductForm";
import AdminOrdersPage from "./pages/AdminOrderPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { fetchAddressItemByUserIdAsync } from "./features/address/addressSlice";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path:'/admin',
    element:<ProtectedAdmin> <AdminHome></AdminHome> </ProtectedAdmin>
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignUpPage></SignUpPage>,
  },
  {
    path:'/cart',
    element:<CartPage></CartPage>
  },
  {
    path:'/checkout',
    element:<Protected><CheckOut></CheckOut></Protected>
  },
  {
    path:'/productdetails/:id',
    element:<ProductDetailsPage></ProductDetailsPage>
  },

  {
    path:'/admin/productdetails/:id',
    element:<ProtectedAdmin> <AdminProductDetailsPage></AdminProductDetailsPage> </ProtectedAdmin>
  },
  
  {
    path:'/ordersuccess/:id',
    element:<OrderSuccessPage></OrderSuccessPage>
  },
  {
    path:'/orders',
    element:<UserOrderPage></UserOrderPage>
  },
  {
    path:'/profile',
    element:<UserProfilePage></UserProfilePage>
  },
  {
    path:'/logout',
    element:<LogOut></LogOut>
  },
  {
    path:'/forgetPassword',
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path:'/admin/producform',
    element:<ProtectedAdmin> <ProductForm></ProductForm> </ProtectedAdmin>
  },
  {
    path:'/admin/producform/edit/:id',
    element:<ProtectedAdmin> <ProductForm></ProductForm> </ProtectedAdmin>
  },
  {
    path:'/admin/orders',
    element:<ProtectedAdmin> <AdminOrdersPage></AdminOrdersPage> </ProtectedAdmin>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  }
]);
function App() {


  const dispatch=useDispatch()
  // const user=useSelector(selectLoggedInUser)
  // console.log("appuser",user)

      // //!register/login korar por refresh korle oita chole jay. ai problem solve korar jonno
    const user= JSON.parse(localStorage.getItem("ecommerce"))
    useEffect(() => {
      dispatch(setUser(user))
      
    }, [user])

    console.log('appuser',user)

  useEffect(()=>{
    if(user){
      dispatch(fetchCartItemByUserIdAsync(user?.result?.id))
      dispatch(fetchLoggedInUserOrdersAsync(user?.result?.id))
      dispatch(fetchAddressItemByUserIdAsync(user?.result?.id))
    }
  },[dispatch, user])

  return (
    <div className="App">
    <Provider template={AlertTemplate} {...options}>
    <RouterProvider router={router} />
    </Provider>
    </div>
  );
}

export default App;
