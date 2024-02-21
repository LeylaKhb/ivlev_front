import React, {useState} from "react";
import {Person} from "../../models/Person";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';



interface LoginFormProps {
    location: string
}

const LoginForm: React.FC<LoginFormProps> = ({location}) => {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);

    let buttonText = location === "registration" ? 'Зарегистрироваться' : 'Войти';
    let [emailText, setEmailText] = useState("");
    let [passwordText, setPasswordText] = useState("");
    let [nameText, setNameText] = useState("");
    const navigate = useNavigate();



    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setEmailError("");
        setEmailText(inputValue);
    }

    function checkEmail() {
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(emailText))) {
            setEmailError("Неправильная электронная почта");
            return false;
        }
        return true;
    }

    function checkName() {
        if (!(/^[a-zA-ZА-Яа-я-]+$/.test(nameText))) {
            setNameValid(false);
            return false;
        }
        return true;
    }

    function checkPassword() {
        const containsLetters = /^.*[a-zA-Z]+.*$/
        const containsDigits = /^.*[0-9]+.*$/
        const minimum6Chars = /^.{6,}$/
        if (!(containsLetters.test(passwordText) &&
            containsDigits.test(passwordText) &&
            minimum6Chars.test(passwordText))) {
            setPasswordValid(false);
            return false;
        }
        return true;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let email = checkEmail();
        let name = checkName();
        let password = checkPassword();

        if (!email || !password) return;
        if (!name && location === "registration") return;

        let person = new Person(nameText, emailText, passwordText);
        const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        console.log(csrfToken);
        console.log(Cookies.get('XSRF-TOKEN'));
        let url = location === "registration" ? 'http://localhost:8080/registration' : 'http://localhost:8080/login';

        const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        console.log(jwtToken);
        console.log(Cookies.get('jwt'));
        console.log(document.cookie);
        fetch(url, {
            // mode: 'no-cors',
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'X-XSRF-TOKEN': csrfToken
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                // "Access-Control-Allow-Methods": "GET, POST, OPTIONS"

            },
            body: JSON.stringify(person),
        }).then(function(response){
            response.json()
                .then(function (data) {
                if (data["header"] !== "error") {
                    localStorage.setItem("jwt", data["content"]);
                    navigate("/");
                } else {
                    setEmailError(data["content"]);
                }
        })}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });
    }

    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setPasswordValid(true);
        setPasswordText(inputValue);
    }

    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if(!(/^[a-zA-Zа-яА-Я-]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        setNameValid(true);
        setNameText(inputValue);

    }

    return (
        <form action="" method="POST" className="registration_form" onSubmit={handleSubmit}>
            {location === "registration" && <input type="text" className="registration_input" onInput={handleNameInput}
                                                   name="name"/>}
            {location === "registration" && <div className="login_form_label" style={{transform: nameText !== "" ?
                    'translate(-20px, -20px) scale(0.8)' : "none", bottom:  340}}>Имя</div>}
            {location === "registration" &&  <div className="login_form_error" style={{display: nameValid ? "none" : "initial",
                bottom: 318}}>Поле не может быть пустым</div>}
            <input type="text" className="registration_input" onInput={handleEmailInput} name="email" />
            <label className="login_form_label" style={{transform: emailText !== "" ? 'translate(-20px, -20px) scale(0.8)' : "none"}}>Email</label>
            <div className="login_form_error" style={{display: emailError === "" ? "none" : "initial",
                bottom: 247}}>{emailError}</div>
            <input type={passwordHidden ? "password" : "text"} className="registration_input"
                   onInput={handlePasswordInput} name="password"/>
            <div className="login_form_label" style={{transform: passwordText !== "" ? 'translate(-20px, -20px) scale(0.8)' : "none",
            bottom: 198}}>Пароль</div>
            <div className="login_form_error" style={{display: passwordValid ? "none" : "initial",
                    bottom: 176}}>Пароль должен быть от 6 символов и содержать буквы латинского алфавита и
                цифры</div>
            <button type="submit" className="registration_form_button">{buttonText}</button>
            <svg className="password_eye_hidden" focusable="false"
                 style={{display: passwordHidden ? "initial" : "none"}} onClick={() => {setPasswordHidden(false)}}
                 aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityOffOutlinedIcon">
                <path style={{fill:'#c9c9c9'}}
                      d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5 2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4 1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"></path>
            </svg>
            <svg className="password_eye_shown" focusable="false"
                 style={{display: passwordHidden ? "none" : "initial"}} onClick={() => {setPasswordHidden(true)}}
                 aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityOutlinedIcon">
                <path style={{fill:'#c9c9c9'}}
                      d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"></path>
            </svg>
        </form>
    )
}

export default LoginForm;