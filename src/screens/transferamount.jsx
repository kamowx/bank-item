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
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

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

    const transferAmount = Number(amount);

    const oldMyBalance = Number(user.sum) || 0;

    const oldRecipientBalance = Number(recipientUser.sum) || 0;

    if (oldMyBalance < transferAmount) {
      alert("Недостаточно денег на счёте");
      return;
    }

    const newMyBalance = oldMyBalance - transferAmount;

    const newRecipientBalance = oldRecipientBalance + transferAmount;

    console.log("Мой старый баланс:", oldMyBalance);

    console.log("Мой новый баланс:", newMyBalance);

    console.log("Старый баланс получателя:", oldRecipientBalance);

    console.log("Новый баланс получателя:", newRecipientBalance);

    try {
      const responseSender = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${user.id}`,
        data: {
          sum: newMyBalance,
        },
      });

      console.log("PUT ОТПРАВИТЕЛЬ:", responseSender);

      const responseRecipient = await axios({
        method: "PUT",
        url: `https://6aae654c606bd915d110c57c.mockapi.io/data/${recipientUser.id}`,
        data: {
          sum: newRecipientBalance,
        },
      });

      console.log("PUT ПОЛУЧАТЕЛЬ:", responseRecipient);

      const historyResponse = await axios({
        method: "POST",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/history",
        data: {
          number: transferAmount,
          userId: user.id,
          type: "Перевод",
          currency: "KGS",
          recipientId: recipientUser.id,
        },
      });

      console.log("POST HISTORY:", historyResponse);

      setAmount("");

      await allUser();

      navigate("/transfersuccess", {
        state: {
          amount: transferAmount,

          senderName: `${user.firstname} ${user.lastname}`,

          senderPhone: user.numberphone,

          recipientName: `${recipientUser.firstname} ${recipientUser.lastname}`,

          recipientPhone: recipientUser.numberphone,
        },
      });
    } catch (error) {
      console.error(error);

      alert("Ошибка при переводе");
    }
  };

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

        {/* ================= МОЙ БАЛАНС ================= */}

        <div className="my-transfer-balance">
          <small>
            <small>
              <center>
                Мой баланс: {Number(user?.sum || 0).toFixed(2)} сом
              </center>
            </small>
          </small>{" "}
        </div>

        {/* ================= СУММА ================= */}

        <div className="send-amount">
          <div className="send-amount-value">
            {amount ? `${amount} сом` : "0.00 сом"}
          </div>

          <div className="send-amount-line"></div>
        </div>

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
