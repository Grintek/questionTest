import React, {Component} from "react";


export default class Clock extends Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 1 };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.timer = setInterval(this.countDown, 1000);
    }


    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds + 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        if (this.props.stopTimer === true) {
            clearTimeout(this.timer);
            this.timer = false;

            this.props.funcTime(this.state.time.h, this.state.time.m, this.state.time.s);
        }
    }

    render() {
        return(
           null
        );
    }
}