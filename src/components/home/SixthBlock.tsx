import React, {useState} from "react";
import "../../styles/sixth_block.css"
import background from "../../static/background.png";
import sixth_1 from "../../static/sixth_1.jpeg";
import sixth_2 from "../../static/sixth_2.jpeg";
import sixth_3 from "../../static/sixth_3.jpeg";
import ConsultationPopup from "../ConsultationPopup";


const SixthBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
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
            <div className="sixth_block">
                <ConsultationPopup isVisible={isPopupVisible}  setVisibleFalse={setPopupFalse} content="form"/>

                <div className="block_info_title">Дополнительные услуги</div>
                <div className="sixth_services">
                    <div className="sixth_service" style={backgroundImage}>
                        <img className="sixth_img" src={sixth_1} alt="clothes"/>
                        <div className="sixth_info">
                            <div className="sixth_title">Экспертная аналитика</div>
                            <div className="sixth_desc">Мы предоставим Вам помощь в планировании поставок, учитывая
                                особенности и сроки доставки товаров от поставщиков. Кроме того, мы контролируем отзывы
                                на товарных карточках наших клиентов, что позволяет нам своевременно принимать меры по
                                улучшению качества упаковки.</div>
                        </div>
                        <button className="small_gradient_button" onClick={setPopupTrue}>Получить консультацию</button>
                    </div>
                    <div className="space"></div>
                    <div className="sixth_service" style={backgroundImage}>
                        <img className="sixth_img" src={sixth_2} alt="room"/>
                        <div className="sixth_info">
                            <div className="sixth_title">Собственная фотостудия</div>
                            <div className="sixth_desc">Если Вам нужна помощь в создании фото и видеоконтента для
                                маркетплейса, то мы предлагаем Вам воспользоваться услугами нашей фотостудии. Мы являемся
                                профессионалами в этой области и можем создать для Вас контент высокого качества по одной
                                из лучших цен на рынке.</div>
                        </div>
                        <button className="small_gradient_button" onClick={setPopupTrue}>Получить консультацию</button>
                    </div>
                    <div className="space"></div>
                    <div className="sixth_service" style={backgroundImage}>
                        <img className="sixth_img" src={sixth_3} alt="shark"/>
                        <div className="sixth_info">
                            <div className="sixth_title">Предметная фотосъемка</div>
                            <div className="sixth_desc">Качественные и детальные фотографии Ваших товаров помогут выделиться
                                на маркетплейсах, что, в свою очередь, положительно скажется на Ваших продажах.</div>
                        </div>
                        <button className="small_gradient_button" onClick={setPopupTrue}>Получить консультацию</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SixthBlock;