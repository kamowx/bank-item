import axios from "axios";
import { useEffect, useState } from "react";
import { language } from "../data/language";

function History() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  /* ИСТОРИЯ */

  const [data, setData] = useState([]);

  /* ЯЗЫК */

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );

  const text = language.find((item) => item.id === lang);

  /* ПОЛУЧАЕМ ID ПОЛЬЗОВАТЕЛЯ */

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
     ИСТОРИЯ
 */

  // Получения GET
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
     ФИЛЬТР ИСТОРИИ
 */

  const history = data.filter((item) => {
    return item.userId == user?.id;
  });

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ЗАГОЛОВОК */}

          <div className="card-header text-center p-4">
            <h4>
              <b>📝 {text.btn_histor}</b>
            </h4>

            <span>{text.history_t}</span>
          </div>

          <div className="card-body">
            <div className="history">
              {/* ИСТОРИЯ */}

              {history.map((item, index) => (
                <div key={index} className="mb-3 p-3 border rounded">
                  <b>{item.type}</b>
                  <br />
                  Сумма: {item.number} {item.currency === "RUB" && "₽"}
                  {item.currency === "USD" && "$"}
                  {item.currency === "KGS" && "с"}
                  {item.currency === "RUB → KGS" && "₽ → с"}
                  {item.currency === "RUB → USD" && "₽ → $"}
                  {item.currency === "USD → KGS" && "$ → с"}
                  {item.currency === "USD → RUB" && "$ → ₽"}
                  {item.currency === "KGS → RUB" && "с → ₽"}
                  {item.currency === "KGS → USD" && "с → $"}
                </div>
              ))}

              {/* ЕСЛИ ИСТОРИЯ ПУСТАЯ */}

              {history.length === 0 && <p>История пока пустая</p>}
            </div>

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

export default History;
