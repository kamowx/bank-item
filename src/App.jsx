import { Profiler, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import Welcome from "./screens/welcome";
import Balance from "./screens/balance";
import Withdraw from "./screens/withdraw";
import Topup from "./screens/topup";
import History from "./screens/history";
import Exchange from "./screens/exchange";
import Changepassword from "./screens/changepassword";
import Welcomepage from "./screens/welcomepage";
import Fastbutton from "./screens/fastbutton";
import Transfer from "./screens/transfer";
import Profile from "./screens/profile";
import Editprofile from "./screens/editprofile";
import Qr from "./screens/qr";
import Myqr from "./screens/myqr";
import Loading from "./screens/loading";
import Transferamount from "./screens/transferamount";
import Transfersuccess from "./screens/transfersuccess";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/history" element={<History />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/" element={<Welcomepage />} />
          <Route path="/fastbutton" element={<Fastbutton />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/myqr" element={<Myqr />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/transferamount" element={<Transferamount />} />
          <Route path="/transfersuccess" element={<Transfersuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
