import React, {useState} from "react";
import PasswordForm from "./PasswordForm";

const ChangePasswordForm: React.FC = () => {
    const [firstPasswordError, setFirstPasswordVError] = useState("");
    const [firstPasswordText, setFirstPasswordText] = useState("");

    const [secondPasswordError, setSecondPasswordVError] = useState("");
    const [secondPasswordText, setSecondPasswordText] = useState("");

    const [success, setSuccess] = useState(false);

    function handleFirstPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setFirstPasswordVError("");
        setFirstPasswordText(inputValue);
        setSuccess(false);
    }

    function handleSecondPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setSecondPasswordVError("");
        setSecondPasswordText(inputValue);
        setSuccess(false);
    }

    function checkPassword() {
        const containsLetters = /^.*[a-zA-Z]+.*$/
        const containsDigits = /^.*[0-9]+.*$/
        const minimum6Chars = /^.{6,}$/
        return containsLetters.test(secondPasswordText) &&
            containsDigits.test(secondPasswordText) &&
            minimum6Chars.test(secondPasswordText);
    }

    function handleChangeClick() {
        if (!checkPassword()) {
            setSecondPasswordVError("Пароль должен быть от 6 символов и содержать буквы латинского алфавита и цифры");
            return;
        }
        if (firstPasswordText === secondPasswordText) {
            setSecondPasswordVError("Пароли не могут совпадать");
            return;
        }
        fetch('http://178.21.8.74:8080/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                "old": firstPasswordText,
                "new": secondPasswordText
            })
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    if (data["header"] === "error") {
                        setFirstPasswordVError(data["content"]);
                        return;
                    } else {
                       setSuccess(true);
                    }
                })
        });



    }

    return(
        <div className="change_password_form">
            Изменить пароль
            <br />
            <br />

            <PasswordForm handleInput={handleFirstPasswordInput} error={firstPasswordError}
                          passwordText={firstPasswordText} label="Текущий пароль"/>
            <PasswordForm handleInput={handleSecondPasswordInput} error={secondPasswordError}
                          passwordText={secondPasswordText} label="Новый пароль"/>
            <button type="submit" className="registration_form_button" onClick={handleChangeClick}>Изменить пароль</button>
            <label style={{display: success ? 'initial' : 'none', color: 'green', marginTop: 25, fontSize: 17}}>Пароль успешно изменён</label>
        </div>
    )
}

export default ChangePasswordForm;