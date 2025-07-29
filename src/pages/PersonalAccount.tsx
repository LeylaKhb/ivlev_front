import React from "react";
import {Person} from "../models/Person";
import "../styles/personal_page/personal_account.css";
import {Link} from "react-router-dom";
import background from "../static/background.png";
import Popup from "../components/Popup";
import {Helmet, HelmetProvider} from "react-helmet-async";

interface PersonalAccountProps {
}

interface PersonalAccountState {
    person: Person;
    isFirstPopupVisible: boolean;
    isSecondPopupVisible: boolean;
    isCompaniesPopupVisible: boolean;
}

class PersonalAccount extends React.Component<PersonalAccountProps, PersonalAccountState> {
    constructor(props: PersonalAccountProps) {
        super(props);
        this.state = {
            person: new Person("", "", ""),
            isFirstPopupVisible: false,
            isSecondPopupVisible: false,
            isCompaniesPopupVisible: false,
        };

        this.setFirstPopupFalse = this.setFirstPopupFalse.bind(this);
        this.setFirstPopupTrue = this.setFirstPopupTrue.bind(this);
        this.setSecondPopupFalse = this.setSecondPopupFalse.bind(this);
        this.setSecondPopupTrue = this.setSecondPopupTrue.bind(this);
        this.setCompaniesPopupTrue = this.setCompaniesPopupTrue.bind(this);
        this.setCompaniesPopupFalse = this.setCompaniesPopupFalse.bind(this);
    }

    componentDidMount() {
        let me = this;

        fetch('https://kodrf.ru/personal_account', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function (resp) {
            resp.json().then(function (data) {
                let hasNoCompanies = !data.companies || data.companies.length === 0;

                me.setState({
                    person: data,
                    isCompaniesPopupVisible: hasNoCompanies
                });
            });
        })
    }

    setFirstPopupFalse() {
        this.setState({isFirstPopupVisible: false});
        document.body.style.overflow = "scroll";
    }

    setFirstPopupTrue() {
        this.setState({isFirstPopupVisible: true});
        document.body.style.overflow = "hidden";
    }

    setSecondPopupFalse() {
        this.setState({isSecondPopupVisible: false});
        document.body.style.overflow = "scroll";
    }

    setSecondPopupTrue() {
        this.setState({isSecondPopupVisible: true});
        document.body.style.overflow = "hidden";
    }

    setCompaniesPopupFalse() {
        this.setState({isCompaniesPopupVisible: false});
        document.body.style.overflow = "scroll";
    }

    setCompaniesPopupTrue() {
        this.setState({isCompaniesPopupVisible: true});
        document.body.style.overflow = "hidden";
    }

    handleLogout() {
        localStorage.removeItem("jwt");
        window.location.assign('https://ivlev-ff.ru/');
    }

    render() {
        let me = this;
        const backgroundImage = {
            backgroundImage: `url(${background})`,
            width: '40%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 10,
        };

        return (
            <div style={{height: '90vh'}}>

                <HelmetProvider>
                    <Helmet
                        title="Личный кабинет"
                    />
                </HelmetProvider>
                <div className="personal_account_div">
                    <div style={{display: 'flex', flexFlow: 'row'}}>
                        <img src={me.state.person.photo} alt="user profile"/>
                        <div className="personal_info_div">
                            <div className="personal_info">{me.state.person.name}</div>
                            <div className="personal_info" style={{
                                color: 'gray', fontSize: 14,
                                wordBreak: 'break-all'
                            }}>{me.state.person.email}</div>
                            <button className="personal_change_info" onClick={me.setCompaniesPopupTrue}
                                    style={{marginTop: 6}}>Мои компании
                            </button>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column'}}>
                        <button className="personal_change_info" onClick={me.setFirstPopupTrue}>Изменить данные</button>
                        <button className="personal_logout_button" onClick={me.handleLogout}>Выйти из аккаунта</button>
                    </div>
                </div>

                {me.state.person.agreeToTerms && <div style={{marginLeft: 40, fontSize: 13, marginTop: 10}}>
                    <>
                        Согласие на обработку данных дано {me.state.person.agreeToTermsDate} в соответствии с&nbsp;
                        <Link to="/privacy_policy" target="_blank">
                            <span>политикой конфиденциальности</span>
                        </Link>.
                    </>
                </div>
                }

                <div className="personal_orders_links">
                    <Link to="/current_orders" className="person_order_link" style={backgroundImage}>
                        <div className="person_order_button">Текущие заявки</div>
                    </Link>
                    <Link to="/orders_history" className="person_order_link" style={backgroundImage}>
                        <div className="person_order_button">История заказов</div>
                    </Link>
                </div>
                <Popup isVisible={me.state.isFirstPopupVisible} setVisibleFalse={me.setFirstPopupFalse}
                       content="profile"
                       person={me.state.person} openSecondPopup={this.setSecondPopupTrue}/>
                <Popup isVisible={me.state.isSecondPopupVisible} setVisibleFalse={me.setSecondPopupFalse}
                       content="change_password"/>
                <Popup isVisible={me.state.isCompaniesPopupVisible} setVisibleFalse={me.setCompaniesPopupFalse}
                       content="companies" person={me.state.person}/>
            </div>
        )
    }
}

export default PersonalAccount;
