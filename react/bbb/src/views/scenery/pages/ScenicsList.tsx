import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeartTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import axios from 'axios';
import img from '../../../imgs/Vector.png'
import Group from '../../../imgs/Group.png'
import imgage21 from '../../../imgs/Frame 21.png'
import imgage23 from '../../../imgs/Frame 23.png'
import imgage25 from '../../../imgs/Frame 25.png'
import imgage26 from '../../../imgs/Frame 26.png'
import imgage27 from '../../../imgs/Frame 27.png'
import imgage28 from '../../../imgs/Frame 28.png'
import imgage29 from '../../../imgs/Frame 29.png'
import imgage30 from '../../../imgs/Frame 30.png'
import votor from '../../../imgs/Vecto.png'
import fram49 from '../../../imgs/Frame 49.png'
import fram53 from '../../../imgs/Frame 51.png'
import ThemeContext from '../tool/ThemeContext'
import { displayPartsToString } from 'typescript';
interface IScenics {
    id: number,
    name: string,
    content: string,
    headimg: string,
    time: string,
    title: string,
    area: string,
}

function ScenicsList() {
    const location = useLocation();
    const sid = location.state as number;
    const [scenics, setScenics] = useState<IScenics[]>([]);
    const [con, setCon] = useState<number>(0);;//con==0没有收藏， con==1已经收藏
    const [sc, setSc] = useState<string>('none');
    let { scenicsList, setScenicsList } = useContext(ThemeContext)
    console.log(con);
    let reload = false;
    let obj = useLocation().state;
    if (obj != null) {
        obj = obj as { reload: boolean };
        reload = obj.reload;
    }
    // console.log(reload);
    //景点id值。
    useEffect(function () {
        //监听组件的加载完毕事件
        begin()
        begincollection()
    }, [])
    const navigate = useNavigate();
    async function begin() {
        //得到所有的景点
        if (scenicsList.length == 0 || reload == true) {
            let list = await getAll();
            // console.log(list);//[{id,name,introduce,img,praise,time,uid},{},...]
            //修改状态的值为取到的景点
            setScenicsList(list);
        }
    }
    async function getScenics() {
        const url = "http://localhost:7001/getScenicsByIds.do";
        let res = await axios.get(url, { params: { sid } });
        let data = res.data;
        let scenics = data.list[0];
        return scenics;
    }
    async function begincollection() {

        try {
            //axios发送ajax请求， 得到景点的详情
            let scenics = await getScenics();
            //通过详情修改状态
            setScenics(scenics);
            //通过详情修改状态
            //axios是否已经收藏当前景点
            //关注

        } catch (e) {
            console.log(e);
        }
    }

    async function getAll() {
        const url = "http://localhost:7001/getAllScenicss.do";
        const res = await axios.get(url);
        const data = res.data;
        //{state: 1, list: [{id,name,introduce,img,praise,time,uid},{},...]}
        console.log(data.list[0].id);

        return data.list;
    }
    function renderScenics() {
        console.log(scenicsList);

        const num = scenicsList.slice(0, 3)

        return (
            num.map((item: IScenics, index: number) => {
                return (
                    <div className="l-fram37" onClick={gotomessage.bind(null, item.id)}>
                        <div className="l-fram31">
                            <div className='l-fram311'>
                                <img src={item.headimg} alt="" />
                            </div>
                        </div>
                        <div className="l-fram43">
                            <div className="l-fram44">
                                <div className='l-fram42'>
                                    <div className="l-fram42text">{item.name}</div>
                                    <div className='l-fram41'>
                                        <div className="l-fram4147">4.7</div>
                                        <div className="l-antdesig">
                                            <img src={votor} alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="l-fram49">
                                <img src={fram49} alt="" />
                            </div>
                            <div className="l-fram50">
                                <div className="l-fram503">{item.title}</div>
                                <div className="l-fram503">营业时间{item.time}</div>
                                <div className="l-fram503">{item.area}</div>
                            </div>
                        </div>
                        <div className="l-fram53">
                            <img src={fram53} alt="" />
                        </div>
                    </div>
                )
            })

        )

    }
    function renderScenics1() {
        const num = scenicsList.slice(3, 5)
        console.log(num);

        return (
            num.map((item: IScenics, index: number) => {
                return (
                    <>
                        <div className="l-fram57">
                            <div className="l-fram61">
                                <div className="l-fram333">
                                    <img src={item.headimg} alt="" />
                                </div>
                                <div className="l-framm43">
                                    <div className="l-fram56">
                                        <div className="l-framm44">
                                            <div className="l-framm42">{item.name}</div>
                                        </div>

                                    </div>
                                    <div className="l-framm50">
                                        <div className='l-framm50t'>营业时间：{item.time}</div>
                                    </div>
                                    <div className="l-fram57l" onClick={gotomessage.bind(null, item.id)}>
                                        <div className="l-fram57text">查看详情</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })

        )

    }
    function gotomessage(sid: number) {
        navigate({ pathname: '/message' }, { state: sid });
        console.log(sid);

    }
    function renderScenics2() {
        const num = scenicsList.slice(5, 8)
        console.log(num);
        return (
            num.map((item: IScenics, index: number) => {
                return (
                    <>
                        <div className="l-fram78">
                            <div className="l-fram78img">
                                <img src={item.headimg} alt="" />

                            </div>
                            <div className="l-fram433">
                                <div className="l-fram42">
                                    <div className="l-fram421">{item.name}</div>
                                </div>
                                <div className="l-fram44">
                                    <div className="l-fram441">{item.time}</div>
                                    <div className="l-fram442">{item.title}</div>
                                </div>

                            </div>
                        </div>

                    </>
                )
            })

        )
    }
    return (
        <div className='l-content'>
            <div className='l-contener'>
                <div className="l-nav">
                    <div className="l-txv">welcome</div>
                    <div className="l-right">
                        <div className="l-regist">Home</div>
                        <div className="l-regist">Sigin up</div>
                    </div>
                </div>
                <div className='l-head'>
                </div>
                <div className='l-text'>
                    The whole world awaits
                </div>
                <div className="l-serch">
                    <div className='l-f1'>
                        <div className="l-f11">
                            <img src={img} alt="" />
                        </div>
                        <div className="l-f1text">
                            搜索景点
                        </div>
                    </div>
                    <div className="l-serchbox">
                        <div className="l-serchbotton"><div className='l-serchtext'>Search</div></div>
                        <div className='l-day'>
                            <div className='l-daytext'>日历</div>
                            <img src={Group} alt="" />
                        </div>
                        <div className='l-day'>
                            <div className='l-daytext'>门票</div>
                            <img src={Group} alt="" />
                        </div>
                    </div>

                </div>
                <div className="l-sortnav"> Top categories </div>
                <div className="l-sortnavl">
                    <div className="l-Fram14">
                        <div className="l-Fram21">
                            <img src={imgage21} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage23} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage30} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage25} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage26} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage27} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage28} alt="" />
                        </div>
                        <div className="l-Fram21">
                            <img src={imgage29} alt="" />
                        </div>
                    </div>
                </div>
                <div className='l-allcont'>
                    <div className="l-fram96">
                        <div className="l-fram93">
                            <div className="l-fram33">
                                {renderScenics()}
                            </div>
                            <div className="l-fram37pop">热门景区</div>
                        </div>
                        <div className="l-fram88">
                            <div className="l-fram60">
                                {renderScenics1()}


                            </div>
                            <div className="l-fram89">
                                <div className="l-fram89text">推荐景区</div>
                            </div>


                        </div>
                        <div className="l-fram86">
                            <div className="l-fram85">
                                {renderScenics2()}

                            </div>

                            <div className="l-fram87">
                                <div className="l-fram87text">热门打卡</div>
                            </div>
                        </div>
                        <div className="l-fram62">
                            <div className="l-fram62text"> Plan your trip with a travel expert</div>
                            <div className="l-fram62text1">Our professional advisors can craft your perfect itinerary</div>
                            <div className='l-fram62img'></div>
                        </div>
                        <div className="l-fram83">
                            <div className="l-fram101">
                                <div className="l-fram102">
                                    <div className="l-fram102text">住宿</div>
                                </div>
                                <div className="l-fram1021">
                                    <div className="l-fram102text">美食</div>
                                </div>
                                <div className="l-fram1021">
                                    <div className="l-fram102text">景点</div>
                                </div>
                            </div>
                            <div className="l-fram84">
                                <div className="l-fram84text">推荐类型</div>
                            </div>
                        </div>
                        <div className="l-foorter"></div>

                    </div>

                </div>
            </div>
        </div>

    )
}
export default ScenicsList;



