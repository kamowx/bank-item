import { useNavigate } from "react-router-dom";
import Bottombar from "../components/bottombar";

function Qr() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="onboarding scan-qr-page">
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

        <div className="scan-qr-content">
          <div className="scan-qr-title">
            <h1>Сканировать QR</h1>

            <p>Наведите камеру на QR-код</p>
          </div>

          {/* ================= CAMERA ================= */}

          <div className="scanner-box">
            <div id="qr-reader" className="qr-reader"></div>

            <div className="scan-frame">
              <span className="corner top-left"></span>
              <span className="corner top-right"></span>
              <span className="corner bottom-left"></span>
              <span className="corner bottom-right"></span>
            </div>
          </div>

          {/* ================= TEXT ================= */}

          <div className="scan-hint">
            <i className="fa-solid fa-camera"></i>

            <span>Поместите QR-код внутрь рамки</span>
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="qr-actions">
            <div className="qr-actions">
              <a href="/myqr" className="i1 qr-share-button">
                <i className="fa-solid fa-qrcode"></i>My Qr-code
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}

        <Bottombar />
      </div>
    </div>
  );
}

export default Qr;
