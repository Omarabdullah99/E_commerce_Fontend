import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrder";

function UserOrderPage() {
    return ( 
        <div>
        <Navbar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
            <UserOrders></UserOrders>
        </Navbar>
        </div>
     );
}

export default UserOrderPage;