import React from "react";
import "../../styles/home/schedule_button.css"
import {Link} from "react-router-dom";

const ScheduleButton:React.FC = () => {
    return (
        <div>
            <Link to="/schedule">
                <button className="schedule_button">
                    Расписание поставок
                </button>
            </Link>
            <div className="button_glare">
            </div>
        </div>
    )
}
export default ScheduleButton;