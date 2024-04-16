import React from "react";
import background from "../../static/background_with_images.png";
import ApplicationForm from "../forms/ApplicationForm";
import SocialNetwork from "./SocialNetwork";

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
                <ApplicationForm location="application"/>
                <div className="background_info_desc">Или напишите нам в мессенджер:</div>
                <SocialNetwork />
            </div>
        </div>
    )
}

export default EighthBlock;