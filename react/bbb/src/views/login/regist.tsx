import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
function Regist() {
    const [inf, setInf] = useState<number>(0);//-1注册失败,  1注册成功, 0默认状态 
    const [no, setNo] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [name, setName] = useState<string>("");
    const fileRef = useRef<any>();
    const navigate = useNavigate();
    async function registUser(e: any) {
        e.preventDefault();
        let file = fileRef.current.files[0];
        let formData = new FormData();
        formData.append("no", no);
        formData.append("pwd", pwd);
        formData.append("name", name);
        formData.append("uploadFile", file, file.name);
        const config = { headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() } };
        try {
            // 发送post请求，传参数
            const url = "http://localhost:7001/regist.do";
            const res = await axios.post(url, formData);
            const data = res.data;
            if (data.state == 1) {
                setInf(1);
                navigate({ pathname: "/login" });
            } else {
                setInf(-1);
            }
        } catch (e) {
            console.log(e);
            alert("注册异常");
        }

    }

    return (
        <div className='regist'>
            <div className='regist-box'>
                <form onSubmit={registUser}>
                    <Input size="large" placeholder="请输入账号" prefix={<UserOutlined />} type="text" value={no} onChange={(e) => { setNo(e.target.value) }} className='login-input2' /> <br />
                    <Input size="large" placeholder="请输入密码" prefix={<UserOutlined />} type="password" value={pwd} onChange={(e) => { setPwd(e.target.value) }} className='login-input2' />
                    <Input size="large" placeholder="请输入账号名" prefix={<UserOutlined />} type="text" value={name} onChange={(e) => { setName(e.target.value) }} className='login-input2' />

                    <input type="file" ref={fileRef} style={{ margin: '15px auto' }} /><br />
                    <input type="submit" value="注册" className='show' />
                </form>
                <div>
                    {(inf == -1) ? <span style={{ color: 'red' }}>注册失败</span> : (inf == 1 ? <span style={{ color: 'green' }}>注册成功</span> : "")}
                </div>
            </div>
        </div>
    );
}
export default Regist