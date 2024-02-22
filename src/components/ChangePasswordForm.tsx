import React, {useState} from "react";
import PasswordForm from "./PasswordForm";

const ChangePasswordForm: React.FC = () => {
    const [firstPasswordError, setFirstPasswordVError] = useState("");
    let [firstPasswordText, setFirstPasswordText] = useState("");

    const [secondPasswordError, setSecondPasswordVError] = useState("");
    let [secondPasswordText, setSecondPasswordText] = useState("");

    function handleFirstPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setFirstPasswordVError("");
        setFirstPasswordText(inputValue);
    }

    function handleSecondPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setSecondPasswordVError("");
        setSecondPasswordText(inputValue);
    }

    function handleChangeClick() {
        console.log(firstPasswordText);
        console.log(secondPasswordText);
    }

    return(
        <div className="change_password_form">
            Изменить пароль
            <PasswordForm handleInput={handleFirstPasswordInput} error={firstPasswordError} bottom={310}
                          passwordText={firstPasswordText} label="Текущий пароль"/>
            <PasswordForm handleInput={handleSecondPasswordInput} error={secondPasswordError} bottom={240}
                          passwordText={secondPasswordText} label="Новый пароль"/>
            <button type="submit" className="registration_form_button" onClick={handleChangeClick}>Изменить пароль</button>
        </div>
    )
}

export default ChangePasswordForm;