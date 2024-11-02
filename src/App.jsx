import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContaUs";
import Home from "./Home";
import NonVeg from "./NonVeg";197255777041
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";
import './App.css'
import { useSelector } from "react-redux";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginComponent from "./FacebookLoginComponent";

function App()
{
  const cartItems = useSelector((state) => state.cart || []); // Renamed variable to avoid conflict
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return(
  <>
  <h1>this is home</h1>
  <GoogleOAuthProvider clientId="197255777041-bpm00taj4k8nqvqg9cgevnsmks40mqvi.apps.googleusercontent.com">
  <GoogleLoginComponent />
  </GoogleOAuthProvider>
  <FacebookLoginComponent />
  <BrowserRouter>
  <Link to="/home">Home</Link>
  <Link to="/veg">Veg</Link>
  <Link to="/nonveg">NonVeg</Link>
  <Link to="/cart">Cart{totalItems}</Link>
  <Link to="/purchasehistory">PurchaseHistory</Link>
  <Link to="/aboutus">AboutUs</Link>
  <Link to="/contactus">ContactUs</Link>

 
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/veg" element={<Veg />} />
    <Route path="/nonveg" element={<NonVeg />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/purchasehistory" element={<PurchaseHistory />} />
    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/contactus" element={<ContactUs />} />

  </Routes>
  </BrowserRouter>
  
    </>
  )
}
export default App;
