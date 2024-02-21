import React from "react";
import "../styles/popup.css"
import ApplicationForm from "./ApplicationForm";
import PriceForm from "./PriceForm";
import ProfileChangeForm from "./ProfileChangeForm";
import {Person} from "../models/Person";

interface PopupProps {
    isVisible: boolean,
    setVisibleFalse: any;
    content: string;
    person?: Person;
}
class Popup extends React.Component<PopupProps> {
    handleClose(e: React.MouseEvent) {
        const target = e.target as Element;
        const classList = target.classList;
        if (classList.contains("consultation_popup") || classList.contains("popup_cross"))
            this.props.setVisibleFalse();
    }
    render() {
        return (
            <div className="consultation_popup" style={{display: this.props.isVisible ? "initial" : "none",
                opacity: this.props.isVisible ? 1 : 0}}
            onClick={(e) => {this.handleClose(e)}}>
                {this.props.content === "form" &&
                    <div className="popup_window" style={{opacity: this.props.isVisible ? 1 : 0,
                transform: this.props.isVisible ? "translateY(-50%)" : 'none'}}>
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
                    <div className="popup_window popup_window_price" style={{opacity: this.props.isVisible ? 1 : 0,
                        transform: this.props.isVisible ? "translateY(-50%)" : 'none'}}>
                        <PriceForm />
                    </div>
                }
                {this.props.content === "profile" &&
                    <div className="popup_window popup_window_profile" style={{opacity: this.props.isVisible ? 1 : 0,
                        transform: this.props.isVisible ? "translateY(-50%)" : 'none'}}>
                        {this.props.person !== undefined &&
                            <ProfileChangeForm person={this.props.person}/>
                        }
                    </div>
                }
                <div className="popup_cross" onClick={this.props.setVisibleFalse}>
                    <svg role="presentation" className="t-popup__close-icon" width="23px" height="23px"
                         viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg">
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