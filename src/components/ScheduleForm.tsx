import React, {useState} from "react";
import {Supply} from "../models/Supply";
import "../styles/schedule_form.css"
import PhoneForm from "./PhoneForm";
import BoxSizes from "./BoxSizes";


interface ScheduleFormProps {
    supply: Supply;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({supply}) => {
    const [telInput, setTelInput] = useState("");
    const [telError, setTelError] = useState("");

    const [nameValid, setNameValid] = useState(true);
    let [nameText, setNameText] = useState("");

    type inputOptions = {
        [key: string]: number
    }
    const [inputs, setInputs] =
        useState<Array<inputOptions>>([{length: 0, width: 0, height: 0, amount: 0}]);

    console.log(supply)

    function setTelInputToParent(lastChar: string) {
        setTelInput(telInput + lastChar);
        setTelError("");
    }
    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if(!(/^[a-zA-Zа-яА-Я-]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        setNameValid(true);
        setNameText(inputValue);
    }

    function handleInputs(inputs: inputOptions[]){
        setInputs(inputs)
    }

    const [dataSupplyType, setDataSupplyType] = React.useState({
        value1: 'Короб',
        value2: 'Монопаллет',
        value3: 'Транзит',
        selectedRadioInput: 'Wildberries'
    });

    const [selectedStore, setSelectedStore] = useState("");

    function changeInputSupplyType(e: React.ChangeEvent<HTMLInputElement>) {
        setDataSupplyType({ ...dataSupplyType, selectedRadioInput: e.target.value });
    }

    function changeInputStore(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedStore(e.target.value );
    }

    return (
        <div className="schedule_form">
            <div className="modal_window_title">Заполните все необходимые поля</div>
            <input type="text" className="registration_input" onInput={handleNameInput} style={{marginTop: 10}}
                                                   name="name"/>
            <div className="login_form_label" style={{transform: nameText !== "" ?
                    'translate(-20px, -20px) scale(0.8)' : "none", top: 105, left: 64}}>Юридическое лицо</div>
             <div className="login_form_error" style={{display: nameValid ? "none" : "initial",
                bottom: 318}}>Поле не может быть пустым</div>
            <PhoneForm setTelInputToParent={setTelInputToParent} error={telError} spanClass="popup_span_tel"
                       inputClass="popup_tel_input" />
            <BoxSizes inputs={inputs} handleInputs={handleInputs}/>

            <div className="schedule_form_title">Тип поставки</div>
            <div style={{marginLeft: 13}}>
                <label className="price_radio_label">
                    <input type="radio"
                           name="supply type"
                           value={dataSupplyType.value1}
                           onChange={changeInputSupplyType}
                           checked={dataSupplyType.selectedRadioInput === dataSupplyType.value1}
                           className="price_radio"/>
                    <div className="price_radio_indicator"></div>
                    {dataSupplyType.value1}
                </label>
                <label className="price_radio_label">
                    <input type="radio"
                           name="supply type"
                           value={dataSupplyType.value2}
                           onChange={changeInputSupplyType}
                           checked={dataSupplyType.selectedRadioInput === dataSupplyType.value2}
                           className="price_radio"/>
                    <div className="price_radio_indicator"></div>
                    {dataSupplyType.value2}
                </label>
                <label className="price_radio_label">
                    <input type="radio"
                           name="supply type"
                           value={dataSupplyType.value3}
                           onChange={changeInputSupplyType}
                           checked={dataSupplyType.selectedRadioInput === dataSupplyType.value3}
                           className="price_radio"/>
                    <div className="price_radio_indicator" style={{borderColor:'#000000'}}></div>
                    {dataSupplyType.value3}
                </label>
            </div>

            <div className="schedule_form_title">Склад</div>
            <div style={{marginLeft: 13}}>
                <label className="price_radio_label">
                    <input type="radio"
                           name="store"
                           value={supply.warehouses[0].warehouseName}
                           onChange={changeInputStore}
                           checked={selectedStore === supply.warehouses[0].warehouseName}
                           className="price_radio"/>
                    <div className="price_radio_indicator"></div>
                    {supply.warehouses[0].warehouseName}
                </label>
                <label className="price_radio_label">
                    <input type="radio"
                           name="store"
                           value={supply.warehouses[1].warehouseName}
                           onChange={changeInputStore}
                           checked={selectedStore === supply.warehouses[1].warehouseName}
                           className="price_radio"/>
                    <div className="price_radio_indicator"></div>
                    {supply.warehouses[1].warehouseName}
                </label>
                {supply.warehouses.length > 2 &&
                    <label className="price_radio_label">
                        <input type="radio"
                               name="store"
                               value={supply.warehouses[2].warehouseName}
                               onChange={changeInputStore}
                               checked={selectedStore === supply.warehouses[2].warehouseName}
                               className="price_radio"/>
                        <div className="price_radio_indicator"></div>
                        {supply.warehouses[2].warehouseName}
                    </label>
                }
                {supply.warehouses.length > 3 &&
                    <label className="price_radio_label">
                        <input type="radio"
                               name="store"
                               value={supply.warehouses[3].warehouseName}
                               onChange={changeInputStore}
                               checked={selectedStore === supply.warehouses[3].warehouseName}
                               className="price_radio"/>
                        <div className="price_radio_indicator"></div>
                        {supply.warehouses[3].warehouseName}
                    </label>
                }
            </div>

            <button className="schedule_form_button">Отправить</button>

        </div>
    )
}

export default ScheduleForm;