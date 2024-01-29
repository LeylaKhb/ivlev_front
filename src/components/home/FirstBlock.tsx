import React from "react";

import background from "../../static/background.png";
import cart_and_boxes from "../../static/cart_and_boxes.png";
import "./first_block.css"


const FirstBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        width: '95%',
        height: 550,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
    };

    return (
        <div className="page_content">
            <div className="background-image" style={backgroundImage}>
                <div className="first_info">
                    <div className="first_info_title">Фулфилмент для<br className="first_br"/> маркетплейсов<br/>в Самаре</div>
                    <div className="first_info_desc">Заберем ваш товар от поставщика, подготовим, сделаем фотосессию, упакуем, промаркируем и отвезем на склад
                        Вайлдберриз, OZON или Яндекс.Маркет.
                        <br/><br/>Работаем с любым типом поставок (FBS/FBO/КРОСС-ДОК)
                    </div>

                    <button className="big_gradient_button">Получить консультацию</button>
                </div>

                <div className="first_img_cart_div">
                    <img src={cart_and_boxes} className="first_img_cart" alt="cart and boxes"/>
                </div>
            </div>
        </div>
    )
}

export default FirstBlock;