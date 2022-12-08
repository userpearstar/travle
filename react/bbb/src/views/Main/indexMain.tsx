import React, { useState } from 'react';
import { Card } from 'antd';
import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import Item from 'antd/es/list/Item';

function IndexMain() {
    const [list, setlist] = useState<string[]>(['美食', '景点', '房源']);
    function toShow() {
        return (
            list.map((item: string, index: number) => {
                return (
                    <>

                        <Card title={item} extra={<a href="#">查看更多</a>} style={{ width: 300 }}>

                            <p>{item}</p>

                        </Card>
                    </>


                )
            })
        )
    }

    return (
        // <div>
        //     <div className='a-header'>
        //         <div className='a-head'>
        //             <div><Link to={{ pathname: '/main' }}>主页</Link></div>
        //             <div ><Link to={{ pathname: '/food' }}>食物</Link> </div>
        //             <div><Link to={{ pathname: '/food' }}>景点</Link> </div>
        //             <div><Link to={{ pathname: '/food' }}>房源</Link> </div>
        //         </div>

        //     </div>

        // </div>
        <div >
            <div className='m-all'>
                {/* {toShow()} */}
                <p className='wel'>Welcome</p>

                <div>
                    <div className="food"><Link to={{ pathname: '/food' }}>美食</Link></div>
                    <div className="scenery"><Link to={{ pathname: '/Scenics' }}>景点</Link> </div>
                    <div className="house"><Link to={{ pathname: '/house' }}>房源</Link></div>
                </div>
                <span>Thanks for chossing us</span>
            </div>



        </div>
    )
}
export default IndexMain