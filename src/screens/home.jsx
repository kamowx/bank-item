import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";
import { language } from "../data/language";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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

        const currentUser = response.data.find((item) => item.id == id);

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
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ГЛАВНОЕ МЕНЮ */}

          <div className="card-header text-center p-4">
            <h4>
              <b>{text.menu_title}</b>
            </h4>

            <p>
              {text.name_title}: {user.email}
            </p>

            <span>{text.operation_header}</span>
          </div>

          <div className="card-body">
            {/* БАЛАНСЫ */}

            <div className="cards-slider">
              <div className="cards-container">
                {/* КАРТА 1 — РУБЛЬ */}

                <div className="bank-card">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №1</b>

                    <br />

                    <b className="balance-rub">{resultRub}</b>

                    <b className="balance-currency">₽</b>
                  </div>
                </div>

                {/* КАРТА 2 — ДОЛЛАР */}

                <div className="bank-card">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №2</b>

                    <br />

                    <b className="balance-rub">{resultUsd}</b>

                    <b className="balance-currency">$</b>
                  </div>
                </div>

                {/* КАРТА 3 — СОМ */}

                <div className="bank-card">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №3</b>

                    <br />

                    <b className="balance-rub">{resultSum}</b>

                    <b className="balance-currency">с</b>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />

            {/* КНОПКИ */}

            <Link to="/balance" className="btn btn-primary col-12 mb-2">
              💰 {text.lbl_check_balance}
            </Link>

            <Link to="/withdraw" className="btn btn-primary col-12 mb-2">
              💸 {text.btn_withdraw_money}
            </Link>

            <Link to="/topup" className="btn btn-primary col-12 mb-2">
              💳 {text.btn_top_up}
            </Link>

            <Link to="/exchange" className="btn btn-primary col-12 mb-2">
              💱 {text.exchange}
            </Link>

            <Link to="/history" className="btn btn-primary col-12 mb-2">
              📜 {text.btn_history}
            </Link>

            <Link to="/changepassword" className="btn btn-primary col-12 mb-2">
              🔐
              {lang === 1 ? " Смена пароля" : " Change Password"}
            </Link>

            <br />

            {/* ВЫХОД */}

            <button
              onClick={handleLogOut}
              className="btn btn-danger col-12 mb-2"
            >
              🚪
              {lang === 1 ? " Выйти" : " Log Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
