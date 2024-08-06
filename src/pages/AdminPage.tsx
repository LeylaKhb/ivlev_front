import React, {useState} from "react";
import "../styles/admin/admin_page.css";
import SendCityAndStore from "../components/forms/SendCityAndStore";
import DatePicker from "react-datepicker";
import {AdminRequest} from "../models/AdminRequest";
import {Orders} from "../models/Orders";
import Popup from "../components/Popup";
import { ExportCSV } from "../components/admin/ExportCSV";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";


const AdminPage: React.FC = () => {
    const [departureCity, setDepartureCity] = useState("Самара");
    const [store, setStore] = useState("Wildberries");
    const [sendCity, setSendCity] = useState("Казань");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [entity, setEntity] = useState("");
    const [startDepartureDate, setStartDepartureDate] = useState<null | Date>(null)
    const [endDepartureDate, setEndDepartureDate] = useState<null | Date>(null)
    const [startOrderDate, setStartOrderDate] = useState<null | Date>(null)
    const [endOrderDate, setEndOrderDate] = useState<null | Date>(null);
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [orders, setOrders] = useState<Array<Orders>>([]);
    const [ordersIndexes, setOrdersIndexes] = useState<Array<number>>([]);


    const [isPopupVisible, setIsPopupVisible] = useState(false);
    function setPopupTrue() {
        setIsPopupVisible(true);
        document.body.style.overflow = "hidden";
    }
    function setPopupFalse() {
        setIsPopupVisible(false);
        document.body.style.overflow = "scroll";
        fetchAdmin();
    }

    function handleDepartureCity(city: string) {
        setDepartureCity(city);
    }
    function handleStore(store: string) {
        setStore(store);
        if (store === "") setSendCity("");
    }
    function handleSendCity(city: string) {
        setSendCity(city);
    }

    function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value);
    }
    function handleEntity(e: React.ChangeEvent<HTMLInputElement>) {
        setEntity(e.target.value);
    }

    function fetchAdmin() {
        startDepartureDate?.setDate(startDepartureDate?.getDate() + 1)
        endDepartureDate?.setDate(endDepartureDate?.getDate() + 1)
        startOrderDate?.setDate(startOrderDate?.getDate() + 1)
        endOrderDate?.setDate(endOrderDate?.getDate() + 1)
        let body = JSON.stringify(new AdminRequest(departureCity, store, sendCity, phoneNumber, entity, startDepartureDate,
            endDepartureDate, startOrderDate, endOrderDate, status, sortBy));
        fetch('https://kodrfb.ru/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    setOrders(data);
                    startDepartureDate?.setDate(startDepartureDate?.getDate() - 1)
                    endDepartureDate?.setDate(endDepartureDate?.getDate() - 1)
                    startOrderDate?.setDate(startOrderDate?.getDate() - 1)
                    endOrderDate?.setDate(endOrderDate?.getDate() - 1)
                })
        });
    }

    function handleForm(event: React.FormEvent) {
        event.preventDefault();
        fetchAdmin();
    }

    function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatus(e.target.value);
    }

    function changeSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
        setSortBy(e.target.value);
    }

    function handleCheckbox(index: number, e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.checked) {
            let copy = Object.assign([], ordersIndexes);
            copy.push(index)
            setOrdersIndexes(copy);
        } else {
            let copy = Object.assign([], ordersIndexes);
            copy.splice(copy.indexOf(index), 1);
            setOrdersIndexes(copy);
        }
    }

    function setAllIndexes() {
        let allIndexes: number[] = [];
        orders.forEach((o, index) => allIndexes.push(index))
        setOrdersIndexes(allIndexes);
    }

    function setNoneIndexes() {
        setOrdersIndexes([]);
    }

    return (
        <div className="page_content" style={{ flexFlow: 'column'}}>
            <HelmetProvider>
                <Helmet
                    title="Админка"
                />
            </HelmetProvider>
            <Popup isVisible={isPopupVisible} setVisibleFalse={setPopupFalse} content="admin"
                   orders={ordersIndexes.map(ind => orders[ind])}/>
            <form className="admin_form" onSubmit={handleForm}>
                <SendCityAndStore  handleSendCity={handleSendCity} handleDepartureCity={handleDepartureCity}
                                   handleStore={handleStore} location="admin"/>

                <div className="admin_title">Номер телефона</div>
                <input type="text" onInput={handlePhone}/>

                <div className="admin_title">Имя</div>
                <input type="text" onInput={handleEntity}/>

                <div className="admin_title">От даты доставки</div>
                <DatePicker selected={startDepartureDate}
                            onChange={(date: Date) => {
                                setStartDepartureDate(date)}
                            }
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">До даты доставки</div>
                <DatePicker selected={endDepartureDate}
                            onChange={(date: Date) => {
                                setEndDepartureDate(date)}
                            }
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">От даты заказа</div>
                <DatePicker selected={startOrderDate}
                            onChange={(date: Date) => {
                                setStartOrderDate(date)}
                            }
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">До даты заказа</div>
                <DatePicker selected={endOrderDate}
                            onChange={(date: Date) => {
                                setEndOrderDate(date)}
                            }
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">Статус</div>
                <select value={status} onChange={changeStatus} className="select_admin">
                    <option value="">Без фильтра</option>
                    <option value="Не оплачен">Не оплачен</option>
                    <option value="Доставка на склад">Доставка на склад</option>
                    <option value="Доставлен">Доставлен</option>
                    <option value="Ожидает отправки">Ожидает отправки</option>
                </select>

                <div className="admin_title">Сортировать по: </div>
                <select value={sortBy} onChange={changeSortBy} className="select_admin">
                    <option value="">Без сортировки</option>
                    <option value="departure_city">Город отправки</option>
                    <option value="store">Склад</option>
                    <option value="send_city">Город назначения</option>
                    <option value="phone_number">Номер телефона</option>
                    <option value="departure_date">Дата доставки</option>
                    <option value="order_date">Дата заказа</option>
                    <option value="status">Статус</option>
                </select>

                <button type="submit" className="change_password_button" style={{marginBottom: 50}}>Найти заказы</button>
            </form>
            <div>
                <button  className="registration_button" onClick={setAllIndexes}>Выбрать все заказы</button>
                <button  className="registration_button" onClick={setNoneIndexes}>Снять выделение</button>
            </div>

            <button  className="login_button" onClick={setPopupTrue} style={{marginTop: 20}}>Изменить выбранные заказы</button>
            <ExportCSV csvData={orders} fileName="orders" />
            <div style={{width: '100%'}} className="admin_table">
                <table style={{width: '100%'}} className="admin_table">
                    <thead>
                    <tr>
                        <th style={{width: '3%'}}>Галочка</th>
                        <th style={{width: '10%'}}>Дата<br /> заказа</th>
                        <th style={{width: '10%'}}>Дата<br/> поставки</th>
                        <th style={{width: '10%'}}>Город <br />отправки</th>
                        <th style={{width: '10%'}}>Город назначения</th>
                        <th style={{width: '10%'}}>Склад</th>
                        <th style={{width: '10%'}}>Номер телефона</th>
                        <th style={{width: '10%'}}>Имя</th>
                        <th style={{width: '10%'}}>Тип поставки</th>
                        <th style={{width: '5%'}}>Объем</th>
                        <th style={{width: '5%'}}>Цена</th>
                        <th style={{width: '5%'}}>Забор</th>
                        <th style={{width: '5%'}}>Где оплата</th>
                        <th style={{width: '5%'}}>Оплачен</th>
                        <th style={{width: '10%'}}>Статус</th>
                        <th style={{width: '5%'}}>Изменяемый</th>
                    </tr>
                    </thead>
                    {orders?.map((order, index) => (
                        <tbody key={index}>
                        <tr style={{ width: '100%'}}>
                            <td style={{width: '3%'}}>
                                <input
                                    type="checkbox"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckbox(index, e)}
                                    checked={ordersIndexes.includes(index)}/>
                            </td>
                            <td style={{width: '10%'}}>{order.orderDate !== undefined ? order.orderDate.toString() : ""}</td>
                            <td style={{width: '10%'}}>{order.departureDate !== undefined ? order.departureDate.toString() : ""}</td>
                            <td style={{width: '10%'}}>{order.departureCity}</td>
                            <td style={{width: '10%'}}>{order.sendCity}</td>
                            <td style={{width: '10%'}}>{order.store}</td>
                            <td style={{width: '10%'}}>{order.phoneNumber}</td>
                            <td style={{width: '10%'}}>{order.entity}</td>
                            <td style={{width: '10%'}}>{order.supplyType}</td>
                            <td style={{width: '5%'}}>{order.volume}</td>
                            <td style={{width: '5%'}}>{order.price}</td>
                            <td style={{width: '5%'}}>{order.willTaken ? "Да" : "Нет"}</td>
                            <td style={{width: '5%'}}>{order.paymentSite ? "Онлайн" : "Оффлайн"}</td>
                            <td style={{width: '5%'}}>{order.paymentStatus ? "Да" : "Нет"}</td>
                            <td style={{width: '10%'}}>{order.status}</td>
                            <td style={{width: '5%'}}>{order.changeable ? "Да" : "Нет"}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default AdminPage;