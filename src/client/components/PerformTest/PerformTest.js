import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchAllQuestions, resultTestQuestion, testAllQuestions} from "../../api";
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
            visibleTest: true,
            timeSurvey: new Date(),
            stopTimer: false,
            hour: 0,
            minute: 0,
            second: 0,
        };

        this.checkedIDAnswer = this.checkedIDAnswer.bind(this);
        this.thinkCorrectness = this.thinkCorrectness.bind(this);
        this.funcTime = this.funcTime.bind(this);
    }

    static propTypes = {
        testAllQuestions: PropType.func.isRequired,
        resultTestQuestion: PropType.func.isRequired,
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
    }

    //выбрал вариант и нажал кнопку
    thinkCorrectness() {
        const {questions} = this.props.questions;

        if (questions.length > this.state.indexQuestion) {
            this.setState(state => ({indexQuestion: state.indexQuestion + 1}));

            const obj = {
                answer: this.state.checkedIdAnswer,
                question: questions[this.state.indexQuestion].id
            };

            //не отвеченные вопросы
            if (this.state.checkedIdAnswer === null && questions.length !== this.state.indexQuestion) {
                this.setState(state => ({indexNullAnswer: state.indexNullAnswer + 1}));
            }

            //массив с обьектами который отправим на сервер для подщета ответов
            this.selectedCheckboxes.push(obj);

            console.log(this.selectedCheckboxes);

            console.log(this.state.indexNullAnswer, "nullAnswer");
            this.setState({checkedIdAnswer: null});
            this.setState({idQuestion: null});


            if (this.selectedCheckboxes.length === questions.length) {
                this.setState({visibleTest: false});
                this.setState({stopTimer: true});
                this.props.resultTestQuestion(this.selectedCheckboxes);
            }
        } else {
            return null;
        }
    }

    // при ответе на последний вопрос скрывает убирает кнопку и тестовые вопросы
    buttonVisible() {
        if (this.state.visibleTest) {
            return <button onClick={this.thinkCorrectness}
                           style={{width: "8%", marginTop: 40}}>Next</button>
        }
    }

    //получение данных с таймера
    funcTime(hour, minute, second) {

        console.log(hour, "hour");
        console.log(minute, "minute");
        console.log(second, "second");
        this.setState({hour: hour});
        this.setState({minute: minute});
        this.setState({second: second});

    }

    //результат
    resultsFunc() {
        if (!this.state.visibleTest) {
            return (
                <div>
                    <h2>Results:</h2>
                    <table width={"50%"}>
                        <tbody>
                        <tr>
                            <td>Testing time:</td>
                            <td>{`${this.state.hour} : ${this.state.minute} : ${this.state.second}`}</td>
                        </tr>
                        <tr>
                            <td>Correct answer</td>
                            <td>{this.props.questions.result.correct}</td>
                        </tr>
                        <tr>
                            <td>Incorrect answer</td>
                            <td>{this.props.questions.result.incorrect}</td>
                        </tr>
                        <tr>
                            <td>Unanswered question</td>
                            <td>{this.state.indexNullAnswer}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return null;
        }
    }

    //отображение тестовых вопросов по порядку
    testsFunc(question) {
        return question.map((e, index) => {
            if (index === this.state.indexQuestion) {
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
                <Clock funcTime={this.funcTime} stopTimer={this.state.stopTimer}/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        testAllQuestions() {
            dispatch(testAllQuestions())
        },
        resultTestQuestion(array) {
            dispatch(resultTestQuestion(array))
        }
    }
}

function apStateToProps(state) {
    return {
        questions: state.question
    }
}

export default connect(apStateToProps, mapDispatchToProps)(PerformTest)