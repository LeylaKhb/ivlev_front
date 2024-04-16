import React from "react";
import telegram from "../../static/telegram.png";
import whatsapp from "../../static/whatsapp.png";
import viber from "../../static/viber.png";
import "../../styles/home/social_network.css";

const SocialNetwork: React.FC = () => {
    return (
        <div className="social_network">
            <a href="tg://resolve?domain=Ivlevff" >
                <img src={telegram} alt="telegram" className="soc_network_img"  />
            </a>
            <a href="tg://resolve?domain=Ivlevff">
                <img src={whatsapp} alt="whatsapp" className="soc_network_img"  />
            </a>
            <a href="tg://resolve?domain=Ivlevff">
                <img src={viber} alt="viber" className="soc_network_img"  />
            </a>
        </div>
    )
}

export default SocialNetwork;