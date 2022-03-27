import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/AdminHome';
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
import Home from '../Components/Admin/Dashboard';
import RegisteredEvents from '../Pages/Users/RegisteredEvents';
import PaymentStatus from '../Pages/Users/PaymentStatus';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Careers from '../Pages/Users/Careers';
import JobApplication from '../Pages/Users/JobApplication';

const AppRoutes = () => {
  const loadStripeKey = loadStripe(
    'pk_test_51KgEo1GMutfkjZDFgZN4zTuVLFDNLlUzae99RhzKMjWXlcBg6y0dIFKSRg3AMPZKaJLGuvUGT8MeDqe6tAzcCbfb00Ko70FnbZ'
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes without layout */}
        <Route path='/admin/login' element={<AdminLogin />} />
        {/* Admin routes with layout */}
        <Route path='/admin/dashboard' element={<AdminDashboard />}>
          <Route path='' element={<Home />} />
        </Route>

        {/* User routes without header */}
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/' element={<UserHeader />}>
          {/* User routes with header */}
          <Route index element={<Homepage />} />
          <Route path='/events' element={<EventList />} />
          <Route path='/eventDetails/:eventId' element={<EventDetails />} />
          <Route path='/registeredEvents' element={<RegisteredEvents />} />
          <Route
            path='/paymentStatus'
            element={
              <Elements stripe={loadStripeKey}>
                <PaymentStatus />
              </Elements>
            }
          />
          <Route path='/store/products' element={<StorePage />} />
          <Route path='/store/products/:id' element={<ProductPage />} />
          <Route path='/store/cart' element={<CartPage />} />
          <Route path='/store/orders' element={<OrdersPage />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/careers/application/:jobId' element={<JobApplication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
