import { useState } from "react";
import { language } from "../data/language";

function Withdraw() {
  /* ЯЗЫК */

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );

  const text = language.find((item) => item.id === lang);

  /* ID ПОЛЬЗОВАТЕЛЯ */

  const id = JSON.parse(localStorage.getItem("id"));

  /* СУММА */

  const [number, setNumber] = useState("");

  const [result, setResult] = useState("");

  const [withdrawResult, setWithdrawResult] = useState("");

  /* ВАЛЮТА */

  const [currency, setCurrency] = useState("rub");

  /* СНЯТИЕ */

  function withdraw() {
    /* ПРОВЕРКА СУММЫ */

    if (Number(number) <= 0) {
      alert("Введите сумму");

      return;
    }

    /* ВЫБИРАЕМ СЧЁТ */

    let key = "";

    if (currency === "rub") {
      key = "result_rub_" + id;
    }

    if (currency === "dollar") {
      key = "result_dollar_" + id;
    }

    if (currency === "som") {
      key = "result_sum_" + id;
    }

    /* ПОЛУЧАЕМ БАЛАНС */

    const oldResult = Number(localStorage.getItem(key) || 0);

    /* ПРОВЕРКА БАЛАНСА */

    if (Number(number) > oldResult) {
      alert("Недостаточно денег");

      return;
    }

    /* НОВЫЙ БАЛАНС */

    const newResult = oldResult - Number(number);

    setResult(newResult);

    localStorage.setItem(key, newResult);

    /* ПОСЛЕДНЕЕ СНЯТИЕ */

    setWithdrawResult(number);

    localStorage.setItem("withdrawResult_" + id, number);

    /* ИСТОРИЯ */

    const history = JSON.parse(localStorage.getItem("history_" + id) || "[]");

    history.push({
      type: "Снятие",

      amount: Number(number),

      currency: currency,
    });

    localStorage.setItem("history_" + id, JSON.stringify(history));
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ЗАГОЛОВОК */}

          <div className="card-header text-center p-4">
            <h4>
              <b>📤 {text.btn_withdraw_money}</b>
            </h4>

            <span>Введите сумму</span>
          </div>

          <div className="card-body">
            <label>
              <b>{text.amount}:</b>
            </label>

            {/* ПОСЛЕДНЕЕ СНЯТИЕ */}

            {withdrawResult && (
              <h4 className="mt-3">
                Снято денег: {withdrawResult} {currency === "rub" && "₽"}
                {currency === "dollar" && "$"}
                {currency === "som" && "с"}
              </h4>
            )}

            {/* INPUT */}

            <input
              type="number"
              className="form-control"
              placeholder={text.enter_amount}
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
              onClick={withdraw}
              className="btn bg-danger text-white col-12 mt-3"
            >
              {text.btn_withdraw_money}
            </button>

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

export default Withdraw;
