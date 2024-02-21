import React from "react";
import {Person} from "../models/Person";
import user_profile from "../static/user_profile.png";
import "../styles/personal_account.css";
import {Link} from "react-router-dom";
import background from "../static/background.png";
import Popup from "../components/Popup";

interface PersonalAccountProps {
}

interface PersonalAccountState {
    person: Person;
    isPopupVisible: boolean;
}

class PersonalAccount extends React.Component<PersonalAccountProps, PersonalAccountState> {
    constructor(props: PersonalAccountProps) {
        super(props);
        this.state = {
            person: new Person("", "", ""),
            isPopupVisible: false
        };

        this.setPopupFalse = this.setPopupFalse.bind(this);
        this.setPopupTrue = this.setPopupTrue.bind(this);

    }
    componentDidMount() {
        let me = this;

        fetch('http://localhost:8080/personal_account', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function(resp) {
            resp.json()
                .then(function (data) {
                    me.setState({
                        person: new Person(data["name"], data["email"], data["password"], data["photo"])});
                })
        })
    }

    setPopupFalse() {
        this.setState({isPopupVisible: false});
        document.body.style.overflow = "scroll";
    }

    setPopupTrue() {
        this.setState({isPopupVisible: true});
        document.body.style.overflow = "hidden";
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
                <div className="personal_account_div">
                    <div style={{display: 'flex', flexFlow: 'row'}}>
                        <img src={me.state.person.photo} alt="user profile"/>
                        <div className="personal_info_div">
                            <div className="personal_info">{me.state.person.name}</div>
                            <div className="personal_info" style={{ color: 'gray', fontSize: 14}}>{me.state.person.email}</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column'}} >
                        <button className="personal_change_info" onClick={me.setPopupTrue}>Изменить данные</button>
                        <button className="personal_logout_button">Выйти из аккаунта</button>
                    </div>
                </div>

                <div className="personal_orders_links">
                    <Link to="/current_orders" className="person_order_link" style={backgroundImage}>
                        <div className="person_order_button">Текущие заявки</div>
                    </Link>
                    <Link to="/orders_history" className="person_order_link" style={backgroundImage}>
                        <div className="person_order_button">История заказов</div>
                    </Link>
                </div>
                <Popup isVisible={me.state.isPopupVisible} setVisibleFalse={me.setPopupFalse} content="profile"
                       person={me.state.person}/>
            </div>
        )
    }
}

export default PersonalAccount;
