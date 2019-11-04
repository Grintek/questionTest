import React, {Component} from "react"
import '../ManagerQusestion/StyleManager.scss'
import PropType from 'prop-types';
import Button from "@material-ui/core/Button";
import connect from "react-redux/es/connect/connect"
import {fetchAllQuestions} from "../../api/index"
import {deleteQuestion} from "../../api";
import PopupWindow from "./PopupWindow";


class ListQuestion extends Component {
    constructor(props){
        super(props);
        this.props.fetchAllQuestions();

        this.state = {
            windowVisible: false
        };

        this.onWindow = this.onWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }
    static propTypes = {
        fetchAllQuestions: PropType.func.isRequired,
        deleteQuestion: PropType.func.isRequired,
        quest: PropType.object.isRequired
    };

    componentDidMount() {
        this.props.fetchAllQuestions();
    }

    componentWillMount() {
        if(this.props.quest.questions.length === 0){
            this.forceUpdate();
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.fetchAllQuestions();
    }


    deleteQuestion(id){
        this.props.deleteQuestion(id);
        console.log(this.props.quest);
    }

    onWindow(){
        this.setState({ windowVisible: true });
    }

    closeWindow(){
        this.setState({ windowVisible: false });
    }


    render() {

        const {questions} = this.props.quest;
        const values = questions.map((e) => {
            return (
                <tr key={e.id}>
                    <th style={{margin: 0, textAlign: "inherit"}}
                        className="tb tb_column_left">{e.description}</th>
                    <th style={{margin: 0}} className="tb tb_column_right">
                        <Button href={`/manager/${e.id}`} className="bt_edit">Edit</Button>
                        <Button onClick={this.onWindow} className="delete">Delete</Button>
                    </th>
                </tr>
            )
        });
        return (
            <div>
                <table className="tb">
                    <tbody>
                    <tr>
                        <th className="tb tb_column_left">Question</th>
                        <th className="tb tb_column_right">Action</th>
                    </tr>
                    {values}
                    </tbody>
                </table>
                {
                    this.state.windowVisible
                        ? <PopupWindow closeWindow={this.closeWindow} onClickDelete={this.deleteQuestion}/>
                        : null
                }
                <Button href={"/manager/question"} >Add New Question</Button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllQuestions() {
            dispatch(fetchAllQuestions());
        },
        deleteQuestion(id) {
            dispatch(deleteQuestion(id));
        }
    }
}

function mapStateToProps(state) {
    return {
        quest: state.question
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListQuestion);