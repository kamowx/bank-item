import { useEffect, useState } from "react";
import { users } from "../data/users";
import { language } from "../data/language";

function Home() {

    const LogOut = () => {

        localStorage.removeItem("id");
        localStorage.removeItem("result_sum");
        localStorage.removeItem("result_dollar");
        localStorage.removeItem("result_rub");
        localStorage.removeItem("history");

        window.location.href = "/";
    };


    /* ЯЗЫК */

    const [lang, setLang] = useState(
        Number(localStorage.getItem("language")) || 1
    );

    const text = language.find(
        (item) => item.id === lang
    );


    /* ПРОВЕРКА ВХОДА */

    useEffect(() => {

        const id = localStorage.getItem("id");

        if (!id) {
            window.location.href = "/";
        }

    }, []);


    /* ПОЛУЧАЕМ ID */

    const local = localStorage.getItem("id");
    const id = JSON.parse(local);


    const [user, setUser] = useState({});


    /* ПОЛУЧАЕМ ПОЛЬЗОВАТЕЛЯ */

    function GetUser() {

        const localUsers = JSON.parse(
            localStorage.getItem("users")
        ) || users;

        const user = localUsers.find(
            (user) => user.id === id
        );

        if (user === undefined || user === null) {

            window.location.href = "/";

            return;
        }

        console.log(user);

        setUser(user);
    }

    useEffect(() => {

        GetUser();

    }, []);


    /* БАЛАНСЫ */

    const [result_r, setResult_r] = useState(
        localStorage.getItem("result_rub") || 0
    );

    const [result_d, setResult_d] = useState(
        localStorage.getItem("result_dollar") || 0
    );

    const [result_s, setResult_s] = useState(
        localStorage.getItem("result_sum") || 0
    );


    return (

        <div className="container d-flex justify-content-center mt-5">

            <div
                className="card card-wrapper p-3"
                style={{ width: "400px" }}
            >

                {/* Главное меню */}

                <div className="card-page">

                    <div className="card-header text-center p-4">

                        <h4>
                            <b>
                                {text.menu_title}
                            </b>
                        </h4>


                        <p>
                            {text.name_title}: {user.name}
                        </p>


                        <span>
                            {text.operation_header}
                        </span>

                    </div>


                    <div className="card-body">


                        {/* БАЛАНСЫ */}

                        <div className="cards-slider">

                            <div className="cards-container">


                                {/* КАРТА 1 — РУБЛЬ */}

                                <div className="bank-card">

                                    <div className="balance rounded-4 p-3 bg-primary text-white">

                                        <b>
                                            {text.balance_title} №1
                                        </b>

                                        <br />


                                        <b className="balance-rub">
                                            {result_r}
                                        </b>

                                        <b className="balance-currency">
                                            ₽
                                        </b>

                                    </div>

                                </div>


                                {/* КАРТА 2 — ДОЛЛАР */}

                                <div className="bank-card">

                                    <div className="balance rounded-4 p-3 bg-primary text-white">

                                        <b>
                                            {text.balance_title} №2
                                        </b>

                                        <br />


                                        <b className="balance-rub">
                                            {result_d}
                                        </b>

                                        <b className="balance-currency">
                                            $
                                        </b>

                                    </div>

                                </div>


                                {/* КАРТА 3 — СОМ */}

                                <div className="bank-card">

                                    <div className="balance rounded-4 p-3 bg-primary text-white">

                                        <b>
                                            {text.balance_title} №3
                                        </b>

                                        <br />


                                        <b className="balance-rub">
                                            {result_s}
                                        </b>

                                        <b className="balance-currency">
                                            с
                                        </b>

                                    </div>

                                </div>


                            </div>

                        </div>


                        <br />
                        <br />


                        {/* КНОПКИ */}

                        <a href="/balance">

                            <button className="btn btn-primary col-12 mb-2">

                                💰 {text.lbl_check_balance}

                            </button>

                        </a>


                        <a href="/withdraw">

                            <button className="btn btn-primary col-12 mb-2">

                                💸 {text.btn_withdraw_money}

                            </button>

                        </a>


                        <a href="/topup">

                            <button className="btn btn-primary col-12 mb-2">

                                💳 {text.btn_top_up}

                            </button>

                        </a>

                        <a href="/exchange">

                            <button className="btn btn-primary col-12 mb-2">

                                💱 {text.exchange}

                            </button>

                        </a>


                        <a href="/history">

                            <button className="btn btn-primary col-12 mb-2">

                                📜 {text.btn_history}

                            </button>

                        </a>


                        <a href="/changepassword">

                            <button className="btn btn-primary col-12 mb-2">

                                Change Password

                            </button>

                        </a>


                        <br />


                        <button
                            onClick={LogOut}
                            className="btn btn-primary col-12 mb-2"
                        >

                            LogOut

                        </button>


                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;