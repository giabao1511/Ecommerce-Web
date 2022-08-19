import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ProductView } from "../../imports/index"
import { getDetailProduct } from '../../redux/apiRequest'
import { clearDetailProduct, removeDataModal } from '../../redux/productSlice'

const Modal = () => {
    const dispatch = useDispatch();
    const productSlug = useSelector(state => state.product.modal)
    const product = useSelector(state => state.product.detailProduct);

    useEffect(() => {
        if (productSlug) {
            dispatch(getDetailProduct(productSlug))
        }

        return () => {
            dispatch(clearDetailProduct())
        }
    }, [dispatch, productSlug])

    return (
        <div className={`modal ${productSlug && 'active'}`}>
            <div className="modal__content">
                <ProductView product={product} />
                <div className="modal__content__close">
                    <Button
                        size="sm"
                        onClick={() => dispatch(removeDataModal())}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Modal