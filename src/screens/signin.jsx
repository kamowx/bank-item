import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { language } from "../data/language";

function Signin() {
  /* ЯЗЫК */

  const [lang] = useState(Number(localStorage.getItem("language")) || 1);

  const text = language.find((item) => item.id === lang) || language[0];

  /* ГЛАЗОК ДЛЯ ПАРОЛЯ */

  const [showPassword, setShowPassword] = useState(false);

  /* ALL USERS */

  const [users, setUsers] = useState([]);

  const [emailsigin, setEmailsigin] = useState("");

  const [password2signin, setPassword2signin] = useState("");

  const [numberphonesignin, setNumberphonesignin] = useState("");

  /* NAVIGATE */

  const navigate = useNavigate();

  /* ================= ПОЛУЧАЕМ USERS ================= */

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  /* ================= ПРОВЕРКА ВХОДА ================= */

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      navigate("/home");
    }
  }, []);

  /* ================= SIGN IN ================= */

  // Save и setItem
  const signIn = async () => {
    if (
      !emailsigin.trim() ||
      !password2signin.trim() ||
      !numberphonesignin.trim()
    ) {
      alert("Заполните все поля");
      return;
    }

    const user = users.find(
      (item) =>
        item.email == emailsigin &&
        item.password2 == password2signin &&
        item.numberphone == numberphonesignin
    );

    if (!user) {
      alert("Имя пользователя или пароль неправильные");
      return;
    }

    alert("Вы успешно вошли");

    /* СОХРАНЯЕМ ID */

    localStorage.setItem("id", JSON.stringify(user.id));

    /* ПЕРЕХОД НА HOME */

    navigate("/home");
  };

  return (
    <div className="app">
      <div className="onboarding">
        {/* ================= HEADER ================= */}

        <div className="onboarding-header">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">EasyPay</div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="login-content">
          <h1>Вход</h1>

          <p>Войдите в свой аккаунт EasyPay</p>

          <div className="login-form">
            {/* ================= EMAIL ================= */}

            <div className="login-input-box">
              <label>Email</label>

              <input
                type="email"
                placeholder="Введите email"
                onChange={(e) => setEmailsigin(e.target.value)}
                value={emailsigin}
              />
            </div>

            {/* ================= ТЕЛЕФОН ================= */}

            <div className="login-input-box">
              <label>Номер телефона</label>

              <input
                type="tel"
                placeholder="+996 000 000 000"
                onChange={(e) => setNumberphonesignin(e.target.value)}
                value={numberphonesignin}
              />
            </div>

            {/* ================= ПАРОЛЬ ================= */}

            <div className="login-input-box">
              <label>Пароль</label>

              <input
                onChange={(e) => setPassword2signin(e.target.value)}
                value={password2signin}
                type={showPassword ? "text" : "password"}
                placeholder="Введите пароль"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn position-absolute top-50 end-0 translate-middle-y pt-4"
              >
                <i
                  className={
                    showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                  }
                ></i>
              </button>
            </div>

            {/* ================= BUTTON ================= */}

            <button className="login-submit" onClick={signIn}>
              Вход
            </button>
          </div>
        </div>

        {/* ================= SIGNUP ================= */}

        <div className="login-register">
          <span>Нет аккаунта?</span>

          <a href="/signup">
            <button>Регистрация</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
