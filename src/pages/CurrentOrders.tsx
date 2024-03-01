import React from "react";
import {Orders} from "../models/Orders";
import Popup from "../components/Popup";
import "../styles/order.css";

interface CurrentOrdersProps {
}

interface CurrentOrdersState {
    orders: Orders[];
    isPopupVisible: boolean[]
}

class CurrentOrders extends React.Component<CurrentOrdersProps, CurrentOrdersState> {
    constructor(props: CurrentOrdersProps) {
        super(props);
        this.state = {
            orders: [],
            isPopupVisible: []
        }
        this.setPopupFalse = this.setPopupFalse.bind(this);
        this.setPopupTrue = this.setPopupTrue.bind(this);

    }
    componentDidMount() {
        let me = this;

        fetch('http://localhost:8080/current_orders', {
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
                    console.log(data);
                }
        )})
        console.log(me.state.orders);
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
                {me.state.orders.map((order, index) => (
                    <>
                        <div className="order_description" onClick={() => this.setPopupTrue(index)}>
                            Заказ от {order.orderDate === undefined ? "" : order.orderDate.toString()} в {order.sendCity} ({order.store})
                        </div>
                        <Popup content="order" isVisible={me.state.isPopupVisible[index]} setVisibleFalse={() => me.setPopupFalse(index)}
                        order={order}/>
                    </>
                ))}
            </div>
        );
    }
}
export default CurrentOrders;