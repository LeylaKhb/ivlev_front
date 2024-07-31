import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";

export const OrderPayment = () => {
    const {id} = useParams();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const result = searchParams.get('result');

        if (result === "success") {
            fetch('https://kodrfb.ru/change_status_after_payment/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
            }).then((response) =>
                response.json())
                .then(() => {
                    window.location.assign('https://ivlev-ff.ru/current_orders');
                })
                .catch(() => {
                    window.location.assign('https://ivlev-ff.ru/current_orders');
                });
        } else {
            window.location.assign('https://ivlev-ff.ru/current_orders');
        }
    }, [id, location.search]);

    return (
        <div>
        </div>
    )
}