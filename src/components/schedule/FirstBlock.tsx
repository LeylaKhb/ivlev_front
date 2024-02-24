import React from "react";

import background from "../../static/background.png";
import cart_and_boxes from "../../static/cart_and_boxes.png";


const FirstBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        width: '95%',
        height: 350,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20
    };

    return (
        <div style={backgroundImage} className="background-image">
            <div className="first_info">

                <div className="first_info_title" style={{marginBottom: 10}}>
                    Расписание поставок на склады
                </div>
                <div className="first_info_desc">
                    Вступайте в чат поставщиков, нажав на кнопку ниже
                </div>
                <a href="https://t.me/+nVp-YvKEbJJjOTRi"><button className="big_gradient_button"
                                                                 style={{marginTop: 30}}>Чат поставщиков</button></a>

            </div>
            <div className="first_img_cart_div">
                <img src={cart_and_boxes} className="first_img_cart" alt="cart and boxes"/>
            </div>
        </div>
    )
}

export default FirstBlock;