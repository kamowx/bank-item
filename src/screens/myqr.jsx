import { useNavigate } from "react-router-dom";
import Bottombar from "../components/bottombar";

function Myqr() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="onboarding qr-page">
        {/* ================= HEADER ================= */}

        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="onboarding-header">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">EasyPay</div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="qr-content">
          <div className="qr-title">
            <h1>Мой QR-код</h1>

            <p>Покажите этот QR-код для перевода денег</p>
          </div>

          {/* ================= QR CARD ================= */}

          <div className="qr-card">
            <div className="qr-user-icon">
              <i className="fa-solid fa-user"></i>
            </div>

            <h2></h2>

            <span></span>

            {/* ================= QR ================= */}

            <div className="qr-code">
              <div className="qr-fake-pattern">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <p className="qr-code-text">QR для перевода</p>
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="qr-actions">
            <button className="qr-copy-button">
              <i className="fa-regular fa-copy"></i>
              Скопировать
            </button>

            <button className="qr-share-button">
              <i className="fa-solid fa-share-nodes"></i>
              Поделиться
            </button>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}

        <Bottombar />
      </div>
    </div>
  );
}

export default Myqr;
