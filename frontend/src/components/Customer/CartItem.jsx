import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../imports/index'
import { useDispatch } from 'react-redux'
import { removeItem, updateItem } from '../../redux/cartSlice'
import Swal from 'sweetalert2'

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch()

    const updateQuantity = (type) => {
        if (type === "minus") {
            dispatch(updateItem({ ...item, quantity: quantity - 1 }))
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        } else {
            dispatch(updateItem({ ...item, quantity: quantity + 1 }))
            setQuantity(quantity + 1)
        }
    }

    const removeCartItem = () => {
        Swal.fire({
            title: 'Bạn có muốn xóa sản phẩm không?',
            text: "Bạn sẽ không thể thu hồi sản phẩm!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tôi muốn!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Hoàn tất!',
                    'Đã xóa sản phẩm trong giỏ hàng.',
                    'success'
                ).then(() => {
                    dispatch(removeItem(item))
                })
            }
        })
    }

    return (
        <div className="cart__item">
            <div className="cart__item__image">
                <img src={item.product.image01} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalogue/${item.slug}`}>
                        {`${item.product.title} - ${item.color} - Size: `}
                        <span style={{ textTransform: 'uppercase' }}>
                            {item.size}
                        </span>
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(Number(item.product.price))}
                </div>
                <div className="cart__item__info__quantity">
                    <span className="product__info__item__quantity">
                        <div
                            className="product__info__item__quantity__btn"
                            onClick={() => updateQuantity("minus")}
                        >
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div
                            className="product__info__item__quantity__btn"
                            onClick={() => updateQuantity("plus")}
                        >
                            <i className="bx bx-plus"></i>
                        </div>
                    </span>
                </div>
                <div
                    className="cart__item__info__del"
                    onClick={removeCartItem}
                >
                    <i className="bx bx-trash"></i>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem