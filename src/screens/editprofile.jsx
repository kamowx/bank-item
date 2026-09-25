import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bottombar from "../components/bottombar";

function EditProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  /* ================= ID ================= */

  const id = JSON.parse(localStorage.getItem("id"));

  /* ================= GET USER ======================= */

  const allUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
      });

      console.log("GET", response);

      if (response.status === 200) {
        const currentUser = response.data.find((item) => item.id == id);

        setUser(currentUser);

        /* ДАННЫЕ ИЗ MOCKAPI СТАВИМ В INPUT */

        setName(currentUser?.firstname || "");
        setSurname(currentUser?.lastname || "");
        setPhone(currentUser?.numberphone || "");
        setEmail(currentUser?.email || "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  /* ================= SAVE PROFILE =================== */

  const saveProfile = async () => {
    if (!name.trim() || !surname.trim() || !phone.trim() || !email.trim()) {
      alert("Заполните все поля");
      return;
    }

    try {
      const response = await axios({
        method: "PUT",

        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${id}`,

        data: {
          firstname: name,
          lastname: surname,
          numberphone: phone,
          email: email,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        alert("Данные сохранены");

        navigate("/profile");
      }
    } catch (error) {
      console.error(error);

      alert("Ошибка при сохранении");
    }
  };

  return (
    <div className="app">
      <div className="onboarding edit-profile-page">
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

        <div className="edit-profile-content">
          <div className="edit-profile-title">
            <h1>Редактирование</h1>

            <p>Измените свои личные данные</p>
          </div>

          {/* ================= PHOTO ================= */}

          <div className="edit-photo-box">
            <div className="edit-profile-photo">
              <i className="fa-solid fa-user"></i>
            </div>

            <button className="change-photo-button">
              <i className="fa-solid fa-camera"></i>
              Изменить фото
            </button>
          </div>

          <div className="edit-profile-form">
            <div className="edit-input-box">
              <label>Имя</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите имя"
              />
            </div>

            <div className="edit-input-box">
              <label>Фамилия</label>

              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Введите фамилию"
              />
            </div>

            <div className="edit-input-box">
              <label>Номер телефона</label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+996 000 000 000"
              />
            </div>

            <div className="edit-input-box">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
              />
            </div>

            <button className="edit-save-button" onClick={saveProfile}>
              <i className="fa-solid fa-check"></i>
              Сохранить
            </button>

            <button
              className="edit-save-button dark"
              onClick={() => navigate(-1)}
            >
              Отмена
            </button>
          </div>
        </div>

        <Bottombar />
      </div>
    </div>
  );
}

export default EditProfile;
