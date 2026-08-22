import { useState } from "react";
import { language } from "../data/language";

function Exchange() {
  /* ЯЗЫК */

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );

  const text = language.find((item) => item.id === lang);

  /* БАЛАНСЫ */

  const [result_r, setResult_r] = useState(
    Number(localStorage.getItem("result_rub")) || 0
  );

  const [result_d, setResult_d] = useState(
    Number(localStorage.getItem("result_dollar")) || 0
  );

  const [result_s, setResult_s] = useState(
    Number(localStorage.getItem("result_sum")) || 0
  );

  /* СУММЫ */

  const [numberRub, setNumberRub] = useState("");

  const [numberDollar, setNumberDollar] = useState("");

  const [numberSom, setNumberSom] = useState("");

  /* ₽ → СОМ */

  function rubSom() {
    const number = Number(numberRub);

    if (number > result_r) {
      alert("Недостаточно рублей");

      return;
    }

    const newRub = result_r - number;

    const newSom = result_s + number * 1.03;

    setResult_r(newRub);

    setResult_s(newSom);

    localStorage.setItem("result_rub", newRub);

    localStorage.setItem("result_sum", newSom);

    alert("Обмен выполнен");
  }

  /* ₽ → ДОЛЛАР */

  function rubDollar() {
    const number = Number(numberRub);

    if (number > result_r) {
      alert("Недостаточно рублей");

      return;
    }

    const newRub = result_r - number;

    const newDollar = result_d + number * 0.012;

    setResult_r(newRub);

    setResult_d(newDollar);

    localStorage.setItem("result_rub", newRub);

    localStorage.setItem("result_dollar", newDollar);

    alert("Обмен выполнен");
  }

  /* $ → СОМ */

  function dollarSom() {
    const number = Number(numberDollar);

    if (number > result_d) {
      alert("Недостаточно долларов");

      return;
    }

    const newDollar = result_d - number;

    const newSom = result_s + number * 87.45;

    setResult_d(newDollar);

    setResult_s(newSom);

    localStorage.setItem("result_dollar", newDollar);

    localStorage.setItem("result_sum", newSom);

    alert("Обмен выполнен");
  }

  /* $ → ₽ */

  function dollarRub() {
    const number = Number(numberDollar);

    if (number > result_d) {
      alert("Недостаточно долларов");

      return;
    }

    const newDollar = result_d - number;

    const newRub = result_r + number * 84.95;

    setResult_d(newDollar);

    setResult_r(newRub);

    localStorage.setItem("result_dollar", newDollar);

    localStorage.setItem("result_rub", newRub);

    alert("Обмен выполнен");
  }

  /* СОМ → ₽ */

  function somRub() {
    const number = Number(numberSom);

    if (number > result_s) {
      alert("Недостаточно сомов");

      return;
    }

    const newSom = result_s - number;

    const newRub = result_r + number * 0.97;

    setResult_s(newSom);

    setResult_r(newRub);

    localStorage.setItem("result_sum", newSom);

    localStorage.setItem("result_rub", newRub);

    alert("Обмен выполнен");
  }

  /* СОМ → $ */

  function somDollar() {
    const number = Number(numberSom);

    if (number > result_s) {
      alert("Недостаточно сомов");

      return;
    }

    const newSom = result_s - number;

    const newDollar = result_d + number * 0.011;

    setResult_s(newSom);

    setResult_d(newDollar);

    localStorage.setItem("result_sum", newSom);

    localStorage.setItem("result_dollar", newDollar);

    alert("Обмен выполнен");
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ЗАГОЛОВОК */}

          <div className="card-header text-center p-4">
            <h4>
              <b>💱 Обмен счета</b>
            </h4>

            <span>Текущее состояние</span>
          </div>

          {/* КУРСЫ */}

          <table className="currency-table">
            <tbody>
              <tr className="f1">
                <td>
                  <big>$ 1 =</big>
                  <b>87.45 KGS</b>
                </td>

                <td>
                  <big>$ 1 =</big>
                  <b>84.95 RUB</b>
                </td>
              </tr>

              <tr className="f1">
                <td>
                  <big>с 1 =</big>
                  <b>0.011 USD</b>
                </td>

                <td>
                  <big>с 1 =</big>
                  <b>0.97 RUB</b>
                </td>
              </tr>

              <tr className="f1">
                <td>
                  <big>₽ 1 =</big>
                  <b>1.03 KGS</b>
                </td>

                <td>
                  <big>₽ 1 =</big>
                  <b>0.012 USD</b>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="card-body">
            <div className="cards-slider">
              <div className="cards-container">
                {/* РУБЛИ */}

                <div className="bank-card mb-3">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №1</b>

                    <br />

                    <b>{result_r.toFixed(2)} ₽</b>

                    <br />

                    <input
                      type="number"
                      className="form-control mt-2"
                      placeholder="Введите сумму ₽"
                      onChange={(e) => setNumberRub(e.target.value)}
                    />

                    <button
                      onClick={rubSom}
                      className="btn btn-light w-100 mt-2"
                    >
                      ₽ → Сом
                    </button>

                    <button
                      onClick={rubDollar}
                      className="btn btn-light w-100 mt-2"
                    >
                      ₽ → Доллар
                    </button>
                  </div>
                </div>

                {/* ДОЛЛАРЫ */}

                <div className="bank-card mb-3">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №2</b>

                    <br />

                    <b>{result_d.toFixed(2)} $</b>

                    <br />

                    <input
                      type="number"
                      className="form-control mt-2"
                      placeholder="Введите сумму $"
                      onChange={(e) => setNumberDollar(e.target.value)}
                    />

                    <button
                      onClick={dollarSom}
                      className="btn btn-light w-100 mt-2"
                    >
                      $ → Сом
                    </button>

                    <button
                      onClick={dollarRub}
                      className="btn btn-light w-100 mt-2"
                    >
                      $ → Рубль
                    </button>
                  </div>
                </div>

                {/* СОМЫ */}

                <div className="bank-card mb-3">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №3</b>

                    <br />

                    <b>{result_s.toFixed(2)} с</b>

                    <br />

                    <input
                      type="number"
                      className="form-control mt-2"
                      placeholder="Введите сумму сом"
                      onChange={(e) => setNumberSom(e.target.value)}
                    />

                    <button
                      onClick={somRub}
                      className="btn btn-light w-100 mt-2"
                    >
                      Сом → ₽
                    </button>

                    <button
                      onClick={somDollar}
                      className="btn btn-light w-100 mt-2"
                    >
                      Сом → $
                    </button>
                  </div>
                </div>
              </div>
            </div>

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

export default Exchange;
