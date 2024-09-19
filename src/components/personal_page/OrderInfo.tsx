import React from "react";
import {Orders} from "../../models/Orders";

interface OrderInfoProps {
    order: Orders;
    orderPrice: string,
    openSecondPopup: any
}

const OrderInfo: React.FC<OrderInfoProps> = ({order, orderPrice, openSecondPopup}) => {
    function deleteOrder() {
        fetch("https://kodrfb.ru/delete_order", {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt"),

            },
            body: JSON.stringify(order)
        }).then(function () {
            window.location.assign('https://ivlev-ff.ru/current_orders');
        })
    }


    return (
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', flexFlow: 'column', overflow: 'scroll'}}>
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
                <strong>Дата
                    поставки: </strong> {order.departureDate === undefined ? "" : order.departureDate.toString()}
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
                <strong>Оплата на сайте: </strong> {order.paymentSite ? "Да" : "Нет"}
            </div>
            <div className="order_form">
                <strong>Комментарии: </strong> {order.comment}
            </div>
            <div className="order_form">
                <strong>Статус: </strong> {order.status}
            </div>
            <div className="order_form">
                <strong>Статус оплаты: </strong> {order.paymentStatus ? "Оплачен" : "Не оплачен"}
            </div>

            {order.paymentSite && !order.paymentStatus &&
              <form method='POST' action='https://ivlev-ff.server.paykeeper.ru/create/'>
                <input type='hidden' name='client_phone' value={order.phoneNumber}/>
                <input type='hidden' name='clientid' value={order.entity}/>
                <input type='hidden' name='orderid' value={order.id}/>
                <input type='hidden' name='sum' value={orderPrice} />
                <input type="hidden" name="user_result_callback" value={"https://ivlev-ff.ru/personal_account"}/>
                <input type='hidden' name='service_name'
                       value={'Заказ в ' + order.sendCity + " " + order.store + " от " + order.departureDate}/>
                <input type='submit' value='Оплатить онлайн' className="change_order"
                       style={{width: 150, cursor: "pointer"}}/>
              </form>
            }
            {order.changeable &&
              <>
                <button className="change_order" onClick={openSecondPopup} style={{marginTop: 10}}>Изменить</button>
                <button className="change_order" onClick={deleteOrder} style={{marginTop: 10}}>Удалить</button>
              </>
            }
        </div>
    )
}

export default OrderInfo;