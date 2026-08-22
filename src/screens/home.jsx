import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";
import { language } from "../data/language";

function Home() {
  const navigate = useNavigate();

  /* ЯЗЫК */

  const [lang] = useState(Number(localStorage.getItem("language")) || 1);

  const text = language.find((item) => item.id === lang) || language[0];

  /* ПОЛУЧАЕМ ID ПОЛЬЗОВАТЕЛЯ */

  const id = JSON.parse(localStorage.getItem("id"));

  /* ПОЛУЧАЕМ ПОЛЬЗОВАТЕЛЯ */

  const [user] = useState(() => {
    try {
      const localId = localStorage.getItem("id");

      if (!localId) {
        return null;
      }

      const id = JSON.parse(localId);

      const storedUsers = localStorage.getItem("users");

      const localUsers = storedUsers ? JSON.parse(storedUsers) : defaultUsers;

      return localUsers.find((user) => user.id === id) || null;
    } catch {
      return null;
    }
  });

  /* ПРОВЕРКА ВХОДА */

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  /* ВЫХОД */

  const handleLogOut = () => {
    /*
      УДАЛЯЕМ ТОЛЬКО ID

      Деньги и история остаются
    */

    localStorage.removeItem("id");

    navigate("/");
  };

  /* БАЛАНСЫ */

  const [result_r] = useState(
    Number(localStorage.getItem("result_rub_" + id)) || 0
  );

  const [result_d] = useState(
    Number(localStorage.getItem("result_dollar_" + id)) || 0
  );

  const [result_s] = useState(
    Number(localStorage.getItem("result_sum_" + id)) || 0
  );

  /* ЕСЛИ ПОЛЬЗОВАТЕЛЯ НЕТ */

  if (!user) {
    return null;
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-wrapper p-3" style={{ width: "400px" }}>
        <div className="card-page">
          {/* ГЛАВНОЕ МЕНЮ */}

          <div className="card-header text-center p-4">
            <h4>
              <b>{text.menu_title}</b>
            </h4>

            <p>
              {text.name_title}: {user.name}
            </p>

            <span>{text.operation_header}</span>
          </div>

          <div className="card-body">
            {/* БАЛАНСЫ */}

            <div className="cards-slider">
              <div className="cards-container">
                {/* КАРТА 1 — РУБЛЬ */}

                <div className="bank-card">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №1</b>

                    <br />

                    <b className="balance-rub">{result_r}</b>

                    <b className="balance-currency">₽</b>
                  </div>
                </div>

                {/* КАРТА 2 — ДОЛЛАР */}

                <div className="bank-card">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №2</b>

                    <br />

                    <b className="balance-rub">{result_d}</b>

                    <b className="balance-currency">$</b>
                  </div>
                </div>

                {/* КАРТА 3 — СОМ */}

                <div className="bank-card">
                  <div className="balance rounded-4 p-3 bg-primary text-white">
                    <b>{text.balance_title} №3</b>

                    <br />

                    <b className="balance-rub">{result_s}</b>

                    <b className="balance-currency">с</b>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />

            {/* КНОПКИ */}

            <Link to="/balance" className="btn btn-primary col-12 mb-2">
              💰 {text.lbl_check_balance}
            </Link>

            <Link to="/withdraw" className="btn btn-primary col-12 mb-2">
              💸 {text.btn_withdraw_money}
            </Link>

            <Link to="/topup" className="btn btn-primary col-12 mb-2">
              💳 {text.btn_top_up}
            </Link>

            <Link to="/exchange" className="btn btn-primary col-12 mb-2">
              💱 {text.exchange}
            </Link>

            <Link to="/history" className="btn btn-primary col-12 mb-2">
              📜 {text.btn_history}
            </Link>

            <Link to="/changepassword" className="btn btn-primary col-12 mb-2">
              🔐
              {lang === 1 ? " Смена пароля" : " Change Password"}
            </Link>

            <br />

            {/* ВЫХОД */}

            <button
              onClick={handleLogOut}
              className="btn btn-danger col-12 mb-2"
            >
              🚪
              {lang === 1 ? " Выйти" : " Log Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
