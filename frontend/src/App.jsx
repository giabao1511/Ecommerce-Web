import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Catalogue from './pages/Catalogue'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/catalogue/:slug" element={<Product />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App