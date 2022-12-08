import { DefaultDeserializer } from "v8"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Item } from "rc-menu";
import { StarTwoTone } from "@ant-design/icons";
import { log } from "console";
import { Button, message } from "antd";
interface IScenics {
    sid: number, name: string, content: string, headimg: string, praise: number, time: string, uid: number, uname: string, area: string
}
interface IComment {
    cid: string,//评论的主键
    content: string,//评论的内容
    time: string,
    sid: number,//景点主键
    uid: number,//发布景点的用户主键
    name: string,//发布景点的用户名
    headimg: string
}

function Scenicsmessage() {
    const [scenics, setScenics] = useState<IScenics>();
    const [con, setCon] = useState<number>(0);//con==0没有收藏， con==1已经收藏
    const [commentList, setCommentList] = useState<IComment[]>([]);//当前景点的评论数组
    const [commentContent, setCommentContent] = useState<string>("")//评论内容
    //景点id值。
    const location = useLocation();
    const sid = location.state as number;
    const [messageApi, contextHolder] = message.useMessage();
    console.log(sid);
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '订票成功',
        });
    };

    useEffect(function () {
        begin();
        queryComment(sid);
    }, []);
    async function getScenics() {
        const url = "http://localhost:7001/getScenicsByIds.do";
        let res = await axios.get(url, { params: { sid } });
        let data = res.data;
        let scenics = data.list[0];
        console.log(scenics);
        return scenics;

    }
    async function checkCon(sid: any) {
        let num = sid.id
        console.log(num);
        let str = sessionStorage.getItem("user") as string;
        let user = JSON.parse(str);
        let uid = user.userId;//登陆用户的主键
        console.log(uid);
        console.log(sid);


        let res = await axios.get("http://localhost:7001/checkedCon.do", { params: { num, uid } });
        console.log(res);

        let data = res.data;//{state:1, flag:0}, {state:1, flag:1}, {state:-1}
        console.log(data);
        if (data.state == 1) {
            console.log(data.flag);
            return data.flag;

        } else {
            throw new Error("异常")
        }
    }
    async function conAndCancleScenics(sid: number) {
        try {
            let str = sessionStorage.getItem("user") as string;
            let user = JSON.parse(str);
            let uid = user.userId;
            //登陆用户的主键
            let res = await axios.get("http://localhost:7001/conOrCancle.do", { params: { uid, sid, con } });
            let data = res.data;//{state: 1, affectedRows: 1}
            if (data.state == 1) {
                setCon(con == 1 ? 0 : 1);
            } else {
                throw new Error("有异常....");
            }
        } catch (e) {
            console.log(e);
            alert("有异常")
        }
    }


    async function begin() {
        try {
            //axios发送ajax请求， 得到景点的详情
            let scenics = await getScenics();
            //通过详情修改状态
            setScenics(scenics);

            //axios是否已经收藏当前景点
            let flag = await checkCon(scenics);//0, 1
            console.log(flag);
            setCon(flag);
            //关注

        } catch (e) {
            console.log(e);
        }
    }
    async function queryComment(sid: number) {
        console.log(sid);
        let res = await axios.get('http://localhost:7001/getCommentBySid.do', { params: { sid } });
        let data = res.data;
        if (data.state == 1) {
            let list = data.list;//评论对象数组
            console.log(list);
            setCommentList(list);
        }
    }

    async function sendComment() {
        //commentContent;//状态 评论内容
        try {
            let str = sessionStorage.getItem("user") as string;
            let user = JSON.parse(str);
            console.log(scenics);
            let num = sid

            let uid = user.userId;//登陆用户的主键
            let res = await axios.post("http://localhost:7001/addComment.do", { num, uid, content: commentContent })
            let data = res.data;
            if (data.state == 1) {//成功发评论
                queryComment(sid)//重新查看评论
            } else {//失败发评论
                throw new Error("异常")
            }
        } catch (e) {
            console.log(e);
        }
    }
    function senicsmessage() {
        return (
            <div className="lm-trips">
                <div className="lm-Group5">
                    <div className="lm-Gp">
                        <div className="lm-tttt">
                            {scenics?.area}
                        </div>
                        <div className="lm-vv">
                            <div className="lm-vvv"></div>
                        </div>
                    </div>
                    <div className="lm-img">
                        <img src={scenics?.headimg} alt="" />
                    </div>
                </div>

                <div className="lm-tite">{scenics?.name}</div>
                <div className="lm-rimi"></div>
                <div className="lm-xiangqing">{scenics?.content}</div>
                <div className="lm-yudi">
                    <div className="lm-yd">
                        {contextHolder}

                        <Button onClick={success}>立即预定</Button></div>


                    <div className="lm-Gourp2">
                        <div className="lm-vustart">

                            <div className="lm-vstart">
                                <div className="lm-start">
                                    <div className="lm-Gourpp">
                                        <div className="lm-vu">
                                            <StarTwoTone twoToneColor={(con == 1 ? 'yellow' : '#08c')} style={{ fontSize: '26px' }} onClick={conAndCancleScenics.bind(null, sid)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lm-ttt">4.9</div>
                    </div>
                </div>

            </div>
        )



    }
    function redercomment() {
        return (
            commentList.map(function (item, index) {
                return (

                    <div className="lmcommentbox">
                        <div className="lm-comment2">
                            {item.content}
                        </div>
                        <div className="lm-comment3"><img src={item.headimg} alt="" /></div>
                    </div>
                )

            })
        )
    }
    return (
        <div className="lm-box">
            <div className="lm-nav"></div>
            {senicsmessage()}
            <div className="lm-Gropus"></div>
            <div className="lm-data"></div>
            <div className="lm-commentbig">
                <div className="lm-comment">
                    {redercomment()}
                </div>

            </div>

            <div className="lml-comment">
                <div className="lmcommenttext">
                    <textarea rows={5} cols={35} placeholder="写出评论内容" onChange={(e) => { setCommentContent(e.target.value) }}>
                    </textarea>
                    <div className="lml">
                        <Button onClick={sendComment}>发布评论</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Scenicsmessage;
// import React from 'react';
// import { Button, message, Space } from 'antd';

// const App: React.FC = () => {
//   const [messageApi, contextHolder] = message.useMessage();

//   const success = () => {
//     messageApi.open({
//       type: 'success',
//       content: 'This is a success message',
//     });
//   };

//   const error = () => {
//     messageApi.open({
//       type: 'error',
//       content: 'This is an error message',
//     });
//   };

//   const warning = () => {
//     messageApi.open({
//       type: 'warning',
//       content: 'This is a warning message',
//     });
//   };

//   return (
//     <>
//       {contextHolder}
//       <Space>
//         <Button onClick={success}>Success</Button>
//         <Button onClick={error}>Error</Button>
//         <Button onClick={warning}>Warning</Button>
//       </Space>
//     </>
//   );
// };

// export default App;