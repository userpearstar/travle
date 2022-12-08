import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import ThemeContext from './views/scenery/tool/ThemeContext';


import './style/app.css'
import './style/main.css'
import './style/food.css'
import './style/myself.css'
import './style/House.css'
import './style/housemess.css'
import './style/message.css'
import "./style/scenics.css"


import Main from './views/Main/indexMain'
import Food from './views/food/indexFood'
import Login from './views/login/indexLogin'
import Regist from './views/login/regist'
import LoginFilter from './views/tool/LoginFilter';
import FoodInformation from './views/food/foodInformation';
import Cityfood from './views/food/cityfood';
import Myself from './views/myself/indexmyself'
import House from './views/house/pages/House';
import Housemess from './views/house/pages/housemess';
import ScenicsList from './views/scenery/pages/ScenicsList'
import Scenicsmessage from './views/scenery/pages/Scenicsmessage'
interface IScenics {
    id: number,
    name: string,
    introduce: string,
    img: string,
    praise: number,
    time: string,
    uid: number
}
function App() {
    const [scenicsList, setScenicsList] = useState<IScenics[]>([]);

    // const navigate = useNavigate();
    // function toTwo() {
    //     navigate({ pathname: '/food' });
    // }
    let str = sessionStorage.getItem("user");
    let self = useRef<any>()
    useEffect(() => {
        aboutLogin()
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        console.log(user);

    })
    function aboutLogin() {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        console.log(user);

        if (user!) {

            return (
                < >

                    <img src={user.headimg} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <p style={{ fontSize: '14px' }}>{user.name}</p><span style={{ fontSize: '14px' }}>你好</span>
                    <span ref={self} style={{ fontSize: '12px', transform: '0.8', marginLeft: '6px' }}   ><Link to={{ pathname: '/Myself', }}>个人主页</Link></span>

                </>
            )
        }
        else {
            return (
                <Link to={{ pathname: '/login' }}>登录</Link>
            )
        }
    }
    function toself(userid: number) {
        console.log('ss');


    }
    return (
        <div >
            <ThemeContext.Provider value={{ scenicsList, setScenicsList }}>

                <BrowserRouter>
                    {/* <button onClick={toTwo}></button> */}
                    <div>
                        <div className='a-header'>
                            <div className='a-head'>
                                <div><Link to={{ pathname: '/' }}>主页</Link></div>
                                <div ><Link to={{ pathname: '/food' }}>食物</Link> </div>
                                <div><Link to={{ pathname: '/Scenics' }}>景点</Link> </div>
                                <div><Link to={{ pathname: '/house' }}>房源</Link> </div>
                                <div style={{ display: 'flex' }} >{aboutLogin()}</div>



                            </div>

                        </div>
                    </div>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/food/*' element={<LoginFilter><Food /></LoginFilter>} />
                        <Route path="/Scenics" element={<LoginFilter><ScenicsList /></LoginFilter>} />
                        <Route path='/message' element={<Scenicsmessage />} />
                        <Route path='/house' element={<LoginFilter><House /></LoginFilter>} />
                        <Route path='/housemess' element={<Housemess />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/regist' element={<Regist />} />
                        <Route path='/food/FoodInformation' element={<FoodInformation />} />
                        <Route path='/food/Cityfood' element={<Cityfood />} />
                        <Route path='/myself' element={<LoginFilter><Myself /></LoginFilter>} />


                    </Routes>
                </BrowserRouter >
            </ThemeContext.Provider>
        </div >
        // <div>

        //     <BrowserRouter>
        //         <div>
        //             dfsfa
        //         </div>
        //         <Routes>
        //             <Route path='/' element={<Main />} />

        //         </Routes>
        //         <div>
        //             34444
        //         </div>
        //     </BrowserRouter>
        // </div>


    );


}

export default App