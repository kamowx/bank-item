import { useEffect, useState } from "react";
import { language } from "../data/language";
import axios from "axios";

function Exchange() {
  /* ЯЗЫК */
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );

  const text = language.find((item) => item.id === lang);

  /* ID ПОЛЬЗОВАТЕЛЯ */

  const id = JSON.parse(localStorage.getItem("id"));

  // Получения GET
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

  /* 
     ПОЛУЧАЕМ ИСТОРИЮ
   */

  const getHistory = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/history",
      });

      console.log("GET HISTORY", response);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  /* 
     БАЛАНСЫ
   */

  const [result_r, setResult_r] = useState(0);

  const [result_d, setResult_d] = useState(0);

  const [result_s, setResult_s] = useState(0);

  /* ПОЛУЧАЕМ БАЛАНСЫ ИЗ MOCKAPI */

  useEffect(() => {
    if (user) {
      setResult_r(Number(user.rub) || 0);
      setResult_d(Number(user.usd) || 0);
      setResult_s(Number(user.sum) || 0);
    }
  }, [user]);

  /* 
     СУММЫ
*/

  const [numberRub, setNumberRub] = useState("");

  const [numberDollar, setNumberDollar] = useState("");

  const [numberSom, setNumberSom] = useState("");

  /* 
     СОХРАНЕНИЕ ИСТОРИИ
 */

  const saveHistory = async (number, type, currency) => {
    if (!user) {
      return;
    }

    try {
      const response = await axios({
        method: "POST",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/history",
        data: {
          number: number,
          userId: user.id,
          type: type,
          currency: currency,
        },
      });

      console.log("POST HISTORY", response);

      if (response.status === 201 || response.status === 200) {
        getHistory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* 
     ₽ → СОМ
 */

  async function rubSom() {
    const number = Number(numberRub);

    if (number <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (number > result_r) {
      alert("Недостаточно рублей");

      return;
    }

    const newRub = result_r - number;

    const newSom = result_s + number * 1.03;

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          rub: newRub,
          sum: newSom,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        setResult_r(newRub);
        setResult_s(newSom);

        setNumberRub("");

        await allUser();

        await saveHistory(number, "Обмен ₽ → Сом", "RUB → KGS");

        alert("Обмен выполнен");
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* 
     ₽ → ДОЛЛАР
 */

  async function rubDollar() {
    const number = Number(numberRub);

    if (number <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (number > result_r) {
      alert("Недостаточно рублей");

      return;
    }

    const newRub = result_r - number;

    const newDollar = result_d + number * 0.012;

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          rub: newRub,
          usd: newDollar,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        setResult_r(newRub);
        setResult_d(newDollar);

        setNumberRub("");

        await allUser();

        await saveHistory(number, "Обмен ₽ → $", "RUB → USD");

        alert("Обмен выполнен");
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* 
     $ → СОМ
  */

  async function dollarSom() {
    const number = Number(numberDollar);

    if (number <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (number > result_d) {
      alert("Недостаточно долларов");

      return;
    }

    const newDollar = result_d - number;

    const newSom = result_s + number * 87.45;

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          usd: newDollar,
          sum: newSom,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        setResult_d(newDollar);
        setResult_s(newSom);

        setNumberDollar("");

        await allUser();

        await saveHistory(number, "Обмен $ → Сом", "USD → KGS");

        alert("Обмен выполнен");
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* 
     $ → ₽
*/

  async function dollarRub() {
    const number = Number(numberDollar);

    if (number <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (number > result_d) {
      alert("Недостаточно долларов");

      return;
    }

    const newDollar = result_d - number;

    const newRub = result_r + number * 84.95;

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          usd: newDollar,
          rub: newRub,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        setResult_d(newDollar);
        setResult_r(newRub);

        setNumberDollar("");

        await allUser();

        await saveHistory(number, "Обмен $ → ₽", "USD → RUB");

        alert("Обмен выполнен");
      }
    } catch (error) {
      console.error(error);
    }
  }

  /*
     СОМ → ₽
 */

  async function somRub() {
    const number = Number(numberSom);

    if (number <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (number > result_s) {
      alert("Недостаточно сомов");

      return;
    }

    const newSom = result_s - number;

    const newRub = result_r + number * 0.97;

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          sum: newSom,
          rub: newRub,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        setResult_s(newSom);
        setResult_r(newRub);

        setNumberSom("");

        await allUser();

        await saveHistory(number, "Обмен Сом → ₽", "KGS → RUB");

        alert("Обмен выполнен");
      }
    } catch (error) {
      console.error(error);
    }
  }

  /* 
     СОМ → $
*/

  async function somDollar() {
    const number = Number(numberSom);

    if (number <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (number > result_s) {
      alert("Недостаточно сомов");

      return;
    }

    const newSom = result_s - number;

    const newDollar = result_d + number * 0.011;

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          sum: newSom,
          usd: newDollar,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        setResult_s(newSom);
        setResult_d(newDollar);

        setNumberSom("");

        await allUser();

        await saveHistory(number, "Обмен Сом → $", "KGS → USD");

        alert("Обмен выполнен");
      }
    } catch (error) {
      console.error(error);
    }
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
                      value={numberRub}
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
                      value={numberDollar}
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
                      value={numberSom}
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
