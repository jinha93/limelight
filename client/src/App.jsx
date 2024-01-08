import './App.css';

import { Routes, Route } from 'react-router-dom';

import NotFound from './components/common/NotFound';
import Navigation from './components/navigation/Navigation';
import Main from './components/main/Main';
import About from './components/about/About';
import Team from './components/team/Team';
import Rank from './components/rank/Rank';
import Raffle from './components/raffle/Raffle';
import AddRaffle from './components/raffle/AddRaffle';
import MyPage from './components/myPage/MyPage'
import MyLimemon from './components/limemon/MyLimemon';
import Idle from './components/idle/Idle';


import { Fragment } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import JSConfetti from "js-confetti";
export const conteffi = new JSConfetti();

function App() {
  return (
    <div className="App">
      {/* toast */}
      <ToastContainer/>

      {/* nav */}
      <Navigation/>

      <Routes>
        <Route
          path='/'
          element={
            <Fragment>
              <div id="home" className="content h-screen"><Main /></div>
              <div id="about" className="bg content lg:h-screen"><About /></div>
              <div id="team" className="bg content lg:h-screen"><Team /></div>
            </Fragment>
          } />
        <Route path='/rank' element={<Rank />} />
        <Route path='/raffle' element={<Raffle />} />
        <Route path='/addRaffle' element={<AddRaffle />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/limemon' element={<MyLimemon />} />
        <Route path='/idle' element={<Idle />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
