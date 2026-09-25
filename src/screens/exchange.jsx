import { useEffect, useState } from "react";
import { language } from "../data/language";
import axios from "axios";
import Bottombar from "../components/bottombar";
import { useNavigate } from "react-router-dom";
function Exchange() {
  const navigate = useNavigate();
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
    <div className="app">
      <div className="onboarding exchange-page">
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

          <div className="logo-text">EasyPay</div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="exchange-content">
          {/* ================= TITLE ================= */}

          <div className="exchange-title">
            <h1>Обмен валют</h1>

            <p>Обменивайте деньги между своими счетами</p>
          </div>

          {/* ================= CURRENCY RATES ================= */}

          <div className="exchange-rates">
            <div className="exchange-section-title">
              <h2>Курсы валют</h2>

              <span>Сегодня</span>
            </div>

            <div className="rates-list">
              <div className="rate-item">
                <span>$ 1</span>
                <strong>87.45 KGS</strong>
              </div>

              <div className="rate-item">
                <span>$ 1</span>
                <strong>84.95 RUB</strong>
              </div>

              <div className="rate-item">
                <span>с 1</span>
                <strong>0.011 USD</strong>
              </div>

              <div className="rate-item">
                <span>с 1</span>
                <strong>0.97 RUB</strong>
              </div>

              <div className="rate-item">
                <span>₽ 1</span>
                <strong>1.03 KGS</strong>
              </div>

              <div className="rate-item">
                <span>₽ 1</span>
                <strong>0.012 USD</strong>
              </div>
            </div>
          </div>

          {/* ================= ACCOUNTS ================= */}

          <div className="exchange-section">
            <div className="exchange-section-title">
              <h2>Мои счета</h2>
            </div>

            {/* Горизонтальный скролл */}

            <div className="exchange-cards-scroll">
              {/* ================= RUB ================= */}

              <div className="exchange-card exchange-rub">
                <div className="exchange-card-top">
                  <div>
                    <span>Рубли</span>

                    <small>Счёт №1</small>
                  </div>

                  <div className="exchange-currency-icon">₽</div>
                </div>

                <div className="exchange-balance">
                  {result_r.toFixed(2)}

                  <span>₽</span>
                </div>

                <div className="exchange-input-group">
                  <label>Сумма обмена</label>

                  <input
                    type="number"
                    placeholder="Введите сумму ₽"
                    value={numberRub}
                    onChange={(e) => setNumberRub(e.target.value)}
                  />
                </div>

                <div className="exchange-buttons">
                  <button onClick={rubSom}>₽ → Сом</button>

                  <button onClick={rubDollar}>₽ → Доллар</button>
                </div>
              </div>

              {/* ================= USD ================= */}

              <div className="exchange-card exchange-usd">
                <div className="exchange-card-top">
                  <div>
                    <span>Доллары</span>

                    <small>Счёт №2</small>
                  </div>

                  <div className="exchange-currency-icon">$</div>
                </div>

                <div className="exchange-balance">
                  {result_d.toFixed(2)}

                  <span>$</span>
                </div>

                <div className="exchange-input-group">
                  <label>Сумма обмена</label>

                  <input
                    type="number"
                    placeholder="Введите сумму $"
                    value={numberDollar}
                    onChange={(e) => setNumberDollar(e.target.value)}
                  />
                </div>

                <div className="exchange-buttons">
                  <button onClick={dollarSom}>$ → Сом</button>

                  <button onClick={dollarRub}>$ → Рубль</button>
                </div>
              </div>

              {/* ================= SOM ================= */}

              <div className="exchange-card exchange-som">
                <div className="exchange-card-top">
                  <div>
                    <span>Сомы</span>

                    <small>Счёт №3</small>
                  </div>

                  <div className="exchange-currency-icon">с</div>
                </div>

                <div className="exchange-balance">
                  {result_s.toFixed(2)}

                  <span>с</span>
                </div>

                <div className="exchange-input-group">
                  <label>Сумма обмена</label>

                  <input
                    type="number"
                    placeholder="Введите сумму сом"
                    value={numberSom}
                    onChange={(e) => setNumberSom(e.target.value)}
                  />
                </div>

                <div className="exchange-buttons">
                  <button onClick={somRub}>Сом → ₽</button>

                  <button onClick={somDollar}>Сом → $</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}

        <Bottombar />
      </div>
    </div>
  );
}

export default Exchange;
