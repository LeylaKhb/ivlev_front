import React from "react";
import "../styles/schedule/schedule.css";
import FirstBlock from "../components/schedule/FirstBlock";
import CalcuatorBlock from "../components/schedule/CalcuatorBlock";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Supply} from "../models/Supply";
import {format} from 'date-fns';
import Popup from "../components/Popup";
import moment from "moment";
import {Person} from "../models/Person";


interface ScheduleProps {
}

interface ScheduleState {
    allSupplies: Supply[];
    supplies: Supply[];
    companies: string[];
    isPopupVisible: boolean[];
    isNoCompaniesPopupVisible: boolean;
    person: Person | undefined;
    ozon: boolean;
}

class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);

        this.state = {
            allSupplies: [],
            supplies: [],
            isPopupVisible: [],
            companies: [],
            isNoCompaniesPopupVisible: false,
            person: undefined,
            ozon: false,
        }

        this.setNoCompaniesPopupTrue = this.setNoCompaniesPopupTrue.bind(this);
        this.setNoCompaniesPopupFalse = this.setNoCompaniesPopupFalse.bind(this);
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

    setNoCompaniesPopupTrue() {
        this.setState({isNoCompaniesPopupVisible: true});
        document.body.style.overflow = "hidden";
    }

    setNoCompaniesPopupFalse() {
        this.setState({isNoCompaniesPopupVisible: false});
        document.body.style.overflow = "scroll";
    }

    componentDidMount() {
        let me = this;

        fetch('https://kodrf.ru/api/schedule', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    const supplies = data.filter((supply: Supply) => !supply.ozon)
                    me.setState({allSupplies: data, supplies: supplies})
                })
        });
        fetch('https://kodrf.ru/personal_account', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function (resp) {
            resp.json().then(function (data) {
                me.setState({
                    person: data,
                });
            });
        });
        fetch('https://kodrf.ru/api/companies', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
            }
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    me.setState({companies: data, isNoCompaniesPopupVisible: !data || data.length === 0})
                })
        });
    }

    getWeekDay(departureDate: Date) {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[new Date(departureDate).getDay()];
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOzon = event.target.value === 'true';

        const filtered = this.state.allSupplies.filter(
            (supply) => supply.ozon === selectedOzon
        );

        this.setState({ ozon: selectedOzon,
        supplies: filtered});
    };

    render() {
        let me = this;
        const { ozon } = this.state;

        return (
            <div className="page_content" style={{flexFlow: "column"}}>
                <HelmetProvider>
                    <Helmet
                        title="Расписание поставок"
                    />
                </HelmetProvider>

                <FirstBlock/>
                <CalcuatorBlock/>

                <div className="user-type-selector" id="userTypeSelector">
                    <div className="user-type-option">
                        <label className={`user-type-label ${!ozon ? 'active' : ''}`} id="wbChoice">
                            <input type="radio" name="ozon" value="false" className="hidden-radio"
                                checked={!ozon} onChange={this.handleChange}
                            />
                            WB
                        </label>
                    </div>
                    <div className="user-type-option">
                        <label className={`user-type-label ${ozon ? 'active' : ''}`} id="ozonChoice">
                            <input type="radio" name="ozon" value="true" className="hidden-radio" checked={ozon}
                                onChange={this.handleChange}
                            />
                            OZON / ЯМ / Забор с ТК
                        </label>
                    </div>
                </div>

                <div className="table_header">
                    <label className="first_column_schedule">Дата поставки</label>
                    <label className="second_column_schedule">Город отправки</label>
                    <label className="third_column_schedule">Отправка на склад</label>
                    <label className="fourth_column_schedule">Записаться</label>
                </div>

                {me.state.supplies.map((value, index) => (
                    <div className="table_row" key={index}
                         style={{backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white'}}>
                        {value.departureDate.toString() === '1970-01-01' &&
                          <label className="first_column_schedule" style={{bottom: 20}}>
                            Вт, Ср, Пт, Сб
                          </label>}
                        {(value.departureDate.toString() === '1980-01-01' || value.departureDate.toString() === '1990-01-01')
                            && <label className="first_column_schedule" style={{bottom: 0}}>
                            Пн, Вт, Ср, Чт,
                            <br/> Пт, Сб
                          </label>}
                        {value.departureDate.toString() !== '1970-01-01' && value.departureDate.toString() !== '1980-01-01'
                            && value.departureDate.toString() !== '1990-01-01' &&
                          <><label className="first_column_schedule">
                              {format(value.departureDate, "dd.MM.yy")} ({this.getWeekDay(value.departureDate)})
                          </label><label className="first_column_schedule" style={{top: 45, fontSize: 12}}>
                            Приём до {format(value.acceptanceDate, "dd.MM")}
                          </label></>
                        }
                        <label className="second_column_schedule" style={{bottom: 17}}>{value.departureCities
                            .map(departureCity => departureCity.cityName)
                            .join(", ")}</label>
                        <label className="third_column_schedule">{value.title}</label>
                        <label className="fourth_column_schedule" style={{bottom: 17}}>
                            <button className="sign_up_schedule_button" onClick={() => this.setPopupTrue(index)}
                                    style={{
                                        display: moment().add(1, "days").isBefore(moment(value.acceptanceDate)
                                            .add(22, 'hours'), 'hour') ? "initial" : "none"
                                    }}>Записаться
                            </button>
                        </label>
                        {localStorage.getItem("jwt") !== null &&
                          <Popup isVisible={me.state.isPopupVisible[index]}
                                 setVisibleFalse={() => me.setPopupFalse(index)}
                                 content="schedule_form" supply={this.state.supplies[index]}
                                 companies={me.state.companies} person={me.state.person}/>
                        }
                        {localStorage.getItem("jwt") === null &&
                          <Popup isVisible={me.state.isPopupVisible[index]}
                                 setVisibleFalse={() => me.setPopupFalse(index)}
                                 content="schedule_form_error"/>
                        }
                    </div>
                ))}

                <Popup isVisible={me.state.isNoCompaniesPopupVisible}
                       setVisibleFalse={this.setNoCompaniesPopupFalse}
                       content="no_companies"/>
            </div>
        )
    }
}

export default Schedule;