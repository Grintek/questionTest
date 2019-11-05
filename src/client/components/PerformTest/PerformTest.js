import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchAllQuestions, testAllQuestions} from "../../api";
import Test from "./Test";
import PropType from "prop-types";

class PerformTest extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkedIdAnswer: null,
            idQuestion: null,
            indexQuestion: 0,
            indexNullAnswer: 0,
        };

        this.checkedIDAnswer = this.checkedIDAnswer.bind(this);
        this.thinkCorrectness = this.thinkCorrectness.bind(this);
    }

    static propTypes = {
        testAllQuestions: PropType.func.isRequired,
        questions: PropType.object.isRequired
    };

    componentDidMount() {
        this.props.testAllQuestions();
    }

    componentWillMount(){
        this.selectedCheckboxes = [];
    }

    checkedIDAnswer(answerId, questionId){
        this.setState({ checkedIdAnswer: answerId});
        this.setState({ idQuestion: questionId});
    }
    //пользователь выбрал вариант и нажал кнопку
    thinkCorrectness(){
        if(this.state.checkedIdAnswer === null){
            this.setState(state =>({indexNullAnswer: state.indexNullAnswer + 1 }));
        }
        const obj = { question: this.state.idQuestion, answer: this.state.id, missed: this.state.indexNullAnswer};

        this.selectedCheckboxes.push(obj);
        this.setState(state =>({ indexQuestion: state.indexQuestion + 1 }));
        this.setState({ checkedIdAnswer: null});


    }

    testsFunc(question){
       return  question.map((e, index) => {
           if(index === this.state.indexQuestion){
            return (<Test key={e.id} checkedIdAnswer={this.state.checkedIdAnswer} checkedIDAnswer={this.checkedIDAnswer} question={e} answer={this.thinkCorrectness}/>)
           }else {
               return null;
           }
        })

    }
    render() {

        const {questions} = this.props.questions;
        console.log(questions);

        return(
            <div style={{margin:"0px 10px"}}>
                {this.testsFunc(questions)}
                <button onClick={this.thinkCorrectness} style={{width: "8%", marginTop: 40}}>Next</button>
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