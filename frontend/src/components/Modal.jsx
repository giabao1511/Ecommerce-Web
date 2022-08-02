import React, { useEffect, useState } from 'react'
import productData from '../assets/fake-data/products'
import ProductView from "../components/ProductView"
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../redux/productModalSlice'

const Modal = () => {
    const dispatch = useDispatch();
    const productSlug = useSelector(state => state.productModal.value)
    const [product, setProduct] = useState(undefined)

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug))
    }, [productSlug])

    return (
        <div className={`modal ${product && 'active'}`}>
            <div className="modal__content">
                <ProductView product={product} />
                <div className="modal__content__close">
                    <Button
                        size="sm"
                        onClick={() => dispatch(remove())}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Modal