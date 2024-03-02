import React, {useState} from "react";
import "../styles/price_form.css"
import {Swiper,  SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import ApplicationForm from "./ApplicationForm";

const PriceForm: React.FC = () => {
    const [slide, setSlide] = useState(1);
    const [progressWidth, setProgressWidth] = useState('0%');
    const slideTitles = ['На склад какого маркетплейса необходимо отправить товар?\n',
    'Выберите услуги которые необходимы\n',
    'Планируете отгрузку впервые?\n',
    'Какой товар отправляете?\n',
    'Как с вами удобнее связаться?\n']

    const [dataFirstSlide, setDataFirstSlide] = React.useState({
        value1: 'Wildberries',
        value2: 'Ozon',
        value3: 'Яндекс Маркет',
        selectedRadioInput: 'Wildberries'
    });
    const [dataSecondSlide, setDataSecondSlide] = React.useState({
        value1: 'Доставка',
        value2: 'Упаковка',
        value3: 'Маркировка',
        value4: 'Проверка на брак',
        selectedRadioInput: 'Доставка'
    });
    const [dataThirdSlide, setDataThirdSlide] = React.useState({
        value1: 'Да',
        value2: 'Нет',
        selectedRadioInput: 'Да'
    });
    const [dataFourthSlide, setDataFourthSlide] = React.useState("");
    const [dataFifthSlide, setDataFifthSlide] = React.useState({
        value1: 'Telegram',
        value2: 'WhatsApp',
        value3: 'Viber',
        selectedRadioInput: 'Telegram'
    });

    function changeInputStore(e: React.ChangeEvent<HTMLInputElement>) {
        setDataFirstSlide({ ...dataFirstSlide, selectedRadioInput: e.target.value });
    }
    function changeInputService(e: React.ChangeEvent<HTMLInputElement>) {
        setDataSecondSlide({ ...dataSecondSlide, selectedRadioInput: e.target.value });
    }
    function changeInputFirstTime(e: React.ChangeEvent<HTMLInputElement>) {
        setDataThirdSlide({ ...dataThirdSlide, selectedRadioInput: e.target.value });
    }

    function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setDataFourthSlide(inputValue);
    }

    function changeInputConnectWay(e: React.ChangeEvent<HTMLInputElement>) {
        setDataFifthSlide({ ...dataFifthSlide, selectedRadioInput: e.target.value });
    }

    const slideForms = [
        <form style={{ border: dataFirstSlide.selectedRadioInput === 'error' ? '1px solid red' : 'none'}}>
            <label className="price_radio_label">
                <input type="radio"
                        name="На склад какого маркетплейса необходимо отправить товар"
                        value={dataFirstSlide.value1}
                       onChange={changeInputStore}
                       checked={dataFirstSlide.selectedRadioInput === dataFirstSlide.value1}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataFirstSlide.value1}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                        name="На склад какого маркетплейса необходимо отправить товар"
                        value={dataFirstSlide.value2}
                       onChange={changeInputStore}
                       checked={dataFirstSlide.selectedRadioInput === dataFirstSlide.value2}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataFirstSlide.value2}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="На склад какого маркетплейса необходимо отправить товар"
                       value={dataFirstSlide.value3}
                       onChange={changeInputStore}
                       checked={dataFirstSlide.selectedRadioInput === dataFirstSlide.value3}
                       className="price_radio"/>
                <div className="price_radio_indicator" style={{borderColor:'#000000'}}></div>
                {dataFirstSlide.value3}
            </label>
        </form>,
        <form >
            <label className="price_radio_label">
                <input type="radio"
                       name="second slide"
                       value={dataSecondSlide.value1}
                       onChange={changeInputService}
                       checked={dataSecondSlide.selectedRadioInput === dataSecondSlide.value1}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataSecondSlide.value1}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="second slide"
                       value={dataSecondSlide.value2}
                       onChange={changeInputService}
                       checked={dataSecondSlide.selectedRadioInput === dataSecondSlide.value2}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataSecondSlide.value2}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="second slide"
                       value={dataSecondSlide.value3}
                       onChange={changeInputService}
                       checked={dataSecondSlide.selectedRadioInput === dataSecondSlide.value3}
                       className="price_radio"/>
                <div className="price_radio_indicator" style={{borderColor:'#000000'}}></div>
                {dataSecondSlide.value3}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="second slide"
                       value={dataSecondSlide.value4}
                       onChange={changeInputService}
                       checked={dataSecondSlide.selectedRadioInput === dataSecondSlide.value4}
                       className="price_radio"/>
                <div className="price_radio_indicator" style={{borderColor:'#000000'}}></div>
                {dataSecondSlide.value4}
            </label>
        </form>,
        <form >
            <label className="price_radio_label">
                <input type="radio"
                       name="third slide"
                       value={dataThirdSlide.value1}
                       onChange={changeInputFirstTime}
                       checked={dataThirdSlide.selectedRadioInput === dataThirdSlide.value1}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataThirdSlide.value1}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="third slide"
                       value={dataThirdSlide.value2}
                       onChange={changeInputFirstTime}
                       checked={dataThirdSlide.selectedRadioInput === dataThirdSlide.value2}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataThirdSlide.value2}
            </label>
        </form>,
        <form >
            <input type="text"
            className="price_text_input"
            placeholder="Например, часы"
            onInput={handleInputText}
            required={true}/>
        </form>,
        <form >
            <label className="price_radio_label">
                <input type="radio"
                       name="fourth slide"
                       value={dataFifthSlide.value1}
                       onChange={changeInputConnectWay}
                       checked={dataFifthSlide.selectedRadioInput === dataFifthSlide.value1}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataFifthSlide.value1}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="fourth slide"
                       value={dataFifthSlide.value2}
                       onChange={changeInputConnectWay}
                       checked={dataFifthSlide.selectedRadioInput === dataFifthSlide.value2}
                       className="price_radio"/>
                <div className="price_radio_indicator"></div>
                {dataFifthSlide.value2}
            </label>
            <label className="price_radio_label">
                <input type="radio"
                       name="fourth slide"
                       value={dataFifthSlide.value3}
                       onChange={changeInputConnectWay}
                       checked={dataFifthSlide.selectedRadioInput === dataFifthSlide.value3}
                       className="price_radio"/>
                <div className="price_radio_indicator" style={{borderColor:'#000000'}}></div>
                {dataFifthSlide.value3}
            </label>
        </form>
        
    ]

    function handlePriceSlideForward() {
        setSlide(slide + 1);
        setProgressWidth((slide * 20) + '%')
    }

    function handlePriceSlideBack() {
        setSlide(slide - 1);
        setProgressWidth(((slide - 2) * 20) + '%')
    }

    return (
        <div>
            <div className="price_header">
                <div className="price_header_svg_and_text">
                    <svg role="presentation" viewBox="0 0 100 100" className="price_header_svg"
                         style={{display: slide === 6 ? "none" : "initial"}} >
                        <rect x="27.5" y="4.1" className="st61" width="56.5" height="73.5"></rect>
                        <line className="st61" x1="41.5" y1="22.1" x2="70.6" y2="22.1"></line>
                        <line className="st61" x1="41.5" y1="38.8" x2="70.6" y2="38.8"></line>
                        <line className="st61" x1="41.5" y1="55.5" x2="70.6" y2="55.5"></line>
                        <polyline className="st61" points="66.4,77.6 66.4,95.6 9.8,95.6 9.8,22.1 27.5,22.1 "></polyline>
                    </svg>
                    <label style={{fontSize: slide === 6 ? 18 : 12}}>
                        {slide === 6 ? "Оставьте свой номер телефона и мы свяжемся с вами в ближайшее время" :
                            "Пройдите опрос и узнайте сколько будут стоить услуги фулфилмента для вашего бизнеса"}</label>
                </div>
                <div className="slides_count" style={{display: slide === 6 ? "none" : "initial"}}>
                    {slide}/5
                </div>
            </div>
            <div className="progress_line">
                <div className="progress_achieved" style={{width: progressWidth}}></div>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation={{ nextEl: ".price_slide_button_next",
                    prevEl: ".price_slide_button_prev",}}
                style={{marginLeft: 0, display: 'flex', justifyContent: "center",
                    alignItems: 'center',}}
                slidesPerView={1}
                tabIndex="0"
                noSwiping={true}
            >
                {slideTitles.map((reviewContent, index) => (
                    <SwiperSlide key={index}>
                        <div className="price_slide_content">
                            <div className="price_slide_title">
                                {slideTitles[slide - 1]}
                            </div>
                            {slideForms[slide - 1]}

                            <div className="price_slide_buttons">
                                <button className="price_slide_button_prev" disabled={slide === 1} onClick={handlePriceSlideBack}
                                        style={{opacity: slide === 1 ? .6 : 1, cursor: slide === 1 ? 'default' : "pointer"}}>
                                    <label className="arrow_price">←</label> Назад</button>
                                <button className="price_slide_button_next" onClick={handlePriceSlideForward}>
                                    <label className="arrow_price">→</label>  Вперед</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide style={{ padding: 20}}>
                    <ApplicationForm location="popup" priceData={[dataFirstSlide.selectedRadioInput,
                        dataSecondSlide.selectedRadioInput, dataThirdSlide.selectedRadioInput,
                    dataFourthSlide, dataFifthSlide.selectedRadioInput]}/>
                </SwiperSlide>


            </Swiper>
        </div>
    )
}

export default PriceForm;