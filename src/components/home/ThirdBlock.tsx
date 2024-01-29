import React from "react";

import background from "../../static/background_third_fragment.png";
import telegram from "../../static/telegram.png";
import whatsapp from "../../static/whatsapp.png";
import viber from "../../static/viber.png";
import "./third_block.css";


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

    return (
        <div className="page_content">
            <div className="background-image" style={backgroundImage}>
                <div className="third_info_title">Рассчитайте стоимость услуг для своего бизнеса</div>
                <div className="third_info_desc">Пройдите небольшой тест, чтобы узнать, сколько будут стоить услуги
                    фулфилмента для вашего бизнеса.</div>

                <button className="big_gradient_button">Узнать стоимость</button>
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

export default FirstBlock;