import React from "react";
import "../styles/schedule.css";
import FirstBlock from "../components/schedule/FirstBlock";
import CalcuatorBlock from "../components/schedule/CalcuatorBlock";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Supply} from "../models/Supply";


interface ScheduleProps {
}

interface ScheduleState {
    supplies: Supply[];
}

class Schedule extends React.Component<ScheduleProps, ScheduleState> {
    constructor(props: ScheduleProps) {
        super(props);

        this.state = {
            supplies: []
        }
    }

    componentDidMount() {
        let me = this;

        fetch('http://localhost:8080/api/schedule', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(function(resp) {
            // console.log(resp);
            resp.json()
                .then(function (data) {
                    console.log(data)
                    // me.setState({
                    //     supplies: data});
                })
        })
        console.log(me.state.supplies)
    }

    render() {
        return (
            <div className="page_content" style={{ flexFlow: "column"}}>
                <HelmetProvider>
                    <Helmet
                        title="Расписание поставок"
                    />
                </HelmetProvider>

                <FirstBlock />
                <CalcuatorBlock />

            </div>
        )
    }
}

export default Schedule;