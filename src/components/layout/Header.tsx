import {Link} from "react-router-dom";
import logo from "../../static/logo.png"
import React, {useState} from "react";
import MenuHeader from "./MenuHeader";

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const [open, setOpen] = useState(false);

    function handleMenu() {
        if (!open) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "scroll";
        }
        setOpen(!open);
    }

    return (
        <header>
            {open && <MenuHeader handleMenuLinks={handleMenu}/>}

            <div className="menu_and_logo">
                <div className="menu_header" onClick={handleMenu}>
                    <span className="menu_header_block" style={{top: 25, display: open ? 'none' : "initial"}}></span>
                    <span className="menu_header_block" style={{top: 33, transform: open ? "rotate(45deg)" : "none"}}></span>
                    <span className="menu_header_block" style={{top: 33, transform: open ? "rotate(-45deg)" : "none"}}></span>
                    <span className="menu_header_block" style={{top: 41, display: open ? 'none' : "initial"}}></span>
                </div>


                <Link to="/">
                    <img src={logo} style={{width: '70%'}} alt="emblem"/>
                </Link>
            </div>

            <div className="links_container_header">
                <a href="/#about" className="link_header_footer">О нас</a>
                <a href="/#service" className="link_header_footer">Наши услуги</a>
                <a href="/#reviews" className="link_header_footer">Отзывы</a>
                <a href="/#contacts" className="link_header_footer">Контакты</a>
                <a href="/schedule" className="link_header_footer">Расписание поставок</a>
                <a href="https://t.me/+nVp-YvKEbJJjOTRi" className="link_header_footer">Чат в Telegram</a>
            </div>

            {localStorage.getItem("jwt") === null &&
                <div className="header_footer_buttons">
                    <Link to="/registration"><button className="registration_button">Регистрация</button></Link>
                    <Link to="/login"><button className="login_button">Войти</button></Link>
                </div>
            }
            {localStorage.getItem("jwt") !== null &&
                <div className="header_footer_buttons">
                    <Link to="/personal_account"><button className="registration_button"
                    style={{height: 40}}>Личный кабинет</button></Link>
                </div>
            }
        </header>
    )
}

export default Header;