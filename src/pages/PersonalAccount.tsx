import React, {useEffect} from "react";
import {Person} from "../models/Person";
import user_profile from "../static/user_profile.png";
import "../styles/personal_account.css";
import {Link} from "react-router-dom";
import background from "../static/background.png";

interface PersonalAccountProps {
}

interface PersonalAccountState {
    person: Person;
}

class PersonalAccount extends React.Component<PersonalAccountProps, PersonalAccountState> {
    constructor(props: PersonalAccountProps) {
        super(props);
        this.state = {person: new Person("L", "df", "wdc")};
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
                        person: new Person(data["name"], data["email"], data["password"])});
                })
        })
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
                        <img src={user_profile} alt="user profile"/>
                        <div className="personal_info_div">
                            <div className="personal_info">{me.state.person.name}</div>
                            <div className="personal_info" style={{ color: 'gray', fontSize: 14}}>{me.state.person.email}</div>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexFlow: 'column'}} >
                        <button className="personal_change_info">Изменить данные</button>
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
            </div>
        )
    }
}

export default PersonalAccount;
// const PersonalAccount: React.FC = () => {
//     let person;
//
//     useEffect(() => {
//         fetch('http://localhost:8080/personal_account', {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
//             }
//         }).then(function(resp) {
//             resp.json()
//                 .then(data => {
//                     person = new Person(data["name"], data["email"], data["password"]);
//                 })
//         })
//     })
//     return (
//         <div>
//             {person !== undefined &&
//                 <div>{person.name}</div>
//             }
//
//         </div>
//     )
// }
//
// export default PersonalAccount;