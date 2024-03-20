import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";
import Form from "../components/Form";
import {Person} from "../models/Person";
import PasswordForm from "../components/PasswordForm";

const RecoverPassword: React.FC = () => {
    const [emailError, setEmailError] = useState("");
    const [emailText, setEmailText] = useState("");

    const [temporalPasswordError, setTemporalPasswordError] = useState("");
    const [temporalPassword, setTemporalPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [passwordText, setPasswordText] = useState("");
    
    const [step, setStep] = useState(1);
    const [serverPassword, setServerPassword] = useState("");

    const navigate = useNavigate();


    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setEmailError("");
        setEmailText(inputValue);
    }

    function handleTemporalPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setTemporalPasswordError("");
        setTemporalPassword(inputValue);
    }
    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setPasswordError("");
        setPasswordText(inputValue);
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(emailText))) {
            setEmailError("Неправильная электронная почта");
            return;
        }
        fetch("http://178.21.8.74/recover_password", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new Person("", emailText)),
        }).then(function(response){
            response.json()
                .then(function (data) {
                    if (data["header"] !== "error") {
                        setStep(2);
                        setServerPassword(data["content"]);
                    } else {
                        setEmailError(data["content"]);
                    }
                })}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
    }

    function handleTemporalPasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (temporalPassword !== serverPassword) {
            setTemporalPasswordError("Неверный временный код")
        } else {
            setStep(3);
        }
    }

    function checkPassword() {
        const containsLetters = /^.*[a-zA-Z]+.*$/
        const containsDigits = /^.*[0-9]+.*$/
        const minimum6Chars = /^.{6,}$/
        return containsLetters.test(passwordText) &&
            containsDigits.test(passwordText) &&
            minimum6Chars.test(passwordText);
    }

    function handleNewPasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!checkPassword()) {
            setPasswordError("Пароль должен быть от 6 символов и содержать буквы латинского алфавита и цифры");
            return;
        }
        fetch('http://178.21.8.74/new_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(new Person("", emailText, passwordText))
        }).then(function () {
            navigate("/login");
        })
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
                {step === 1 &&
                    <>
                        <div style={{textAlign: 'center', marginTop: 20}}>Введите email, который вы использовали при
                            регистрации
                        </div>
                        <form className="registration_form" onSubmit={handleSubmit}>
                            <Form handleInput={handleEmailInput} error={emailError} text={emailText}
                                  label="Email" name="email"/>
                            <button type="submit" className="registration_form_button"
                                    style={{marginBottom: 0}}>Восстановить
                            </button>
                        </form>
                    </>
                }
                {step === 2 &&
                    <>
                        <div style={{textAlign: 'center', marginTop: 20}}>Введите проверочный код, который был
                            направлен вам на почту
                        </div>
                        <form className="registration_form" onSubmit={handleTemporalPasswordSubmit}>
                            <Form handleInput={handleTemporalPasswordInput} error={temporalPasswordError} text={temporalPassword}
                                  label="Проверочный пароль" name=""/>
                            <button type="submit" className="registration_form_button"
                                    style={{marginBottom: 0}}>Проверить
                            </button>
                        </form>
                    </>
                }
                {step === 3 &&
                    <>
                        <div style={{textAlign: 'center', marginTop: 20}}>Придумайте новый пароль</div>
                        <form className="registration_form" onSubmit={handleNewPasswordSubmit}>
                            <PasswordForm handleInput={handlePasswordInput} error={passwordError} passwordText={passwordText} label="Новый пароль" />
                            <button type="submit" className="registration_form_button" style={{marginBottom: 0}}>
                                Ввести
                            </button>
                        </form>
                    </>
                }
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