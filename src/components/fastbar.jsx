function Fastbar() {
  return (
    <div>
      <div className="home-section-top">
        <h2>Деньги</h2>
      </div>

      <div className="money-grid">
        {/* Пополнить */}

        <button className="money-card">
          <div className="money-icon">
            <i className="fa-solid fa-plus"></i>
          </div>
          <a className="i1" href="/topup">
            <div className="money-card-text">
              <strong>Пополнить</strong>
              <span>Добавить деньги</span>
            </div>
          </a>
        </button>

        <button className="money-card">
          <div className="money-icon">
            <i className="fa-solid fa-minus"></i>
          </div>
          <a className="i1" href="/withdraw">
            <div className="money-card-text">
              <strong>Снимать</strong>
              <span>Снимайте деньги</span>
            </div>
          </a>
        </button>

        {/* Обменять */}
        <button className="money-card">
          <div className="money-icon">
            <i className="fa-solid fa-arrows-rotate"></i>
          </div>
          <a className="i1" href="/exchange">
            <div className="money-card-text">
              <strong>Обменять</strong>
              <span>Валюта</span>
            </div>
          </a>
        </button>
        {/* Перевести */}
        <button className="money-card">
          <div className="money-icon">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <a className="i1" href="/transfer">
            <div className="money-card-text">
              <strong>Перевести</strong>
              <span>Отправить деньги</span>
            </div>
          </a>
        </button>

        {/* Оплатить */}
        {/*<button className="money-card">
          <div className="money-icon">
            <i className="fa-solid fa-receipt"></i>
          </div>

          <div className="money-card-text">
            <strong>Оплатить</strong>
            <span>Счета и услуги</span>
          </div>
        </button>*/}
      </div>
    </div>
  );
}

export default Fastbar;
