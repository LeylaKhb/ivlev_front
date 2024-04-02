import React, {useState} from "react";
import CalculatorDropdown from "./CalculatorDropdown";

interface SendCityAndStoreProps {
    handleSendCity: any;
    handleDepartureCity: any;
    handleStore: any;
    location: string;
}

const SendCityAndStore: React.FC<SendCityAndStoreProps> = ({handleDepartureCity, handleStore, handleSendCity, location}) => {
    const [departureCityIndex, setDepartureCityIndex] = useState(0);
    const departureCities = ["Самара", "Тольятти"]

    const [storeIndex, setStoreIndex] = useState(0);
    const stores = ["Wildberries", "Ozon", "Яндекс Маркет"]

    const citiesOzon = ["Адыгейск", "Ростов-на-Дону", "Чапаевск", "Казань", "Софьино", "Пушкино 1",
        "Пушкино 2", "Хоругвино", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Преображенка"];
    const [cityOzonIndex, setCityOzonIndex] = useState(0);

    const [cityMarketIndex, setCityMarketIndex] = useState(0);
    const citiesMarket = ["Софьино", "Преображенка"]

    const [cityWildberriesIndex, setCityWildberriesIndex] = useState(0);
    const citiesWildberries = ["Казань", "Невинномысск", "Краснодар", "Чехов 1", "Чехов 2", "Подольск", "Тула",
        "Коледино", "Электросталь", "Екат (перпективный)", "Екат (индустриальный)", "Новосибирск", "СПб (Уткина заводь)",
        "Новосемейкино", "Преображенка"];

    if (location === "admin") {
        departureCities.push("");
        stores.push("");
        citiesOzon.push("");
        citiesMarket.push("");
        citiesWildberries.push("");
    }

    function handleCityOzonIndex(index: number) {
        setCityOzonIndex(index);
        handleSendCity(citiesOzon[index]);
    }
    function handleCityWildberriesIndex(index: number) {
        setCityWildberriesIndex(index);
        handleSendCity(citiesWildberries[index]);
    }
    function handleCityMarketIndex(index: number) {
        setCityMarketIndex(index);
        handleSendCity(citiesMarket[index]);
    }
    function handleDepartureCityIndex(index: number) {
        setDepartureCityIndex(index);
        handleDepartureCity(departureCities[index])
    }
    function handleStoreIndex(index: number) {
        setStoreIndex(index);
        handleStore(stores[index]);
        switch (index) {
            case 0: {
                handleSendCity(citiesWildberries[0]);
                break;
            }
            case 1: {
                handleSendCity(citiesOzon[0]);
                break
            }
            case 2: {
                handleSendCity(citiesMarket[0]);
            }
        }
    }
    return (
        <div className="page_content" style={{flexFlow: 'column'}}>
            <label className="calculator_label">Город отправки: </label>
            <CalculatorDropdown  handleSelectClick={handleDepartureCityIndex} items={departureCities}
                                 selectTitle={departureCities[departureCityIndex]}/>
            <label className="calculator_label">Склад: </label>
            <CalculatorDropdown  handleSelectClick={handleStoreIndex} items={stores}
                                 selectTitle={stores[storeIndex]}/>
            <label className="calculator_label">Город назначения: </label>

            {storeIndex === 0 &&
                <CalculatorDropdown  handleSelectClick={handleCityWildberriesIndex} items={citiesWildberries}
                                     selectTitle={citiesWildberries[cityWildberriesIndex]}/>
            }
            {storeIndex === 1 &&
                <CalculatorDropdown  handleSelectClick={handleCityOzonIndex} items={citiesOzon}
                                     selectTitle={citiesOzon[cityOzonIndex]}/>
            }
            {storeIndex === 2 &&
                <CalculatorDropdown  handleSelectClick={handleCityMarketIndex} items={citiesMarket}
                                     selectTitle={citiesMarket[cityMarketIndex]}/>
            } 
        </div>
    )
}

export default SendCityAndStore;