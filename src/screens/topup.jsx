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


    /* ЧИСЛО */

    const [number, setNumber] = useState("");

    const [result, setResult] = useState("");

    const [topupResult, setTopupResult] = useState("");


    /* КНОПКА */

function topup() {

    const oldResult = Number(
        localStorage.getItem("result") || 0
    );

    const newResult = oldResult + Number(number);

    setResult(newResult);

    localStorage.setItem("result", newResult);


    /* ИСТОРИЯ */

    const history = JSON.parse(
        localStorage.getItem("history") || "[]"
    );

    history.push({
        type: "Пополнение",
        amount: Number(number)
    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );


    setTopupResult(number);

    localStorage.setItem("topupResult", number);

}


    return (
        <div className="container d-flex justify-content-center mt-5">

            <div className="card card-wrapper p-3" style={{ width: "400px" }}>

                <div className="card-page">

                    <div className="card-header text-center p-4">

                        <h4>
                            <b>📥 {text.btn_top_up}</b>
                        </h4>

                        <span>{text.enter_amount}</span>
                    </div>


                    <div className="card-body">

                        <label>
                            <b>{text.amount}:</b>
                        </label>
                      {topupResult && (
    <h4 className="mt-3">
        Пополнено денег: {topupResult} ₽
    </h4>
)}


                        <input
                            type="number"
                            className="form-control"
                            placeholder={text.enter_amount}
                            onChange={(e) => setNumber(e.target.value)}
                        />


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