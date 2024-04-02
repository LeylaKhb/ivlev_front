import React from "react";
import {Orders} from "../models/Orders";
import Popup from "../components/Popup";
import "../styles/order.css";
import {Supply} from "../models/Supply";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";

interface CurrentOrdersProps {
}

interface CurrentOrdersState {
    orders: Orders[];
    isFirstPopupVisible: boolean[];
    isSecondPopupVisible: boolean[];
    supply: Supply | null;
}

class CurrentOrders extends React.Component<CurrentOrdersProps, CurrentOrdersState> {
    constructor(props: CurrentOrdersProps) {
        super(props);
        this.state = {
            orders: [],
            isFirstPopupVisible: [],
            isSecondPopupVisible: [],
            supply: null

        }
        this.setFirstPopupFalse = this.setFirstPopupFalse.bind(this);
        this.setFirstPopupTrue = this.setFirstPopupTrue.bind(this);
        this.setSecondPopupFalse = this.setSecondPopupFalse.bind(this);
        this.setSecondPopupTrue = this.setSecondPopupTrue.bind(this);

    }
    componentDidMount() {
        let me = this;

        fetch('https://kodrfb.ru/current_orders', {
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

    setFirstPopupTrue(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isFirstPopupVisible);
        copy[index] = true;
        this.setState({isFirstPopupVisible: copy});
        document.body.style.overflow = "hidden";
    }
    setFirstPopupFalse(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isFirstPopupVisible);
        copy[index] = false;
        this.setState({isFirstPopupVisible: copy});
        document.body.style.overflow = "scroll";
    }
    setSecondPopupTrue(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isSecondPopupVisible);
        copy[index] = true;
        let secondCopy = Object.assign([] as boolean[], this.state.isFirstPopupVisible);
        secondCopy[index] = false;
        this.setState({isSecondPopupVisible: copy, isFirstPopupVisible: secondCopy});
        document.body.style.overflow = "hidden";
    }
    setSecondPopupFalse(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isSecondPopupVisible);
        copy[index] = false;
        this.setState({isSecondPopupVisible: copy});
        document.body.style.overflow = "scroll";
    }

    render() {
        let me = this;
        return (
            <div style={{height: '90vh', paddingTop: 120}}>
                <HelmetProvider>
                    <Helmet
                        title="Текущие заказы"
                    />
                </HelmetProvider>
                {me.state.orders.map((order, index) => (
                    <div key={index}>
                        <div className="order_description" onClick={() => this.setFirstPopupTrue(index)}>
                            Заказ в {order.sendCity} ({order.store}), {order.departureDate === undefined ?
                            "" : order.departureDate.toString()}, {order.price}
                        </div>
                        <Popup content="order" isVisible={me.state.isFirstPopupVisible[index]}
                               setVisibleFalse={() => me.setFirstPopupFalse(index)} order={order}
                               openSecondPopup={() => this.setSecondPopupTrue(index)}/>
                        <Popup content="schedule_form" isVisible={me.state.isSecondPopupVisible[index]}
                               setVisibleFalse={() => me.setSecondPopupFalse(index)} order={order} />
                    </div>
                ))}
            </div>
        );
    }
}
export default CurrentOrders;