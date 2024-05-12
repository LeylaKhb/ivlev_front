import React, {useState} from "react";
import {Person} from "../../models/Person";

interface AdminDiscountChangeProps {
    person: Person,
    close: any
}

const AdminDiscountChange : React.FC<AdminDiscountChangeProps> = ({person, close}) => {
    const [discount, setDiscount] = useState("")
    function handleDiscount(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = e.target.value;
        let lastChar = inputValue.charAt(inputValue.length - 1);
        if (isNaN(Number(lastChar)) || (lastChar === ' ') || (inputValue.length === 4) || (Number(inputValue) > 100)) {
            e.target.value = inputValue.slice(0, -1);
            return;
        }
        setDiscount(e.target.value);
    }

    function handleForm(event: React.FormEvent) {
        event.preventDefault();
        person.discount = discount
        let body = JSON.stringify(person);

        fetch('https://kodrfb.ru/api/admin_change_discount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body
        }).then(function (){
                close()
            }
        )
    }

    return (
        <form  onSubmit={handleForm}>
            <div className="admin_title">Изменить скидку</div>
            <input placeholder={person.discount} onInput={handleDiscount}/>
            <button type="submit" className="change_password_button" style={{marginBottom: 100}}>Изменить скидку</button>

        </form>
    )
}

export default AdminDiscountChange;