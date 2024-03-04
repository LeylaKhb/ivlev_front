import React, {useState} from "react";
import "../styles/admin_page.css";
import SendCityAndStore from "../components/SendCityAndStore";
import DatePicker from "react-datepicker";
import {AdminRequest} from "../models/AdminRequest";
import {Orders} from "../models/Orders";


const AdminPage: React.FC = () => {
    const [departureCity, setDepartureCity] = useState("Самара");
    const [store, setStore] = useState("Wildberries");
    const [sendCity, setSendCity] = useState("Казань");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [startDepartureDate, setStartDepartureDate] = useState<null | Date>(null)
    const [endDepartureDate, setEndDepartureDate] = useState<null | Date>(null)
    const [startOrderDate, setStartOrderDate] = useState<null | Date>(null)
    const [endOrderDate, setEndOrderDate] = useState<null | Date>(null);
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [orders, setOrders] = useState<Array<Orders> | null>(null);



    function handleDepartureCity(city: string) {
        setDepartureCity(city);
    }
    function handleStore(store: string) {
        setStore(store);
    }
    function handleSendCity(city: string) {
        setSendCity(city);
    }

    function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value);
    }

    function handleForm(event: React.FormEvent) {
        event.preventDefault();

        fetch('http://localhost:8080/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(new AdminRequest(departureCity, store, sendCity, phoneNumber, startDepartureDate,
                endDepartureDate, startOrderDate, endOrderDate, status, sortBy))
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    setOrders(data);
            })
        });
    }

    function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatus(e.target.value);
    }

    function changeSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
        setSortBy(e.target.value);
    }

    return (
        <div className="page_content" style={{ flexFlow: 'column'}}>
            <form className="admin_form" onSubmit={handleForm}>
                <SendCityAndStore  handleSendCity={handleSendCity} handleDepartureCity={handleDepartureCity}
                                   handleStore={handleStore} location="admin"/>

                <div className="admin_title">Номер телефона</div>
                <input type="text" onInput={handlePhone}/>

                <div className="admin_title">От даты доставки</div>
                <DatePicker selected={startDepartureDate}
                            onChange={(date) => setStartDepartureDate(date)}
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">До даты доставки</div>
                <DatePicker selected={endDepartureDate}
                            onChange={(date) => setEndDepartureDate(date)}
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">От даты заказа</div>
                <DatePicker selected={startOrderDate}
                            onChange={(date) => setStartOrderDate(date)}
                            dateFormat={"dd.MM.YYYY"}/>

                <div className="admin_title">До даты заказа</div>
                <DatePicker selected={endOrderDate}
                            onChange={(date) => setEndOrderDate(date)}
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
                    <option value="send_city">Город отправки</option>
                    <option value="store">Склад</option>
                    <option value="departure_city">Город назначения</option>
                    <option value="phone_number">Номер телефона</option>
                    <option value="departure_date">Дата доставки</option>
                    <option value="order_date">Дата заказа</option>
                    <option value="status">Статус</option>
                </select>

                <button type="submit" className="change_password_button" style={{marginBottom: 100}}>Найти заказы</button>
            </form>

            <button >Изменить выбранные заказы</button>

            <div style={{width: '100%'}} className="admin_table">
                <table style={{width: '100%'}} className="admin_table">
                    <tr>
                        <th style={{width: '5%'}}>Галочка</th>
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
                        <th style={{width: '10%'}}>Статус</th>
                        <th style={{width: '5%'}}>Изменяемый</th>
                    </tr>
                    {orders?.map((order) => (

                        <tr style={{ width: '100%'}}>
                            <td>f</td>
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
                            <td style={{width: '10%'}}>{order.status}</td>
                            <td style={{width: '5%'}}>{order.changeable ? "Да" : "Нет"}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default AdminPage;