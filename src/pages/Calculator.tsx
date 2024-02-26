import React, { useState } from "react";
import "../styles/calculator.css";
import "../styles/dropdown.scss";
import CalculatorDropdown from "../components/CalculatorDropdown";
import {PriceRequest} from "../models/PriceRequest";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Calculator: React.FC = () => {
    const [departureCityIndex, setDepartureCityIndex] = useState(0);
    const departureCities = ["Самара", "Тольятти"]

    const [storeIndex, setStoreIndex] = useState(0);
    const stores = ["Wildberries", "Ozon", "Яндекс Маркет"]

    const [cityWildberriesIndex, setCityWildberriesIndex] = useState(0);
    const citiesWildberries = ["Казань", "Невинномысск", "Краснодар", "Чехов 1", "Чехов 2", "Подольск", "Тула",
        "Коледино", "Электросталь", "Екат (перпективный)", "Екат (индустриальный)", "Новосибирск", "СПб (Уткина заводь)"]

    const [cityOzonIndex, setCityOzonIndex] = useState(0);
    const citiesOzon = ["Адыгейск", "Ростов-на-Дону", "Чапаевск", "Казань", "Софьино", "Пушкино 1",
        "Пушкино 2", "Хоругвино", "Санкт-Петербург", "Новосибирск", "Екатеринбург"];

    const [cityMarketIndex, setCityMarketIndex] = useState(0);
    const citiesMarket = ["Софьино", "Самара"]

    type inputOptions = {
        [key: string]: number
    }
    const [inputs, setInputs] =
        useState<Array<inputOptions>>([{length: 0, width: 0, height: 0, amount: 0}]);

    const [price, setPrice] = useState(0);


    function handleDepartureCity(index: number) {
        setDepartureCityIndex(index)
    }
    function handleStore(index: number) {
        setStoreIndex(index)
    }
    function handleCityWildberries(index: number) {
        setCityWildberriesIndex(index)
    }
    function handleCityOzon(index: number) {
        setCityOzonIndex(index)
    }
    function handleCityMarket(index: number) {
        setCityMarketIndex(index)
    }


    function handleSize(e: React.ChangeEvent<HTMLInputElement>, index: number, name: string) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (isNaN(Number(lastChar)) || (lastChar === ' ')) {
            e.target.value = inputValue.slice(0, -1);
            return;
        }
        if (inputValue.length === 1 && inputValue === '0') {
            e.target.value = inputValue.slice(0, -1);
            return;
        }
        inputs[index][name as keyof inputOptions] = Number(e.target.value)

    }

    function handlePlusClick() {
        let copy = Object.assign([], inputs);
        copy.push({length: 0, width: 0, height: 0, amount: 0})
        setInputs(copy);
    }

    function countPrice() {
        let volume = 0;
        let wrong = false;
        inputs.map(input => {
            let current = input["length"] * input["width"] * input["height"] * input["amount"];
            if (current === 0) {
                setPrice(-1);
                wrong = true
            }
            volume += current;
        });
        if (wrong) return;
        volume /= 1000000;
        let citySend = "";
        if (storeIndex === 0) citySend = citiesWildberries[cityWildberriesIndex];
        if (storeIndex === 1) citySend = citiesOzon[cityOzonIndex];
        if (storeIndex === 2) citySend = citiesMarket[cityMarketIndex];
        fetch('http://localhost:8080/api/calculator', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(new PriceRequest(departureCities[departureCityIndex], stores[storeIndex],
                citySend, volume)
            ),
        }).then(function(resp){
            resp.json()
                .then(function (data) {
                    if (data["header"] === "price") setPrice(data["content"]);
                })
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
    }

    return (
        <div className="page_content" style={{flexFlow: 'column', minHeight: '90vh'}}>
            <HelmetProvider>
                <Helmet
                    title="Калькулятор"
                />
            </HelmetProvider>
            <div className="first_info_title" style={{marginTop: 120}}>
                Калькулятор заказов
            </div>
            <div style={{visibility: price > 0 ? "visible" : "hidden"}}>Цена доставки: {price} рублей</div>
            <div style={{visibility: price < 0 ? "visible" : "hidden"}}>Данные введены некорректно</div>
            <label className="calculator_label">Город отправки: </label>
            <CalculatorDropdown  handleSelectClick={handleDepartureCity} items={departureCities}
                                 selectTitle={departureCities[departureCityIndex]}/>
            <label className="calculator_label">Склад: </label>
            <CalculatorDropdown  handleSelectClick={handleStore} items={stores}
                                 selectTitle={stores[storeIndex]}/>
            <label className="calculator_label">Город назначения: </label>

            {storeIndex === 0 &&
                <CalculatorDropdown  handleSelectClick={handleCityWildberries} items={citiesWildberries}
                                     selectTitle={citiesWildberries[cityWildberriesIndex]}/>
            }
            {storeIndex === 1 &&
                <CalculatorDropdown  handleSelectClick={handleCityOzon} items={citiesOzon}
                                     selectTitle={citiesOzon[cityOzonIndex]}/>
            }
            {storeIndex === 2 &&
                <CalculatorDropdown  handleSelectClick={handleCityMarket} items={citiesMarket}
                                     selectTitle={citiesMarket[cityMarketIndex]}/>
            }

            <label className="calculator_label">Коробки (в см): </label>
            <div className="boxes_div">
                <div className="boxes_labels">
                    <label>Ширина:</label>
                    <label>Длина:</label>
                    <label>Высота:</label>
                    <label>Количество:</label>
                </div>
                {inputs.map((input, index) =>
                    <div className="inputs_div" key={index}>
                        <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSize(e, index, "length")} placeholder={input.length.toString()}/>
                        <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSize(e, index, "height")} placeholder={input.height.toString()}/>
                        <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSize(e, index, "width")} placeholder={input.width.toString()}/>
                        <input className="sizes_input" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSize(e, index, "amount")} placeholder={input.amount.toString()}/>

                    </div>
            )}
            </div>
            <div className="plus_box" onClick={handlePlusClick}>+</div>
            <button className="count_price_button" onClick={countPrice}>Посчитать</button>
        </div>
    )
}


export default Calculator;