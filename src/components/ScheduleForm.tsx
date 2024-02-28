import React from "react";
import {Supply} from "../models/Supply";
import "../styles/schedule_form.css"
import PhoneForm from "./PhoneForm";
import BoxSizes from "./BoxSizes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";



interface ScheduleFormProps {
    supply: Supply;
}

interface ScheduleFormState {
    telInput: string;
    telError: string;
    nameValid: boolean;
    nameText: string;
    inputs: inputOptions[];
    dataSupplyType: typeOptions;
    selectedStoreIndex: number;
    selectedDepartureCity: string;
    willTaken: boolean;
    ozonNumber: string;
    startDate: null | Date
}

type inputOptions = {
    [key: string]: number
}

type typeOptions = {
    [key: string]: string
}

class ScheduleForm extends React.Component<ScheduleFormProps, ScheduleFormState> {
    constructor(props: ScheduleFormProps) {
        super(props);
        this.state = {
            telInput: "",
            telError: "",
            nameValid: true,
            nameText: "",
            inputs: [{length: 0, width: 0, height: 0, amount: 0}],
            dataSupplyType: {
                value1: 'Короб',
                value2: 'Монопаллет',
                value3: 'Транзит',
                selectedRadioInput: 'Короб'
            },
            selectedStoreIndex: 0,
            selectedDepartureCity: this.props.supply.departureCities[0].cityName,
            willTaken: false,
            ozonNumber: "",
            startDate: null
        }

        this.setTelInputToParent = this.setTelInputToParent.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.changeInputSupplyType = this.changeInputSupplyType.bind(this);
        this.changeInputStore = this.changeInputStore.bind(this);
        this.changeInputDepartureCity = this.changeInputDepartureCity.bind(this);
        this.changeInputWillTaken = this.changeInputWillTaken.bind(this);
        this.handleOzonNumber = this.handleOzonNumber.bind(this);
        this.isWeekday = this.isWeekday.bind(this);
    }

    isWeekday(date: Date) {
        const day = date.getDay();
        return day !== 0 && day !== 1 && day !== 4;
    };

