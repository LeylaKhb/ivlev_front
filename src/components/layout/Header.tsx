import {Link} from "react-router-dom";
import logo from "../../static/logo.png"
import React, {useState} from "react";
import "../../styles/dropdown.scss";

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
    const [open, setOpen] = useState("");
    const [hidden, setHidden] = useState(true);
    function handleSelectTitle(e: React.MouseEvent) {
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

                <Link to="/" className="header_emblem" onClick={handleOptionClick}>
                    <img src={logo} style={{width: '70%'}}/>
                </Link>
            </div>

            <div className="links_container">
                <Link to="#" className="link_header">О нас</Link>
                <Link to="#" className="link_header">Наши услуги</Link>
                <Link to="#" className="link_header">Отзывы</Link>
                <Link to="#" className="link_header">Контакты</Link>
                <Link to="#" className="link_header">Расписание поставок</Link>
                <Link to="#" className="link_header">Наши партнеры</Link>
            </div>

            <div className="login_buttons">
                <Link to="#"><button className="registration_button">Зарегистрироваться</button></Link>
                <Link to="#"><button className="login_button">Войти</button></Link>
            </div>
        </header>
    )
}

export default Header;