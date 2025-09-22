import React from "react";
import {Orders} from "../models/Orders";
import Popup from "../components/Popup";
import "../styles/personal_page/order.css";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";
import OrdersTable from "../components/OrdersTable";

interface AllOrdersProps {
}

interface AllOrdersState {
    orders: Orders[];
    isPopupVisible: Record<number, boolean>;
    loading: boolean;
}

class AllOrders extends React.Component<AllOrdersProps, AllOrdersState> {
    constructor(props: AllOrdersProps) {
        super(props);
        this.state = {
            orders: [],
            isPopupVisible: [],
            loading: true,
        };
        this.setPopupFalse = this.setPopupFalse.bind(this);
        this.setPopupTrue = this.setPopupTrue.bind(this);
    }

    componentDidMount() {
        fetch("https://kodrf.ru/orders_history", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    orders: data,
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({loading: false});
            });
    }

    setPopupTrue(id: number) {
        this.setState(prev => ({
            isPopupVisible: {...prev.isPopupVisible, [id]: true}
        }));
        document.body.style.overflow = "hidden";
    }

    setPopupFalse(id: number) {
        this.setState(prev => ({
            isPopupVisible: {...prev.isPopupVisible, [id]: false}
        }));
        document.body.style.overflow = "scroll";
    }

    render() {
        return (
            <div style={{height: "90vh", paddingTop: 100, overflow: "scroll"}}>
                <HelmetProvider>
                    <Helmet title="Все заказы"/>
                </HelmetProvider>

                <OrdersTable
                    data={this.state.orders}
                    loading={this.state.loading}
                    onEyeClick={(index) => this.setPopupTrue(index)}
                    isCurrent={false}/>
                {this.state.orders.map((order, index) => (
                    <div key={index}>
                        <Popup
                            content="order"
                            isVisible={this.state.isPopupVisible[index]}
                            setVisibleFalse={() => this.setPopupFalse(index)}
                            order={order}
                        />
                    </div>
                ))}
                {this.state.orders.map((order) => (
                    <div key={order.id}>
                        <Popup
                            content="order"
                            isVisible={order.id !== undefined ? this.state.isPopupVisible[order.id] : false}
                            setVisibleFalse={() => order.id !== undefined && this.setPopupFalse(order.id)}
                            order={order}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default AllOrders;
