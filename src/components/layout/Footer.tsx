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
                    <Link to="#"><button className="footer_button">Чат в телеграм</button></Link>
                </div>
            </div>
            <div className="links_container_footer">
                <Link to="#" className="link_header_footer">О нас</Link>
                <Link to="#" className="link_header_footer">Наши услуги</Link>
                <Link to="#" className="link_header_footer">Отзывы</Link>
                <Link to="#" className="link_header_footer">Контакты</Link>
                <Link to="#" className="link_header_footer">Расписание поставок</Link>
            </div>
            <div className="header_footer_buttons">
                <Link to="#"><button className="footer_button">Чат в телеграм</button></Link>
            </div>
        </footer>
    )
}

export default Footer;