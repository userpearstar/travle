import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Regist() {
	const[inf, setInf] = useState<number>(0);//-1注册失败,  1注册成功, 0默认状态 
	const[no, setNo] = useState<string>("www");
	const[pwd, setPwd] = useState<string>("123");
	const[name, setName] = useState<string>("小王");
	
	const navigate = useNavigate();
	async function registUser(e:any) {
		e.preventDefault();
		try {
			// 发送post请求，传参数
			const url = "http://localhost:7001/regist.do";
			const res = await axios.post(url, {no,pwd,name});
			const data = res.data;
			if(data.state==1) {
				setInf(1);
				navigate({pathname:"/login"});
			}else {
				setInf(-1);
			}
		}catch(e) {
			console.log(e);
			alert("注册异常");
		}
	}
	return (
		<div>
			<form onSubmit={registUser}>
				<input type="text" value={no} onChange={(e)=>{setNo(e.target.value)}}  placeholder="账号" /><br />
				<input type="password" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}  placeholder="密码" /><br />
				<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder="名字" /><br />
				<input type="submit" value="注册"/>
			</form>
			<div>
				{(inf==-1) ? <span style={{color:'red'}}>注册失败</span> : (inf==1 ?  <span style={{color:'green'}}>注册成功</span> : "")}
			</div>
		</div>
	);
}
export default Regist;