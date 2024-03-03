import React, {useState} from "react";
import "../styles/admin_page.css";
import SendCityAndStore from "../components/SendCityAndStore";
import DatePicker from "react-datepicker";
import {AdminRequest} from "../models/AdminRequest";
import {Orders} from "../models/Orders";


const AdminPage: React.FC = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [store, setStore] = useState("");
    const [sendCity, setSendCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [startDepartureDate, setStartDepartureDate] = useState<null | Date>(null)
    const [endDepartureDate, setEndDepartureDate] = useState<null | Date>(null)
    const [startOrderDate, setStartOrderDate] = useState<null | Date>(null)
    const [endOrderDate, setEndOrderDate] = useState<null | Date>(null);
    const [status, setStatus] = useState("");
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
                endDepartureDate, startOrderDate, endOrderDate, status))
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    setOrders(data);
                    console.log(data);
            })
        });
    }

    function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatus(e.target.value);
    }

    return (
        <div className="page_content">
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

                <button type="submit" className="change_password_button">Найти заказы</button>
            </form>

            <div></div>
        </div>
    )
}

export default AdminPage;