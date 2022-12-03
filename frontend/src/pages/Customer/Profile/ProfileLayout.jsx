import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

const ProfileLayout = () => {
    const navigate = useNavigate()
    return (
        <div className="profile__container">
            <Sidebar />
            <div className="profile__info">
                <button onClick={navigate("/user/account/")}>Trang ca nhan</button>
            </div>
        </div>
    )
}

export default ProfileLayout