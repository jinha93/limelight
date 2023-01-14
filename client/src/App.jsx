import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './components/common/NotFound';
import Navigation from './components/navigation/Navigation';
import Main from './components/main/Main';
import About from './components/about/About';
import Team from './components/team/Team';
import Rank from './components/rank/Rank';
import Raffle from './components/raffle/Raffle';
import MyPage from './components/myPage/MyPage'
import { Fragment } from 'react';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
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
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/raffle' element={<Raffle />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
