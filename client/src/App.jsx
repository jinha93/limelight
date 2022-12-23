import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './components/common/NotFound';
import Navigation from './components/navigation/Navigation';
import Main from './components/main/Main';
import About from './components/about/About';
import Team from './components/team/Team';
import Rank from './components/rank/Rank';
import Raffle from './components/raffle/Raffle';
import Auction from './components/auction/Auction';
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
                <div id="MAIN" className="content h-screen"><Main/></div>
                <div id="ABOUT" className="content h-screen"><About/></div>
                <div id="TEAM" className="content h-screen"><Team/></div>
              </Fragment>
            }/>
          <Route path='/rank' element={ <Rank/> }/>
          <Route path='/raffle' element={ <Raffle/> }/>
          <Route path='/*' element={ <NotFound/> }/>
        </Routes>
      {/* <Navbar></Navbar>
      <div className='w-full h-full'>
        <div id="MAIN" className="content h-screen"><Main/></div>
        <div id="ABOUT" className="content h-screen"><About/></div>
        <div id="TEAM" className="content h-screen"><Team/></div>
        <div id="RANK" className="content h-screen bg-black text-white"><Rank/></div>
        <div id="RAFFLE" className="content h-screen">RAFFLE</div>
        
      </div> */}
    </div>
  );
}

export default App;
