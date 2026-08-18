import { useState } from "react";
import { language } from "../data/language";

function Balance() {
    //ЯЗЫК//

    const [lang, setLang] = useState(
        Number(localStorage.getItem("language")) || 1
    );

    const text = language.find(
        (item) => item.id === lang
    );



    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card card-wrapper p-3" style={{ width: "400px" }}>

                <div className="card-page">

                    <div className="card-header text-center p-4">

                        <h4>
                            <b>📊 {text.acc_balance}</b>
                        </h4>
                        <p></p>

                        <span>{text.current_status}</span>

                    </div>

                    <div className="card-body">

                        <div className="bg-primary text-white rounded-4 p-3">

                            <b>{text.balance_title}</b>

                            <br />

                            <b className="balance-rub">
                                0₽
                            </b>

                        </div>

                        <a href="/home"> <button className="btn btn-secondary col-12 mt-3">
                            {text.btn_back}
                        </button></a>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Balance;
























