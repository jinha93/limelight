import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<div>Main</div>} />
          <Route path='/pageA' element={<div>PageA</div>} />
          <Route path='/pageB' element={<div>PageB</div>} />
          <Route path='/pageC' element={<div>PageC</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
