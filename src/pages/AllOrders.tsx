import React from "react";
import {Orders} from "../models/Orders";
import Popup from "../components/Popup";
import "../styles/order.css";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";

interface AllOrdersProps {
}

interface AllOrdersState {
    orders: Orders[];
    isPopupVisible: boolean[];
}

class AllOrders extends React.Component<AllOrdersProps, AllOrdersState> {
    constructor(props: AllOrdersProps) {
        super(props);
        this.state = {
            orders: [],
            isPopupVisible: [],

        }
        this.setPopupFalse = this.setPopupFalse.bind(this);
        this.setPopupTrue = this.setPopupTrue.bind(this);

    }
    componentDidMount() {
        let me = this;

        fetch('http://178.21.8.74:8080/orders_history', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function(resp) {
            resp.json()
                .then(function (data) {
                        me.setState({
                            orders: data
                        });
                    }
                )})
    }

    setPopupTrue(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isPopupVisible);
        copy[index] = true;
        this.setState({isPopupVisible: copy});
        document.body.style.overflow = "hidden";
    }
    setPopupFalse(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isPopupVisible);
        copy[index] = false;
        this.setState({isPopupVisible: copy});
        document.body.style.overflow = "scroll";
    }

    render() {
        let me = this;
        return (
            <div style={{height: '90vh', paddingTop: 120}}>
                <HelmetProvider>
                    <Helmet
                        title="Все заказы"
                    />
                </HelmetProvider>
                {me.state.orders.map((order, index) => (
                    <div key={index}>
                        <div className="order_description" onClick={() => this.setPopupTrue(index)}>
                            Заказ в {order.sendCity} ({order.store}), {order.departureDate === undefined ?
                            "" : order.departureDate.toString()}, {order.price}
                        </div>
                        <Popup content="order" isVisible={me.state.isPopupVisible[index]}
                               setVisibleFalse={() => me.setPopupFalse(index)} order={order}/>
                    </div>
                ))}
            </div>
        );
    }
}
export default AllOrders;