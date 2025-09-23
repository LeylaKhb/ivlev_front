import React from "react";
import {Orders} from "../../models/Orders";
import jsPDF from "jspdf";
import "../../static/Roboto-normal";
import "../../static/Roboto-bold";

interface OrderInfoProps {
    order: Orders;
    orderPrice: string,
    openSecondPopup: any
}

const OrderInfo: React.FC<OrderInfoProps> = ({order, orderPrice, openSecondPopup}) => {
    function formatDate(dateInput: Date | string): string {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    }

    const generatePdf = () => {
        if (!order.boxes?.length) return;

        // размеры в мм
        const labelWmm = 60;
        const labelHmm = 40;
        const borderMm = 3;

        const totalBoxes = order.boxes.reduce((sum, b) => sum + (b.amount ?? 0), 0);
        let counter = 1;

        // создаём ОДИН pdf
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [labelWmm + borderMm * 2, labelHmm + borderMm * 2],
        });

        for (let i = 0; i < order.boxes.length; i++) {
            const amount = order.boxes[i].amount ?? 0;

            for (let j = 1; j <= amount; j++) {
                if (counter > 1) {
                    // добавляем новую страницу
                    pdf.addPage([labelWmm + borderMm * 2, labelHmm + borderMm * 2], "landscape");
                }

                // серый фон (бордер)
                pdf.setFillColor(228, 228, 228);
                pdf.rect(0, 0, labelWmm + borderMm * 2, labelHmm + borderMm * 2, "F");

                // белая область (сама наклейка)
                pdf.setFillColor(255, 255, 255);
                pdf.roundedRect(borderMm, borderMm, labelWmm, labelHmm, 3, 3, "F");

                // текст
                pdf.setFont("Roboto", "normal");
                pdf.setFontSize(15);
                pdf.setTextColor(0, 0, 0);

                const linesRaw = [
                    { text: order.entity, bold: false },
                    { text: order.sendCity, bold: true },
                    {
                        text: order.departureDate === undefined ? "" : formatDate(order.departureDate),
                        bold: true,
                    },
                    { text: `Короб ${counter}/${totalBoxes}`, bold: false },
                ];

                const maxTextWidth = labelWmm - 4; // небольшой отступ слева/справа
                const wrappedLines = linesRaw.flatMap(lineObj => {
                    const chunks = pdf.splitTextToSize(lineObj.text, maxTextWidth);
                    return chunks.map((c: any) => ({ text: c, bold: lineObj.bold }));
                });

                const lineHeight = 6;
                let currentY =
                    borderMm +
                    (labelHmm - wrappedLines.length * lineHeight) / 2 +
                    4; // центрирование текста

                wrappedLines.forEach(({ text, bold }) => {
                    pdf.setFont("Roboto", bold ? "bold" : "normal");
                    pdf.text(text, labelWmm / 2 + borderMm, currentY, {
                        align: "center",
                    });
                    currentY += lineHeight;
                });

                counter++;
            }
        }

        // сохраняем один PDF
        pdf.save(`${order.sendCity}_${formatDate(order.departureDate)}.pdf`);
    };

    return (
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', flexFlow: 'column', marginBottom: 100}}>
            <div className="order_form">
                <strong>Дата заказа: </strong> {order.orderDate === undefined ? "" : formatDate(order.orderDate)}
            </div>
            <div className="order_form">
                <strong>Юридическое лицо:</strong> {order.entity} ({order.inn})
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
                    поставки: </strong> {order.departureDate === undefined ? "" : formatDate(order.departureDate)}
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
                <input type='hidden' name='client_phone' value={order.phoneNumber.replace(/^8/, "7")}/>
                <input type='hidden' name='client_email' value={order.person?.email}/>
                <input type='hidden' name='clientid' value={order.entity}/>
                <input type='hidden' name='orderid' value={order.id}/>
                <input type='hidden' name='sum' value={orderPrice}/>
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
              </>
            }
            <button className="change_order" onClick={generatePdf} style={{marginTop: 10, width: 150}}>Скачать этикетки</button>
        </div>
    )
}

export default OrderInfo;