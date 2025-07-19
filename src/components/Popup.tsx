import React from "react";
import "../styles/popup.css"
import ApplicationForm from "./forms/ApplicationForm";
import PriceForm from "./forms/PriceForm";
import ProfileChangeForm from "./personal_page/ProfileChangeForm";
import {Person} from "../models/Person";
import ChangePasswordForm from "./personal_page/ChangePasswordForm";
import ScheduleForm from "./schedule/ScheduleForm";
import {Supply} from "../models/Supply";
import {Link} from "react-router-dom";
import {Orders} from "../models/Orders";
import OrderInfo from "./personal_page/OrderInfo";
import AdminFormChange from "./admin/AdminFormChange";
import AdminDiscountChange from "./admin/AdminDiscountChange";
import CompaniesWindow from "./personal_page/CompaniesWindow";

interface PopupProps {
    isVisible: boolean,
    setVisibleFalse: any;
    openSecondPopup?: any;
    content: string;
    person?: Person;
    supply?: Supply;
    order?: Orders;
    orders?: Orders[] | undefined;
    companies?: string[];
}

interface PopupState {
    key: number;
    supply: Supply | null;
}

class Popup extends React.Component<PopupProps, PopupState> {
    constructor(props: PopupProps) {
        super(props);
        this.state = {
            key: 1,
            supply: null
        };
    }

    componentDidMount() {
        let me = this;
        if (me.props.order !== undefined && this.props.supply === undefined) {
            fetch('https://kodrf.ru/api/get_supply', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    "departureDate": me.props.order.departureDate,
                    "title": me.props.order.supplyTitle
                })
            }).then(function (resp) {
                resp.json()
                    .then(function (data) {
                        me.setState({supply: data});
                    })
            });
        }
    }

    handleClose(e: React.MouseEvent) {
        const target = e.target as Element;
        const classList = target.classList;
        if (classList.contains("consultation_popup") || classList.contains("popup_cross") || classList.contains("cancel_changes")) {
            this.props.setVisibleFalse();
            this.setState({key: this.state.key + 1});
        }
    }

    render() {
        return (
            <div className="consultation_popup" style={{
                display: this.props.isVisible ? "initial" : "none",
                opacity: this.props.isVisible ? 1 : 0
            }}
                 onClick={(e) => {
                     this.handleClose(e)
                 }}>
                {this.props.content === "form" &&
                  <div className="popup_window" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                    <div className="modal_window_title">
                      Получите консультацию
                    </div>
                    <div className="popup_desc">
                      Оставьте свои контактные данные в форме ниже или позвоните по номеру телефона <br/> 8
                      (917) 148-66-88
                    </div>
                    <ApplicationForm location="popup"/>
                  </div>
                }
                {this.props.content === "price" &&
                  <div className="popup_window popup_window_price" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                    <PriceForm/>
                  </div>
                }
                {this.props.content === "change_password" &&
                  <div className="popup_window" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)", padding: '40px 51px'
                  }}>
                    <ChangePasswordForm/>
                  </div>
                }
                {this.props.content === "profile" &&
                  <div className="popup_window popup_window_profile" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                      {this.props.person !== undefined &&
                        <ProfileChangeForm person={this.props.person} key={this.state.key}
                                           openSecondPopup={this.props.openSecondPopup}/>
                      }
                  </div>
                }
                {this.props.content === "schedule_form" &&
                  <div className="popup_window popup_schedule" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                      {this.props.supply !== undefined &&
                        <ScheduleForm supply={this.props.supply} companies={this.props.companies} person={this.props.person}/>
                      }
                      {this.props.order !== undefined && this.state.supply !== null &&
                        <ScheduleForm supply={this.state.supply} order={this.props.order}
                                      companies={this.props.companies} person={this.props.person}/>
                      }
                  </div>
                }
                {this.props.content === "schedule_form_error" &&
                  <div className="popup_window" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)", alignItems: 'center', justifyContent: 'center', display: "flex",
                      flexFlow: 'column'
                  }}>
                    <div className="schedule_login_text">
                      Пожалуйста войдите в личный кабинет
                    </div>
                    <Link to="/login">
                      <button className="login_schedule">Войти</button>
                    </Link>
                  </div>
                }

                {this.props.content === "companies" &&
                  <div className="popup_window popup_window_profile" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)", display: "flex",
                      flexFlow: 'column'
                  }}>
                    <CompaniesWindow person={this.props.person}/>
                  </div>
                }
                {this.props.content === "no_companies" &&
                  <div className="popup_window" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)", alignItems: 'center', justifyContent: 'center', display: "flex",
                      flexFlow: 'column'
                  }}>
                    <div className="schedule_login_text" style={{fontWeight: 500, fontSize: 25}}>
                      Пожалуйста, заполните данные о своих компаниях в личном кабинете, чтобы продолжить
                    </div>
                    <Link to="/personal_account">
                      <button className="login_schedule" style={{fontSize: 20, height: 50, width: 200}}>Личный кабинет
                      </button>
                    </Link>
                  </div>
                }
                {this.props.content === "order" &&
                  <div className="popup_window popup_order" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                      {this.props.order !== undefined &&
                        <OrderInfo order={this.props.order} openSecondPopup={this.props.openSecondPopup}
                                   orderPrice={this.props.order.price}/>
                      }
                  </div>
                }
                {this.props.content === "admin" &&
                  <div className="popup_window popup_order" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                      {this.props.orders !== undefined &&
                        <AdminFormChange orders={this.props.orders} close={this.props.setVisibleFalse}/>
                      }
                  </div>
                }
                {this.props.content === "admin_discount" &&
                  <div className="popup_window popup_order" style={{
                      opacity: this.props.isVisible ? 1 : 0,
                      transform: "translateY(-50%)"
                  }}>
                      {this.props.person !== undefined &&
                        <AdminDiscountChange person={this.props.person} close={this.props.setVisibleFalse}/>
                      }
                  </div>
                }
                <div className="popup_cross" onClick={this.props.setVisibleFalse}>
                    <svg role="presentation" className="t-popup__close-icon" width="23px" height="23px"
                         viewBox="0 0 23 23" version="1.1" xmlns="https://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="#f81c87" fillRule="evenodd">
                            <rect
                                transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) "
                                x="10.3137085" y="-3.6862915" width="2" height="30"></rect>
                            <rect
                                transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) "
                                x="10.3137085" y="-3.6862915" width="2" height="30"></rect>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default Popup;