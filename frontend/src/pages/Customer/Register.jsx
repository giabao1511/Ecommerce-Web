import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet, inputRequirement } from "../../imports";
import { registerCustomer } from '../../redux/apiRequest';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { usernameRequire, passwordRegisterRequire, emailRequire } = inputRequirement();
    const registerCustomerData = useSelector(state => state.auth.registerCustomer)

    const {
        getValues,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const handleSubmitForm = (data) => {
        dispatch(registerCustomer(data))
    };

    useEffect(() => {
        if (registerCustomerData) {
            if (registerCustomerData?.statusCode === 406) {
                toast.warn(registerCustomerData?.message)
            } else {
                toast.success(registerCustomerData?.message)
                navigate("/login");
            }
        }
    }, [registerCustomerData, navigate])

    return (
        <>
            <Helmet title="Đăng ký" />
            <div className="auth">
                <div className="auth__title">Đăng ký</div>
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
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Mời nhập email"
                                {...register("email", emailRequire)}
                                name="email"
                            />
                            <p style={{ color: "red" }}>
                                {errors?.email?.type === "required" &&
                                    "Mời bạn nhập email!"}
                                {errors?.email?.type === "pattern" &&
                                    "Mời nhập email đúng định dạng. Vd: abc@gmail.com"}
                            </p>
                        </div>

                        <div className="auth__item__input">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Mời nhập mật khẩu"
                                {...register("password", passwordRegisterRequire)}
                                name="password"
                            />
                            <p style={{ color: "red" }}>
                                {errors?.password?.type === "required" &&
                                    "Mời bạn nhập đầy đủ mật khẩu! "}
                                {errors?.password?.type === "minLength" &&
                                    "Mật khẩu của bạn phải 6 kí tự trở lên !!"}
                                {errors?.password?.type === "pattern" &&
                                    "Mật khẩu phải chứa chữ, số và kí tự đặt biệt !"}
                            </p>
                        </div>

                        <div className="auth__item__input">
                            <label htmlFor="confirm__password">Nhập lại mật khẩu:</label>
                            <input
                                id="confirm__password"
                                type="password"
                                placeholder="Mời nhập mật khẩu"
                                {...register("confirmPwd", {
                                    required: true,
                                    validate: (value) =>
                                        value === getValues("password") ||
                                        "The passwords do not match",
                                })}
                                name="confirmPwd"
                            />
                            <p style={{ color: "red" }}>
                                {errors?.confirmPwd?.type === "required" &&
                                    "Mời bạn nhập lại mật khẩu! "}
                                {errors.confirmPwd?.type === "validate" &&
                                    "Mật khẩu nhập lại không khớp!   "}
                            </p>
                        </div>
                        <button className="auth__item__button">
                            Đăng ký
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
                        <span>{`Đã có tài khoản? `}
                            <Link to="/login">
                                Đăng nhập
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register