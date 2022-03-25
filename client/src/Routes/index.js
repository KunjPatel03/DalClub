import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/DashboardPage';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserHeader from '../Components/Users/Header';
import Homepage from '../Pages/Users/Homepage';
import UserLogin from '../Pages/Users/UserLogin';
import EventList from '../Pages/Users/EventList';
import EventDetails from '../Pages/Users/EventDetails';
import StorePage from '../Pages/Users/StorePage';
import ProductPage from '../Pages/Users/ProductPage';
import CartPage from '../Pages/Users/CartPage';
import OrdersPage from '../Pages/Users/OrdersPage';
import Home from '../Components/Admin/Home';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes without layout */}
        <Route path='/admin/login' element={<AdminLogin />} />
        {/* Admin routes with layout */}
        <Route path='' element={<Home />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>

        {/* User routes without header */}
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/' element={<UserHeader />}>
          {/* User routes with header */}
          <Route index element={<Homepage />} />
          <Route path='/events' element={<EventList />} />
          <Route path='/eventDetails/:eventId' element={<EventDetails />} />
          <Route path='/store/products' element={<StorePage />} />
          <Route path='/store/products/:id' element={<ProductPage />} />
          <Route path='/store/cart' element={<CartPage />} />
          <Route path='/store/orders' element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
