import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, Catalogue, Product, Cart, Home, Login } from "./imports/index"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogue/:slug" element={<Product />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App