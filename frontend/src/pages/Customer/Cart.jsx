import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { CartItem, Helmet, numberWithCommas, Button } from "../../imports/index"
import { productData } from "../../imports/assets"

const Cart = () => {
  const cartItems = useSelector(state => state.cart.value)
  const [cartProducts, setCardProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setCardProducts(productData.getCartItemsDetail(cartItems))
    setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0))
  }, [cartItems])

  console.log(cartProducts, "re-render");

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
          {cartProducts.length > 0
            ?
            cartProducts.map((item, index) => (
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