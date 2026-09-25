function Bottombar() {
  return (
    <div>
      <div className="home-bottom-bar">
        <div className="bottom-bar-items">
          <a className="i1" href="/home">
            <button className="bottom-bar-item active">
              <i className="fa-solid fa-house"></i>
            </button>
          </a>
          <a href="/fastbutton" className="i1">
            <button className="bottom-bar-item">
              <i className="fa-solid fa-file-invoice"></i>
            </button>
          </a>
          <a href="/qr" className="i1">
            <button className="bottom-qr">
              <i className="fa-solid fa-qrcode"></i>
            </button>
          </a>
          <a className="i1" href="/history">
            <button className="bottom-bar-item">
              <i className="fa-regular fa-bell"></i>
            </button>
          </a>
          <a href="/profile" className="i1">
            <button className="bottom-bar-item">
              <i className="fa-regular fa-user"></i>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Bottombar;
