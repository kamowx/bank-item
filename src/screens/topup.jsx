import axios from "axios";
import { useEffect, useState } from "react";
import { language } from "../data/language";

function Topup() {
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

  const [topupResult, setTopupResult] = useState("");

  /* ВАЛЮТА */

  const [currency, setCurrency] = useState("rub");

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

  function topup() {
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

    const newBalance = oldBalance + Number(number);

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
          setTopupResult(number);
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
            type: "Пополнение",
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
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ЗАГОЛОВОК */}

          <div className="card-header text-center p-4">
            <h4>
              <b>📥 {text.btn_top_up}</b>
            </h4>

            <span>{text.enter_amount}</span>
          </div>

          <div className="card-body">
            {/* СУММА */}

            <label>
              <b>{text.amount}:</b>
            </label>

            {/* ПОКАЗАТЬ ПОПОЛНЕНИЕ */}

            {topupResult && (
              <h4 className="mt-3">
                Пополнено денег: {topupResult} {currency === "rub" && "₽"}
                {currency === "dollar" && "$"}
                {currency === "som" && "с"}
              </h4>
            )}

            {/* INPUT */}

            <input
              type="number"
              className="form-control"
              placeholder={text.enter_amount}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <br />

            {/* ДОЛЛАР */}

            <label>
              <input
                onChange={() => setCurrency("dollar")}
                type="radio"
                name="currency"
              />{" "}
              Доллар $
            </label>

            <br />

            {/* РУБЛЬ */}

            <label>
              <input
                onChange={() => setCurrency("rub")}
                type="radio"
                name="currency"
              />{" "}
              Рубль ₽
            </label>

            <br />

            {/* СОМ */}

            <label>
              <input
                onChange={() => setCurrency("som")}
                type="radio"
                name="currency"
              />{" "}
              Сом с
            </label>

            {/* КНОПКА */}

            <button
              onClick={topup}
              className="btn bg-success text-white col-12 mt-3"
            >
              {text.btn_top_up}
            </button>

            {/* НАЗАД */}

            <a href="/home">
              <button className="btn btn-secondary col-12 mt-3">
                {text.btn_back}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topup;
