import React from "react";
import {Orders} from "../models/Orders";

interface OrderInfoProps {
    order: Orders;
    openSecondPopup: any
}

const OrderInfo: React.FC<OrderInfoProps> = ({order, openSecondPopup}) => {
    return (
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', flexFlow: 'column'}}>
            <div className="order_form">
                <strong>Дата заказа: </strong> {order.orderDate === undefined ? "" : order.orderDate.toString()}
            </div>
            <div className="order_form">
                <strong>Юридическое лицо:</strong> {order.entity}
            </div>
            <div className="order_form">
                <strong>Номер телефона: </strong> {order.phoneNumber}
            </div>
            <div className="order_form">
                <strong>Склад назначения: </strong> {order.sendCity} ({order.store})
            </div>
            {order.store === "Ozon" &&
                <div className="order_form">
                    <strong>Номер поставки (Ozon): </strong> {order.numberOzon}
                </div>
            }
            <div className="order_form">
                <strong>Дата поставки: </strong> {order.departureDate === undefined ? "" : order.departureDate.toString()}
            </div>
            <div className="order_form">
                <strong>Город отправки: </strong> {order.departureCity}
            </div>
            <div className="order_form">
                <strong>Тип отправки: </strong> {order.supplyType}
            </div>
            <div className="order_form">
                <strong>Коробки: </strong> {order.boxes?.map((box, index) => (
                <div style={{marginBottom: 3}} key={index}>{box.length}/{box.width}/{box.height} - {box.amount}</div>
            ))}
            </div>
            <div className="order_form">
                <strong>Объем: </strong> {order.volume}
            </div>
            <div className="order_form">
                <strong>Цена: </strong> {order.price}
            </div>
            <div className="order_form">
                <strong>Забор со склада: </strong> {order.willTaken ? "Да" : "Нет"}
            </div>
            <div className="order_form">
                <strong>Комментарии: </strong> {order.comment}
            </div>
            <div className="order_form">
                <strong>Статус: </strong> {order.status}
            </div>

            {order.changeable &&
                <button className="change_order" onClick={openSecondPopup}>Изменить</button> }
        </div>
    )
}

export default OrderInfo;