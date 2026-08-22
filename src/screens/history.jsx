import { useState } from "react";
import { language } from "../data/language";

function History() {
  /* ЯЗЫК */

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );

  const text = language.find((item) => item.id === lang);

  /* ПОЛУЧАЕМ ID ПОЛЬЗОВАТЕЛЯ */

  const id = JSON.parse(localStorage.getItem("id"));

  /* ПОЛУЧАЕМ ИСТОРИЮ */

  const history = JSON.parse(localStorage.getItem("history_" + id) || "[]");

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
                  Сумма: {item.amount} {item.currency === "rub" && "₽"}
                  {item.currency === "dollar" && "$"}
                  {item.currency === "som" && "с"}
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
