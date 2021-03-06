import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/home';

import { AnimatePresence} from 'framer-motion'


function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home></Home>}/>
      </Routes>
    </AnimatePresence>

  );
};


export default App;
