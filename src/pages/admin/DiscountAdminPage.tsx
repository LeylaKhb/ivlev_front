import React, {useState} from "react";
import {HelmetProvider} from "react-helmet-async";
import {Helmet} from "react-helmet";
import {Person} from "../../models/Person";
import Popup from "../../components/Popup";
import AdminLayout from "../../components/layout/AdminLayout";

const DiscountAdminPage: React.FC = () => {
    const [email, setEmail] = useState("")
    const [people, setPeople] = useState<Array<Person>>([])
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [personToChange, setPersonToChange] = useState<Person | undefined>(undefined)

    function setPopupTrue(person: Person) {
        setIsPopupVisible(true);
        document.body.style.overflow = "hidden";
        setPersonToChange(person)
    }

    function setPopupFalse() {
        setIsPopupVisible(false);
        document.body.style.overflow = "scroll";
        setPersonToChange(undefined)
    }

    function handleForm(event: React.FormEvent) {
        event.preventDefault();
        fetch('https://kodrf.ru/api/admin_discount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: email
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    setPeople(data);
                })
        });
    }

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    return (
        <AdminLayout>
            <div className="page_content" style={{flexFlow: 'column'}}>
                <HelmetProvider>
                    <Helmet
                        title="Админка скидок"
                    />
                </HelmetProvider>
                <Popup isVisible={isPopupVisible} setVisibleFalse={setPopupFalse} content="admin_discount"
                       person={personToChange}/>
                <form className="admin_form" onSubmit={handleForm}>
                    <div className="admin_title">Email</div>
                    <input type="text" onInput={handleEmail}/>
                    <button type="submit" className="change_password_button" style={{marginBottom: 50}}>Найти людей
                    </button>

                </form>

                <div style={{width: '100%'}} className="admin_table">
                    <table style={{width: '100%'}} className="admin_table">
                        <thead>
                        <tr>
                            <th style={{width: '13%'}}>Кнопка</th>
                            <th style={{width: '23%'}}>Имя</th>
                            <th style={{width: '33%'}}>Email</th>
                            <th style={{width: '33%'}}>Скидка</th>
                        </tr>
                        </thead>
                        {people?.map((person, index) => (
                            <tbody key={index}>
                            <tr style={{width: '100%'}}>
                                <button className="login_button" onClick={() => setPopupTrue(person)}
                                        style={{marginTop: 20}}>Изменить
                                </button>
                                <td style={{width: '33%'}}>{person.name}</td>
                                <td style={{width: '33%'}}>{person.email}</td>
                                <td style={{width: '33%'}}>{person.discount}</td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}

export default DiscountAdminPage;