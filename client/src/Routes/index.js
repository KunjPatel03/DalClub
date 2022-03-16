import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLayout from "../Components/Admin/AdminLayout";
import AdminDashboard from "../Pages/Admin/Dashboard";
import AdminLogin from "../Pages/Admin/AdminLogin";
import UserHeader from "../Components/Users/Header"
import Homepage from "../Pages/Users/Homepage";
import UserLogin from "../Pages/Users/UserLogin";

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
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes