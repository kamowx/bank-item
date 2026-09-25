import axios from "axios";
import { useEffect, useState } from "react";
import { language } from "../data/language";
import Bottombar from "../components/bottombar";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const navigate = useNavigate();
  /* ЯЗЫК */

  const [data, setData] = useState([]);

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const text = language.find((item) => item.id === lang);

  /* СУММА */

  const [number, setNumber] = useState("");

  const [withdrawResult, setWithdrawResult] = useState("");
  useEffect(() => {
    if (withdrawResult) {
      const timer = setTimeout(() => {
        setWithdrawResult("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [withdrawResult]);

  /* ВАЛЮТА */

  const [currency, setCurrency] = useState("som");

  /* ID ПОЛЬЗОВАТЕЛЯ */

  const id = JSON.parse(localStorage.getItem("id"));

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

        /* НАХОДИМ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ */

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

  /* ПОПОЛНЕНИЕ */

  function withdraw() {
    if (Number(number) <= 0) {
      alert("Введите сумму");

      return;
    }

    if (!user) {
      alert("Пользователь не найден");

      return;
    }

    /* ВЫБИРАЕМ СЧЁТ */

    let key = "";

    if (currency === "rub") {
      key = "rub";
    }

    if (currency === "dollar") {
      key = "usd";
    }

    if (currency === "som") {
      key = "sum";
    }

    /* СТАРЫЙ БАЛАНС */

    const oldBalance = Number(user[key]) || 0;

    /* НОВЫЙ БАЛАНС */

    const newBalance = oldBalance - Number(number);

    /* СОХРАНЯЕМ БАЛАНС */

    //Save и setItem
    const saveTopup = async () => {
      if (!number.trim()) return;

      try {
        const responce = await axios({
          method: "PUT",
          url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
          data: {
            [key]: newBalance,
          },
        });

        console.log("PUT", responce);

        if (responce.status === 200) {
          setWithdrawResult(number);
          setNumber("");

          allUser();
        }
      } catch (error) {
        console.error(error);
      }
    };

    saveTopup();

    /* ИСТОРИЯ */

    //Получения getItem
    const getHistory = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "https://6aae654c606bd915d110c57c.mockapi.io/history",
        });

        console.log("GET", response);

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    //Save и setItem
    const saveHistory = async () => {
      if (!number.trim()) return;

      try {
        const responce = await axios({
          method: "POST",
          url: "https://6aae654c606bd915d110c57c.mockapi.io/history",
          data: {
            number: number,
            userId: user.id,
            type: "Сняли",
            currency: currency,
          },
        });

        console.log("POST", responce);

        if (responce.status === 201 || responce.status === 200) {
          getHistory();
        }
      } catch (error) {
        console.error(error);
      }
    };

    saveHistory();
  }
  return (
    <div className="app">
      <div className="onboarding topup-page">
        {/* ================= HEADER ================= */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="onboarding-header">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <a href="/withdraw" className="i1">
            <div className="logo-text">EasyPay</div>
          </a>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="topup-content">
          <div className="topup-title">
            <h1>Пополнить счёт</h1>
            <p>Введите сумму и выберите валюту</p>
          </div>
          {withdrawResult && (
            <div className="topup-success">
              <div className="topup-success-icon">
                <i className="fa-solid fa-check"></i>
              </div>

              <div className="topup-success-content">
                <span>Счёт успешно снять</span>

                <h4>
                  - {withdrawResult} {currency === "rub" && "₽"}
                  {currency === "dollar" && "$"}
                  {currency === "som" && "с"}
                </h4>
              </div>
            </div>
          )}
          {/* ================= FORM ================= */}
          <div className="topup-form">
            {/* Сумма */}

            <div className="topup-input-box">
              <label>Сумма</label>

              <input
                type="number"
                placeholder={text.enter_amount}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            {/* Валюта */}

            <div className="topup-currency">
              <label className="currency-title">Валюта</label>

              <div className="currency-list">
                {/* СОМ */}

                <label className="currency-item">
                  <input
                    type="radio"
                    name="currency"
                    value="som"
                    defaultChecked
                    onChange={() => setCurrency("som")}
                  />

                  <span>Сом</span>
                </label>

                {/* РУБЛЬ */}

                <label className="currency-item">
                  <input
                    type="radio"
                    name="currency"
                    value="rub"
                    onChange={() => setCurrency("rub")}
                  />

                  <span>Рубль</span>
                </label>

                {/* ДОЛЛАР */}

                <label className="currency-item">
                  <input
                    value="usd"
                    onChange={() => setCurrency("dollar")}
                    type="radio"
                    name="currency"
                  />

                  <span>Доллар</span>
                </label>
              </div>
            </div>

            {/* Кнопка */}

            <button className="topup-button" onClick={withdraw}>
              Снимать
            </button>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}

        <Bottombar />
      </div>
    </div>
  );
}

export default Withdraw;
