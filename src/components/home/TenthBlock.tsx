import React from "react";
import background from "../../static/background_with_images.png";
import "./tenth_block.css"
import telegram from "../../static/telegram.png";
import whatsapp from "../../static/whatsapp.png";
import viber from "../../static/viber.png";
import ApplicationForm from "../ApplicationForm";

const TenthBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        width: '95%',
        display: 'flex',
        flexFlow: 'column',
        borderRadius: 10,
        marginTop: 90,
        paddingTop: 50,
        paddingBottom: 30
    };
    return (
        <div className="page_content">
            <div style={backgroundImage} className="tenth_block">
                <div className="block_info_title">Контакты</div>
                <div className="contacts_block">
                    <div className="contact">
                        Телефон:
                        <br/>8 (917) 148-66-88
                    </div>
                    <div className="contact">
                        Почта:
                        <br/>info@ivlev-ff.ru
                    </div>
                    <div className="contact">
                        Адреса:
                        <br/>г. Самара, ул. Ближняя д. 3
                        <br/>г. Москва, ул. Бирюлевская 24к1
                    </div>
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
                <div className="block_info_title">
                    Свяжитесь с нами для бесплатной консультации
                </div>
                <ApplicationForm />
            </div>
        </div>
    );
}
export default TenthBlock;