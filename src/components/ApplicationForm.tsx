import React, {useState} from "react";
import "../styles/application_form.css"
import {AnswerRequest} from "../models/AnswerRequest";
import PhoneForm from "./PhoneForm";


interface ApplicationFormProps {
    location: string;
    priceData?: string[]

}

const ApplicationForm: React.FC<ApplicationFormProps> = ({location, priceData}) => {
    const [telError, setTelError] = useState("");
    const [nameError, setNameError] = useState("");
    const [telInput, setTelInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [success, setSuccess] = useState(false);
    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if(!(/^[a-zA-Zа-яА-Я-]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        setNameError("")
        setNameInput(e.target.value);

    }

    function setTelInputToParent(value: string) {
        setTelInput(value);
        setTelError("");
    }

    function checkForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (telInput.length !== 10) {
            setTelError("Номер введён некорректно");
            if (nameInput.length === 0) {
                setNameError("Введите имя");
                return;
            }
            return;
        }
        let req;
        if (priceData) {
            req = new AnswerRequest(nameInput, telInput, priceData[0], priceData[1], priceData[2], priceData[3],
                priceData[4]);
        } else {
            req = new AnswerRequest(nameInput, "8" + telInput)
        }

        fetch('http://localhost:8080/api/answer_request', {
            // mode: 'no-cors',
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(req),
        }).then(function(){
            setSuccess(true);
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });

    }
    if (success) {
        return (
            <div style={{display: 'flex', flexFlow: 'row', marginTop: 30}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64">
                    <linearGradient id="D8kn8RyCktjRlx36eKmJ5a_48003_gr1" x1="32" x2="32" y1="12.664" y2="52.422" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><path fill="url(#D8kn8RyCktjRlx36eKmJ5a_48003_gr1)" d="M24.982,51c-1.273,0-2.547-0.475-3.524-1.429L6.888,35.364C6.315,34.806,6,34.061,6,33.268 s0.315-1.538,0.889-2.097l2.82-2.75c1.166-1.137,3.063-1.137,4.228,0.001l10.259,10.003c0.395,0.385,1.058,0.38,1.446-0.012 l24.341-24.526c1.147-1.156,3.044-1.186,4.228-0.068l2.867,2.705c0.582,0.55,0.91,1.29,0.923,2.083 c0.013,0.793-0.291,1.542-0.854,2.109L28.565,49.514C27.584,50.504,26.283,51,24.982,51z M11.822,29.564 c-0.26,0-0.52,0.097-0.717,0.29l-2.82,2.75C8.101,32.783,8,33.018,8,33.268s0.102,0.485,0.285,0.664l14.569,14.208 c1.19,1.163,3.116,1.148,4.291-0.034l28.581-28.798c0.181-0.182,0.277-0.418,0.273-0.668c-0.004-0.25-0.109-0.485-0.296-0.661 l-2.867-2.705c-0.401-0.381-1.047-0.369-1.435,0.022L27.061,39.823c-1.166,1.173-3.079,1.189-4.263,0.034L12.54,29.853 C12.343,29.66,12.083,29.564,11.822,29.564z"></path><linearGradient id="D8kn8RyCktjRlx36eKmJ5b_48003_gr2" x1="32.013" x2="32.013" y1="16.83" y2="47.526" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stopColor="#6dc7ff"></stop><stop offset="1" stopColor="#e6abff"></stop></linearGradient><path fill="url(#D8kn8RyCktjRlx36eKmJ5b_48003_gr2)" d="M24.977,46.609c-0.489,0-0.98-0.181-1.368-0.544L10.318,33.603l1.367-1.459l13.292,12.461 L52.293,17.29l1.414,1.414L26.391,46.019C26,46.411,25.489,46.609,24.977,46.609z"></path>
                </svg>

                <div className="success_text" style={{marginLeft: 20, marginTop: 10, color: '#7d3a99'}}>
                    Спасибо за заявку! Наш менеджер свяжется с вами в ближайшее время
                </div>
            </div>
        )
    }
    if (location === "popup") {
        return (
            <form method="POST" action="" className="popup_form" onSubmit={checkForm}>
                <div>
                    <input type="text" className="popup_name_input" placeholder="Ваше имя"
                           onInput={handleNameInput} />
                    <div className="form_error">{nameError}</div>
                </div>
                <PhoneForm  error={telError} setTelInputToParent={setTelInputToParent} spanClass="popup_span_tel"
                            inputClass="popup_tel_input" defaultValue={""}/>
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
                <PhoneForm  error={telError} setTelInputToParent={setTelInputToParent} inputClass="tel_input"
                            spanClass="span_tel" defaultValue={""}/>
                <button type="submit" className="submit_button">Отправить</button>
            </form>
        )
    }
}
export default ApplicationForm