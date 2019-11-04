import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchAllQuestions, testAllQuestions} from "../../api";
import Test from "./Test";
import PropType from "prop-types";

class PerformTest extends Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.thinkCorrectness = this.thinkCorrectness.bind(this);
    }

    static propTypes = {
        testAllQuestions: PropType.func.isRequired,
        questions: PropType.object.isRequired
    };

    componentDidMount() {
        this.props.testAllQuestions();
    }

    //пользователь выбрал вариант
    thinkCorrectness(id){

    }

    testsFunc(question){
       return  question.map((e) => {
            return (<Test key={e.id} question={e} answer={this.thinkCorrectness}/>)
        })

    }
    render() {
        const {questions} = this.props.questions;
        console.log(questions);

        return(
            <div>
                {this.testsFunc(questions)}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        testAllQuestions() {
            dispatch(testAllQuestions());
        }
    }
}

function apStateToProps(state) {
    return{
        questions: state.question
    }
}

export default connect(apStateToProps, mapDispatchToProps)(PerformTest)