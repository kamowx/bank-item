import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";
import { language } from "../data/language";

function Changepassword() {
    const navigate = useNavigate();

    /* ЯЗЫК */
    const [lang] = useState(
        Number(localStorage.getItem("language")) || 1
    );

    const text = language.find((item) => item.id === lang) || language[0];

    /* ПОЛЯ ВВОДА */
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /* ПРОВЕРКА АВТОРИЗАЦИИ */
    useEffect(() => {
        const id = localStorage.getItem("id");
        if (!id) {
            navigate("/");
        }
    }, [navigate]);

    /* СМЕНИТЬ ПАРОЛЬ */
    function handleChange(e) {
        e.preventDefault();

        const rawId = localStorage.getItem("id");
        if (!rawId) {
            alert(lang === 1 ? "Ошибка авторизации" : "Authorization error");
            navigate("/");
            return;
        }

        let id;
        try {
            id = JSON.parse(rawId);
        } catch {
            navigate("/");
            return;
        }

        const storedUsers = localStorage.getItem("users");
        let localUsers;
        try {
            localUsers = storedUsers ? JSON.parse(storedUsers) : [...defaultUsers];
        } catch {
            localUsers = [...defaultUsers];
        }

        const userIndex = localUsers.findIndex((item) => item.id === id);

        if (userIndex === -1) {
            alert(lang === 1 ? "Пользователь не найден" : "User not found");
            navigate("/");
            return;
        }

        const currentUser = localUsers[userIndex];

        /* Проверка старого пароля */
        if (currentUser.password !== oldPassword) {
            alert(lang === 1 ? "Неверный текущий PIN-код" : "Incorrect current PIN");
            return;
        }

        /* Проверка формата нового пароля (4 цифры) */
        if (!/^\d{4}$/.test(newPassword)) {
            alert(
                lang === 1
                    ? "Новый PIN-код должен состоять ровно из 4 цифр"
                    : "New PIN must be exactly 4 digits"
            );
            return;
        }

        /* Проверка совпадения нового пароля и подтверждения */
        if (newPassword !== confirmPassword) {
            alert(lang === 1 ? "Новые пароли не совпадают" : "Passwords do not match");
            return;
        }

        /* Обновляем пароль и сохраняем */
        localUsers[userIndex] = { ...currentUser, password: newPassword };
        localStorage.setItem("users", JSON.stringify(localUsers));

        alert(lang === 1 ? "Пароль успешно изменён!" : "Password successfully changed!");
        navigate("/home");
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card card-wrapper p-3" style={{ width: "400px" }}>
                <div className="card-page">
                    <div className="card-header text-center p-4">
                        <h4>
                            <b>🔐 {lang === 1 ? "Смена пароля" : "Change Password"}</b>
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleChange}>
                            <div className="mb-3">
                                <label className="form-label">
                                    <b>{lang === 1 ? "Текущий PIN:" : "Current PIN:"}</b>
                                </label>
                                <input
                                    type="password"
                                    maxLength="4"
                                    className="form-control"
                                    placeholder={lang === 1 ? "Введите текущий PIN" : "Enter current PIN"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    <b>{lang === 1 ? "Новый PIN (4 цифры):" : "New PIN (4 digits):"}</b>
                                </label>
                                <input
                                    type="password"
                                    maxLength="4"
                                    className="form-control"
                                    placeholder={lang === 1 ? "Введите 4 цифры" : "Enter 4 digits"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    <b>{lang === 1 ? "Повторите новый PIN:" : "Confirm new PIN:"}</b>
                                </label>
                                <input
                                    type="password"
                                    maxLength="4"
                                    className="form-control"
                                    placeholder={lang === 1 ? "Повторите новый PIN" : "Confirm new PIN"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary col-12 mt-2">
                                {lang === 1 ? "Сменить пароль" : "Change Password"}
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={() => navigate("/home")}
                            className="btn btn-secondary col-12 mt-3"
                        >
                            {text?.btn_back || (lang === 1 ? "Назад" : "Back")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Changepassword;