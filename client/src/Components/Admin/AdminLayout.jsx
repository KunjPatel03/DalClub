import React from "react"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <>
    <div>
      Admin header
    </div>
    <div><Outlet /></div>
    </>
  )
}

export default AdminLayout