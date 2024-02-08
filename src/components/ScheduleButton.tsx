import React from "react";
import "./schedule_button.css"

const ScheduleButton:React.FC = () => {
    return (
        <div>
            <button className="schedule_button">
                Расписание поставок
            </button>
            <div className="button_glare">
            </div>
        </div>
    )
}
export default ScheduleButton;