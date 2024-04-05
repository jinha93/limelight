import './App.css';
import { Routes, Route } from 'react-router-dom';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// main
import Navigation from './components/navigation/Navigation';
import Main from './components/main/Main';
import About from './components/about/About';
import Team from './components/team/Team';
import Raffle from './components/raffle/Raffle';

// idle
import Layout from './components/idle/Layout';
import MyLimemon from './components/idle/myLimemon/MyLimemon';
import Quests from './components/idle/quests/Quests';

// 색종이 날림 효과
import JSConfetti from "js-confetti";
export const conteffi = new JSConfetti();

function App() {
  return (
    <div className="App">
      {/* toast */}
      <ToastContainer />

      <Navigation />

      {/* main */}
      <Routes>
        <Route
          path='/'
          element={
            <>
              <div id="home" className="content h-screen"><Main /></div>
              <div id="about" className="bg content lg:h-screen"><About /></div>
              <div id="team" className="bg content lg:h-screen"><Team /></div>
            </>
          }
        />
        <Route path='/raffle' element={<Raffle />} />

        {/* idle */}
        <Route path='/idle' element={<Layout />} >
          <Route index element={<div>Main</div>} />
          <Route path='/idle/myLimemon' element={<MyLimemon />} />
          <Route path='/idle/items' element={<div>item</div>} />
          <Route path='/idle/quests' element={<Quests />} />
          <Route path='/idle/shop' element={<div>shop</div>} />
          <Route path='/idle/leaderBoard' element={<div>leaderBoard</div>} />
          <Route path='/idle/events' element={<div>event</div>} />
          <Route path='/idle/more1' element={<div>more1</div>} />
          <Route path='/idle/more2' element={<div>more2</div>} />
          <Route path='/idle/more3' element={<div>more3</div>} />

          <Route path='/idle/*' element={<div>Not found</div>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
