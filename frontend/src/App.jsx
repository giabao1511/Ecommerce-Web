import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart, Catalogue, Home, Layout, Login, Product, ProfileUser, Register } from "./imports/index"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalogue/:slug" element={<Product />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/account/profile/:id" element={<ProfileUser />} />
      </Route>
    </Routes>
  )
}

export default App