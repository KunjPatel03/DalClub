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

const AppRoutes = () => {
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
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes