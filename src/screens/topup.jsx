import { useState } from "react";
import { language } from "../data/language";

function Topup() {

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

    const [topupResult, setTopupResult] = useState("");


    /* ВАЛЮТА */

    const [currency, setCurrency] = useState("rub");


    /* ПОПОЛНЕНИЕ */

    function topup() {

        if (Number(number) <= 0) {

            alert("Введите сумму");

            return;
        }


        let key = "";


        if (currency === "rub") {

            key = "result_rub";

        }

        if (currency === "dollar") {

            key = "result_dollar";

        }

        if (currency === "som") {

            key = "result_sum";

        }


        const oldResult = Number(
            localStorage.getItem(key) || 0
        );


        const newResult = oldResult + Number(number);


        setResult(newResult);

        localStorage.setItem(
            key,
            newResult
        );


        /* ПОСЛЕДНЕЕ ПОПОЛНЕНИЕ */

        setTopupResult(number);

        localStorage.setItem(
            "topupResult",
            number
        );


        /* ИСТОРИЯ */

        const history = JSON.parse(
            localStorage.getItem("history") || "[]"
        );


        history.push({

            type: "Пополнение",

            amount: Number(number),

            currency: currency

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
                            <b>📥 {text.btn_top_up}</b>
                        </h4>

                        <span>
                            {text.enter_amount}
                        </span>

                    </div>


                    <div className="card-body">

                        <label>
                            <b>{text.amount}:</b>
                        </label>


                        {topupResult && (
                            <h4 className="mt-3">

                                Пополнено денег: {topupResult}{" "}

                                {currency === "rub" && "₽"}

                                {currency === "dollar" && "$"}

                                {currency === "som" && "с"}

                            </h4>
                        )}


                        <input
                            type="number"
                            className="form-control"
                            placeholder={text.enter_amount}
                            onChange={(e) =>
                                setNumber(e.target.value)
                            }
                        />


                        <br />


                        <label>

                            <input
                                onChange={() =>
                                    setCurrency("dollar")
                                }
                                type="radio"
                                name="currency"
                            />

                            Доллар $

                        </label>


                        <br />


                        <label>

                            <input
                                onChange={() =>
                                    setCurrency("rub")
                                }
                                type="radio"
                                name="currency"
                            />

                            Рубль ₽

                        </label>


                        <br />


                        <label>

                            <input
                                onChange={() =>
                                    setCurrency("som")
                                }
                                type="radio"
                                name="currency"
                            />

                            Сом с

                        </label>


                        <button
                            onClick={topup}
                            className="btn bg-success text-white col-12 mt-3"
                        >
                            {text.btn_top_up}
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

export default Topup;