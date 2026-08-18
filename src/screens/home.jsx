import { useEffect, useState } from "react";
import { users } from "../data/users";
import { language } from "../data/language";

function Home() {

    const LogOut = () => {

        localStorage.removeItem("id");

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

        const user = users.find(
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


    /*C*/
    /* БАЛАНС */

const [result, setResult] = useState(
    localStorage.getItem("result") || ""
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


                        {/* БАЛАНС */}

                        <div className="balance mb-3 rounded-4 p-3 bg-primary text-white">

                            <b>
                                {text.balance_title}
                            </b>

                            <br />


                            <b className="balance-rub">
                                {result}
                            </b>

                            <b className="balance-currency">
                                ₽
                            </b>


                    

                          

                        </div>


                        {/* КНОПКИ */}

                       <a href="/balance"> <button className="btn btn-primary col-12 mb-2">

                            💰 {text.lbl_check_balance}

                        </button></a>


                       <a href="withdraw"> <button className="btn btn-primary col-12 mb-2">

                            💸 {text.btn_withdraw_money}

                        </button></a>


                    <a href="/topup">  <button className="btn btn-primary col-12 mb-2">

                            💳 {text.btn_top_up}

                        </button></a>  


                       <a href="/history"> <button className="btn btn-primary col-12 mb-2">

                            📜 {text.btn_history}

                        </button></a>


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