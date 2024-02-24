import React, {useEffect, useState} from "react";
import {Person} from "../models/Person";
import "../styles/profile_change_form.css";

interface ProfileChangeFormProps {
    person: Person;
    openSecondPopup: any
}

const ProfileChangeForm: React.FC<ProfileChangeFormProps> = ({person, openSecondPopup}) => {

    const [emailError, setEmailError] = useState("");
    const [nameValid, setNameValid] = useState(true);

    const [emailText, setEmailText] = useState(person.email);
    const [nameText, setNameText] = useState(person.name);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setEmailText(person.email);
        setNameText(person.name)
    }, [person.email, person.name])

    function handleChanges() {
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(emailText))) {
            setEmailError("Неправильная электронная почта");
            if (!(/^[a-zA-ZА-Яа-я-]+$/.test(nameText))) {
                setNameValid(false);
                return;
            }
            return;
        }

        fetch('http://localhost:8080/change_person', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify(new Person(nameText, emailText))
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    if (data["header"] === "error") {
                        setEmailError(data["content"]);
                        return;
                    } else {
                        localStorage.setItem("jwt", data["content"]);
                        setSuccess(true);
                    }
                })
        });
    }

    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if(!(/^[a-zA-Zа-яА-Я-]+$/.test(lastChar))) {
            e.target.value = inputValue.slice(0, -1);
        }
        setNameValid(true);
        setNameText(inputValue);

    }

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        setEmailError("");
        setEmailText(inputValue);
    }

    return (

        <div className="profile_change_div_form">
            <label style={{fontWeight: 600}}>Изменить профиль</label>
            <form className="change_profile_form">
                <div className="change_photo_div">
                    <img src={person.photo} alt="user profile" />
                    {/*<div className="input_wrapper">*/}
                    {/*    <input type="file" className="change_photo_input" id="change_photo_input"/>*/}
                    {/*    <label htmlFor="change_photo_input" className="input_file_button">*/}
                    {/*        <span className="change_photo_input_text">Загрузить</span>*/}
                    {/*    </label>*/}
                    {/*</div>*/}
                </div>

                <input type="text" className="registration_input" onInput={handleNameInput} name="name"
                       defaultValue={person.name}/>
                <div className="login_form_label" style={{transform: nameText !== "" ?
                        'translate(-20px, -20px) scale(0.8)' : "none", bottom:  370, left: 85}}>Имя</div>
                <div className="login_form_error" style={{display: nameValid ? "none" : "initial",
                    bottom: 348}}>Поле не может быть пустым</div>
                <input type="text" className="registration_input" onInput={handleEmailInput} name="email"
                       defaultValue={person.email}/>
                <label className="login_form_label" style={{transform: emailText !== "" ?
                        'translate(-20px, -20px) scale(0.8)' : "none", bottom: 299, left: 85}}>Email</label>
                <div className="login_form_error" style={{display: emailError === "" ? "none" : "initial",
                    bottom: 277}}>{emailError}</div>


                <div className="change_password_div">
                    Пароль
                    <label className="change_password_button" onClick={openSecondPopup}>Изменить</label>
                </div>

                <div className="change_profile_buttons" >
                    <label className="cancel_changes">Отмена</label>
                    <label className="submit_changes" onClick={handleChanges}>Сохранить</label>
                </div>
                <label style={{display: success ? 'initial' : 'none', color: 'green', marginTop: 25,
                    textAlign: "center", fontSize: 17}}>Данные успешно изменены</label>

            </form>
        </div>
    )
}

export default ProfileChangeForm;