import React, {Component} from 'react'
import {Redirect} from "@reach/router";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux/es/alternate-renderers";
import PropType from "prop-types";
import Answers from "./Answers";
import InputDescription from "./InputDescription"
import {fetchOneQuestion, updateOneQuestion} from "../../../api";
import axios from "axios";
import { prefixApi } from '../../../../etc/configTest';


class EditQuestion extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectCorrect: null,
            redirect: false,
            description: "",
            checked: false
        };


        this.submitSave = this.submitSave.bind(this);
        this.onclickRedirect = this.onclickRedirect.bind(this);
        this.inputDesk = this.inputDesk.bind(this);
        this.radioChecked = this.radioChecked.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    static propTypes = {
        fetchOneQuestion: PropType.func.isRequired,
        updateOneQuestion: PropType.func.isRequired,
        quest: PropType.object.isRequired
    };

     componentWillMount(){
        this.selectedCheckboxes = new Set();
    }


    componentDidMount()
    {
        this.props.fetchOneQuestion(this.props.id);
        axios.get(`${prefixApi}/questions/${this.props.id}`)
            .then(response => {
                this.setState({description: response.data.description});

                const answer = response.data.answers.find(x => x.correct === true);

                if(answer !== undefined) {
                    this.setState({selectCorrect: answer.id});
                }

            })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        const answer1 = this.props.quest.question.answers.find(x => x.correct === true);
        const answer2 = prevProps.quest.question.answers.find(x => x.correct === true);

        if(answer1 !== undefined) {
            if (answer1 !== answer2) {
                if (this.state.selectCorrect !== answer1.id) {
                    this.setState({selectCorrect: answer1.id});
                }
            }
        }
    }

    toggleCheckbox = label => {
      if(this.selectedCheckboxes.has(label)){
          this.selectedCheckboxes.delete(label);
      }else{
          this.selectedCheckboxes.add(label);
      }
    };


    inputDesk(description){
        const value = description.target.value;
        this.setState({description: value});

    };

    submitSave(){
        const a = Array.from(this.selectedCheckboxes);
        let d = this.props.quest.question.answers;
        d = d.filter((item) => !a.includes(item));

        d.map((s) => {
            if(s.id === this.state.selectCorrect){
                s.correct = true
            }else{
                s.correct = false
            }
        });

        this.props.updateOneQuestion(this.props.id, this.state.description, d);

    }

    onclickRedirect(){
        this.setState({redirect: true});
    }

    radioChecked(id){
        this.setState({ selectCorrect: id})
    }

    render() {

        if(this.state.redirect === true){
           return<Redirect to={"/manager"}/>
        }

        const link = `/manager/${this.props.id}/answer`;

        const question = this.props.quest.question;

        return(
            <div>
                <InputDescription input={this.inputDesk} values={this.state.description}/>
                <table className="tb">
                    <tbody>
                    <tr><th className="tb tb_column_left">Answer</th><th className="tb tb_column_right">Correct</th><th className="tb tb_column_right">Delete</th></tr>
                    {question.answers.map((e) => <Answers checkbox={this.toggleCheckbox} func={this.radioChecked} correct={this.state.selectCorrect} key={e.id} value={e}/>)}
                    </tbody>
                </table>
                <div style={{width: "100%"}}>
                    <Button href={link}>Add Answer</Button>
                </div>
                <input onClick={this.submitSave} style={{ float: "left"}} type="button" value="Save"/>
                <input value="Cancel" type="button" onClick={this.onclickRedirect}/>
            </div>
        )
    }
}

function mapDispatchToProps(description) {

   return {
       fetchOneQuestion(id){
           description(fetchOneQuestion(id))
       },
       updateOneQuestion(id, answer, desc){
           description(updateOneQuestion(id, answer, desc))
       }
   }
}

function mapStateToProps(state) {
    return {
        quest: state.question
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);