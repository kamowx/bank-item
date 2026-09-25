import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Welcomepage() {
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="app">
      <div className="onboarding">
        {/* Верхняя часть */}
        <div className="onboarding-header">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">EasyPay</div>
        </div>

        {/* Картинка */}
        <div className="onboarding-image">
          <div className="payment-image">
            {/* Здесь потом можно поставить настоящую картинку */}
            <div className="person person-left"></div>
            <div className="person person-right"></div>

            <div className="payment-card">
              <div className="card-line"></div>
              <div className="card-line small"></div>
            </div>
          </div>
        </div>

        {/* Индикатор */}
        <div className="onboarding-indicator">
          <span className="active"></span>
          <span></span>
          <span></span>
        </div>

        {/* Текст */}
        <div className="onboarding-content">
          <h1>Удобные онлайн-платежи</h1>

          <p>
            Сделайте свои платежи проще и выгоднее прямо сейчас. Никаких скрытых
            комиссий!
          </p>
        </div>

        {/* Кнопки */}
        <div className="onboarding-buttons">
          <a href="/signin">
            <button className="login-button">Вход</button>
          </a>
          <a href="/signup">
            <button className="signup-button">Зарегистрироваться</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Welcomepage;
