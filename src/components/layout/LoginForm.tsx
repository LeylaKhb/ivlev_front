import React, {useState} from "react";
import {Person} from "../../models/Person";
import PasswordForm from "../PasswordForm";
import Form from "../Form";



interface LoginFormProps {
    location: string
}

const LoginForm: React.FC<LoginFormProps> = ({location}) => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameValid, setNameValid] = useState(true);

    let buttonText = location === "registration" ? 'Зарегистрироваться' : 'Войти';
    let [emailText, setEmailText] = useState("");
    let [passwordText, setPasswordText] = useState("");
    let [nameText, setNameText] = useState("");


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
            setPasswordError("Пароль должен быть от 6 символов и содержать буквы латинского алфавита и цифры");
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

        let url = location === "registration" ? 'http://178.21.8.74/registration' : 'http://178.21.8.74/login';
        fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person),
        }).then(function(response){
            response.json()
                .then(function (data) {
                if (data["header"] !== "error") {
                    localStorage.setItem("jwt", data["content"]);
                    window.location.assign('http://95.163.229.71/personal_account');
                } else {
                    setEmailError(data["content"]);
                }
        })}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
    }

    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setPasswordError("");
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
            {location === "registration" &&
                <Form handleInput={handleNameInput} error={nameValid ? "" : "Поле не может быть пустым"}
                                                    text={nameText} label="Имя" name="name"/>}
            <Form handleInput={handleEmailInput} error={emailError} text={emailText} label="Email" name="email"/>
            <PasswordForm handleInput={handlePasswordInput} error={passwordError}
                          passwordText={passwordText} label="Пароль"/>
            <button type="submit" className="registration_form_button">{buttonText}</button>

        </form>
    )
}

export default LoginForm;