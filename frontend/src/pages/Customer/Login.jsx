import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet, Input } from '../../imports'

const Login = () => {
    return (
        <>
            <Helmet title="Đăng nhập" />
            <div className="login">
                <div className="login__title">Đăng nhập</div>
                <div className="login__item">
                    <Input index={1} classStyle="login__item__input" label="Tên người dùng:" placeholder="Mời nhập tên người dùng" inputType="text" />
                    <Input index={2} classStyle="login__item__input" label="Mật khẩu:" placeholder="Mời nhập mật khẩu" inputType="password" />
                    <Link to="/">
                        <button className="login__item__button">
                            Đăng nhập
                        </button>
                    </Link>
                    <Link to="/">
                        Quên mật khẩu ?
                    </Link>
                    <div className="login__item__more">
                        <div className="login__item__more__line"></div>
                        <span className="login__item__more__content">HOẶC</span>
                        <div className="login__item__more__line"></div>
                    </div>
                    <div className="login__item__social">
                        <div className="login__item__social__item">
                            <i class="fab fa-facebook-square"></i>
                            <span>Facebook</span>
                        </div>
                        <div className="login__item__social__item">
                            <i class="fab fa-google"></i>
                            <span>Google</span>
                        </div>
                        <div className="login__item__social__item">
                            <i class="fab fa-apple"></i>
                            <span>Apple</span>
                        </div>
                    </div>
                    <div className="login__item__direct">
                        <span>{`Bạn mới biết đến Yolo? `} 
                            <Link to="/">
                                Đăng ký ngay
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login