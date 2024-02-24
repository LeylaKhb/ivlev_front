import React from "react";
import {Link} from "react-router-dom";

const  CalcuatorBlock: React.FC = () => {
    return (
        <div className="calculator_div">
            <div className="block_info_title">
                Рассчитать стоимость заказа можно здесь
            </div>
            <div className="arrow_calculator">

            </div>
            <Link to="/calculator" style={{textDecoration: "none"}}>

                <div className="calculator_button">
                    Рассчитать стоимость
                    <svg role="presentation" className="arrow_calculator_curved" fill='#c9c9c9'
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 180">
                        <path
                            d="M54.1 109c-.8 0-1.6-.4-2-1.1-.8-1.1-.5-2.7.6-3.5 1.3-.9 6.8-4 11.6-6.6-15.9-1.3-29.2-8.3-38.5-20.2C8.9 56 8.5 24.1 13.2 3.4c.3-1.3 1.7-2.2 3-1.9 1.3.3 2.2 1.7 1.9 3-4.5 19.6-4.2 49.8 11.6 70 9 11.5 21.5 17.7 37.2 18.4l-1.8-2.3c-1.4-1.7-2.7-3.4-4.1-5.1-.7-.9-1.5-1.9-2.3-2.9-.9-1.1-.7-2.6.4-3.5 1.1-.9 2.6-.7 3.5.4 0 0 0 .1.1.1l6.4 7.9c.5.5.9 1.1 1.4 1.7 1.5 1.8 3.1 3.6 4.4 5.6 0 .1.1.1.1.2.1.3.2.5.3.8v.6c0 .2-.1.4-.2.6-.1.1-.1.3-.2.4-.1.2-.3.4-.5.6-.1.1-.3.2-.5.3-.1 0-.1.1-.2.1-1.2.6-16 8.6-18.1 10-.5.5-1 .6-1.5.6z"></path>
                    </svg>

                    <svg role="presentation" className="arrow_calculator_straight" fill='#c9c9c9'
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 70">
                        <path
                            d="M31.5 47c-1.1-.9-2.7-.7-3.5.4L20.2 57V5.8c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5V57l-7.8-9.7c-.8-1-2.4-1.2-3.5-.3-1.1.9-1.2 2.4-.4 3.5l12.2 15.2c.5.6 1.2.9 1.9.9s1.5-.3 1.9-.9l12.2-15.2c1-1.1.9-2.6-.2-3.5z"></path>
                    </svg>
                </div>
            </Link>
        </div>
    )
}

export default CalcuatorBlock;