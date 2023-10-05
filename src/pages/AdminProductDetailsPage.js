import AdminProductDetail from "../features/admin/component/AdminProductDetails";
import Navbar from "../features/navbar/Navbar";

function AdminProductDetailsPage() {
    return ( 
        <div>
        <Navbar>
           <AdminProductDetail></AdminProductDetail>
        </Navbar>
        
        </div>
     );
}

export default AdminProductDetailsPage;