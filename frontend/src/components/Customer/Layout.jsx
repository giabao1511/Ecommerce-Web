import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header, Footer, Modal } from "../../imports/index"

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="main">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Modal />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Layout