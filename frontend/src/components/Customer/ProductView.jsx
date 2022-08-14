import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, numberWithCommas } from "../../imports/index";
import { addItem } from '../../redux/cartSlice';
import { removeDataModal } from '../../redux/productSlice';

const ProductView = props => {
    const dispatch = useDispatch();
    let product = props.product;

    if (!product) {
        product = {
            title: "",
            price: '',
            image01: null,
            image02: null,
            categorySlug: "",
            colors: [],
            slug: "",
            size: [],
            description: ""
        }
    }

    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState(product.image01);
    const [descriptionExpand, setDescriptionExpand] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        if (type === "minus") {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const checkChoose = () => {
        if (!color) {
            toast.warn('Vui lòng chọn màu sắc');
            return false;
        }

        if (!size) {
            toast.warn('Vui lòng chọn kích cỡ');
            return false;
        }

        return true;
    }

    const addToCart = () => {
        if (checkChoose()) {
            dispatch(addItem({
                slug: product.slug,
                color,
                size,
                quantity,
                price: product.price
            }))
            toast.success("Đã thêm vào giỏ hàng !")
        }
    }

    const gotoCart = () => {
        if (checkChoose()) {
            dispatch(addItem({
                slug: product.slug,
                color,
                size,
                quantity,
                price: product.price
            }))
            dispatch(removeDataModal())
            navigate('/cart')
        }
    }

    useEffect(() => {
        setPreviewImg(product.image01);
        setColor(undefined);
        setSize(undefined);
        setQuantity(1);
    }, [product])

    return (
        <>
            <div className="product">
                <div className="product__images">
                    <div className="product__images__list">
                        <div className="product__images__list__item">
                            <img src={product.image01} alt="" onClick={() => setPreviewImg(product.image01)} />
                        </div>
                        <div className="product__images__list__item">
                            <img src={product.image02} alt="" onClick={() => setPreviewImg(product.image02)} />
                        </div>
                    </div>
                    <div className="product__images__main">
                        <img src={previewImg} alt="" />
                    </div>
                    <div className={`product-description ${descriptionExpand && "expand"}`}>
                        <div className="product-description__title">
                            Chi tiết sản phẩm
                        </div>
                        <div
                            className="product-description__content"
                            dangerouslySetInnerHTML={{ __html: product.description }}>
                        </div>
                        <div
                            className="product-description__toggle"
                            onClick={() => setDescriptionExpand(!descriptionExpand)}
                        >
                            <Button size="sm">
                                {descriptionExpand ? "Thu gọn" : "Xem thêm"}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="product__info">
                    <h1 className="product__info__title">
                        {product.title}
                    </h1>
                    <div className="product__info__item">
                        <span className="product__info__item__price">
                            {numberWithCommas(product.price)}
                        </span>
                    </div>
                    <div className="product__info__item">
                        <span className="product__info__item__title">
                            Màu sắc
                        </span>
                        <div className="product__info__item__list">
                            {
                                product.colors.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`product__info__item__list__item 
                                                ${color === item && 'active'}`}
                                        onClick={() => setColor(item)}
                                    >
                                        <div className={`circle bg-${item}`}></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="product__info__item">
                        <span className="product__info__item__title">
                            Kích cỡ
                        </span>
                        <div className="product__info__item__list">
                            {
                                product.size.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`product__info__item__list__item 
                                                ${size === item && 'active'}`}
                                        onClick={() => setSize(item)}
                                    >
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="product__info__item">
                        <span className="product__info__item__title">
                            Số lượng
                        </span>
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
                    <div className="product__info__item">
                        <Button onClick={addToCart}>thêm vào giỏ</Button>
                        <Button onClick={gotoCart}>mua ngay</Button>
                    </div>
                </div>
            </div >
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

ProductView.propTypes = {
    product: PropTypes.object
}

export default ProductView