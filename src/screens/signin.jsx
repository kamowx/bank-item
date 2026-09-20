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

  const [users, setUsers] = useState([]);
  const [emailsigin, setEmailsigin] = useState("");
  const [password2signin, setPassword2signin] = useState("");

  // ДОБАВИЛ
  const navigate = useNavigate();

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
  const signIn = async () => {
    if (!emailsigin.trim() || !password2signin.trim()) {
      alert("Заполните все поля");
      return;
    }

    const user = users.find(
      (item) => item.email == emailsigin && item.password2 == password2signin
    );

    if (!user) {
      alert("Имя пользователя или пароль неправильные");
      return;
    }
    alert("Вы успешно вошли");

    localStorage.setItem("id", JSON.stringify(user.id));

    navigate("/home");
  };
  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ЗАГОЛОВОК */}

          <div className="card-header text-center p-4">
            <h4>
              <b>🔐 Вход в аккаунт</b>
            </h4>

            <span>Введите данные для входа</span>
          </div>

          <div className="card-body">
            {/* EMAIL */}

            <label className="mb-2">
              <b>Email:</b>
            </label>

            <input
              onChange={(e) => setEmailsigin(e.target.value)}
              value={emailsigin}
              type="email"
              className="form-control"
              placeholder="Введите email"
            />

            <br />

            {/* ПАРОЛЬ */}

            <label className="mb-2">
              <b>Пароль:</b>
            </label>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Введите пароль"
                onChange={(e) => setPassword2signin(e.target.value)}
                value={password2signin}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn position-absolute top-50 end-0 translate-middle-y"
              >
                <i
                  className={
                    showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                  }
                ></i>
              </button>
            </div>

            {/* КНОПКА */}

            <button className="btn btn-primary col-12 mt-4" onClick={signIn}>
              Войти
            </button>
          </div>

          <br />
          <br />

          <p>
            <small>
              <small>
                <center>
                  У вас нет аккаунта? <a href="/signup">Регистарция</a>
                </center>
              </small>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
