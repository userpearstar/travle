import {Navigate} from 'react-router-dom';
//路由守卫组件
function LoginFilter({children}:any) {
	let str = sessionStorage.getItem("user");
	if(str!=null) {//登陆过
		return children
	}else {//没有登陆
		return <Navigate to="/login" replace={true} />
	}
}
export default LoginFilter;