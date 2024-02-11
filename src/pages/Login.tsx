import React from "react";
import {Link} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import {Helmet} from "react-helmet";

const Login: React.FC = () => {
    return (
        <div className="page_content"  style={{ height: '90vh'}}>
            <Helmet
                title="Авторизация"
            />

            <div className="login_window" style={{height: 410}}>
                <div className="modal_window_title">Авторизация</div>
                <LoginForm location="login" />
                <div className="login_links">
                    <Link to="/registration" className="login_link">
                        Зарегистрироваться
                    </Link>
                    <Link to="#" className="login_link">
                        Востановить пароль
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Login;