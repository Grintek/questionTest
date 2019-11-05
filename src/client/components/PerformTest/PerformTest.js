import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchAllQuestions, testAllQuestions} from "../../api";
import Test from "./Test";
import PropType from "prop-types";
import Clock from "./Clock";

class PerformTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIdAnswer: null,
            indexQuestion: 0,
            indexNullAnswer: 0,
            buttonVisible: true,
            timeSurvey: new Date()
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

    componentWillMount() {
        this.selectedCheckboxes = [];
    }

    //выбрал ответ
    checkedIDAnswer(answerId) {
        this.setState({checkedIdAnswer: answerId});
        if (this.state.checkedIdAnswer !== null) {
            this.setState(state => ({indexNullAnswer: state.indexNullAnswer + 1}));
        }
    }

    //выбрал вариант и нажал кнопку
    thinkCorrectness() {
        const {questions} = this.props.questions;

        console.log(questions.length,"длина");
        console.log(this.state.indexQuestion,"длина накопления");

        if (questions.length > this.state.indexQuestion) {
            this.setState(state => ({indexQuestion: state.indexQuestion + 1}));

            const obj = {
                question: questions[this.state.indexQuestion].id,
                answer: this.state.checkedIdAnswer,
                missed: this.state.indexNullAnswer
            };

            //массив с обьектами который отправим на сервер для подщета
            this.selectedCheckboxes.push(obj);

            console.log(this.selectedCheckboxes);

            this.setState({checkedIdAnswer: null});
            this.setState({idQuestion: null});
            if(this.selectedCheckboxes.length === questions.length){
                this.setState({buttonVisible: false});
            }
        }else{
            return null;
        }
    }

    buttonVisible() {
        if (this.state.buttonVisible) {
            return <button onClick={this.thinkCorrectness}
                           style={{width: "8%", marginTop: 40}}>Next</button>
        }
    }

    resultsFunc() {
        if(!this.state.buttonVisible) {
            return (
                <div>
                    <h2>Results:</h2>
                    <table width={"50%"}>
                        <tbody>
                        <tr>
                            <td>Testing time:</td>
                            <td>"Time"</td>
                        </tr>
                        <tr>
                            <td>Correct answer</td>
                            <td>correct</td>
                        </tr>
                        <tr>
                            <td>Incorrect answer</td>
                            <td>incorrect</td>
                        </tr>
                        <tr>
                            <td>Unanswered question</td>
                            <td>Unanswered</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }else{
            return null;
        }
    }

    testsFunc(question) {
        return question.map((e, index) => {
            if (index  === this.state.indexQuestion) {
                return (
                    <Test key={e.id} checkedIdAnswer={this.state.checkedIdAnswer} checkedIDAnswer={this.checkedIDAnswer}
                          question={e} answer={this.thinkCorrectness}/>)
            } else {
                return null;
            }
        })

    }



    render() {

        const {questions} = this.props.questions;


        return (
            <div style={{margin: "0px 10px"}}>
                {this.testsFunc(questions)}
                {this.buttonVisible()}
                {this.resultsFunc()}
                <Clock/>
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
    return {
        questions: state.question
    }
}

export default connect(apStateToProps, mapDispatchToProps)(PerformTest)