import axios from "axios"
import React, { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Button, Space } from 'antd';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    FireOutlined
} from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
function IndexLogin() {
    const [no, setNo] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [inf, setInf] = useState<string>("");
    const navigate = useNavigate();
    async function login(e: any) {
        e.preventDefault();
        try {
            const url = "http://localhost:7001/login.do";
            let res = await axios.post(url, { no, pwd });
            let data = res.data;
            console.log(data);
            if (data.state == 1 && data.list.length == 1) {//登陆成功
                setInf("");
                let user = data.list[0];
                //把登陆用户存入本地。
                sessionStorage.setItem("user", JSON.stringify(user));
                alert('登录成功')
                navigate({ pathname: '/' })
            } else {//登陆失败
                console.log("234324");
                setInf("账号或密码错误");
            }
        } catch (e) {//登陆异常
            console.log(e);
            setInf("登陆异常");
        }
    }
    return (
        <div className="l-all">
            <div className="login">
                <form onSubmit={login} >
                    <Input size="large" placeholder="请输入账号" prefix={<UserOutlined />} type="text" value={no} onChange={(e) => { setNo(e.target.value) }} className='login-input1' /> <br />
                    <Input size="large" placeholder="请输入密码" prefix={<UserOutlined />} type="password" value={pwd} onChange={(e) => { setPwd(e.target.value) }} className='login-input1' />
                    <br />
                    <Space wrap style={{ marginLeft: '112px', marginTop: '15px' }}>
                        <Button type="dashed" onClick={login}>登录</Button>
                    </Space>

                </form>
                <div className="y-regist">
                    <Link to={{ pathname: '/regist' }}><FireOutlined />请先注册</Link>
                    <div style={{ color: 'red' }}>{inf}</div>
                </div>
            </div>
        </div>
    );
}
export default IndexLogin