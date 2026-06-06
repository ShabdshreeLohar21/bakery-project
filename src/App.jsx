import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

import Cake from './components/Cake'
import Pastries from './components/Pastries'
import Donuts from './components/Donuts'
import Cupcakes from './components/Cupcakes'
import PremiumDeserts from './components/PremiumDeserts'
import Search from './components/Search'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import MyOrders from './components/MyOrders'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts'
import Account from './components/Account'
import EditProfile from './components/EditProfile'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import Wishlist from './components/Wishlist'

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/cakes" element={<Cake />} />

        <Route path="/pastries" element={<Pastries />} />

        <Route path="/donuts" element={<Donuts />} />

        <Route path="/cupcakes" element={<Cupcakes />} />

        <Route
          path="/premiumdeserts"
          element={<PremiumDeserts />}
        />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/myorders" element={<MyOrders />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/account" element={<Account />} />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
  path="/admin/dashboard"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedAdminRoute>
      <AdminOrders />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <ProtectedAdminRoute>
      <AdminProducts />
    </ProtectedAdminRoute>
  }
/>

      </Routes>

      <footer>
        @2026 SugarPlum Desserts , New York. All Rights Reserved 
      </footer>
    </>
  )
}

export default App