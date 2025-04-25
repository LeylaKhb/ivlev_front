import React from "react";
import {Supply} from "../../models/Supply";
import "../../styles/schedule/schedule_form.css"
import PhoneForm from "../forms/PhoneForm";
import BoxSizes from "../forms/BoxSizes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';
import {PriceRequest} from "../../models/PriceRequest";
import {Orders} from "../../models/Orders";
import {Box} from "../../models/Box";
import Form from "../forms/Form";
import {Link} from "react-router-dom";


interface ScheduleFormProps {
    supply: Supply;
    order?: Orders;
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
    payment: boolean;
    ozonNumber: string;
    departureDate: null | Date;
    acceptanceDate: null | Date;
    inputsValid: boolean;
    comment: string
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
        if (props.order !== undefined) {
            let inputsVal;
            if (props.order.boxes !== undefined) {
                inputsVal = props.order.boxes.map((box) => (
                    {length: box.length, width: box.width, height: box.height, amount: box.amount}
                ))
            } else {
                inputsVal = [{length: 0, width: 0, height: 0, amount: 0}]
            }
            let selectedIndex = 0;
            for (let w of props.supply.warehouses) {
                if (w.store === props.order.store && w.sendCity === props.order.sendCity) {
                    break;
                }
                selectedIndex++;
            }
            this.state = {
                telInput: "(" + props.order.phoneNumber.slice(1, 4) + ") " + props.order.phoneNumber.slice(4, 7) + "-"
                    + props.order.phoneNumber.slice(7, 9) + "-" + props.order.phoneNumber.slice(9, 11),
                telError: "",
                nameValid: true,
                nameText: props.order.entity,
                inputs: inputsVal,
                dataSupplyType: {
                    value1: 'Короб',
                    value2: 'Монопаллет',
                    value3: 'Транзит',
                    selectedRadioInput: props.order.supplyType
                },
                selectedStoreIndex: selectedIndex,
                selectedDepartureCity: props.order.departureCity,
                willTaken: props.order.willTaken,
                payment: props.order.paymentSite,
                ozonNumber: props.order.numberOzon,
                departureDate: props.order.departureDate,
                acceptanceDate: props.order.acceptanceDate,
                inputsValid: true,
                comment: props.order.comment
            }
        } else {
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
                payment: false,
                ozonNumber: "",
                departureDate: null,
                acceptanceDate: null,
                inputsValid: true,
                comment: ""
            }
        }

        this.setTelInputToParent = this.setTelInputToParent.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
        this.changeInputSupplyType = this.changeInputSupplyType.bind(this);
        this.changeInputStore = this.changeInputStore.bind(this);
        this.changeInputDepartureCity = this.changeInputDepartureCity.bind(this);
        this.changeInputWillTaken = this.changeInputWillTaken.bind(this);
        this.changeInputPayment = this.changeInputPayment.bind(this);
        this.handleOzonNumber = this.handleOzonNumber.bind(this);
        this.isWeekday = this.isWeekday.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.checkPhone = this.checkPhone.bind(this);
        this.checkName = this.checkName.bind(this);
        this.sendOrder = this.sendOrder.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    isWeekday(date: Date) {
        const day = date.getDay();

        const startDate = new Date('2024-12-27');
        const endDate = new Date('2025-01-06');
        if (date >= startDate && date <= endDate) {
            return false;
        }

        return day !== 0 && day !== 1 && day !== 4;
    };

    isWeekdayWithoutSunday(date: Date) {
        const day = date.getDay();

        const startDate = new Date('2024-12-27');
        const endDate = new Date('2025-01-06');
        if (date >= startDate && date <= endDate) {
            return false;
        }

        return day !== 0;
    };

    setTelInputToParent(value: string) {
        this.setState({
            telInput: value,
            telError: ""
        })

    }

    handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (!(/^[a-zA-Zа-яА-Я- ]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        this.setState({
            nameText: inputValue,
            nameValid: true
        })
    }

    handleInputs(inputsValues: inputOptions[]) {
        this.setState({inputs: inputsValues, inputsValid: true})
    }

    changeInputSupplyType(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({dataSupplyType: {...this.state.dataSupplyType, selectedRadioInput: e.target.value}})
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

    changeInputPayment(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({payment: e.target.value === "Онлайн на сайте"});
    }

    handleOzonNumber(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ozonNumber: e.target.value})
    }

    checkPhone() {
        let me = this;
        if (me.state.telInput.length !== 15) {
            me.setState({telError: "Номер введён некорректно"});
            return false;
        }
        return true;
    }

    checkName() {
        let me = this;
        if (me.state.nameText.length === 0) {
            me.setState({nameValid: false});
            return false;
        }
        return true;
    }

    handleComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({comment: e.target.value});
    }

    sendOrder(price: string, volume: number) {
        let me = this;
        const state = me.state;

        let departureDate = state.departureDate === null ? me.props.supply.departureDate : state.departureDate;
        let acceptanceDate = state.acceptanceDate === null ? me.props.supply.acceptanceDate : state.acceptanceDate;

        let selectedWarehouse = me.props.supply.warehouses[me.state.selectedStoreIndex];
        let boxes: Box[] = [];

        state.inputs.map(input => {
            boxes.push(new Box(input["length"], input["width"], input["height"], input["amount"]));
        });

        let phoneNumber = "8" + state.telInput.replaceAll("(", "").replaceAll(") ", "").replaceAll("-", "");
        departureDate = new Date(departureDate);
        acceptanceDate = new Date(acceptanceDate);
        let body = JSON.stringify({
            order: new Orders(state.nameText, new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate() + 1),
                new Date(acceptanceDate.getFullYear(), acceptanceDate.getMonth(), acceptanceDate.getDate() + 1),
                phoneNumber, selectedWarehouse.sendCity,
                state.selectedDepartureCity, selectedWarehouse.store, state.dataSupplyType.selectedRadioInput, volume,
                price, state.willTaken, state.payment, state.comment, state.ozonNumber, me.props.supply.title, me.props.order?.id,
                me.props.order?.orderDate, me.props.order?.status, me.props.order?.changeable),
            boxes: boxes
        });
        const cutoffDate = moment(this.props.supply.acceptanceDate, 'Europe/Samara')
            .subtract(1, 'days')
            .set({
                hour: 22,
                minute: 0,
                second: 0,
                millisecond: 0
            });

        const currentServerTime = moment().tz('Europe/Samara');

        if (currentServerTime.isAfter(cutoffDate) && this.props.order === undefined) {
            this.setState({telError: 'Нельзя отправить заявку после 22:00'})
            return;
        }
        if (me.props.supply.departureDate.toString() === '1970-01-01' || me.props.supply.departureDate.toString() === '1980-01-01'
            || me.props.supply.departureDate.toString() === '1990-01-01') {
            const cutoffDate = moment(this.props.supply.acceptanceDate, 'Europe/Samara')
                .subtract(1, 'days')
                .set({
                    hour: 22,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                });

            if (currentServerTime.isAfter(cutoffDate) && this.props.order === undefined) {
                this.setState({telError: 'Нельзя отправить заявку после 22:00'})
                return;
            }
        }
        fetch('https://kodrf.ru/new_order', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt"),

            },
            body: body
        }).then(function () {
            window.location.assign('https://ivlev-ff.ru/current_orders');
        })
    }

    handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let me = this;

        let phone = this.checkPhone();
        let name = this.checkName();

        let volume = 0;
        let wrong = false;
        let amount = 0;
        me.state.inputs.map(input => {
            let current = input["length"] * input["width"] * input["height"] * input["amount"];
            if (current === 0) {
                wrong = true;
                me.setState({inputsValid: false})
            }
            volume += current;
            amount += input["amount"];
        });

        if (!phone || !name) return;
        if (wrong) return;
        volume /= 1000000;
        const supply = me.props.supply;

        let pallet = me.state.dataSupplyType.selectedRadioInput === 'Монопаллет';

        fetch('https://kodrf.ru/api/calculator', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(new PriceRequest(me.state.selectedDepartureCity, supply.warehouses[me.state.selectedStoreIndex].store,
                supply.warehouses[me.state.selectedStoreIndex].sendCity, volume, me.state.willTaken, pallet, amount)
            ),
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    let answer = data["content"].split("/");
                    me.sendOrder(answer[0], answer[1]);
                })
        })

    }

    render() {
        let me = this;
        return (
            <div className="schedule_form">
                <form onSubmit={this.handleForm}>
                    <div className="modal_window_title">Заполните все необходимые поля</div>
                    <Form handleInput={this.handleNameInput}
                          error={me.state.nameValid ? "" : "Поле не может быть пустым"}
                          text={this.state.nameText} label="Юридическое лицо" name={""}
                          defaultValue={this.props.order?.entity}/>
                    <PhoneForm setTelInputToParent={this.setTelInputToParent} error={me.state.telError}
                               spanClass="popup_span_tel"
                               inputClass="popup_tel_input" defaultValue={this.state.telInput}/>

                    <div className="schedule_form_title">Размеры и количество коробок/паллет</div>
                    <div className="form_error" style={{
                        visibility: me.state.inputsValid ? "hidden" : "visible",
                        top: 155
                    }}>Коробки заполнены не корректно
                    </div>
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
                            <div className="price_radio_indicator" style={{borderColor: '#000000'}}></div>
                            {me.state.dataSupplyType.value3}
                        </label>
                    </div>

                    <div className="schedule_form_title">Склад</div>
                    <div style={{marginLeft: 13}}>
                        {me.props.supply.warehouses.map((value, index) => (
                            <label className="price_radio_label" key={index}>
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
                        <input type="text" onInput={me.handleOzonNumber} style={{
                            marginTop: 15, marginLeft: 13,
                            height: 25, width: 300
                        }} required={true} defaultValue={me.state.ozonNumber}/>
                      </div>
                    }

                    <div className="schedule_form_title">Город отправки</div>
                    <div style={{marginLeft: 13}}>
                        {me.props.supply.departureCities.map((value, index) => (
                            <label className="price_radio_label" key={index}>
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
                        <DatePicker selected={me.state.departureDate}
                                    onChange={(date) => me.setState({departureDate: date})}
                                    filterDate={me.isWeekday}
                                    minDate={moment().add(1, 'day').toDate()}
                                    dateFormat={"dd.MM.YYYY"}
                                    required={true}
                                    placeholderText="Выберите дату..."/>
                      </>
                    }
                    {(me.props.supply.departureDate.toString() === '1980-01-01'
                        || me.props.supply.departureDate.toString() === '1990-01-01') &&
                      <>
                        <div className="schedule_form_title">Дата отправки</div>
                        <DatePicker selected={me.state.departureDate}
                                    onChange={(date) => me.setState({departureDate: date})}
                                    filterDate={me.isWeekdayWithoutSunday}
                                    minDate={moment().add(1, 'day').toDate()}
                                    dateFormat={"dd.MM.YYYY"}
                                    required={true}
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

                    <div className="schedule_form_title">Способ оплаты</div>
                    <div style={{marginLeft: 13}}>
                        <label className="price_radio_label">
                            <input type="radio"
                                   name="payment"
                                   value={"Онлайн на сайте"}
                                   onChange={me.changeInputPayment}
                                   checked={me.state.payment}
                                   className="price_radio"/>
                            <div className="price_radio_indicator"></div>
                            Онлайн на сайте
                        </label>
                        <label className="price_radio_label">
                            <input type="radio"
                                   name="payment"
                                   value={"В офисе"}
                                   onChange={me.changeInputPayment}
                                   checked={!me.state.payment}
                                   className="price_radio"/>
                            <div className="price_radio_indicator"></div>
                            В офисе
                        </label>
                    </div>

                    <div className="schedule_form_title">Доп. комментарий</div>
                    <textarea className="schedule_comment"
                              placeholder="Укажите, откуда забрать товар или напишите иные комментарии"
                              onInput={this.handleComment} defaultValue={me.state.comment}
                              required={me.state.willTaken}/>

                    {this.props.order === undefined &&
                      <><input type="checkbox" id={"checkbox_" + me.props.supply.title + me.props.supply.acceptanceDate}
                               required={true}/><label
                        htmlFor={"checkbox_" + me.props.supply.title + me.props.supply.acceptanceDate}
                        className="custom-checkbox"></label><span style={{marginLeft: 9}}>Я согласен с&nbsp;
                        <Link to="/regulations" target="_blank">
                                    <span>условиями и положениями </span>
                                </Link>
                            </span>
                        <br/>
                        <input type="checkbox"
                               id={"checkbox_" + me.props.supply.title + me.props.supply.acceptanceDate + me.props.supply.departureDate}
                               required={true}/><label
                          htmlFor={"checkbox_" + me.props.supply.title + me.props.supply.acceptanceDate + me.props.supply.departureDate}
                          className="custom-checkbox"></label><span style={{marginLeft: 9}}>Я согласен с&nbsp;
                          <Link to="/oferta" target="_blank">
                                    <span>договором-офертой</span>
                                </Link>
                            </span></>
                    }

                    <button type="submit" className="schedule_form_button">Отправить</button>
                </form>

            </div>
        )
    }
}

export default ScheduleForm;