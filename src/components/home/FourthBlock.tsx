import React from "react";
import "./fourth_block.css"
import fourth_1 from "../../static/fourth_1.png"
import fourth_2 from "../../static/fourth_2.png"
import fourth_3 from "../../static/fourth_3.png"
import fourth_4 from "../../static/fourth_4.png"
import fourth_5 from "../../static/fourth_5.png"
import fourth_6 from "../../static/fourth_6.png"

const FourthBlock: React.FC = () => {
    return (
        <div className="page_content">
            <div className="fourth_block">
                <div className="fourth_block_info">
                    <h2 className="block_info_title">
                        Мы поможем вам повысить эффективность вашего бизнеса
                    </h2>
                    <div className="block_info_desc">
                        Мы предлагаем вам полную поддержку на каждом этапе - от приемки товара до доставки на любой склад!
                    </div>
                </div>
                <div className="fourth_block_columns">
                    <div className="fourth_block_column">
                        <div className="fourth_column_div">
                            <img className="fourth_img"  src={fourth_1} alt="warehouse" />
                            <div className="fourth_column_info">
                                <div className="fourth_column_title">Прием товара в ТК</div>
                                <div className="fourth_column_desc">Мы принимаем товары с любых транспортных компаний, загружаем
                                их на склад, осуществляем проверку состояния груза.</div>
                            </div>
                        </div>
                        <div className="fourth_column_div">
                            <img className="fourth_img"  src={fourth_2} alt="wi-fi" />
                            <div className="fourth_column_info">
                                <div className="fourth_column_title">Маркировка</div>
                                <div className="fourth_column_desc">Создаем этикетки с необходимой информацией проверяем
                                читаемость этикеток сканером и правильно размещаем их на товаре в одном или нескольких
                                экземплярах.</div>
                            </div>
                        </div>
                        <div className="fourth_column_div">
                            <img className="fourth_img"  src={fourth_3} alt="delivery" />
                            <div className="fourth_column_info">
                                <div className="fourth_column_title">Бережно доставим</div>
                                <div className="fourth_column_desc">Доставка осуществляется с помощью нашего собственного
                                транспорта, а наши экспедиторы прошли обучение, чтобы обеспечить приемку 99,5% от общей
                                массы поставок.
                                <br/> <strong>Склады: Казань, Краснодар, Москва (все склады)</strong></div>
                            </div>
                        </div>
                    </div>
                    <div className="fourth_block_column">
                        <div className="fourth_column_div">
                            <img className="fourth_img"  src={fourth_4} alt="shelves" />
                            <div className="fourth_column_info">
                                <div className="fourth_column_title">Создаем поставку</div>
                                <div className="fourth_column_desc">90% случаев "разворотов" на складах происходят из-за
                                неправильно созданной поставки со стороны поставщика. Мы берем на себя создание поставки с
                                гарантией ее приемки.</div>
                            </div>
                        </div>
                        <div className="fourth_column_div">
                            <img className="fourth_img"  src={fourth_5} alt="boxing" />
                            <div className="fourth_column_info">
                                <div className="fourth_column_title">Упакуем ваш товар</div>
                                <div className="fourth_column_desc">Мы упакуем ваш товар в соответствии с требованиями
                                маркетплейса и предложим несколько вариантов упаковки, либо упакуем товар согласно ваших
                                требований.</div>
                            </div>
                        </div>
                        <div className="fourth_column_div">
                            <img className="fourth_img"  src={fourth_6} alt="storage" />
                            <div className="fourth_column_info">
                                <div className="fourth_column_title">Оставим на хранение</div>
                                <div className="fourth_column_desc">Мы предлагаем бережное хранение вашего товара на нашем
                                    теплом складе.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FourthBlock;