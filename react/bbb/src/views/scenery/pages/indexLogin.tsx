import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
function Login() {
	const[no, setNo] = useState<string>("www");
	const[pwd, setPwd] = useState<string>("123");
	const[inf, setInf] = useState<string>("");
	const navigate = useNavigate();
	async function login(e:any) {
		e.preventDefault();
		try {
			const url = "http://localhost:7001/login.do";
			console.log(no,pwd);
			let res = await axios.post(url, {no, pwd});
			
			
			let data = res.data;
			console.log(data);
			if(data.state==1 && data.list.length==1) {//登陆成功
				setInf("");
				let user = data.list[0];
				//把登陆用户存入本地。
				sessionStorage.setItem("user", JSON.stringify(user));
				navigate({pathname:"/Scenics"});
			}else {//登陆失败
				console.log("234324");
				setInf("账号或密码错误");
			}
		}catch(e) {//登陆异常
			console.log(e);
			setInf("登陆异常");
		}
	}
	return (
		<div>
			登陆
			<form onSubmit={login}>
				<input type="text" value={no} onChange={(e)=>{setNo(e.target.value)}}  placeholder="账号" /><br />
				<input type="password" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}  placeholder="密码" /><br />
				<input type="submit" value="登陆"/>
			</form>
			<Link to={{pathname:'/regist'}}>请先注册</Link>
			<div style={{color:'red'}}>{inf}</div>
		</div>
	);
}
export default Login;