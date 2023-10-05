import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/productlist/component/ProductDetails";
function ProductDetailsPage() {
    return ( 
        <div>
        <Navbar>
           <ProductDetail></ProductDetail>
        </Navbar>
        <Footer></Footer>
        </div>
     );
}

export default ProductDetailsPage;