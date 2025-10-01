import React, {useState} from "react";
import "../../styles/home/social_network_button.css"
import telegram from "../../static/telegram.png";
import viber from "../../static/viber.png";
import whatsapp from "../../static/whatsapp.png";
const SocialNetworkButton: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="soc_button_wrapper">
            <label className="social_network_button" onClick={() => {setOpen(!open)}}
                 style={{backgroundColor: open ? "white" : '#f81c87'}}>
                <svg role="presentation" className="svg_chat" style={{visibility: open ? "hidden" : "visible"}} width="35" height="32" viewBox="0 0 35 32"
                     xmlns="https://www.w3.org/2000/svg">
                    <path
                        d="M11.2667 12.6981H23.3667M11.2667 16.4717H23.3667M4.8104 23.5777C2.4311 21.1909 1 18.1215 1 14.7736C1 7.16679 8.38723 1 17.5 1C26.6128 1 34 7.16679 34 14.7736C34 22.3804 26.6128 28.5472 17.5 28.5472C15.6278 28.5472 13.8286 28.2868 12.1511 27.8072L12 27.7925L5.03333 31V23.8219L4.8104 23.5777Z"
                        stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                        strokeLinejoin="round" fill="none"></path>
                </svg>
                <svg role="presentation" className="svg_cross" xmlns="https://www.w3.org/2000/svg" width="16" height="16"
                     style={{visibility: open ? "visible" : "hidden"}} viewBox="0 0 23 23">
                    <g fillRule="evenodd">
                        <path d="M10.314 -3.686H12.314V26.314H10.314z" transform="rotate(-45 11.314 11.314)"></path>
                        <path d="M10.314 -3.686H12.314V26.314H10.314z" transform="rotate(45 11.314 11.314)"></path>
                    </g>
                </svg>
            </label>
            <a href="tg://resolve?domain=Ivlevff" className="viber_link"
               style={{transform: open ? 'translate(0,-135%)' : "none",
               visibility: open ? 'visible' : "hidden" }}>
                <img src={viber} alt="viber" style={{ width: '100%'}} />
            </a>
            <a href="tg://resolve?domain=Ivlevff" className="telegram_link"
               style={{transform: open ? 'translate(0,-255%)' : "none",
                   visibility: open ? 'visible' : "hidden" }}>
                <img src={telegram} alt="telegram" style={{ width: '100%'}}  />
            </a>
            <a href="tg://resolve?domain=Ivlevff" className="whatsapp_link"
               style={{transform: open ? 'translate(0,-375%)' : "none",
                   visibility: open ? 'visible' : "hidden" }}>
                <img src={whatsapp} alt="whatsapp" style={{ width: '100%'}}/>
            </a>
            <a href="tel:+79171486688" className="tel_link"
               style={{transform: open ? 'translate(0,-495%)' : "none",
                   visibility: open ? 'visible' : "hidden" }}>
                <svg role="presentation" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="https://www.w3.org/2000/svg">
                    <path d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.84 0 25 0Z" fill="#004D73"></path>
                    <path d="M38.66 34.1001L32.44 27.7801C32.3435 27.6746 32.226 27.5904 32.0952 27.5327C31.9643
                    27.4751 31.8229 27.4453 31.68 27.4453C31.537 27.4453 31.3956 27.4751 31.2647 27.5327C31.1339
                    27.5904 31.0165 27.6746 30.92 27.7801L27.5 31.2001C26.81 31.8801 25.79 31.8801 25.1 31.2001L18.74
                    24.8301C18.5778 24.6751 18.4488 24.4889 18.3606 24.2826C18.2724 24.0764 18.227 23.8544 18.227
                    23.6301C18.227 23.4058 18.2724 23.1838 18.3606 22.9776C18.4488 22.7713 18.5778 22.5851 18.74
                    22.4301L22.16 19.0001C22.61 18.5601 22.61 17.9201 22.16 17.4801L15.9 11.3101C15.7943 11.209 15.6695
                    11.13 15.5329 11.0776C15.3963 11.0253 15.2506 11.0008 15.1045 11.0054C14.9583 11.0101 14.8145 11.0439
                     14.6815 11.1048C14.5485 11.1657 14.429 11.2525 14.33 11.3601C12.33 13.8101 8.65996 20.6201 18.73
                     30.9101L18.89 31.0601L19.03 31.2101C29.36 41.3501 36.16 37.6801 38.61 35.6701C39.1 35.2701 39.15
                     34.5401 38.66 34.1001Z" fill="white"></path>
                </svg>
            </a>
        </div>
    )
}
export default SocialNetworkButton;