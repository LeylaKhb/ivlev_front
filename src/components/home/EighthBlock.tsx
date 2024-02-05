import React from "react";
import background from "../../static/background_with_images.png";
import telegram from "../../static/telegram.png";
import whatsapp from "../../static/whatsapp.png";
import viber from "../../static/viber.png";
import ApplicationForm from "../ApplicationForm";

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
    return (
        <div className="page_content">
            <div style={backgroundImage} className="eighth_block">
                <div className="background_info_title">Оставить заявку</div>
                <div className="background_info_desc">Оставьте свои контактные данные в форме ниже. Мы вам перезвоним и
                    ответим на все интересующие вас вопросы.</div>
                <ApplicationForm />
                <div className="background_info_desc">Или напишите нам в мессенджер:</div>
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