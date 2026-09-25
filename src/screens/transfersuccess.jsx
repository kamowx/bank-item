import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

function Transfersuccess() {
  const navigate = useNavigate();

  const location = useLocation();

  /* ДАННЫЕ, КОТОРЫЕ ПРИШЛИ С TRANSFERAMOUNT */

  const recipient = location.state;

  /* ПОЛЬЗОВАТЕЛИ */

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(null);

  /* ================= ПОЛУЧАЕМ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ ================= */

  // Получения getItem
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

        console.log("ID из localStorage:", id);

        const currentUser = response.data.find((item) => item.id == id);

        console.log("Текущий пользователь:", currentUser);

        setUser(currentUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  return (
    <div className="app">
      <div className="onboarding transfer-success-page">
        <div className="transfer-success-content">
          {/* ================= CHECK ================= */}

          <div className="transfer-success-icon">
            <i className="fa-solid fa-check"></i>
          </div>

          {/* ================= TITLE ================= */}

          <h1>Перевод выполнен</h1>

          <p className="transfer-success-subtitle">Деньги успешно отправлены</p>

          {/* ================= AMOUNT ================= */}

          <div className="transfer-success-amount">
            {recipient?.amount || 0}

            <span>сом</span>
          </div>

          {/* ================= INFO ================= */}

          <div className="transfer-success-info">
            {/* ================= ОТПРАВИТЕЛЬ ================= */}

            <div className="transfer-success-block">
              <span className="transfer-success-label">Плательщик</span>

              <div className="transfer-success-person">
                <div className="transfer-success-person-icon">
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="transfer-success-person-text">
                  <strong>
                    {user?.firstname} {user?.lastname}
                  </strong>

                  <span>{user?.numberphone}</span>
                </div>
              </div>
            </div>

            {/* LINE */}

            <div className="transfer-success-line"></div>

            {/* ================= ПОЛУЧАТЕЛЬ ================= */}

            <div className="transfer-success-block">
              <span className="transfer-success-label">Получатель</span>

              <div className="transfer-success-person">
                <div className="transfer-success-person-icon">
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="transfer-success-person-text">
                  <strong>{recipient?.recipientName}</strong>

                  <span>{recipient?.recipientPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= HOME ================= */}

          <button
            className="transfer-success-button"
            onClick={() => navigate("/home")}
          >
            Главное меню
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transfersuccess;
