import { language } from "../data/language";
import { useEffect, useState } from "react";
import axios from "axios";
function Signup() {
  /* ЯЗЫК */

  const [lang] = useState(Number(localStorage.getItem("language")) || 1);

  const text = language.find((item) => item.id === lang) || language[0];

  /* ГЛАЗОК ДЛЯ ПАРОЛЯ */

  const [showPassword, setShowPassword] = useState(false);

  //ALL DATA
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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
  const register = async () => {
    if (!email.trim() || !password1.trim() || !password2.trim()) {
      alert("Заполните все поля");
      return;
    }

    const checkPassword = password1 == password2;

    if (checkPassword == false) {
      alert("Пароли не одинаковые");
      return;
    }

    const checkEmail = users.some((item) => item.email == email);

    if (checkEmail == true) {
      alert("Такой пользователь уже существует");
      return;
    }

    try {
      const responce = await axios({
        method: "POST",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
        data: {
          email: email,
          password1: password1,
          password2: password2,
        },
      });

      console.log("POST", responce);

      if (responce.status === 201 || responce.status === 200) {
        alert("Учетная запись создана");

        setEmail("");
        setPassword1("");
        setPassword2("");

        allUser();
      }
    } catch (error) {
      console.error(error);
    }
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
              <b>🔐 Регистарция</b>
            </h4>

            <span>Введите данные для регистарции</span>
          </div>

          <div className="card-body">
            {/* EMAIL */}

            <label className="mb-2">
              <b>Email:</b>
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                className="form-control pe-5"
                type="password"
                placeholder="Введите пароль"
              />
            </div>
            <br />
            {/* ПАРОЛЬ */}

            <label className="mb-2">
              <b>Пароль:</b>
            </label>

            <div className="position-relative">
              <input
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Введите пароль"
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

            <button className="btn btn-primary col-12 mt-4" onClick={register}>
              Регистарция
            </button>
          </div>
          <br />
          <br />
          <p>
            <small>
              <small>
                <center>
                  У вас есть аккаунта? <a href="/">Вход</a>
                </center>
              </small>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
