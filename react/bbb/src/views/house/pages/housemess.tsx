import { Button, Calendar, message } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { DefaultDeserializer } from "v8"
import axios from "axios";
import { DatePicker, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';


const { RangePicker } = DatePicker;

interface IScenics {
  adress: string,
  id: number,
  img: string,
  phonenumber: number,
  price: string,
  special: string,
  time: string,
  title: string,
  introduct: string,
  ph: string
}
function Housemess() {
  const onChange = (date: Dayjs) => {
    if (date) {
      console.log('Date: ', date);
    } else {
      console.log('Clear');
    }
  };
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      console.log(dateStrings[0], dateStrings[1]);
      setdays1(dateStrings[0])
      setdays2(dateStrings[1])

    } else {
      console.log('Clear');
    }
  };

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
      { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
      { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
      { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
      { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const [scenics, setScenics] = useState<IScenics | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '订购成功',
    });
  };
  const location = useLocation();
  const day = useRef<any>()
  const [days1, setdays1] = useState<any>()
  const [days2, setdays2] = useState<any>()
  //景点id值。
  const sid = location.state as number;
  useEffect(function () {
    begin();

  }, []);
  async function begin() {
    try {
      //axios发送ajax请求， 得到景点的详情
      let scenics = await getScenics();
      //通过详情修改状态
      setScenics(scenics);

      //axios是否已经收藏当前景点

      //关注
      showco()
      let collects = await showco();
      console.log(collects, 'aaaaaaaaaaa');

      if (collects.length == 1) {
        day.current.style.color = 'yellow'
      } else {
        day.current.style.color = 'black'
      }



    } catch (e) {
      console.log(e);
    }
  }
  function rederhouse() {
    return (
      <div className="m-trips">
        <div className="m-Group5">
          <div className="m-Gp">
            <div className="m-tttt">
              中国.四川
            </div>
            <div className="m-vv">
              <div className="m-vvv"></div>
            </div>
          </div>
          <div className="m-img">
            <img src={scenics?.ph} alt="" />
          </div>
        </div>

        <div className="m-tite">{scenics?.title}</div>
        <div className="m-rimi"></div>
        <div className="m-xiangqing">{scenics?.introduct}</div>
        <div className="m-yudi">
          <div className="m-yd" onClick={onChanges} >
            {contextHolder}
            <Button onClick={success}>立即预定</Button>
          </div>
          <div className="m-Gourp2">
            <div className="m-vustart">

              <div className="m-vstart">
                <div className="m-start">
                  <div className="m-Gourpp" ref={day} onClick={addcollect}>
                    <StarOutlined />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-ttt">4.9</div>
          </div>
        </div>

      </div>
    )
  }
  async function getScenics() {
    const url = "http://localhost:7001/getScenicsById.do";
    let res = await axios.get(url, { params: { sid } });
    let data = res.data;
    if (data.state == 1) {
      let scenics = data.list[0];
      let t = new Date(scenics.time);
      let mytime = `${t.getFullYear()}:${t.getMonth()}:${t.getDate()}`;
      scenics.time = mytime;
      return scenics;
    } else {
      throw new Error("异常")
    }
  }
  function onChanges() {
    console.log(days1, days2);

  }
  async function showco() {
    let str = sessionStorage.getItem("user") as string;
    let user = JSON.parse(str);
    let uid = user.userId
    const hid = location.state as number;
    let res = await axios.get('http://localhost:7001/getco.do', { params: { uid, hid } })
    return res.data


  }
  async function addcollect() {
    let list = await showco()
    console.log(list);
    if (list.length == 1) {
      deletecollection()
    }
    else {
      const hid = location.state as number;

      let str = sessionStorage.getItem("user") as string;
      let user = JSON.parse(str);

      let uid = user.userId
      let res = await axios.get('http://localhost:7001/addcollects.do', { params: { hid: hid, uid: uid, ii: 0 } })
      console.log(res);
      if (res.data == 1) {
        alert('添加到我的收藏成功')
      }

      begin()
    }

  }
  //取消收藏
  async function deletecollection() {
    const hid = location.state as number;
    let str = sessionStorage.getItem("user") as string;
    let user = JSON.parse(str);
    let uid = user.userId
    let res = await axios.get('http://localhost:7001/addcollects.do', { params: { hid, uid, ii: 1 } })
    console.log(res.data == 1);
    if (res.data == 1) {
      alert("取消收藏成功")
    }
    begin()


  }
  return (
    <div className="m-box">
      <div className="m-nav"></div>
      {rederhouse()}
      <div className="m-Gropus"></div>
      <div className="m-data">
        <div>Today</div>
        <div className="site-calendar-demo-card">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <Space direction="vertical" size={12}>

          <RangePicker presets={rangePresets} onChange={onRangeChange} />
          <div>
            新增预定
            <p>{days1}-{days2}</p>
          </div>

        </Space>

      </div>
    </div>
  )
}
export default Housemess
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