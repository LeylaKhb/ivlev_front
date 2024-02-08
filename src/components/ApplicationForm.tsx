import React, {useState} from "react";
import "../styles/application_form.css"


interface ApplicationFormProps {
    location: string

}

const ApplicationForm: React.FC<ApplicationFormProps> = ({location}) => {
    const [telError, setTelError] = useState("");
    const [nameError, setNameError] = useState("");
    const [telInput, setTelInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    function handleTelInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (isNaN(Number(lastChar)) || (lastChar === ' ') || (inputValue.length === 16)) {
            e.target.value = inputValue.slice(0, -1);
            if (inputValue.endsWith(") "))
                e.target.value = inputValue.slice(0, -2);
            return;
        }
        if (inputValue.length === 15) {
            setTelError("");
        }
        if (inputValue.length === 1)
            e.target.value = '(' + inputValue;
        if (inputValue.length === 5)
            e.target.value = inputValue.slice(0,4) + ") " + lastChar;
        if (inputValue.length === 10)
            e.target.value = inputValue.slice(0, -1) + "-" + lastChar;
        if (inputValue.length === 13)
            e.target.value = inputValue.slice(0, -1) + "-" + lastChar;
        setTelInput(e.target.value);
    }
    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if(!(/^[a-zA-Zа-яА-Я-]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        setNameError("")
        setNameInput(e.target.value);

    }

    function checkForm(event: React.FormEvent<HTMLFormElement>) {
        if (telInput.length !== 15) {
            setTelError("Номер введён некорректно");
            event.preventDefault();
        } else {
            setTelError("");
        }
        if (nameInput.length === 0) {
            setNameError("Введите имя");
            event.preventDefault();
        } else {
            setNameError("");
        }
    }
    if (location === "popup") {
        return (
            <form method="POST" action="" className="popup_form" onSubmit={checkForm}>
                <div>
                    <input type="text" className="popup_name_input" placeholder="Ваше имя"
                           onInput={handleNameInput} />
                    <div className="form_error">{nameError}</div>
                </div>
                <div>
                    <input type="text" className="popup_tel_input" placeholder="(999) 999-99-99"
                           onInput={handleTelInput} />
                    <div className="form_error">{telError}</div>
                </div>
                <span className="popup_span_tel">+7</span>
                <button type="submit" className="popup_form_button">Отправить
                    <div className="popup_button_glare">
                    </div>
                </button>

            </form>
        )
    }
    else {
        return (
            <form method="POST" action="" className="application_form" onSubmit={checkForm}>
                <div>
                    <input type="text" className="name_input" placeholder="Ваше имя"
                           onInput={handleNameInput}/>
                    <div className="form_error">{nameError}</div>
                </div>
                <div>
                    <input type="text" className="tel_input" placeholder="(999) 999-99-99"
                           onInput={handleTelInput}/>
                    <div className="form_error">{telError}</div>
                </div>
                <span className="span_tel">+7</span>
                <button type="submit" className="submit_button">Отправить</button>
            </form>
        )
    }
}
export default ApplicationForm