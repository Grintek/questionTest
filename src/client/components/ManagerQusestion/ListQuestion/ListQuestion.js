import React, {Component} from "react"
import '../StyleManager.scss'
import PropType from 'prop-types';
import Button from "@material-ui/core/Button";
import connect from "react-redux/es/connect/connect"
import {fetchAllQuestions} from "../../../api/index"
import {deleteQuestion} from "../../../api";
import PopupWindow from "./PopupWindow";


class ListQuestion extends Component {
    constructor(props){
        super(props);

        this.state = {
            booleanUpdate: false,
            windowVisible: false,
            deleteId: null,
        };

        this.onWindow = this.onWindow.bind(this);

    }
    static propTypes = {
        fetchAllQuestions: PropType.func.isRequired,
        deleteQuestion: PropType.func.isRequired,
        quest: PropType.object.isRequired
    };

    componentDidMount() {
        this.props.fetchAllQuestions();
    }


    deleteQuestion = (id) =>{
        this.props.deleteQuestion(id);
        this.setState({ windowVisible: false });
        this.setState({ booleanUpdate: true });
    };

    onWindow(id){
        console.log(id);
        this.setState(state => ({
            windowVisible: state.windowVisible = true,
            deleteId: state.deleteId = id
    }));
        this.setState({ })
    }

    closeWindow = () =>{
        this.setState( state =>({windowVisible: state.windowVisible = false}));
    };

    popupWind(){
        if(this.state.windowVisible === true) {
            return (<PopupWindow values={this.state.deleteId} closed={this.closeWindow.bind(this)} delete={this.deleteQuestion} />);
        }else{
            return null;
        }
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
                        <Button onClick={this.onWindow.bind(this, e.id)} className="delete">Delete</Button>
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

                <Button href={"/manager/question"} >Add New Question</Button>

                {this.popupWind()}
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