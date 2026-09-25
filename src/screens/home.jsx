import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";
import { language } from "../data/language";
import Bottombar from "../components/bottombar";
import Fastbar from "../components/fastbar";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      navigate("/");
    }
  }, [navigate]);

  /* ЯЗЫК */

  const [lang] = useState(Number(localStorage.getItem("language")) || 1);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const text = language.find((item) => item.id === lang) || language[0];

  /* ПОЛУЧАЕМ ID ПОЛЬЗОВАТЕЛЯ */
  //Получения getItem
  const allUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setUsers(response.data);

        const id = JSON.parse(localStorage.getItem("id"));

        console.log("ID из localStorage:", id);

        const currentUser = response.data.find((item) => item.id == id);

        console.log("Текущий пользователь:", currentUser);

        setUser(currentUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  /* БАЛАНСЫ */

  //Получения getItem
  const oldResult = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    oldResult();
  }, []);

  /* ЕСЛИ ПОЛЬЗОВАТЕЛЯ НЕТ */

  if (!user) {
    return null;
  }

  const resultRub = Number(user.rub) || 0;
  const resultUsd = Number(user.usd) || 0;
  const resultSum = Number(user.sum) || 0;

  const handleLogOut = () => {
    localStorage.removeItem("id");

    navigate("/");
  };

  return (
    <div className="app">
      <div className="onboarding home-onboarding">
        <div className="home-page">
          <div className="home-header">
            <div className="home-logo">
              <div className="logo-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <a href="/home" className="i1">
                <div className="logo-text">EasyPay</div>
              </a>
            </div>
            <div className="home-user">
              <div className="home-user-name">
                {user?.firstname} {user?.lastname}
              </div>

              <div className="home-user-text">Добро пожаловать</div>
            </div>
            <a href="/history" className="i1">
              <button className="home-notification">
                <i className="fa-regular fa-bell"></i>
              </button>
            </a>{" "}
          </div>

          <div className="home-content">
            {/* Заголовок */}
            <div className="home-title">
              <h1>Главная</h1>
              <p>Ваши деньги всегда под рукой</p>
            </div>

            <div className="home-section">
              <div className="home-section-top">
                <h2>Мои счета</h2>

                <button className="home-see-all">Все</button>
              </div>

              {/* Горизонтальный скролл */}
              <div className="accounts-scroll">
                {/* Счет 1 */}
                <div className="account-card account-card-black">
                  <div className="account-card-top">
                    <span>Основной счет С</span>

                    <i className="fa-solid fa-ellipsis"></i>
                  </div>

                  <div className="account-card-balance">
                    {resultSum}
                    <span>сом</span>
                  </div>

                  <div className="account-card-bottom">
                    <span>**** 4582</span>
                    <span>KGS</span>
                  </div>
                </div>

                {/* Счет 2 */}
                <div className="account-card account-card-gray">
                  <div className="account-card-top">
                    <span>Рубль</span>

                    <i className="fa-solid fa-ellipsis"></i>
                  </div>

                  <div className="account-card-balance">
                    {resultRub}
                    <span>₽</span>
                  </div>

                  <div className="account-card-bottom">
                    <span>**** 7291</span>
                    <span>KGS</span>
                  </div>
                </div>

                {/* Счет 3 */}
                <div className="account-card account-card-light">
                  <div className="account-card-top">
                    <span>Доллары</span>

                    <i className="fa-solid fa-ellipsis"></i>
                  </div>

                  <div className="account-card-balance">
                    {resultUsd}
                    <span>$</span>
                  </div>

                  <div className="account-card-bottom">
                    <span>**** 6314</span>
                    <span>USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* РЕКЛАМНЫЙ БАННЕР  */}
            <div className="home-banner">
              <div className="home-banner-content">
                <div className="home-banner-label">СПЕЦИАЛЬНО ДЛЯ ВАС</div>

                <h3>
                  Получайте бонусы
                  <br />
                  при оплате через EasyPay
                </h3>

                <button>Подробнее</button>
              </div>

              <div className="home-banner-icon">
                <i className="fa-solid fa-gift"></i>
              </div>
            </div>

            {/*  БЫСТРЫЕ ДЕЙСТВИЯ  */}
            <div className="home-section">
              <Fastbar />
            </div>

            {/* ================= ПОСЛЕДНИЕ ОПЕРАЦИИ ================= */}
            <div className="home-section home-transactions">
              <div className="home-section-top">
                <h2>Последние операции</h2>

                <button className="home-see-all">Все</button>
              </div>

              {/* Операция 1 */}
              <div className="transaction-item">
                <div className="transaction-icon">
                  <i className="fa-solid fa-basket-shopping"></i>
                </div>

                <div className="transaction-info">
                  <strong>Супермаркет</strong>
                  <span>Сегодня, 12:45</span>
                </div>

                <div className="transaction-price">- 1 250 сом</div>
              </div>

              {/* Операция 2 */}
              <div className="transaction-item">
                <div className="transaction-icon">
                  <i className="fa-solid fa-mobile-screen"></i>
                </div>

                <div className="transaction-info">
                  <strong>Пополнение телефона</strong>
                  <span>Сегодня, 10:20</span>
                </div>

                <div className="transaction-price">- 500 сом</div>
              </div>

              {/* Операция 3 */}
              <div className="transaction-item">
                <div className="transaction-icon">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>

                <div className="transaction-info">
                  <strong>Пополнение счета</strong>
                  <span>Вчера, 18:30</span>
                </div>

                <div className="transaction-price transaction-plus">
                  + 10 000 сом
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />

          {/*BOTTOM BAR */}
          <Bottombar />
        </div>
      </div>
    </div>
  );
}

export default Home;
