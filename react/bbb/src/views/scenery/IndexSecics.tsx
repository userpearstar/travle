import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/indexLogin';
import Regist from './pages/regist';
import ScenicsList from './pages/ScenicsList';
import Scenicsmessage from './pages/Scenicsmessage';
import ThemeContext from './tool/ThemeContext';


interface IScenics {
	id: number,
	name: string,
	introduce: string,
	img: string,
	praise: number,
	time: string,
	uid: number
}

function IndexScenics() {
	const [scenicsList, setScenicsList] = useState<IScenics[]>([]);
	return (
		<ThemeContext.Provider value={{ scenicsList, setScenicsList }}>
			<BrowserRouter>
				<Routes>
					<Route path="/Scenics" element={<ScenicsList />} />
					<Route path='/regist' element={<Regist />} />
					<Route path='/login' element={<Login />} />
					<Route path='/message' element={<Scenicsmessage />} />
				</Routes>
			</BrowserRouter>
		</ThemeContext.Provider>
	);
}
export default IndexScenics;