import React from "react";
import { Orders } from "../models/Orders";
import Popup from "../components/Popup";
import "../styles/personal_page/order.css";
import { Supply } from "../models/Supply";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import OrdersTable from "../components/OrdersTable";

interface CurrentOrdersProps {
}

interface CurrentOrdersState {
    orders: Orders[];
    isFirstPopupVisible: Record<number, boolean>;
    isSecondPopupVisible: Record<number, boolean>;
    supply: Supply | null;
    companies: string[];
    loading: boolean;
}

class CurrentOrders extends React.Component<CurrentOrdersProps, CurrentOrdersState> {
    constructor(props: CurrentOrdersProps) {
        super(props);
        this.state = {
            orders: [],
            isFirstPopupVisible: [],
            isSecondPopupVisible: [],
            supply: null,
            companies: [],
            loading: true,

        }
        this.setFirstPopupFalse = this.setFirstPopupFalse.bind(this);
        this.setFirstPopupTrue = this.setFirstPopupTrue.bind(this);
        this.setSecondPopupFalse = this.setSecondPopupFalse.bind(this);
        this.setSecondPopupTrue = this.setSecondPopupTrue.bind(this);

    }

    componentDidMount() {
        let me = this;

        fetch('https://kodrf.ru/current_orders', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                        me.setState({
                            orders: data,
                            loading: false,
                        });
                    }
                )
        });

        fetch('https://kodrf.ru/api/companies', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    console.log(data)
                    me.setState({companies: data})
                })
        });
    }

    setFirstPopupTrue(id: number) {
        console.log(id)
        this.setState(prev => ({
            isFirstPopupVisible: {...prev.isFirstPopupVisible, [id]: true}
        }));
        document.body.style.overflow = "hidden";
    }

    setFirstPopupFalse(id: number) {
        this.setState(prev => ({
            isFirstPopupVisible: {...prev.isFirstPopupVisible, [id]: false}
        }));
        document.body.style.overflow = "scroll";
    }

    setSecondPopupTrue(id: number) {
        this.setState(prev => ({
            isSecondPopupVisible: {...prev.isSecondPopupVisible, [id]: true},
            isFirstPopupVisible: {...prev.isFirstPopupVisible, [id]: false},
        }));
        document.body.style.overflow = "hidden";
    }

    setSecondPopupFalse(id: number) {
        this.setState(prev => ({
            isSecondPopupVisible: {...prev.isSecondPopupVisible, [id]: false}
        }));
        document.body.style.overflow = "scroll";
    }

    render() {
        let me = this;
        return (
            <div style={{height: '90vh', paddingTop: 120, overflow: "scroll"}}>
                <HelmetProvider>
                    <Helmet
                        title="Текущие заказы"
                    />
                </HelmetProvider>

                <OrdersTable
                    data={this.state.orders}
                    loading={this.state.loading}
                    onEyeClick={(id) => this.setFirstPopupTrue(id)}
                    isCurrent={true}
                />
                {me.state.orders.map((order) => (
                    <div key={order.id}>
                        <Popup
                            content="order"
                            isVisible={order.id !== undefined ? this.state.isFirstPopupVisible[order.id] : false}
                            setVisibleFalse={() => order.id !== undefined && this.setFirstPopupFalse(order.id)}
                            openSecondPopup={() => order.id !== undefined && this.setSecondPopupTrue(order.id)}
                            order={order}
                        />
                        <Popup
                            content="schedule_form"
                            isVisible={order.id !== undefined ? this.state.isSecondPopupVisible[order.id] : false}
                            setVisibleFalse={() => order.id !== undefined && this.setSecondPopupFalse(order.id)}
                            order={order}
                            companies={this.state.companies}
                        />
                    </div>
                ))}

            </div>
        );
    }
}

export default CurrentOrders;