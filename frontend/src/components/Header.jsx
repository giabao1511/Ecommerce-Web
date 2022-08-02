import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/Logo-2.png'

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
  const activeNavIdx = navInfo.findIndex(e => e.path === pathname)
  const headerRef = useRef(null);
  const menuLeftRef = useRef(null);

  const menuToggle = () => {
    menuLeftRef.current.classList.toggle("active");
  }

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
                <i className='bx bx-shopping-bag'></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <i className='bx bx-user'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header