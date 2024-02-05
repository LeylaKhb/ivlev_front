import React, {useState} from "react";
import background from "../../static/background_with_images.png";
import "./eighth_block.css";
import telegram from "../../static/telegram.png";
import whatsapp from "../../static/whatsapp.png";
import viber from "../../static/viber.png";

const EighthBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column',
        borderRadius: 10,
        marginTop: 90,
        paddingTop: 30,
        paddingBottom: 30
    };
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

    return (
        <div className="page_content">
            <div style={backgroundImage} className="eighth_block">
                <div className="third_info_title">Оставить заявку</div>
                <div className="third_info_desc">Оставьте свои контактные данные в форме ниже. Мы вам перезвоним и
                    ответим на все интересующие вас вопросы.</div>
                <form method="POST" action="" className="eighth_form" onSubmit={checkForm}>
                    <div>
                        <input type="text" className="name_input" placeholder="Ваше имя"
                               onInput={handleNameInput} />
                        <div className="eighth_error">{nameError}</div>
                    </div>
                    <div style={{margin: 'auto'}}>
                        <input type="text" className="tel_input" placeholder="(999) 999-99-99"
                               onInput={handleTelInput} />
                        <div className="eighth_error">{telError}</div>
                    </div>
                    <span className="span_tel">+7</span>
                    <button type="submit" className="submit_button">Отправить</button>
                </form>
                <div className="third_info_desc">Или напишите нам в мессенджер:</div>
                <div className="social_network">
                    <a href="tg://resolve?domain=Ivlevff" >
                        <img src={telegram} alt="telegram" className="soc_network_img"  />
                    </a>
                    <a href="https://wa.me/79608293555">
                        <img src={whatsapp} alt="whatsapp" className="soc_network_img"  />
                    </a>
                    <a href="viber://chat?number=%2B79608293555">
                        <img src={viber} alt="viber" className="soc_network_img"  />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default EighthBlock;