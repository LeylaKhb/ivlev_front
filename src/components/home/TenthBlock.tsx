import React from "react";
import background from "../../static/background_with_images.png";
import "./tenth_block.css";
import ApplicationForm from "../ApplicationForm";
import SocialNetwork from "../SocialNetwork";

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
                    <SocialNetwork />
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