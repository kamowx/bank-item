import { useEffect, useState } from "react";

import Bottombar from "../components/bottombar";
import Fastbar from "../components/fastbar";

function Fastbutton() {
  return (
    <div className="app">
      <div className="onboarding home-onboarding">
        <div className="home-page">
          <div className="onboarding-header">
            <div className="logo-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <a href="/fastbutton" className="i1">
              <div className="logo-text">EasyPay</div>
            </a>
          </div>

          <div className="home-content">
            <div className="home-title">
              <h1>Категории</h1>
              <p>Выберите какой-то категорию и быстро оплачивайте</p>
            </div>

            <div className="home-section">
              <Fastbar />
            </div>
          </div>
          <br />

          <Bottombar />
        </div>
      </div>
    </div>
  );
}

export default Fastbutton;
