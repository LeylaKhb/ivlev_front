import {Link} from "react-router-dom";
import logo from "../../static/logo.png"
import React, {useState} from "react";
import "../../styles/dropdown.scss";

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const [open, setOpen] = useState("");
    const [hidden, setHidden] = useState(true);
    function handleSelectTitle() {
        if (open === "") {
            setOpen("active");
            setHidden(false);
        }
        if (open === "active") {
            setHidden(true);
            setOpen("")
        }
    }

    function handleOptionClick() {
        setOpen("");
        setHidden(true);
    }

    return (
        <header>
            <div className="menu_and_logo">
                <div className="menu_header" >
                    ☰
                </div>

                <Link to="/" onClick={handleOptionClick}>
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

            <div className="header_footer_buttons">
                <Link to="/registration"><button className="registration_button">Зарегистрироваться</button></Link>
                <Link to="/login"><button className="login_button">Войти</button></Link>
            </div>
        </header>
    )
}

export default Header;