    setTelInputToParent(lastChar: string) {
        this.setState({telInput: this.state.telInput + lastChar,
                            telError: ""})

    }
    handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if(!(/^[a-zA-Zа-яА-Я-]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        this.setState({nameText: inputValue,
            nameValid: true})
    }

    handleInputs(inputsValues: inputOptions[]){
        this.setState({inputs: inputsValues})
    }

    changeInputSupplyType(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({dataSupplyType: { ...this.state.dataSupplyType, selectedRadioInput: e.target.value }})
    }

    changeInputStore(index: number) {
        this.setState({selectedStoreIndex: index})
    }

    changeInputDepartureCity(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({selectedDepartureCity: e.target.value})

    }

    changeInputWillTaken(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({willTaken: e.target.value === "Да"});
    }

    handleOzonNumber(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ozonNumber: e.target.value})
    }

    render() {
        let me = this;
        return (
            <div className="schedule_form">
                <form>
                <div className="modal_window_title">Заполните все необходимые поля</div>
                <input type="text" className="registration_input" onInput={this.handleNameInput} style={{marginTop: 10}}
                       name="name"/>
                <div className="login_form_label" style={{transform: me.state.nameText !== "" ?
                        'translate(-20px, -55px) scale(0.8)' : "none", top: 105, left: 64}}>Юридическое лицо</div>
                <div className="login_form_error" style={{display: me.state.nameValid ? "none" : "initial",
                    bottom: 318}}>Поле не может быть пустым</div>
                <PhoneForm setTelInputToParent={this.setTelInputToParent} error={me.state.telError} spanClass="popup_span_tel"
                           inputClass="popup_tel_input" />
                <BoxSizes inputs={me.state.inputs} handleInputs={this.handleInputs}/>

                <div className="schedule_form_title">Тип поставки</div>
                <div style={{marginLeft: 13}}>
                    <label className="price_radio_label">
                        <input type="radio"
                               name="supply type"
                               value={me.state.dataSupplyType.value1}
                               onChange={this.changeInputSupplyType}
                               checked={me.state.dataSupplyType.selectedRadioInput === me.state.dataSupplyType.value1}
                               className="price_radio"/>
                        <div className="price_radio_indicator"></div>
                        {me.state.dataSupplyType.value1}
                    </label>
                    <label className="price_radio_label">
                        <input type="radio"
                               name="supply type"
                               value={me.state.dataSupplyType.value2}
                               onChange={this.changeInputSupplyType}
                               checked={me.state.dataSupplyType.selectedRadioInput === me.state.dataSupplyType.value2}
                               className="price_radio"/>
                        <div className="price_radio_indicator"></div>
                        {me.state.dataSupplyType.value2}
                    </label>
                    <label className="price_radio_label">
                        <input type="radio"
                               name="supply type"
                               value={me.state.dataSupplyType.value3}
                               onChange={this.changeInputSupplyType}
                               checked={me.state.dataSupplyType.selectedRadioInput === me.state.dataSupplyType.value3}
                               className="price_radio"/>
                        <div className="price_radio_indicator" style={{borderColor:'#000000'}}></div>
                        {me.state.dataSupplyType.value3}
                    </label>
                </div>

                <div className="schedule_form_title">Склад</div>
                <div style={{marginLeft: 13}}>
                    {me.props.supply.warehouses.map((value, index) => (
                        <label className="price_radio_label">
                            <input type="radio"
                                   name="store"
                                   value={index}
                                   onChange={() => me.changeInputStore(index)}
                                   checked={me.state.selectedStoreIndex === index}
                                   className="price_radio"/>
                            <div className="price_radio_indicator"></div>
                            {me.props.supply.warehouses[index].warehouseName}
                        </label>
                    ))}
                </div>

                {me.props.supply.warehouses[me.state.selectedStoreIndex].store === 'Ozon' &&
                    <div>
                        <div className="schedule_form_title">Номер заказа (Ozon)</div>
                        <input type="text" onInput={me.handleOzonNumber} style={{marginTop: 15, marginLeft: 13,
                            height: 25, width: 300}}/>
                    </div>
                }

                <div className="schedule_form_title">Город отправки</div>
                <div style={{marginLeft: 13}}>
                    {me.props.supply.departureCities.map((value) => (
                        <label className="price_radio_label">
                            <input type="radio"
                                   name="departure city"
                                   value={value.cityName}
                                   onChange={me.changeInputDepartureCity}
                                   checked={me.state.selectedDepartureCity === value.cityName}
                                   className="price_radio"/>
                            <div className="price_radio_indicator"></div>
                            {value.cityName}
                        </label>
                    ))}
                </div>
                {me.props.supply.departureDate.toString() === '1970-01-01' &&
                    <>
                        <div className="schedule_form_title">Дата отправки</div>
                        <DatePicker selected={me.state.startDate}
                                    onChange={(date) => me.setState({startDate: date})}
                                    filterDate={me.isWeekday}
                                    minDate={moment().add(1, 'day').toDate()}
                                    dateFormat={"dd.MM.YYYY"}
                                    placeholderText="Выберите дату..."/>
                    </>
                }


                        <div className="schedule_form_title">Забрать со склада</div>
                <div style={{marginLeft: 13}}>
                    <label className="price_radio_label">
                        <input type="radio"
                               name="take"
                               value={"Да"}
                               onChange={me.changeInputWillTaken}
                               checked={me.state.willTaken}
                               className="price_radio"/>
                        <div className="price_radio_indicator"></div>
                        Да
                    </label>
                    <label className="price_radio_label">
                        <input type="radio"
                               name="take"
                               value={"Нет"}
                               onChange={me.changeInputWillTaken}
                               checked={!me.state.willTaken}
                               className="price_radio"/>
                        <div className="price_radio_indicator"></div>
                        Нет
                    </label>
                </div>

                <div className="schedule_form_title">Доп. комментарий</div>
                <textarea className="schedule_comment" placeholder="Укажите, откуда забрать товар или напишите иные комментарии"/>

                <button className="schedule_form_button" >Отправить</button>
                </form>

            </div>
        )
    }
}

export default ScheduleForm;
