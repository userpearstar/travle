import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Tabs } from 'antd';

interface Iuser {
    userId: number,
    no: string,
    pwd: number,
    headimg: string,
    dynamicthing: string,
    name: string,
}
interface Ifood {
    adress: string,
    cid: number,
    foodimg1: string,
    foodimg2: string,
    foodimg3: string,
    id: number,
    introduce: string,
    name: string,
    score: number
}
interface IScenics {
    id: number,
    name: string,
    content: string,
    headimg: string,
    time: string,
    title: string,
    area: string,
}
interface Ihouse {
    adress: string,
    id: number,
    img: string,
    phonenumber: number,
    price: string,
    special: string,
    time: string,
    title: string

}
function Indexmyself() {
    let [users, setusers] = useState<Iuser[]>([])
    const [lolo, setlolo] = useState<any[]>([])
    let [lists, setlists] = useState<Ifood[]>([])
    let [slist, setslist] = useState<IScenics[]>([])
    let [hlist, sethlist] = useState<Ihouse[]>([])
    useEffect(function () {
        begin()
    }, [])
    async function begin() {
        let ss = await getuser()
        setusers(ss)
        //console.log(users);
        let li = await getfoodbyuserid()
        setlists(li)
        let sli = await getScenicsbyuserid()
        setslist(sli)
        let hli = await gethousebyuserid()
        sethlist(hli)



    }
    async function getuser() {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        let userid = user.userId
        let res = await axios.get('http://localhost:7001/getuser.do', { params: { userid } })
        return res.data
    }
    function showUser() {
        if (users.length == 0) {
            return <></>
        } else {
            let user = users[0]
            return (
                <div>
                    <div className="y-my">
                        <div className="y-introduct">
                            <div className="y-sintroduct">
                                <img src={user.headimg} alt="" />
                                <p>{user.name}</p>
                            </div>
                        </div>

                    </div>

                </div>

            );
        }
    }
    async function getfoodbyuserid() {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        let uid = user.userId
        let res = await axios.get('http://localhost:7001/getfoodbyuserid.do', { params: { uid } })
        return res.data

    }

    function showll() {
        return (
            lists.map((item: any, index: any) => {
                return (

                    <div className="y-ffoods" key={item.id} >
                        <div className="y-img">
                            <img src={item.foodimg2} alt="" />
                        </div>
                        <div className="y-fooddintroduction">
                            <p className='fist'>{item.name}</p>
                            <p className='fist1'>{item.adress}</p>
                        </div>
                    </div>

                )
            })
        )
    }
    async function getScenicsbyuserid() {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        let uid = user.userId
        let res = await axios.get('http://localhost:7001/getScenicsbyuserid.do', { params: { uid } })
        console.log(res.data);
        return res.data
    }
    function showlls() {
        return (
            slist.map((item: any, index: any) => {
                return (

                    <div className="y-ffoods" key={item.id} >
                        <div className="y-img">
                            <img src={item.headimg} alt="" />
                        </div>
                        <div className="y-fooddintroduction">
                            <p className='fist'>{item.name}</p>
                            <p className='fist1'>{item.area}</p>
                        </div>
                    </div>

                )
            })
        )
    }
    async function gethousebyuserid() {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        let uid = user.userId
        let res = await axios.get('http://localhost:7001/gethousebyuserid.do', { params: { uid } })
        console.log(res.data);
        return res.data
    }
    function showllls() {
        return (
            hlist.map((item: any, index: any) => {
                return (

                    <div className="y-ffoods" key={item.id} >
                        <div className="y-img">
                            <img src={item.ph} alt="" />
                        </div>
                        <div className="y-fooddintroduction">
                            <p className='fist'>{item.title}</p>
                            <p className='fist1'>{item.area}</p>
                        </div>
                    </div>

                )
            })
        )
    }



    return (
        <>
            <div className="y-mall">
                {/* <h1 style={{ textAlign: 'center' }}>Welcome To My Page</h1> */}
                <div className="y-my">

                    {showUser()}
                    <Tabs defaultActiveKey="1" className='hhh' style={{ borderRadius: '15px' }}>
                        <Tabs.TabPane tab="food-collection" key="1">
                            {showll()}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="scenery-collection" key="2">
                            {showlls()}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="house-collection" key="3">
                            {showllls()}
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>



        </>
    )
}
export default Indexmyself