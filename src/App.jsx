import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/home'
import Welcome from './screens/welcome'
import Balance from './screens/balance'
import Withdraw from './screens/withdraw'
import Topup from './screens/topup'
import History from './screens/history'







import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/history" element={<History />} />





        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
