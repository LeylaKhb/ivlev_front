import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const OrderPayment = () => {
    const {id} = useParams();
    const location = useLocation();
    const [result, setResult] = useState<boolean>()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const result = searchParams.get('result');

        if (result === "success") {
            setResult(true)
            fetch('https://kodrfb.ru/change_status_after_payment/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
            })
        } else {
            setResult(false)
        }
    }, [id, location.search]);

    return (
        <div>
            <div style={{fontSize: 30, marginTop: 200}}>
                {result ? 'Ваша оплата прошла успешно' : 'Ваша оплата не прошла. Пожалуйста, повторите попытку'}
            </div>

        </div>
    )
}