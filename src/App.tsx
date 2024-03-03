import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/registration" element={localStorage.getItem("jwt") === null ?*/}
            {/*    <Registration /> : <PersonalAccount />} />*/}
              <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={localStorage.getItem("jwt") === null ?
                <Login /> : <PersonalAccount />} />
            <Route path="/personal_account" element={<PersonalAccount />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/current_orders" element={<CurrentOrders />} />
            <Route path="/orders_history" element={<AllOrders />} />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

export default App;
