import React, {useState, useEffect} from "react";
import {Orders} from "../models/Orders";
import "../styles/orders-table.css";
import {ExportCSV} from "./admin/ExportCSV";

interface MyTableProps {
    data: Orders[];
    loading: boolean;
    onEyeClick: (index: number) => void;
    isCurrent: boolean;
}

const OrdersTable: React.FC<MyTableProps> = ({data, loading, onEyeClick, isCurrent}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortColumn, setSortColumn] = useState<string>("departureDate");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    function handleSort(column: string) {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    }

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function formatDate(dateInput: Date | string): string {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    }

    function getStatusClass(status: string | undefined) {
        switch (status) {
            case "Ожидает на ФФ":
                return "status-pending-ff";
            case "Ожидает оплаты":
                return "status-pending-payment";
            case "Доставка на склад":
                return "status-delivery";
            case "Доставлен":
                return "status-delivered";
            default:
                return "status-default";
        }
    }

    function deleteOrder(order: Orders) {
        fetch("https://kodrf.ru/delete_order", {
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

    const filteredData = statusFilter === "all"
        ? data
        : data.filter(order => order.status === statusFilter);

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;

        let valA: any = (a as any)[sortColumn];
        let valB: any = (b as any)[sortColumn];

        if (sortColumn === "price") {
            valA = Number(String(valA).replace(/\s+/g, ""));
            valB = Number(String(valB).replace(/\s+/g, ""));
        }
        if (sortColumn === "acceptanceDate" || sortColumn === "departureDate") {
            valA = new Date(valA).getTime();
            valB = new Date(valB).getTime();
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    if (loading) {
        return (
            <div className="spinner-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="no-orders-container">
                <div className="no-orders-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 21H3V3h18v18z"></path>
                        <line x1="3" y1="3" x2="21" y2="21"></line>
                    </svg>
                </div>
                <h3 className="no-orders-text">
                    {isCurrent ? "Нет текущих заказов" : "У вас нет заказов в истории"}
                </h3>
            </div>
        );
    }

    return (
        <div>
            {isCurrent &&
              <div className="status-filter">
                <label htmlFor="statusSelect">Фильтр по статусу:</label>
                <div className="custom-select-wrapper full-width">
                  <select
                    id="statusSelect"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="custom-select"
                  >
                    <option value="all">Все</option>
                    <option value="Ожидает на ФФ">Ожидает на ФФ</option>
                    <option value="Ожидает оплаты">Ожидает оплаты</option>
                    <option value="Доставка на склад">Доставка на склад</option>
                  </select>
                  <span className="custom-arrow"></span>
                </div>
              </div>}

            {!isCurrent &&
              <div style={{display: "flex", justifyContent: "center"}}>
                <ExportCSV csvData={data} fileName="orders"/>
              </div>
            }

            {isMobile ? (
                <div className="mobile-table-wrapper">
                    {filteredData.map((order, i) => (
                        <div key={i} className="mobile-card">
                            <div className="mobile-card-header">
                                <div className="mobile-card-title">{order.entity}</div>
                                <div className={`mobile-badge ${getStatusClass(order.status)}`}>
                                    {order.status || "-"}
                                </div>
                            </div>

                            <div className="mobile-card-row">
                                <span>Приемный день</span>
                                <span>{formatDate(order.acceptanceDate)}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>Дата доставки</span>
                                <span>{formatDate(order.departureDate)}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>МП / Склад</span>
                                <span>{order.store} / {order.sendCity}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>Объем, м³</span>
                                <span>{order.volume}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>Забор груза</span>
                                <span>{order.willTaken ? "Да" : "Нет"}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>Стоимость</span>
                                <span>{order.price}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>Способ оплаты</span>
                                <span>{order.paymentSite ? "онлайн" : "оффлайн"}</span>
                            </div>

                            <div className="mobile-card-row">
                                <span>Статус оплаты</span>
                                <span>{order.paymentStatus ? "Оплачено ✅" : "Не оплачено"}</span>
                            </div>

                            <div className="mobile-card-actions">
                                <button className="mobile-action-btn mobile-eye-btn"
                                        onClick={() => onEyeClick(order.id!)}>
                                    Просмотр
                                </button>
                                {order.changeable && <button onClick={() => deleteOrder(order)}
                                                             className="mobile-action-btn mobile-delete-btn">
                                  Удалить
                                </button>}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="table-full orders-table">
                        <thead>
                        <tr>
                            {[
                                {key: "entity", label: "ИП / ООО / Самозанятый"},
                                {key: "acceptanceDate", label: "Приемный день"},
                                {key: "departureDate", label: "Дата доставки"},
                                {key: "store", label: "МП"},
                                {key: "sendCity", label: "Склад"},
                                {key: "volume", label: "Объем, м³"},
                                {key: "willTaken", label: "Забор груза"},
                                {key: "price", label: "Стоимость"},
                                {key: "paymentSite", label: "Способ оплаты"},
                                {key: "paymentStatus", label: "Статус оплаты"},
                                {key: "status", label: "Статус доставки"},
                            ].map(col => {
                                const isActive = sortColumn === col.key;
                                return (
                                    <th key={col.key} onClick={() => handleSort(col.key)}>
                                        {col.label}{" "}
                                        <br/>
                                        <span
                                            style={{
                                                color: isActive && sortDirection === "asc" ? "black" : "#ccc",
                                                fontSize: 15, padding: 0,
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >▲</span>
                                        <span
                                            style={{
                                                color: isActive && sortDirection === "desc" ? "black" : "#ccc",
                                                fontSize: 15, padding: 0,
                                                fontFamily: "Arial, sans-serif",
                                            }}
                                        >▼</span>
                                    </th>
                                );
                            })}
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((order) => (
                            <tr key={order.id}>
                                <td>{order.entity}</td>
                                <td>{formatDate(order.acceptanceDate)}</td>
                                <td>{formatDate(order.departureDate)}</td>
                                <td>{order.store}</td>
                                <td>{order.sendCity}</td>
                                <td>{order.volume}</td>
                                <td>{order.willTaken ? "Да" : "Нет"}</td>
                                <td>{order.price}</td>
                                <td>{order.paymentSite ? "онлайн" : "оффлайн"}</td>
                                <td>{order.paymentStatus ? "Оплачено ✅" : "Не оплачено"}</td>
                                <td className="status-cell">
                                        <span className={`badge ${getStatusClass(order.status)}`}>
                                            {order.status || "-"}
                                        </span>
                                </td>
                                <td className="actions-cell">
                                    <button type="button" className="action-btn eye-btn"
                                            onClick={() => onEyeClick(order.id!)}
                                            title="Просмотр">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 24 24"
                                             pointerEvents="none"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                    {order.changeable &&
                                      <button type="button" onClick={() => deleteOrder(order)}
                                              className="action-btn delete-btn" title="Удалить">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             pointerEvents="none"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                          <polyline points="3 6 5 6 21 6"></polyline>
                                          <path
                                            d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5-3h4a2 2 0 0 1 2 2v0H8v0a2 2 0 0 1 2-2z"></path>
                                        </svg>
                                      </button>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
