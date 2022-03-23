import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/DashboardPage';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserHeader from '../Components/Users/Header';
import Homepage from '../Pages/Users/Homepage';
import UserLogin from '../Pages/Users/UserLogin';
import EventList from '../Pages/Users/EventList';
import Home from '../Components/Admin/Home';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes without layout */}
        <Route path='/admin/login' element={<AdminLogin />} />

        <Route path='/admin/dashboard' element={<AdminDashboard />}>
          {/* Admin routes with layout */}
          <Route path='' element={<Home />} />
        </Route>

        {/* User routes without header */}
        <Route path='/user/login' element={<UserLogin />} />

        <Route path='/' element={<UserHeader />}>
          {/* User routes with header */}
          <Route index element={<Homepage />} />
          <Route path='/events' element={<EventList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
