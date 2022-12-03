import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet, inputRequirement } from '../../imports'
import { loginUser } from '../../redux/apiRequest'

const Login = () => {
    const dispatch = useDispatch()
    const { usernameRequire, passwordLoginRequire } = inputRequirement();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.auth.currentUser)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const handleSubmitForm = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        if (currentUser) {
            if (currentUser?.statusCode === 406) {
                toast.warn(currentUser?.message)
            } else {
                toast.success(currentUser?.message)
                navigate("/");
            }
        }
    }, [currentUser, navigate])


    return (
        <>
            <Helmet title="Đăng nhập" />
            <div className="auth">
                <div className="auth__title">Đăng nhập</div>
                <div className="auth__item">
                    <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
                        <div className="auth__item__input">
                            <label htmlFor="username">Tên người dùng:</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Mời nhập tên người dùng"
                                {...register("username", usernameRequire)}
                                name="username"
                            />
                            <p style={{ color: "red" }}>
                                {errors?.username?.type === "required" &&
                                    "Mời bạn nhập tên người dùng!"}
                                {errors?.username?.type === "maxLength" &&
                                    "Tên người dùng không được quá 20 kí tự"}
                            </p>
                        </div>

                        <div className="auth__item__input">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Mời nhập mật khẩu"
                                {...register("password", passwordLoginRequire)}
                                name="password"
                            />
                            <p style={{ color: "red" }}>
                                {errors?.password?.type === "required" &&
                                    "Mời bạn nhập đầy đủ mật khẩu! "}
                            </p>
                        </div>
                        <button className="auth__item__button">
                            Đăng nhập
                        </button>
                    </form>
                    <Link to="/">
                        Quên mật khẩu ?
                    </Link>
                    <div className="auth__item__more">
                        <div className="auth__item__more__line"></div>
                        <span className="auth__item__more__content">HOẶC</span>
                        <div className="auth__item__more__line"></div>
                    </div>
                    <div className="auth__item__social">
                        <div className="auth__item__social__item">
                            <i className="fab fa-facebook-square"></i>
                            <span>Facebook</span>
                        </div>
                        <div className="auth__item__social__item">
                            <i className="fab fa-google"></i>
                            <span>Google</span>
                        </div>
                        <div className="auth__item__social__item">
                            <i className="fab fa-apple"></i>
                            <span>Apple</span>
                        </div>
                    </div>
                    <div className="auth__item__direct">
                        <span>{`Bạn mới biết đến Yolo? `}
                            <Link to="/register">
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