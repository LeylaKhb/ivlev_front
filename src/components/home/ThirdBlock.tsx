import React, {useState} from "react";

import background from "../../static/background_with_images.png";
import "../../styles/home/third_block.css";
import SocialNetwork from "../SocialNetwork";
import ConsultationPopup from "../ConsultationPopup";


const FirstBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        width: '95%',
        height: 450,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column',
        borderRadius: 10,
        marginTop: 100,
    };

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    function setPopupTrue() {
        setIsPopupVisible(true);
        document.body.style.overflow = "hidden";
    }
    function setPopupFalse() {
        setIsPopupVisible(false);
        document.body.style.overflow = "scroll";
    }

    return (
        <div className="page_content">
            <div className="background-image" style={backgroundImage}>
                <div className="background_info_title">Рассчитайте стоимость услуг для своего бизнеса</div>
                <div className="background_info_desc">Пройдите небольшой тест, чтобы узнать, сколько будут стоить услуги
                    фулфилмента для вашего бизнеса.</div>

                <button className="big_gradient_button" onClick={setPopupTrue}>Узнать стоимость</button>
                <div className="background_info_desc">Или напишите нам в мессенджер:</div>
                <SocialNetwork />
                <ConsultationPopup isVisible={isPopupVisible} setVisibleFalse={setPopupFalse} content="price" />
            </div>
        </div>
    )
}

export default FirstBlock;