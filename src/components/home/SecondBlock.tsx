import React from "react";
import warehouse_1 from "../../static/warehouse_1.jpeg";
import warehouse_2 from "../../static/warehouse_2.jpeg";
import warehouse_3 from "../../static/warehouse_3.jpeg";
import "../../styles/second_block.css";
import check from "../../static/check.png";
import warehouse_arrow from "../../static/warehouse_arrow.png";
import warehouse_title from "../../static/warehouse_title.png";




const SecondBlock: React.FC = () => {
    return (
        <div className="page_content">
            <div className="second_block">
                <div className="second_block_info">
                    <h2 className="block_info_title">
                        Мы предлагаем полный спектр услуг для поставщиков на маркетплейсы
                    </h2>
                    <div className="block_info_desc">
                        Мы сотрудничаем как с крупными торговыми сетями и оптовыми компаниями, беря на себя все процессы
                        по обработке, упаковке и доставке заказов, так и с начинающими поставщиками, которым мы
                        предоставляем полную поддержку в освоении стандартов маркетплейса и экономим время, которое они
                        могут использовать для развития своего бизнеса.
                        <div style={{ display: "flex", flexFlow: 'row', marginTop: 20, marginLeft: 10, width: '85%'}}>
                        <img src={check} alt="check" className="check_img"/>
                            <div style={{marginLeft: 10}}>Вы можете заниматься своим бизнесом, не тратя время на процессы приемки,
                        упаковки и доставки товаров, поскольку мы возьмем на себя все эти задачи для вас!</div>
                        </div>
                        <div style={{ display: "flex", flexFlow: 'row', marginTop: 20, marginLeft: 10, width: '85%'}}>
                            <img src={check} alt="check" className="check_img"/>
                            <div style={{marginLeft: 10}}>Вам не нужно беспокоиться о следующих изменениях в требованиях маркетплейсов,
                                потому что наша команда работает 24/7 и первой узнает обо всех обновлениях!</div>
                        </div>
                    </div>
                </div>
                <div className="second_block_images">
                    <div style={{ display: "flex", justifyContent: "space-around", flexFlow: "row"}}>
                        <img src={warehouse_1} alt="warehouse_1" className="second_img_1"/>
                        <img src={warehouse_2} alt="warehouse_2" className="second_img_2"/>
                    </div>
                    <img src={warehouse_3} alt="warehouse_3" className="second_img_3"/>
                    <div className="second_arrow_and_title">
                        <img src={warehouse_arrow} alt="warehouse_arrow" className="second_img_arrow"/>
                        <img src={warehouse_title} alt="warehouse_title" className="second_img_title"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SecondBlock