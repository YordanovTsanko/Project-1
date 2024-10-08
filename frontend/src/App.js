import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Components/Products/ProductDetail";
import SingleCategory from "./Components/Products/SingleCategory";
import Navigation from "./Components/Layouts/Navigation";
import ProtectedRoute from "./Components/Layouts/ProtectedRoute";
import Payment from "./Components/Cart/Payment";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "./Components/Cart/CheckoutForm";
import UpdateDetails from "./Components/Auth/UpdateDetails";
import ForgotPasswordForm from "./Components/Auth/ForgotPasswordForm";
import AdminProductPage from "./Components/Admin/Pages/AdminProductPage";
import AdminHomePage from "./Components/Admin/Pages/AdminHomePage";
import CopyRight from "./Components/Layouts/CopyRight";
import Profile from "./Components/Auth/Profile";
import ProfileOrders from "./Components/Auth/ProfileOrders";
import SingleOrder from "./Components/Auth/SingleOrder";
import ThanksForOrder from "./Components/Cart/ThanksForOrder";
import AdminUsersPage from "./Components/Admin/Pages/AdminUsersPage";
import SingleProduct from "./Components/Admin/Components/Products/SingleProduct";
import AdminOrdersPage from "./Components/Admin/Pages/AdminOrdersPage";
import AdminProtectedRoute from "./Components/Admin/Components/AdminProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        toastClassName="toastContainerBox"
        transition={Flip}
        position="top-center"
      />
      <Router>
        <Navigation />
        <div className="margin">
          <Routes>
            {/*User Routes  */}
            <Route path="/" index element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route element={<ProtectedRoute element={<Profile />} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute element={<UpdateDetails />} />}>
              <Route path="/profile/edit" element={<UpdateDetails />} />
            </Route>
            <Route element={<ProtectedRoute element={<ProfileOrders />} />}>
              <Route path="/profile/orders" element={<ProfileOrders />} />
            </Route>
            <Route element={<ProtectedRoute element={<SingleOrder />} />}>
              <Route path="/profile/order/:id" element={<SingleOrder />} />
            </Route>
            <Route path="/product/type/:cat" element={<SingleCategory />} />
            <Route path="/product/type/:cat/:id" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order/placed" element={<ThanksForOrder />} />

            {/* Admin Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminHomePage />} />
              <Route path="/admin/products" element={<AdminProductPage />} />
              <Route path="/admin/product/:id" element={<SingleProduct />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
            </Route>
          </Routes>
        </div>
        <CopyRight />
      </Router>
    </>
  );
}
export default App;
