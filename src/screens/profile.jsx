import { useNavigate } from "react-router-dom";
import Bottombar from "../components/bottombar";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("id");

    navigate("/signin");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      navigate("/");
    }
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // Получения getItem
  const allUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aae654c606bd915d110c57c.mockapi.io/data",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setUsers(response.data);

        const id = JSON.parse(localStorage.getItem("id"));

        console.log("ID из localStorage:", id);

        const currentUser = response.data.find((item) => item.id == id);

        console.log("Текущий пользователь:", currentUser);

        setUser(currentUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  return (
    <div className="app">
      <div className="onboarding profile-page">
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

        <div className="profile-content">
          <div className="profile-title">
            <h1>Профиль</h1>

            <p>Ваши личные данные</p>
          </div>

          <div className="profile-photo-box">
            <div className="profile-photo">
              <i className="fa-solid fa-user"></i>
            </div>

            <button className="profile-photo-edit">
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>
          <h5>
            <center>
              {user?.firstname} {user?.lastname}
            </center>
          </h5>

          <button
            className="profile-edit-button"
            onClick={() => navigate("/editprofile")}
          >
            <i className="fa-solid fa-pen"></i>
            Редактировать
          </button>

          <div className="profile-info">
            <div className="profile-info-item">
              <div className="profile-info-icon">
                <i className="fa-regular fa-user"></i>
              </div>

              <div className="profile-info-text">
                <span>Имя</span>

                <strong>{user?.firstname}</strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <i className="fa-regular fa-user"></i>
              </div>

              <div className="profile-info-text">
                <span>Фамилия</span>

                <strong>{user?.lastname}</strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <i className="fa-solid fa-phone"></i>
              </div>

              <div className="profile-info-text">
                <span>Номер телефона</span>

                <strong>{user?.numberphone}</strong>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="profile-info-icon">
                <i className="fa-regular fa-envelope"></i>
              </div>

              <div className="profile-info-text">
                <span>Email</span>

                <strong>{user?.email}</strong>
              </div>
            </div>

            <br />
            <br />

            <p>
              <small>
                <small className="danger1 text-center">
                  <center onClick={logout}>LogOut</center>
                </small>
              </small>
            </p>
          </div>
        </div>

        <Bottombar />
      </div>
    </div>
  );
}

export default Profile;
