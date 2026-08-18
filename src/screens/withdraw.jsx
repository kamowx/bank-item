import { useState } from "react";
import { language } from "../data/language";

function Withdraw() {

    /* ЯЗЫК */

    const [lang, setLang] = useState(
        Number(localStorage.getItem("language")) || 1
    );

    const text = language.find(
        (item) => item.id === lang
    );


    /* СУММА */

    const [number, setNumber] = useState("");

    const [result, setResult] = useState("");


    /* СНЯТИЕ */

    function withdraw() {

        const oldResult = Number(
            localStorage.getItem("result") || 0
        );


        /* ПРОВЕРКА БАЛАНСА */

        if (Number(number) > oldResult) {

            alert("Недостаточно денег");

            return;
        }


        /* НОВЫЙ БАЛАНС */

        const newResult = oldResult - Number(number);

        setResult(newResult);

        localStorage.setItem("result", newResult);


        /* ИСТОРИЯ */

        const history = JSON.parse(
            localStorage.getItem("history") || "[]"
        );


        history.push({
            type: "Снятие",
            amount: Number(number)
        });


        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );

    }


    return (
        <div className="container d-flex justify-content-center mt-5">

            <div
                className="card card-wrapper p-3"
                style={{ width: "400px" }}
            >

                <div className="card-page">

                    <div className="card-header text-center p-4">

                        <h4>
                            <b>📤 {text.btn_withdraw_money}</b>
                        </h4>

                        <span>
                            Введите сумму
                        </span>

                    </div>


                    <div className="card-body">

                        <label>
                            <b>{text.amount}:</b>
                        </label>


                        <input
                            type="number"
                            className="form-control"
                            placeholder={text.enter_amount}
                            onChange={(e) => setNumber(e.target.value)}
                        />


                        {result && (
                            <h4 className="mt-3">
                                Снято денег: {number} ₽
                            </h4>
                        )}


                        <button
                            onClick={withdraw}
                            className="btn bg-danger text-white col-12 mt-3"
                        >
                            {text.btn_withdraw_money}
                        </button>


                        <a href="/home">
                            <button className="btn btn-secondary col-12 mt-3">
                                {text.btn_back}
                            </button>
                        </a>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Withdraw;