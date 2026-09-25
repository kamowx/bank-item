import { useNavigate } from "react-router-dom";
import Bottombar from "../components/bottombar";
import axios from "axios";
import { useEffect, useState } from "react";

function Transfer() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  /* ПОЛУЧАТЕЛЬ */

  const [user, setUser] = useState(null);

  /* НОМЕР ПОЛУЧАТЕЛЯ */

  const [numberphone, setNumberphone] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      navigate("/");
    }
  }, [navigate]);

  const allUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  /* ================= ПОИСК ПОЛУЧАТЕЛЯ ================= */

  useEffect(() => {
    if (!numberphone.trim()) {
      setUser(null);
      return;
    }

    const currentUser = users.find((item) => item.numberphone == numberphone);

    setUser(currentUser || null);

    console.log("Получатель:", currentUser);
  }, [numberphone, users]);

  /* ================= ПРОДОЛЖИТЬ ================= */

  const continueTransfer = () => {
    if (!numberphone.trim()) {
      alert("Введите номер телефона");
      return;
    }

    if (!user) {
      alert("Пользователь с таким номером не найден");
      return;
    }

    console.log("ID получателя:", user.id);
    console.log("Имя:", user.firstname);
    console.log("Фамилия:", user.lastname);
    console.log("Телефон:", user.numberphone);

    navigate("/transferamount", {
      state: {
        recipientId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        numberphone: user.numberphone,
      },
    });
  };

  return (
    <div className="app">
      <div className="onboarding transfer-page">
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

        <div className="transfer-content">
          <div className="transfer-title">
            <h1>Перевод</h1>

            <p>Введите номер телефона получателя</p>
          </div>

          <div className="transfer-form">
            <div className="transfer-input-box">
              <label>Номер телефона</label>

              <input
                type="tel"
                placeholder="+996 000 000 000"
                value={numberphone}
                onChange={(e) => setNumberphone(e.target.value)}
              />
            </div>

            <div className="transfer-section-title">
              <h2>Получатель</h2>
            </div>

            {user ? (
              <div className="transfer-person-card">
                <div className="transfer-person-icon">
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="transfer-person-info">
                  <strong>
                    {user.firstname} {user.lastname}
                  </strong>

                  <span>{user.numberphone}</span>
                </div>

                <i className="fa-solid fa-check transfer-arrow"></i>
              </div>
            ) : (
              <div className="transfer-person-card transfer-no-user">
                <div className="transfer-person-icon">
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="transfer-person-info">
                  <strong>Пользователь не найден</strong>

                  <span>Введите номер зарегистрированного пользователя</span>
                </div>
              </div>
            )}

            <button className="transfer-button" onClick={continueTransfer}>
              Продолжить
            </button>
          </div>
        </div>

        <Bottombar />
      </div>
    </div>
  );
}

export default Transfer;
