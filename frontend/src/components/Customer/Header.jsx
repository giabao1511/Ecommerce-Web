import { Badge } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux"
import { Link, useLocation } from 'react-router-dom'
import { logo } from '../../imports/assets'

const navInfo = [
  {
    displayText: "Trang chủ",
    path: "/"
  },
  {
    displayText: "Sản phẩm",
    path: "/catalogue"
  },
  {
    displayText: "Phụ kiện",
    path: "/accessories"
  },
  {
    displayText: "Liên hệ",
    path: "/contact"
  }
]

const Header = () => {
  const { pathname } = useLocation();
  const cartItems = useSelector(state => state.cart.value)
  const activeNavIdx = navInfo.findIndex(e => e.path === pathname)
  const headerRef = useRef(null);
  const menuLeftRef = useRef(null);
  const { currentUser } = useSelector(state => state.auth)
  const user = currentUser?.element;
  const menuToggle = () => {
    menuLeftRef.current.classList.toggle("active");
  }

  console.log(cartItems, "ashduashdh");

  useEffect(() => {
    const shrinkCondition = () => {
      if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    }

    window.addEventListener("scroll", shrinkCondition)

    return () => {
      window.removeEventListener("scroll", shrinkCondition)
    }
  }, [])
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className='bx bx-menu-alt-left'></i>
          </div>
          <div className="header__menu__left" ref={menuLeftRef}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className='bx bx-chevron-left'></i>
            </div>
            {
              navInfo.map((item, index) => (
                <div
                  key={index}
                  className={`header__menu__item 
                  header__menu__left__item ${index === activeNavIdx ? 'active' : ''}`}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span>{item.displayText}</span>
                  </Link>
                </div>
              ))
            }
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className='bx bx-search'></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <Badge count={cartItems.length}>
                  <i className='bx bx-shopping-bag' style={{ fontSize: 20 }}></i>
                </Badge>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {
                currentUser?.statusCode === 200 ?
                  <Link to={`/user/account/profile/${user?._id}`}>
                    <img src={user?.avatar?.url} alt="" />
                  </Link>
                  :
                  <Link to="/login">
                    <button className="login-btn">Đăng nhập</button>
                  </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header