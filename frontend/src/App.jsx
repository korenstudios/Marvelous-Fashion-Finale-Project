import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { DataProvider } from "./components/common/globalState";
import ProtectedRoute from "./components/common/protectedRoute";
import Announcement from "./components/announcement";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import UserProfile from "./components/userProfile";
import MyProducts from "./components/myProducts";
import ProductItem from "./components/productItem";
import ForgotPassword from "./components/forgotPassword";
import Login from "./components/login";
import Register from "./components/register";
import About from "./components/about";
import LogOut from "./components/logout";
import OrderHistory from "./components/orderHistory";
import PaypalOrderDetails from "./components/paypalOrderDetails";
import StripeOrderDetails from "./components/stripeOrderDetails";
import UserManagement from "./components/userManagement";
import UserDetails from "./components/userDetails";
import Categories from "./components/categories";
import ProductFactory from "./components/productFactory";
import Cart from "./components/cart";
import Wishlist from "./components/wishlist";
import NotFound from "./components/notFound";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <ToastContainer />
        <Announcement />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/products" element={<MyProducts />} />
          <Route path="/item/:id" element={<ProductItem />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<About />} />
          <Route
            path="/product-factory"
            element={
              <ProtectedRoute adminOnly>
                <ProductFactory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/item/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <ProductFactory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute adminOnly>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute adminOnly>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute adminOnly>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history/paypal/:id"
            element={
              <ProtectedRoute>
                <PaypalOrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history/stripe/:id"
            element={
              <ProtectedRoute>
                <StripeOrderDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;
