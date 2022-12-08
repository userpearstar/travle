import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Rate, Select, Input, } from 'antd';
import ReactDOM from 'react-dom';
import { CompassOutlined, WifiOutlined, StarOutlined, CarOutlined, UpOutlined, ShareAltOutlined, LikeOutlined, CloseCircleOutlined } from '@ant-design/icons';

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
interface Icomment {
    comments: string,
    dynamicthing: string | null,
    fid: number,
    gnumber: number,
    headimg: string,
    id: number,
    name: string,
    no: string,
    pwd: number,
    time: string,
    uid: number,
    userid: number,
    grade: number
}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
function FoodInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    let v = location.state as { id: number };
    const [id, setid] = useState<number>(0)
    const [showif, setshowif] = useState<boolean>(true)
    const [list, setlist] = useState<Ifood[]>([])
    const [fid, setfid] = useState<number>(0)
    const [comment, setcomment] = useState<Icomment[]>([])
    const acomment = useRef<any>()
    const [acontent, setacontent] = useState<string>('')
    const [scores, setscores] = useState<number>(0)
    const [gnumber, setgnumber] = useState<number>(0)
    const gnumbers = useRef<any>()
    const collect = useRef<any>()
    const shoucang = useRef<any>()
    const [ascores, setascore] = useState<number>(0)
    const aside = useRef<any>()
    async function begin() {

        let comments = await getcomment();
        setcomment(comments)
        let infomation = await getfoodinformation()
        setlist(infomation)
        let collects = await showcollect();
        console.log(collects, 'aaaaaaaaaaa');

        if (collects == 1) {
            collect.current.style.color = 'yellow'
            shoucang.current.innerHTML = '店铺已收藏'
        } else {
            shoucang.current.innerHTML = '点此收藏店铺'
            collect.current.style.color = 'black'
        }
        showsc()


    }
    //得到餐馆的全部信息
    async function getfoodinformation() {


        let res = await axios.get('http://localhost:7001/getsgood.do', { params: { id: v.id } })
        console.log(res.data);
        let ffid = res.data[0].id;
        setfid(v.id)
        console.log(id, "jjjjjj");
        setlist(res.data)
        return res.data

    }
    //餐馆图片的遍历
    function foodinfomaition() {
        return (
            list.map((item, index) => {
                // setfid(item.id)
                return (
                    <div className="imgbox" key={item.id}>
                        <div className="img" ><img src={item.foodimg1} alt="" /></div>
                        <div className="img"><img src={item.foodimg2} alt="" /></div>
                        <div className="img"><img src={item.foodimg3} alt="" /></div>
                    </div>
                )
            })
        )
    }
    //餐馆介绍的遍历
    function foods() {
        return (
            list.map((item, index) => {
                return (
                    <>
                        <h1 className='y-title'>{item.name}</h1>
                        <h2 className='y-title1'><CompassOutlined style={{ color: 'blue' }} />adress：{item.adress}</h2>
                        <div className="y-title2">Introduction:{item.introduce}</div>
                        <div className="y-score"><Rate value={item.score} /><span style={{ color: 'rgba(0, 0, 0, 0.45)', marginLeft: '10px' }}>分</span></div>
                        <div className="y-icon"><WifiOutlined style={{ marginRight: '10px', fontSize: '30px' }} /><CarOutlined style={{ marginRight: '10px', fontSize: '30px' }} /> <span>提供WiFi 停车场</span> </div>
                        <div className='y-col' onClick={addcollect}><span ref={shoucang} >shoucang</span><StarOutlined ref={collect} style={{ marginLeft: '10px', fontSize: '30px' }} /></div>
                    </>
                )

            })
        )

    }
    //餐厅评论的获取
    async function getcomment() {
        let fid = v.id
        let res = await axios.get('http://localhost:7001/getcomment.do', { params: { fid: fid } })
        let data = res.data
        let t = new Date(data.time)
        let mytime = `${t.getFullYear()}:${t.getMonth()}:${t.getDate()}`;
        let allscore: number[] = []
        data.map((item: any, index: any) => {
            let t = new Date(item.time)
            let mytime = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}  ${t.getHours()}:${t.getMinutes()}`;
            item.time = mytime
            allscore.push(item.grade)
        })
        let sc = 0;
        let count = 0
        allscore.map((item, index) => {

            sc += item
            count++

        })
        let allcout = Number((sc / count).toFixed(1));
        setascore(allcout)
        return data
    }
    //餐厅评论的展示
    function showcomment() {

        return (
            comment.map((item, index) => {
                return (
                    <>
                        <div className="y-comment-content">
                            <div className="y-userbox">
                                <img src={item.headimg} alt="" />
                                <div className="y-user">
                                    <p>{item.name}</p>
                                    <p>{item.time}</p>
                                    <span><Rate value={item.grade} /> <span style={{ fontSize: '12px' }}>评分为{item.grade}分</span> </span>
                                </div>
                            </div>
                            <div className="y-content">
                                {item.comments}
                            </div>
                            <span className='y-out' onClick={deletecomment.bind(null, item.id, item.uid)}> <CloseCircleOutlined className='y-out' style={{ fontSize: '14px' }} />点此删除评论</span>
                            <div className='y-great' ref={gnumbers} onClick={addgnumber.bind(null, item.id)}><LikeOutlined />{item.gnumber}</div>

                        </div>
                    </>
                )
            })
        )
    }
    //删除评论
    async function deletecomment(id: number, uid: number) {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        console.log(user.userId, "aaaaaaaaa");
        let usid = user.userId
        if (uid == usid) {
            console.log(id, '可以删除');
            let res = await axios.get('http://localhost:7001/deletecomment.do', { params: { id: id } })
            if (res.data == 1) {
                alert('删除成功')
                begin()
            }

        }
        else {
            alert('无权限删除其他用户的评论')
        }
    }
    //点赞评论
    async function addgnumber(id: number) {
        console.log(id);

        console.log(gnumber);
        let res = await axios.get('http://localhost:7001/addgnumber.do', { params: { id: id } })
        console.log(res.data);
        if (res.data.affectedRows == 1) {
            begin()
            gnumbers.current.style.color = 'red'
            gnumbers.current.style.disabled = true
        }
        else {
            alert('点赞失败')
        }
    }
    //显示增加评论界面
    function showaddcomment(num: number) {


        if (num == 1) {


            acomment.current.style.display = 'block'
        }
        if (num == 2) {
            acomment.current.style.display = 'none'
        }
        console.log("ss");

    }
    //提交增加的评论
    async function submitcomment() {
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        console.log(user);
        console.log("sss", acontent, scores);
        let userid = user.userId
        let time = new Date().toLocaleString()

        let res = await axios.post('http://localhost:7001/addcomment.do', { userId: userid, comments: acontent, grade: scores, time: time, fid: v.id })
        console.log(res.data);
        begin()
        showaddcomment(2)

    }
    async function showcollect() {
        let fid = v.id
        console.log(fid);
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);

        let uid = user.userId
        let res = await axios.get('http://localhost:7001/getcollect.do', { params: { fid: fid, uid: uid } })
        if (res.data.length == 1) {
            return 1
        }


    }
    //添加收藏
    async function addcollect() {
        let list = await showcollect()
        console.log(list);
        if (list == 1) {
            deletecollection()
        }
        else {
            let fid = v.id;
            console.log(fid);
            let str = sessionStorage.getItem("user") as string;
            let user = JSON.parse(str);

            let uid = user.userId
            let res = await axios.get('http://localhost:7001/addcollect.do', { params: { fid: fid, uid: uid, ii: 0 } })
            console.log(res);
            if (res.data == 1) {
                alert('添加到我的收藏成功')
            }
            begin()
        }

    }
    //取消收藏
    async function deletecollection() {
        let fid = v.id;
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        let uid = user.userId
        let res = await axios.get('http://localhost:7001/addcollect.do', { params: { fid, uid, ii: 1 } })
        console.log(res.data == 1);
        if (res.data == 1) {
            alert("取消收藏成功")
        }
        begin()


    }
    //滑动超过200px 到顶点按钮出现
    function showsc() {
        window.onscroll = function () {
            if (window.scrollY > 200) {
                aside.current.style.display = 'block'

            }
        }

    }
    function tohead() {
        window.scrollTo(0, 0)
    }
    useEffect(function () {
        begin()


    }, [])
    return (
        <>


            <div className="y-information" id='y-head'>

                <div className="y-infomation-left">
                    {foodinfomaition()}
                </div>
                <div className="y-infomation-right">
                    {foods()}
                </div>
                <div className="y-comment">
                    <h1 className='y-comment-title'> <span>这里是评论区 <span style={{ fontSize: '14px' }}>评论区综合评分为{ascores}</span> </span> <p onClick={showaddcomment.bind(null, 1)}>点此增加评论 <ShareAltOutlined /></p> </h1>
                    {showcomment()}
                    <div className="y-add" ref={acomment}>
                        <Input placeholder="请输入你想要评论的内容" className='y-add-input' onChange={(e: any) => { setacontent(e.target.value) }} />
                        <span>
                            <br />
                            <span style={{ fontSize: '12px', marginRight: '5px' }}>请为该店打分</span>
                            <Rate tooltips={desc} onChange={setscores} value={scores} />
                            {scores ? <span className="ant-rate-text">{desc[scores - 1]}</span> : ''}
                            <div style={{ display: 'flex' }}><div className='y-submit' onClick={submitcomment} >提交评论</div>
                                <div className="y-submit" onClick={showaddcomment.bind(null, 2)}>取消</div></div>



                        </span>
                    </div>
                </div>

                <div className="y-aside" ref={aside} onClick={tohead}>
                    <UpOutlined />

                </div>

            </div>


        </>
    )

}
export default FoodInformation