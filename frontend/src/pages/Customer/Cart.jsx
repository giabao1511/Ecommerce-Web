import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Button, CartItem, Helmet, numberWithCommas } from "../../imports/index"

const Cart = () => {
  // const arr1 = [1, 2, 3, 4, 5]
  // const arr2 = [2, 3]
  // console.log(arr1.filter(e => arr2.includes(e)), "test");
  
  const cartItems = useSelector(state => state.cart.value)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0))
  }, [cartItems])

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>
              Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
            </p>
            <div className="cart__info__txt__price">
              <span>Thành tiền: </span>
              <span>{numberWithCommas(totalPrice)}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block">Đặt hàng</Button>
            <Link to="/catalogue">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartItems.length > 0
            ?
            cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
            :
            (
              <p className="cart__list__none">Hiện chưa có sản phẩm nào trong giỏ hàng !</p>
            )
          }
        </div>
      </div>
    </Helmet>
  )
}

export default Cart