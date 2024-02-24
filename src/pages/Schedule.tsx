import React from "react";
import "../styles/schedule.css";
import FirstBlock from "../components/schedule/FirstBlock";
import CalcuatorBlock from "../components/schedule/CalcuatorBlock";

class Schedule extends React.Component {

    render() {
        return (
            <div className="page_content" style={{ flexFlow: "column"}}>

                <FirstBlock />
                <CalcuatorBlock />
            </div>
        )
    }
}

export default Schedule;