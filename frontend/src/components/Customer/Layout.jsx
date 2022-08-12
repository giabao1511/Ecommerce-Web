import React from 'react'
import { Outlet } from 'react-router-dom'
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
    </>
  )
}

export default Layout