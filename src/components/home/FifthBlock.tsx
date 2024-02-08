import React from "react";
import background from "../../static/background.png";
import "../../styles/fifth_block.css";

const FifthBlock: React.FC = () => {
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        width: '95%',
        display: 'flex',
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '4%',
        paddingBottom: '3%',
        flexFlow: 'column',
        borderRadius: 10,
    };

    return (
        <div className="page_content">
            <div style={backgroundImage} className="fifth_block">
                <div className="background_info_title" style={{textAlign: 'left'}}>Мы поможем вам оптимизировать затраты и
                    избавиться от рутины</div>
                <div className="fifth_desc">
                    <div className="background_info_desc">
                        <strong>Фулфилмент</strong> - это возможность сосредоточиться на развитии и управлении своим
                        бизнесом, не тратя время на организацию хранения и логистику заказов.
                        <br/><br/>С помощью этой услуги вы можете осуществлять все необходимые операции складского хозяйства через
                        единую платформу, включая отгрузку и доставку заказов на различные службы доставки и маркетплейсы.
                    </div>
                    <div  className="background_info_desc">
                        <strong>Мы можем оказать Вам следующую помощь:</strong>
                        <li>Сократить расходы на аренду склада;</li>
                        <li>Снизить затраты на оплату персонала;</li>
                        <li>Ускорить доставку грузов;</li>
                        <li>Избавиться от ошибок, связанных с номенклатурой;</li>
                        <li>Решить проблемы, связанные с обработкой возвратов;</li>
                        <li>Избежать проблем, связанных с регуляциями, связанными с работой курьерских служб и маркетплейсов.</li>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FifthBlock;