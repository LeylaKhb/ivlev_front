import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PersonalAccount from "./pages/PersonalAccount";
import Schedule from "./pages/Schedule";
import Calculator from "./pages/Calculator";
import CurrentOrders from "./pages/CurrentOrders";
import AllOrders from "./pages/AllOrders";
import AdminPage from "./pages/AdminPage";
import RecoverPassword from "./pages/RecoverPassword";
import Regulations from "./components/regulations/Regulations";
import {Helmet} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";
import PageNotFound from "./pages/PageNotFound";
import Chat from "./pages/Chat";
import DiscountAdminPage from "./pages/DiscountAdminPage";
import AllDialogs from "./pages/AllDialogs";
import {ChatFunc} from "./pages/ChatFunc";
import Oferta from "./components/regulations/Oferta";
import {OrderPayment} from "./pages/OrderPayment";
import PrivacyPolicy from "./components/regulations/PrivacyPolicy";
import Popup from "./components/Popup";


function App() {
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const daysInterval = 1;
        const lastShown = localStorage.getItem("popupLastShown");

        let shouldShow = true;

        if (lastShown) {
            const lastDate = new Date(parseInt(lastShown, 10));
            const now = new Date();
            const diffDays = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diffDays < daysInterval) {
                shouldShow = false;
            }
        }

        if (shouldShow) {
            setPopupVisible(true);
            document.body.style.overflow = "hidden";
        }
    }, []);

    const handleClose = () => {
        setPopupVisible(false);
        localStorage.setItem("popupLastShown", Date.now().toString());
        document.body.style.overflow = "scroll";
    };

    return (
        <BrowserRouter>
            <Layout>
                <Popup content="delivery_issue" isVisible={popupVisible} setVisibleFalse={handleClose}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/registration" element={localStorage.getItem("jwt") === null ?
                        <Registration/> : <PersonalAccount/>}/>
                    {/*<Route path="/registration" element={<Registration />} />*/}
                    <Route path="/login" element={localStorage.getItem("jwt") === null ?
                        <Login/> : <PersonalAccount/>}/>
                    <Route path="/recover_password" element={<RecoverPassword/>}/>
                    <Route path="/personal_account" element={localStorage.getItem("jwt") === null ?
                        <Login/> : <PersonalAccount/>}/>
                    <Route path="/schedule" element={<Schedule/>}/>
                    <Route path="/calculator" element={<Calculator/>}/>
                    <Route path="/current_orders" element={localStorage.getItem("jwt") === null ?
                        <Login/> : <CurrentOrders/>}/>
                    <Route path="/orders_history" element={localStorage.getItem("jwt") === null ?
                        <Login/> : <AllOrders/>}/>
                    <Route path="/orders/:id" element={<OrderPayment/>}/>
                    <Route path="/regulations" element={<Regulations/>}/>
                    <Route path="/oferta" element={<Oferta/>}/>
                    <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
                    <Route path="/partners" element={<div>
                        <HelmetProvider>
                            <Helmet
                                title="Партнеры"
                            />
                        </HelmetProvider>
                    </div>}/>
                    {localStorage.getItem("admin") === "true" &&
                      <Route path="/admin_page" element={<AdminPage/>}/>}
                    {localStorage.getItem("admin") === "true" &&
                      <Route path="/admin_discount" element={<DiscountAdminPage/>}/>}
                    <Route path="/chat" element={<Chat/>}/>
                    {localStorage.getItem("admin") === "true" &&
                      <Route path="/all_dialogs" element={<AllDialogs/>}/>}
                    {localStorage.getItem("admin") === "true" &&
                      <Route path="/dialog/:id" element={<ChatFunc/>}/>}
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
