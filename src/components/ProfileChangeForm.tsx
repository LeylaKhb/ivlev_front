import React from "react";
import {Person} from "../models/Person";
import "../styles/profile_change_form.css";

interface ProfileChangeFormProps {
    person: Person;
    openSecondPopup: any
}

const ProfileChangeForm: React.FC<ProfileChangeFormProps> = ({person, openSecondPopup}) => {
    return (
        <div className="profile_change_div_form">
            Изменить профиль
            <form className="change_profile_form">
                <div className="change_photo_div">
                    <img src={person.photo} alt="user profile" />
                    <div className="input_wrapper">
                        <input type="file" className="change_photo_input" id="change_photo_input"/>
                        <label htmlFor="change_photo_input" className="input_file_button">
                            <span className="change_photo_input_text">Загрузить</span>
                        </label>
                    </div>
                </div>

                <input type="text" className="person_change_input" defaultValue={person.name}/>
                <input type="text" className="person_change_input" defaultValue={person.email}/>

                <div className="change_password_div">
                    Пароль
                    <label className="change_password_button" onClick={openSecondPopup}>Изменить</label>
                </div>

                <div className="change_profile_buttons" >
                    <label className="cancel_changes">Отмена</label>
                    <label className="submit_changes">Сохранить</label>
                </div>
            </form>
        </div>
    )
}

export default ProfileChangeForm;