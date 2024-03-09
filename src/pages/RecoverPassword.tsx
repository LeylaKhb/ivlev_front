import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";
import EmailForm from "../components/EmailForm";
import {Person} from "../models/Person";

const RecoverPassword: React.FC = () => {
    const [emailError, setEmailError] = useState("");
    const [emailText, setEmailText] = useState("");

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setEmailError("");
        setEmailText(inputValue);
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(emailText))) {
            setEmailError("Неправильная электронная почта");
            return;
        }
        fetch("http://localhost:8080/api/recover_password", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            body: JSON.stringify(new Person("", emailText)),
        }).then(function(response){
            response.json()
                .then(function (data) {
                    if (data["header"] !== "error") {

                    } else {
                        setEmailError(data["content"]);
                    }
                })}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
    }
    return (
        <div className="page_content"  style={{ height: '90vh'}}>
            <HelmetProvider>
                <Helmet
                    title="Восстановление пароля"
                />
            </HelmetProvider>

            <div className="login_window" style={{height: 390, paddingLeft: 35, paddingRight: 35}}>
                <div className="modal_window_title">Восстановление пароля</div>
                <div style={{textAlign: 'center', marginTop: 20}}>Введите email, который вы использовали при регистрации</div>
                <form className="registration_form" onSubmit={handleSubmit}>
                    <EmailForm handleInput={handleEmailInput} error={emailError} top={178} emailText={emailText} />
                    <button type="submit" className="registration_form_button" style={{marginBottom: 0}}>Восстановить</button>
                </form>
                <div className="login_links" style={{ width: '50%'}}>
                    <Link to="/login" className="login_link">
                        Войти
                    </Link>
                    <Link to="/registration" className="login_link">
                        Регистрация
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default RecoverPassword;