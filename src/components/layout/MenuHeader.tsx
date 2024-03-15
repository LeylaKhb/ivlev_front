import React from "react";

interface MenuHeaderProps {
    handleMenuLinks: any;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({handleMenuLinks}) => {
    return (
        <div className="menu">
            <ul role="list" className="menu_ul" onClick={handleMenuLinks}>
                <li className="menu_li">
                    <a className="menu_li_link" href="/">Главная</a></li>
                <li className="menu_li">
                    <a className="menu_li_link" href="/#about">О нас</a>
                </li>
                <li className="menu_li">
                    <a className="menu_li_link" href="/#service">Наши услуги</a>
                </li>
                <li className="menu_li">
                    <a className="menu_li_link" href="/#reviews">Отзывы</a>
                </li>
                <li className="menu_li">
                    <a className="menu_li_link" href="/#contacts">Контакты</a>
                </li>
                <li className="menu_li">
                    <a className="menu_li_link" href="/schedule">Расписание поставок</a></li>
                <li className="menu_li">
                    <a className="menu_li_link" href="https://t.me/+nVp-YvKEbJJjOTRi">Чат в Telegram</a></li>
                {localStorage.getItem("jwt") === null &&
                    <>
                        <li className="menu_li">
                            <a className="menu_li_link" href="/login">Войти</a>
                        </li>
                        <li className="menu_li">
                            <a className="menu_li_link" href="/registration">Зарегистрироваться</a>
                        </li>
                    </>
                }

                {localStorage.getItem("jwt") !== null &&
                    <li className="menu_li">
                        <a className="menu_li_link" href="/personal_account">Личный кабинет</a>
                    </li>
                }
            </ul>
        </div>
    )
}
export default MenuHeader;