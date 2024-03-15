import React, { useState } from "react";
import "../styles/calculator.css";
import "../styles/dropdown.scss";
import {PriceRequest} from "../models/PriceRequest";
import {Helmet, HelmetProvider} from "react-helmet-async";
import BoxSizes from "../components/BoxSizes";
import SendCityAndStore from "../components/SendCityAndStore";

const Calculator: React.FC = () => {
    const [departureCity, setDepartureCity] = useState("Самара");
    const [store, setStore] = useState("Wildberries");
    const [sendCity, setSendCity] = useState("Казань");

    type inputOptions = {
        [key: string]: number
    }
    const [inputs, setInputs] =
        useState<Array<inputOptions>>([{length: 0, width: 0, height: 0, amount: 0}]);

    const [price, setPrice] = useState("");


    function handleDepartureCity(city: string) {
        setDepartureCity(city);
    }
    function handleStore(store: string) {
        setStore(store);
    }
    function handleSendCity(city: string) {
        setSendCity(city);
    }

    function handleInputs(inputs: inputOptions[]){
        setInputs(inputs)
    }

    function countPrice() {
        let volume = 0;
        let wrong = false;
        let amount = 0;
        inputs.map(input => {
            let current = input["length"] * input["width"] * input["height"] * input["amount"];
            if (current === 0) {
                setPrice("-");
                wrong = true;
            }
            volume += current;
            amount += input["amount"];

        });
        if (wrong) return;
        volume /= 1000000;
        fetch('http://localhost:8080/api/calculator', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(new PriceRequest(departureCity, store,
                sendCity, volume, false, false, amount)
            ),
        }).then(function(resp){
            resp.json()
                .then(function (data) {
                    if (data["header"] === "answer") setPrice(data["content"].split("/")[0]);
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
            <div className="first_info_title" style={{marginTop: 120, marginBottom: 10}}>
                Калькулятор заказов
            </div>
            <div style={{visibility: price !== "-" ? "visible" : "hidden", fontSize: 19}}>Цена доставки: {price} рублей</div>
            <div style={{visibility: price === "-" ? "visible" : "hidden", fontSize: 19}}>Данные введены некорректно</div>
            <SendCityAndStore  handleSendCity={handleSendCity} handleDepartureCity={handleDepartureCity}
                                handleStore={handleStore} location="calculator" />
            
            <label className="calculator_label">Коробки (в см): </label>
            <BoxSizes inputs={inputs}  handleInputs={handleInputs}/>
            <button className="count_price_button" onClick={countPrice}>Посчитать</button>
        </div>
    )
}


export default Calculator;