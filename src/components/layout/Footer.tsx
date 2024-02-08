import React from "react";
import logo from "../../static/logo.png";
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="logo_and_button">
                <Link to="/">
                    <img src={logo} style={{width: '70%'}} alt="emblem"/>
                </Link>
                <div className="header_footer_buttons">
                    <Link to="https://t.me/+nVp-YvKEbJJjOTRi"><button className="footer_button">Чат в телеграм</button></Link>
                </div>
            </div>
            <div className="links_container_footer">
                <a href="/#about" className="link_header_footer">О нас</a>
                <a href="/#service" className="link_header_footer">Наши услуги</a>
                <a href="/#reviews" className="link_header_footer">Отзывы</a>
                <a href="/#contacts" className="link_header_footer">Контакты</a>
                <a href="/schedule" className="link_header_footer">Расписание поставок</a>
            </div>
            <div className="header_footer_buttons">
                <Link to="https://t.me/+nVp-YvKEbJJjOTRi"><button className="footer_button">Чат в телеграм</button></Link>
            </div>
        </footer>
    )
}

export default Footer;