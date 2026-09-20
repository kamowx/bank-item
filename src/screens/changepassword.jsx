import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";
import { language } from "../data/language";
import axios from "axios";

function Changepassword() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  /* ЯЗЫК */
  const [lang] = useState(Number(localStorage.getItem("language")) || 1);

  const text = language.find((item) => item.id === lang) || language[0];

  /* ПОЛЯ ВВОДА */
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Получения getItem
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

  //Save и setItem
  const savenewPassword = async () => {
    // Проверяем поля
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      alert("Заполните все поля");
      return;
    }

    // Получаем ID пользователя из localStorage
    const id = JSON.parse(localStorage.getItem("id"));

    // Находим пользователя по ID
    const user = users.find((item) => item.id == id);

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    // Сравниваем старый пароль с паролем из MockAPI
    if (user.password2 != oldPassword) {
      alert("Старый пароль неправильно");
      return;
    }

    // Сравниваем новый пароль и повтор нового пароля
    if (newPassword != confirmPassword) {
      alert("Новые пароли не одинаковые");
      return;
    }

    try {
      // Меняем пароль пользователя в MockAPI
      const response = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          password1: newPassword,
          password2: newPassword,
        },
      });

      console.log("PUT", response);

      if (response.status === 200) {
        alert("Вы успешно сменили пароль");

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          <div className="card-header text-center p-4">
            <h4>
              <b>🔐 {lang === 1 ? "Смена пароля" : "Change Password"}</b>
            </h4>
          </div>

          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                savenewPassword();
              }}
            >
              <div className="mb-3">
                <label className="form-label">
                  <b>{lang === 1 ? "Текущий Пароль:" : "Current Пароль:"}</b>
                </label>
                <input
                  type="password"
                  maxLength=""
                  className="form-control"
                  placeholder={
                    lang === 1
                      ? "Введите текущий Пароль"
                      : "Enter current Пароль"
                  }
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>{lang === 1 ? "Новый Пароль:" : "New Пароль:"}</b>
                </label>
                <input
                  type="password"
                  maxLength=""
                  className="form-control"
                  placeholder={lang === 1 ? "Введите новый пароль" : "Enter"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>
                    {lang === 1
                      ? "Повторите новый Пароль:"
                      : "Confirm new Пароль:"}
                  </b>
                </label>
                <input
                  type="password"
                  maxLength=""
                  className="form-control"
                  placeholder={
                    lang === 1 ? "Повторите новый Пароль" : "Confirm new Пароль"
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary col-12 mt-2">
                {lang === 1 ? "Сменить пароль" : "Change Password"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="btn btn-secondary col-12 mt-3"
            >
              {text?.btn_back || (lang === 1 ? "Назад" : "Back")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
