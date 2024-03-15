import React from "react";
import "../styles/schedule.css";
import FirstBlock from "../components/schedule/FirstBlock";
import CalcuatorBlock from "../components/schedule/CalcuatorBlock";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Supply} from "../models/Supply";
import { format } from 'date-fns';
import Popup from "../components/Popup";
import moment from "moment";



interface ScheduleProps {
}

interface ScheduleState {
    supplies: Supply[];
    isPopupVisible: boolean[]
}

class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);

        this.state = {
            supplies: [],
            isPopupVisible: []
        }
    }

     setPopupTrue(index: number) {
        let copy = Object.assign([] as boolean[], this.state.isPopupVisible);
        copy[index] = true;
        this.setState({isPopupVisible: copy});
        document.body.style.overflow = "hidden";
    }
     setPopupFalse(index: number) {
         let copy = Object.assign([] as boolean[], this.state.isPopupVisible);
         copy[index] = false;
         this.setState({isPopupVisible: copy});
         document.body.style.overflow = "scroll";
    }

    componentDidMount() {
        let me = this;

        fetch('http://localhost:8080/api/schedule', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(function(resp) {
            console.log(resp)
            resp.json()
                .then(function (data) {
                    me.setState({supplies: data})
                })
        });
    }

    getWeekDay(acceptanceDate: Date) {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[new Date(acceptanceDate).getDay()];
    }

    render() {
        let me = this;

        return (
            <div className="page_content" style={{ flexFlow: "column"}}>
                <HelmetProvider>
                    <Helmet
                        title="Расписание поставок"
                    />
                </HelmetProvider>

                <FirstBlock />
                <CalcuatorBlock />

                <div className="table_header">
                    <label className="first_column_schedule">Дата поставки</label>
                    <label className="second_column_schedule">Город отправки</label>
                    <label className="third_column_schedule">Отправка на склад</label>
                    <label className="fourth_column_schedule">Записаться</label>
                </div>

                {me.state.supplies.map((value, index) => (
                    <div className="table_row" key={index} style={{backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white'}}>
                        {value.departureDate.toString() === '1970-01-01' &&
                            <label className="first_column_schedule" style={{bottom: 20}}>
                                Вт, Ср, Пт, Сб
                            </label>}
                        {value.departureDate.toString() !== '1970-01-01' &&
                                <><label className="first_column_schedule" style={{bottom: 30}}>
                                    {format(value.departureDate, "dd.MM.yy")} ({this.getWeekDay(value.acceptanceDate)})
                                </label><label className="first_column_schedule" style={{bottom: 17, fontSize: 12}}>
                                    Приём до {format(value.acceptanceDate, "dd.MM")}
                                </label></>
                        }
                        <label className="second_column_schedule" style={{bottom: 17}}>{value.departureCities
                            .map(departureCity => departureCity.cityName)
                            .join(", ")}</label>
                        <label className="third_column_schedule" style={{bottom: 17}} >{value.title}</label>
                        <label className="fourth_column_schedule" style={{bottom: 17}}>
                            <button className="sign_up_schedule_button" onClick={() => this.setPopupTrue(index)}
                            style={{display: moment().add(1, "days").isBefore(moment(value.acceptanceDate)
                                    .add(22, 'hours'), 'hour') ? "initial" : "none"}}>Записаться</button>
                        </label>
                        {localStorage.getItem("jwt") !== null &&
                            <Popup isVisible={me.state.isPopupVisible[index]} setVisibleFalse={() => me.setPopupFalse(index)}
                               content="schedule_form" supply={this.state.supplies[index]}/>
                        }
                        {localStorage.getItem("jwt") === null &&
                            <Popup isVisible={me.state.isPopupVisible[index]} setVisibleFalse={() => me.setPopupFalse(index)}
                                   content="schedule_form_error"/>
                        }
                    </div>
                ))}

            </div>
        )
    }
}

export default Schedule;