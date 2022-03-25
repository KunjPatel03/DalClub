import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLayout from "../Components/Admin/AdminLayout";
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminLogin from "../Pages/Admin/AdminLogin";
import UserHeader from "../Components/Users/Header"
import Homepage from "../Pages/Users/Homepage";
import UserLogin from "../Pages/Users/UserLogin";
import EventList from "../Pages/Users/EventList";
import EventDetails from "../Pages/Users/EventDetails";
import RegisteredEvents from "../Pages/Users/RegisteredEvents";
import PaymentStatus from "../Pages/Users/PaymentStatus";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const AppRoutes = () => {
  const loadStripeKey = loadStripe("pk_test_51KgEo1GMutfkjZDFgZN4zTuVLFDNLlUzae99RhzKMjWXlcBg6y0dIFKSRg3AMPZKaJLGuvUGT8MeDqe6tAzcCbfb00Ko70FnbZ");

  return (
    <BrowserRouter>
    <Routes>
      {/* Admin routes without layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        {/* Admin routes with layout */}
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* User routes without header */}
      <Route path="/user/login" element={<UserLogin />} />

      <Route path="/" element={<UserHeader />}>
        {/* User routes with header */}
        <Route index element={<Homepage />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/eventDetails/:eventId" element={<EventDetails />} />
        <Route path="/registeredEvents" element={<RegisteredEvents />} />
        <Route path="/paymentStatus" element={<Elements stripe={loadStripeKey}><PaymentStatus /></Elements>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes