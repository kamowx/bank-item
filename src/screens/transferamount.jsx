import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Transferamount() {
  const navigate = useNavigate();

  const location = useLocation();

  const recipient = location.state;

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const id = JSON.parse(localStorage.getItem("id"));

  const [amount, setAmount] = useState("");

  const [showAccountModal, setShowAccountModal] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState("som");

  /* ================= GET USERS ================= */

  const allUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setUsers(response.data);

        /* НАХОДИМ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ */

        const currentUser = response.data.find((item) => item.id == id);

        setUser(currentUser);

        /* СТАВИМ ЕГО ОСНОВНОЙ СЧЁТ */

        if (
          currentUser?.primary === "som" ||
          currentUser?.primary === "rub" ||
          currentUser?.primary === "usd"
        ) {
          setSelectedCurrency(currentUser.primary);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  /* ================= КЛАВИАТУРА ================= */

  const addNumber = (number) => {
    setAmount((prev) => prev + number);
  };

  const addDot = () => {
    if (!amount.includes(".")) {
      setAmount((prev) => prev + ".");
    }
  };

  const deleteNumber = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  /* ================= ПОЛУЧИТЬ КЛЮЧ БАЛАНСА ================= */

  function getBalanceKey(currency) {
    if (currency === "som") {
      return "sum";
    }

    if (currency === "rub") {
      return "rub";
    }

    if (currency === "usd") {
      return "usd";
    }
  }

  /* ================= В SOM ================= */

  function convertToSom(number, currency) {
    if (currency === "som") {
      return number;
    }

    if (currency === "rub") {
      return number * 0.97;
    }

    if (currency === "usd") {
      return number * 87.45;
    }

    return number;
  }

  /* ================= ИЗ SOM ================= */

  function convertFromSom(number, currency) {
    if (currency === "som") {
      return number;
    }

    if (currency === "rub") {
      return number / 0.97;
    }

    if (currency === "usd") {
      return number / 87.45;
    }

    return number;
  }

  /* ================= ПЕРЕВОД ================= */

  const sendMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Введите сумму");
      return;
    }

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    if (!recipient?.recipientId) {
      alert("Получатель не найден");
      return;
    }

    const recipientUser = users.find(
      (item) => item.id == recipient.recipientId
    );

    if (!recipientUser) {
      alert("Получатель не найден");
      return;
    }

    /* ================= ОСНОВНЫЕ СЧЕТА ================= */

    const senderPrimary = user.primary;

    const recipientPrimary = recipientUser.primary;

    /* ПРОВЕРКА СЧЁТА ОТПРАВИТЕЛЯ */

    if (
      senderPrimary !== "som" &&
      senderPrimary !== "rub" &&
      senderPrimary !== "usd"
    ) {
      alert("У отправителя не выбран основной счёт");
      return;
    }

    /* ПРОВЕРКА СЧЁТА ПОЛУЧАТЕЛЯ */

    if (
      recipientPrimary !== "som" &&
      recipientPrimary !== "rub" &&
      recipientPrimary !== "usd"
    ) {
      alert("У получателя не выбран основной счёт");
      return;
    }

    const transferAmount = Number(amount);

    /* ================= КЛЮЧИ ================= */

    const senderKey = getBalanceKey(senderPrimary);

    const recipientKey = getBalanceKey(recipientPrimary);

    /* ================= СТАРЫЕ БАЛАНСЫ ================= */

    const oldSenderBalance = Number(user[senderKey]) || 0;

    const oldRecipientBalance = Number(recipientUser[recipientKey]) || 0;

    /* ================= ПРОВЕРКА ДЕНЕГ ================= */

    if (oldSenderBalance < transferAmount) {
      alert("Недостаточно денег на основном счёте");
      return;
    }

    /* ================= КОНВЕРТАЦИЯ ================= */

    let receivedAmount = transferAmount;

    /*
      Если основные счета одинаковые,
      конвертация не нужна.
    */

    if (senderPrimary === recipientPrimary) {
      receivedAmount = transferAmount;
    } else {
      /*
        Сначала переводим сумму
        отправителя в SOM
      */

      const amountInSom = convertToSom(transferAmount, senderPrimary);

      /*
        Потом из SOM
        в валюту получателя
      */

      receivedAmount = convertFromSom(amountInSom, recipientPrimary);
    }

    /* ОКРУГЛЯЕМ ДО 2 ЗНАКОВ */

    receivedAmount = Number(receivedAmount.toFixed(2));

    /* ================= НОВЫЕ БАЛАНСЫ ================= */

    const newSenderBalance = Number(
      (oldSenderBalance - transferAmount).toFixed(2)
    );

    const newRecipientBalance = Number(
      (oldRecipientBalance + receivedAmount).toFixed(2)
    );

    /* ================= CONSOLE ================= */

    console.log("Основной счёт отправителя:", senderPrimary);

    console.log("Основной счёт получателя:", recipientPrimary);

    console.log("Сумма отправителя:", transferAmount);

    console.log("Сумма получателя:", receivedAmount);

    console.log("Старый баланс отправителя:", oldSenderBalance);

    console.log("Новый баланс отправителя:", newSenderBalance);

    console.log("Старый баланс получателя:", oldRecipientBalance);

    console.log("Новый баланс получателя:", newRecipientBalance);

    try {
      /* ================= PUT ОТПРАВИТЕЛЯ ================= */

      const responseSender = await axios({
        method: "PUT",

        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,

        data: {
          [senderKey]: newSenderBalance,
        },
      });

      console.log("PUT ОТПРАВИТЕЛЬ:", responseSender);

      /* ================= PUT ПОЛУЧАТЕЛЯ ================= */

      const responseRecipient = await axios({
        method: "PUT",

        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${recipientUser.id}`,

        data: {
          [recipientKey]: newRecipientBalance,
        },
      });

      console.log("PUT ПОЛУЧАТЕЛЬ:", responseRecipient);

      /* ================= HISTORY ================= */

      const historyResponse = await axios({
        method: "POST",

        url: "https://6aae654c606bd915d110c57c.mockapi.io/history",

        data: {
          number: transferAmount,

          userId: user.id,

          type: "Перевод",

          currency:
            senderPrimary === "som"
              ? "KGS"
              : senderPrimary === "rub"
                ? "RUB"
                : "USD",

          recipientId: recipientUser.id,

          recipientCurrency:
            recipientPrimary === "som"
              ? "KGS"
              : recipientPrimary === "rub"
                ? "RUB"
                : "USD",

          receivedNumber: receivedAmount,
        },
      });

      console.log("POST HISTORY:", historyResponse);

      setAmount("");

      await allUser();

      /* ================= SUCCESS ================= */

      navigate("/transfersuccess", {
        state: {
          amount: transferAmount,

          receivedAmount: receivedAmount,

          senderName: `${user.firstname} ${user.lastname}`,

          senderPhone: user.numberphone,

          recipientName: `${recipientUser.firstname} ${recipientUser.lastname}`,

          recipientPhone: recipientUser.numberphone,

          senderCurrency: senderPrimary,

          recipientCurrency: recipientPrimary,
        },
      });
    } catch (error) {
      console.error(error);

      alert("Ошибка при переводе");
    }
  };

  /* ================= БАЛАНСЫ ================= */

  const resultRub = Number(user?.rub) || 0;

  const resultUsd = Number(user?.usd) || 0;

  const resultSum = Number(user?.sum) || 0;

  return (
    <div className="app">
      <div className="onboarding send-money-page">
        {/* ================= HEADER ================= */}

        <div className="send-money-header">
          <button className="send-back" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <h1>Отправить деньги</h1>

          <button className="send-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* ================= ПОЛУЧАТЕЛЬ ================= */}

        <div className="send-amount">
          <div className="send-amount-value">
            <div className="recipient-photo">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          <center>
            <div className="recipient-name">
              {recipient?.firstname} {recipient?.lastname}
            </div>

            <div className="recipient-phone">{recipient?.numberphone}</div>
          </center>
        </div>

        {/* ================= СУММА ================= */}

        <div className="send-amount">
          <div className="send-amount-value">
            {amount
              ? `${amount} ${
                  selectedCurrency === "som"
                    ? "сом"
                    : selectedCurrency === "rub"
                      ? "₽"
                      : "$"
                }`
              : `0.00 ${
                  selectedCurrency === "som"
                    ? "сом"
                    : selectedCurrency === "rub"
                      ? "₽"
                      : "$"
                }`}
          </div>

          <div className="send-amount-line"></div>
        </div>

        {/* ================= ВЫБОР СЧЁТА ================= */}

        <div className="account-select-box">
          <div className="account-select-title">Счёт для перевода</div>

          <button
            className="account-select-button"
            onClick={() => setShowAccountModal(true)}
          >
            <div>
              <i className="fa-solid fa-wallet"></i>

              <span>
                {selectedCurrency === "som" && <>Сом {resultSum}</>}

                {selectedCurrency === "rub" && <>Рубль {resultRub}</>}

                {selectedCurrency === "usd" && <>Доллар {resultUsd}</>}
              </span>
            </div>

            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <br />

        {/* ================= МОДАЛЬНОЕ ОКНО ================= */}

        {/*{showAccountModal && (
          <div className="account-modal-overlay">
            <div className="account-modal">
              <div className="account-modal-header">
                <h2>Выбрать счёт</h2>

                <button
                  className="account-modal-close"
                  onClick={() => setShowAccountModal(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <p className="account-modal-text">Выберите валюту счёта</p>

              {/* SOM */}

        {/* <label className="account-radio">
                <input
                  type="radio"
                  name="currency"
                  value="som"
                  checked={selectedCurrency === "som"}
                  onChange={() => setSelectedCurrency("som")}
                />

                <div className="account-radio-info">
                  <div className="account-radio-icon">{resultSum}</div>

                  <div>
                    <strong>Сом</strong>

                    <span>KGS</span>
                  </div>
                </div>
              </label>

              {/* RUB */}

        {/* <label className="account-radio">
                <input
                  type="radio"
                  name="currency"
                  value="rub"
                  checked={selectedCurrency === "rub"}
                  onChange={() => setSelectedCurrency("rub")}
                />

                <div className="account-radio-info">
                  <div className="account-radio-icon">{resultRub}</div>

                  <div>
                    <strong>Рубль</strong>

                    <span>RUB</span>
                  </div>
                </div>
              </label>

              {/* USD */}

        {/*} <label className="account-radio">
                <input
                  type="radio"
                  name="currency"
                  value="usd"
                  checked={selectedCurrency === "usd"}
                  onChange={() => setSelectedCurrency("usd")}
                />

                <div className="account-radio-info">
                  <div className="account-radio-icon">{resultUsd}</div>

                  <div>
                    <strong>Доллар</strong>

                    <span>USD</span>
                  </div>
                </div>
              </label>

              <button
                className="account-modal-button"
                onClick={() => setShowAccountModal(false)}
              >
                Выбрать
              </button>
            </div>
          </div>
        )}
        */}

        {/* ================= КЛАВИАТУРА ================= */}

        <div className="send-keyboard">
          <button onClick={() => addNumber("1")}>1</button>

          <button onClick={() => addNumber("2")}>2</button>

          <button onClick={() => addNumber("3")}>3</button>

          <button onClick={() => addNumber("4")}>4</button>

          <button onClick={() => addNumber("5")}>5</button>

          <button onClick={() => addNumber("6")}>6</button>

          <button onClick={() => addNumber("7")}>7</button>

          <button onClick={() => addNumber("8")}>8</button>

          <button onClick={() => addNumber("9")}>9</button>

          <button onClick={addDot}>.</button>

          <button onClick={() => addNumber("0")}>0</button>

          <button onClick={deleteNumber}>
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </div>

        {/* ================= ОТПРАВИТЬ ================= */}

        <div className="send-button-box">
          <button className="send-money-button" onClick={sendMoney}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transferamount;
