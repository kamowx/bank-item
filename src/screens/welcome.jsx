import { useEffect, useState } from "react";
import { users } from "../data/users";
import { language } from "../data/language";

function Welcome() {
  const [pin, setPin] = useState(["", "", "", ""]);

  /* ЯЗЫК */

  const [lang, setLang] = useState(
    Number(localStorage.getItem("language")) || 1
  );

  const text = language.find((item) => item.id === lang) || language[0];

  // Русский
  function rulanguage() {
    setLang(1);

    localStorage.setItem("language", "1");
  }

  // Английский
  function gblanguage() {
    setLang(2);

    localStorage.setItem("language", "2");
  }

  // Ввод через input
  function changePin(index, value) {
    if (value.length > 1) {
      return;
    }

    if (value !== "" && isNaN(value)) {
      return;
    }

    const newPin = [...pin];

    newPin[index] = value;

    setPin(newPin);
  }

  // Ввод через кнопки
  function addNumber(number) {
    for (let i = 0; i < pin.length; i++) {
      if (pin[i] === "") {
        const newPin = [...pin];

        newPin[i] = number;

        setPin(newPin);

        break;
      }
    }
  }

  // Удаление
  function removeNumber() {
    const newPin = [...pin];

    for (let i = newPin.length - 1; i >= 0; i--) {
      if (newPin[i] !== "") {
        newPin[i] = "";

        break;
      }
    }

    setPin(newPin);
  }

  /* =========================================================================
   * ВХОД (ИСПРАВЛЕНИЕ ОШИБКИ СМЕНЫ ПАРОЛЯ)
   * -------------------------------------------------------------------------
   * БЫЛО:
   *   const user = users.find((u) => u.password === pinCode);
   *
   * ПОЧЕМУ БЫЛА ОШИБКА:
   *   Код брал пользователей только из исходного файла data/users.jsx (где пароль
   *   всегда "1111", "2222" и т.д.). Новый пароль, сохраненный в localStorage,
   *   полностью игнорировался, поэтому новый PIN не подходил, а старый работал.
   *
   * СТАЛО:
   *   Сначала считываем актуальный список пользователей из localStorage("users").
   * ========================================================================= */
  function SignIn() {
    const pinCode = pin.join("");

    const storedUsers = localStorage.getItem("users");
    let localUsers = users;
    if (storedUsers) {
      try {
        localUsers = JSON.parse(storedUsers);
      } catch {
        localUsers = users;
      }
    }

    const user = localUsers.find((u) => u.password === pinCode);

    if (user != undefined && user != null) {
      localStorage.setItem("id", JSON.stringify(user.id));

      window.location.href = "/home";
    } else {
      alert(lang === 1 ? "Неверный PIN-код" : "Invalid PIN code");
    }
  }

  // Проверяем вход
  useEffect(() => {
    const local = localStorage.getItem("id");

    if (!local) {
      return;
    }

    let id;
    try {
      id = JSON.parse(local);
    } catch {
      return;
    }

    const storedUsers = localStorage.getItem("users");
    let localUsers = users;
    if (storedUsers) {
      try {
        localUsers = JSON.parse(storedUsers);
      } catch {
        localUsers = users;
      }
    }

    const user = localUsers.find((user) => user.id === id);

    if (user != undefined && user != null) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3 welcome-card">
        <div className="welcome-page">
          <div className="text-center p-4">
            <h3>
              <b>{text.welcome_text}</b>
            </h3>

            <span className="welcome-text">{text.pin_label}</span>
          </div>

          <div className="card-body text-center">
            {/* PIN */}

            <div className="pin-box">
              {pin.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={item}

                  onChange={(e) => changePin(index, e.target.value)}

                  className="pin-input"
                />
              ))}
            </div>

            {/* ЦИФРЫ */}

            <div className="number-box">
              <button onClick={() => addNumber("1")}>1</button>

              <button onClick={() => addNumber("2")}>2</button>

              <button onClick={() => addNumber("3")}>3</button>

              <button onClick={() => addNumber("4")}>4</button>

              <button onClick={() => addNumber("5")}>5</button>

              <button onClick={() => addNumber("6")}>6</button>

              <button onClick={() => addNumber("7")}>7</button>

              <button onClick={() => addNumber("8")}>8</button>

              <button onClick={() => addNumber("9")}>9</button>

              <button onClick={() => addNumber("-")}>-</button>

              <button onClick={() => addNumber("0")}>0</button>

              <button onClick={removeNumber}>←</button>
            </div>

            {/* ВОЙТИ */}

            <button
              onClick={SignIn}
              className="btn btn-primary col-12 welcome-button"
            >
              {text.btn_signin}
            </button>

            {/* ЯЗЫК */}

            <div className="language-title">{text.select_language}</div>

            <div className="language-box">
              <button onClick={rulanguage} className="language-button">
                🇷🇺 Русский
              </button>

              <button onClick={gblanguage} className="language-button">
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
