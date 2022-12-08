import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Card } from 'antd';
import { Rate, Select } from 'antd';
import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import FoodInformation from './foodInformation';
const { Meta } = Card;

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
interface Icity {
    id: number,
    name: string
}
function IndexFood() {
    useEffect(function () {
        getfood();
        getcity()

    }, [])
    const navigate = useNavigate();
    const [list, setlist] = useState<Ifood[]>([])//所有城市的美食信息
    const [lists, setlists] = useState<Icity[]>([])//城市信息
    const [select, setselect] = useState<string>('成都')//select 相关value

    //得到所有的美食信息
    async function getfood() {
        try {
            let list = await axios.get('http://localhost:7001/getfood.do')
            console.log(list);
            let res = list.data
            setlist(res)
            return res

        } catch (e) {
            console.log(e);


        }

    }
    //传递参数去美食的详细页面
    function toFood(id: number) {
        console.log(id);
        navigate({ pathname: "FoodInformation" }, { state: { id: id } });



    }
    //得到美食的城市相关信息
    async function getcity() {
        let res = await axios.get('http://localhost:7001/getcity.do')
        console.log(res.data);
        setlists(res.data)

    }
    //美食的信息展示
    function collumn() {
        return (
            list.map((item: any, index: any) => {
                return (
                    <Card
                        className='y-card'
                        key={item.id}
                        hoverable
                        style={{ width: 240, margin: '10px' }}
                        cover={<img alt="example" src={item.foodimg1}
                        />}
                        onClick={toFood.bind(null, item.id)}
                    >
                        <Meta title={item.name} description='welcome' />
                        <Rate value={item.score} /><span style={{ color: 'rgba(0, 0, 0, 0.45)', marginLeft: '10px' }}>{item.score}分</span>
                        <div className='y-hover'>{item.introduce}</div>
                    </Card>
                )


            })

        )
    }
    function updateList(e: any) {
        console.log(e);
        let cid = e
        navigate({ pathname: "Cityfood" }, { state: { cid: cid } })
        // getcityfood(cid)

    }
    // async function getcityfood(id: any) {
    //     console.log(id, "sssssssss");
    //     let res = await axios.get('http://localhost:7001/getcityfood.do', { params: { cid: id } })
    //     console.log(res);
    //     return (
    //         <>
    //             <div className="y-nall">
    //                 <div className="y-nalls">
    //                     {getcityfoods()}
    //                 </div>
    //             </div>
    //         </>
    //     )



    // }
    // function getcityfoods() {
    //     return (
    //         nlist.map((item: any, index: any) => {
    //             return (
    //                 <Card
    //                     className='y-card'
    //                     key={item.id}
    //                     hoverable
    //                     style={{ width: 240, margin: '10px' }}
    //                     cover={<img alt="example" src={item.foodimg1}
    //                     />}
    //                     onClick={toFood.bind(null, item.id)}
    //                 >
    //                     <Meta title={item.name} description='welcome' />
    //                     <Rate value={item.score} /><span style={{ color: 'rgba(0, 0, 0, 0.45)', marginLeft: '10px' }}>{item.score}分</span>
    //                     <h1>111</h1>
    //                     <div className='y-hover'>{item.introduce}</div>
    //                 </Card>

    //             )


    //         })
    //     )
    // }
    function renderArray() {
        return (
            lists.map((item, index) => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>)
            })
        )

    }
    return (
        <div>

            <div className="y-all">
                <div className="y-select">
                    <Select onChange={updateList} value={select} className='y-selects'>
                        {renderArray()}
                    </Select>
                </div>
                <div className="y-alls">
                    <div className="y-contain">
                        {collumn()}
                    </div>

                </div>


            </div>
            <Routes>
                <Route path='/FoodInformation' element={<FoodInformation />} />

            </Routes>

        </div>
    )
}
export default IndexFood