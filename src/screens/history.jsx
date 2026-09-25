import axios from "axios";
import { useEffect, useState } from "react";
import { language } from "../data/language";
import Bottombar from "../components/bottombar";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      navigate("/");
    }
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const [data, setData] = useState([]);

  const [lang] = useState(Number(localStorage.getItem("language")) || 1);

  const text = language.find((item) => item.id === lang) || language[0];

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

  /* ================= ПОЛУЧАЕМ HISTORY ============== */

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

  /* ================= ФИЛЬТР ИСТОРИИ ================= */

  const history = data
    .filter((item) => {
      /* ================= ПЕРЕВОД ================= */

      if (item.type === "Перевод") {
        return item.userId == user?.id || item.recipientId == user?.id;
      }

      /* ================= ОСТАЛЬНЫЕ ОПЕРАЦИИ ================= */

      return item.userId == user?.id;
    })

    /* ================= ДОБАВЛЯЕМ ИНФОРМАЦИЮ ========== */

    .map((item) => {
      /* Если это не перевод */

      if (item.type !== "Перевод") {
        return item;
      }

      /* ================= НАХОДИМ ОТПРАВИТЕЛЯ ========== */

      const sender = users.find((person) => person.id == item.userId);

      /* ================= НАХОДИМ ПОЛУЧАТЕЛЯ =========== */

      const recipient = users.find((person) => person.id == item.recipientId);

      /* ================= Я ОТПРАВИЛ ===================== */

      if (item.userId == user?.id) {
        return {
          ...item,

          historyType: "Отправлено",

          direction: "sent",

          personName:
            `${recipient?.firstname || ""} ${recipient?.lastname || ""}`.trim(),

          personPhone: recipient?.numberphone || "",
        };
      }

      /* ================= Я ПОЛУЧИЛ ====================== */

      if (item.recipientId == user?.id) {
        return {
          ...item,

          historyType: "Получено",

          direction: "received",

          personName:
            `${sender?.firstname || ""} ${sender?.lastname || ""}`.trim(),

          personPhone: sender?.numberphone || "",
        };
      }

      return item;
    });

  return (
    <div className="app">
      <div className="onboarding history-page">
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

        <div className="history-content">
          {/* ================= TITLE ================= */}

          <div className="history-title">
            <h1>{text.btn_histor}</h1>

            <p>{text.history_t}</p>
          </div>

          {/* ================= HISTORY ================= */}

          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                {/* ================= ICON ================= */}

                <div className="history-item-icon">
                  {item.type === "Перевод" ? (
                    item.direction === "sent" ? (
                      <i className="fa-solid fa-arrow-up"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-down"></i>
                    )
                  ) : item.type === "Пополнение" ? (
                    <i className="fa-solid fa-arrow-down"></i>
                  ) : (
                    <i className="fa-solid fa-arrows-rotate"></i>
                  )}
                </div>

                {/* ================= INFO ================= */}

                <div className="history-item-info">
                  <strong>{item.historyType || item.type}</strong>

                  {item.type === "Перевод" ? (
                    <span>
                      {item.direction === "sent"
                        ? `Кому: ${item.personName}`
                        : `От: ${item.personName}`}
                    </span>
                  ) : (
                    <span>
                      {item.currency === "RUB" && "Рубли"}

                      {item.currency === "USD" && "Доллары"}

                      {item.currency === "KGS" && "Сомы"}

                      {item.currency === "RUB → KGS" && "Рубли → Сомы"}

                      {item.currency === "RUB → USD" && "Рубли → Доллары"}

                      {item.currency === "USD → KGS" && "Доллары → Сомы"}

                      {item.currency === "USD → RUB" && "Доллары → Рубли"}

                      {item.currency === "KGS → RUB" && "Сомы → Рубли"}

                      {item.currency === "KGS → USD" && "Сомы → Доллары"}
                    </span>
                  )}
                </div>

                {/* ================= SUM ================= */}

                <div className="history-item-price">
                  {item.type === "Перевод" &&
                    (item.direction === "sent" ? "- " : "+ ")}

                  {item.number}

                  {item.currency === "RUB" && " ₽"}

                  {item.currency === "USD" && " $"}

                  {item.currency === "KGS" && " с"}

                  {item.currency === "RUB → KGS" && " ₽ → с"}

                  {item.currency === "RUB → USD" && " ₽ → $"}

                  {item.currency === "USD → KGS" && " $ → с"}

                  {item.currency === "USD → RUB" && " $ → ₽"}

                  {item.currency === "KGS → RUB" && " с → ₽"}

                  {item.currency === "KGS → USD" && " с → $"}
                </div>
              </div>
            ))}

            {/* ================= EMPTY ================= */}

            {history.length === 0 && (
              <div className="history-empty">
                <div className="history-empty-icon">
                  <i className="fa-regular fa-clock"></i>
                </div>

                <h3>История пока пустая</h3>

                <p>Здесь появятся ваши операции</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}

        <Bottombar />
      </div>
    </div>
  );
}

export default History;
