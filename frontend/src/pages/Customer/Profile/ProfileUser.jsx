import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "../../../imports";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const ProfileUser = () => {
    const userId = useParams();
    const { currentUser } = useSelector(state => state.auth)
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const user = currentUser?.element;

    console.log(openKeys);
    const { Content, Sider } = Layout;
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <>
            <Helmet title={`${user?.username}'s Profile`} />
            <Layout>
                <Sider>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        style={{
                            width: 256,
                        }}
                        items={items}
                    />
                </Sider>
                asdasdasd
            </Layout>
        </>
    )
}

export default ProfileUser