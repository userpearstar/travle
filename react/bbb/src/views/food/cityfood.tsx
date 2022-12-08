import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import FoodInformation from './foodInformation';
import { Card } from 'antd';
import { Rate, Select } from 'antd';
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
function Cityfood() {
    useEffect(function () {

        getcityfood()
        getcityfoods()
    }, [])
    const navigate = useNavigate();
    const location = useLocation();
    let v = location.state as { cid: number };
    const [cid, setcid] = useState<number>(0)
    const [nlist, setnlist] = useState<Ifood[]>([])//相关地址的美食信息

    async function getcityfood() {
        let cid = v.cid

        console.log(cid, "sssssssss");
        let res = await axios.get('http://localhost:7001/getcityfood.do', { params: { cid: cid } })
        console.log(res.data);
        setnlist(res.data)
        return (
            <>
                <div className="y-nall">
                    <div className="y-nalls">
                        {getcityfoods()}
                    </div>
                </div>
            </>
        )



    }
    function toFood(id: number) {
        console.log(id);
        navigate({ pathname: "/food/FoodInformation" }, { state: { id: id } });



    }
    function getcityfoods() {
        return (
            nlist.map((item: any, index: any) => {
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
    return (
        <>
            <div className="y-all">

                <div className="y-alls">
                    <div className="y-contain">
                        {getcityfoods()}
                    </div>

                </div>
            </div>
            <Routes>
                <Route path='/FoodInformation' element={<FoodInformation />} />

            </Routes>

        </>
    )

}
export default Cityfood