import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import House from '../house/pages/House'
import Housemess from '../house/pages/housemess';
import Login from '../login/indexLogin'
import Regist from '../login/regist';

function IndexScenics() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/house' element={<House />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Regist' element={<Regist />} />
                <Route path='/housemess' element={<Housemess />} />
                </Routes>

        </BrowserRouter>

    );
}
export default IndexScenics;