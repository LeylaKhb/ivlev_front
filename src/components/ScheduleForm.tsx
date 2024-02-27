import React, {useState} from "react";
import {Supply} from "../models/Supply";
import "../styles/schedule_form.css"
import PhoneForm from "./PhoneForm";


interface ScheduleFormProps {
    supply: Supply;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({supply}) => {
    const [telInput, setTelInput] = useState("");
    const [telError, setTelError] = useState("");

    const [nameValid, setNameValid] = useState(true);
    let [nameText, setNameText] = useState("");



    function setTelInputToParent(lastChar: string) {
        setTelInput(telInput + lastChar);
        setTelError("");
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
        <div>
            <div className="modal_window_title">Заполните все необходимые поля</div>
            <input type="text" className="registration_input" onInput={handleNameInput} style={{marginTop: 10}}
                                                   name="name"/>
            <div className="login_form_label" style={{transform: nameText !== "" ?
                    'translate(-20px, -20px) scale(0.8)' : "none", bottom:  310, left: 64}}>Юридическое лицо</div>
             <div className="login_form_error" style={{display: nameValid ? "none" : "initial",
                bottom: 318}}>Поле не может быть пустым</div>
            <PhoneForm setTelInputToParent={setTelInputToParent} error={telError} spanClass="popup_span_tel"
                       inputClass="popup_tel_input" />
        </div>
    )
}

export default ScheduleForm;