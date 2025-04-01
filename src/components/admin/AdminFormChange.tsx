import React, {useState} from "react";
import {Orders} from "../../models/Orders";

interface AdminFormChangeProps {
    orders: Orders[],
    close: any
}

const AdminFormChange: React.FC<AdminFormChangeProps> = ({orders, close}) => {
    const [status, setStatus] = useState("Доставка на склад");
    const [paymentStatus, setPaymentStatus] = useState("no");
    const [changeable, setChangeable] = useState("yes");
    const [paymentSite, setPaymentSite] = useState("yes");


    function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatus(e.target.value);
    }

    function changePaymentStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        setPaymentStatus(e.target.value);
    }

    function changePaymentSite(e: React.ChangeEvent<HTMLSelectElement>) {
        setPaymentSite(e.target.value);
    }

    function changeChangeable(e: React.ChangeEvent<HTMLSelectElement>) {
        setChangeable(e.target.value);
    }

    function handleForm(event: React.FormEvent) {
        event.preventDefault();
        let body = JSON.stringify({
            orders: orders,
            status: status,
            changeable: changeable,
            paymentStatus: paymentStatus,
            paymentSite: paymentSite
        });

        fetch('https://kodrf.ru/api/admin_change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body
        }).then(function () {
                close()
            }
        )
    }

    return (
        <form onSubmit={handleForm}>
            <div className="admin_title">Изменить статус</div>
            <select value={status} onChange={changeStatus} className="select_admin">
                <option value="Доставка на склад">Доставка на склад</option>
                <option value="Доставлен">Доставлен</option>
                <option value="Отправлен">Отправлен</option>
                <option value=""></option>
            </select>

            <div className="admin_title">Изменяемый</div>
            <select value={changeable} onChange={changeChangeable} className="select_admin">
                <option value="yes">Да</option>
                <option value="no">Нет</option>
                <option value=""></option>
            </select>

            <div className="admin_title">Статус оплаты</div>
            <select value={paymentStatus} onChange={changePaymentStatus} className="select_admin">
                <option value="yes">Оплачен</option>
                <option value="no">Не оплачен</option>
                <option value=""></option>
            </select>

            <div className="admin_title">Способ оплаты</div>
            <select value={paymentSite} onChange={changePaymentSite} className="select_admin">
                <option value="yes">Онлайн</option>
                <option value="no">Оффлайн</option>
                <option value=""></option>
            </select>

            <button type="submit" className="change_password_button" style={{marginBottom: 100}}>Изменить заказы
            </button>

        </form>
    )
}

export default AdminFormChange;