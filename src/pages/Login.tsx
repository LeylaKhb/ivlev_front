import React from "react";
import {Link} from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
    return (
        <div className="page_content" >
            <div className="login_window" style={{height: 400}}>
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