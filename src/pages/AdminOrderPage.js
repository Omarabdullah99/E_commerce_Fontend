import AdminOrder from "../features/admin/component/AdminOrder";
import Navbar from "../features/navbar/Navbar";

function AdminOrdersPage() {
    return ( 
        <div>
            <Navbar>
                <AdminOrder></AdminOrder>
            </Navbar>
        </div>
     );
}

export default AdminOrdersPage;