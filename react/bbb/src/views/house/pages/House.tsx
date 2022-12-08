import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import path from 'path';
interface Ihouse{
  adress:string,
  id:number,
  img:string,
  phonenumber:number,
  price:string,
  special:string,
  time:string,
  title:string

}
function House() {
  const navigate = useNavigate();
  const [houses,sethouses] = useState<Ihouse[]>([])
  useEffect(function(){
    begin()
  },[])
  async function begin() {
 let houses=await getAll()
 console.log(houses);
 sethouses(houses)
 console.log(houses);

   
  }
  async function getAll() {
    const url = "http://localhost:7001/getAllScenics.do";
    const res = await axios.get(url);
    const data = res.data;//{state: 1, list: [{id,name,introduce,img,praise,time,uid},{},...]}
    if (data.state == 1) {
      for (let i = 0; i < data.list.length; i++) {
        let scenics = data.list[i];
        let d = new Date(scenics.time);
        let time = `${d.getFullYear()}:${d.getMonth()}:${d.getDate()}`
        scenics.time = time;
      }
      return data.list;
      
      
    } else {
      throw new Error("异常")
    }
  }
  function todetailes(id:number){
    navigate({pathname:'/housemess'},{state:id});
    
  }
  
  function date(){
  return(
    houses.map((item:any,index:any)=>{
      return(
        <div className="h-date" key={item.id}>

          <div className="h-da1" onClick={todetailes.bind(null,item.id)}>
            <div className="h-table">
              <div className="h-xinxi">
                {item.img}
              </div>
              <div className="h-phone">
                {item.phonenumber}
              </div>
            </div>
            <div className="h-tab1">
              <div className="h-price">
              <div className="h-pprice">
                <div className="h-ppp">/night</div>
                <div className="h-money">{item.price}</div>
              </div>
              </div>
              <div className="h-ptitle">
                <div className="h-dress">
                  {item.adress}
                </div>
                <div className="h-tedian">
                  {item.special}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  )
  
  }
  
  return (
   

    <div className="h-content">
  
       
      <div className="h-box">
        <div className="h-screen1">
          <div className="h-header">
            <div className="h-meaun">
              <div className="h-link h-link1">
                <div className="h-linktext">Home</div>
              </div>
              <div className="h-link">
                <div className="h-linktext">Book</div>
              </div>
              <div className="h-link">
                <div className="h-linktext">Siginup</div>
              </div>
              <div className="h-link">
                <div className="h-linktext">Option</div>
              </div>
            </div>
            <div className="h-socil"></div>
          </div>
          <div className="h-Loge">
            <div className="h-line"></div>
            <div className="h-text">
              <div className="h-hety">hytte</div>
              <div className="h-hedy">[hyd̥ə]</div>
              <div className="h-3">
                <div className="h-nu">(Noun)</div>
                <div className="h-cott">cottage, summer house</div>
              </div>
            </div>
          </div>

        </div>
        <div className="h-screen2">

          <div className="h-title">
            <div className="h-Options">Options</div>
            <div className="h-217">217 perfect options</div>
          </div>
          <div className="h-logo">
            <div className="h-lino"></div>
            <div className="h-textt">
              <div className="h-hytte">hytte</div>
            </div>
          </div>
          <div className="h-photos">
            <div className="h-Rg1"></div>
            <div className="h-Rg2"></div>
            <div className="h-Rg3"></div>
            <div className="h-Rg4"></div>
            <div className="h-Rg5"></div>
          </div>
          <div className="h-date">
          {date()}
          </div>
         
        </div>
        <div className="h-screen3">
          <div className="h-Booking">
            <div className="h-datee">

            </div>
            <div className="h-imgg"></div>
          </div>
          <div className="h-headering">
            <div className="h-titlee">
              <div className="h-booking">Book Hytte</div>
              <div className="h-booking2">Book a Hytte in Norway</div>
            </div>
          </div>
        </div>
        <div className="h-screen4">
          <div className="h-title4">
            <div className="h-kk">Hytte App</div>
            <div className="h-kke">iOS & Android</div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default House;