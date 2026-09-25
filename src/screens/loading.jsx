function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-box">
        <div className="loading-logo">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">EasyPay</div>
        </div>

        <div className="loading-text">Загрузка</div>

        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default Loading;
