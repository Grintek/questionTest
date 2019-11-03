import React, {Component} from 'react';
import {redirectTo} from "@reach/router";
import {addOneAnswer} from "../../api";
import connect from "react-redux/es/connect/connect";
import PropType from "prop-types";

class AddAnswer extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            id: "",
            correct: false,
            redirect: false,
            cancel: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkBox = this.checkBox.bind(this);
        this.onclickRedirect = this.onclickRedirect.bind(this);

    }

    static propTypes = {
        addOneAnswer: PropType.func.isRequired
    };

    handleSubmit(){
        alert( `name ${this.state.name}`);
        alert( `checked ${this.state.correct}`);
        this.props.addOneAnswer(this.state.name, this.state.correct, this.props.id);
    }
    handleChange(e){
        let a = e.target.value;
        this.setState({name: a});
    }
    checkBox(){
        this.setState({correct: true})
    }

    onclickRedirect(){
        this.setState({cancel: true});
    }

    render() {
        if(this.state.redirect === true & this.state.name !== "" || this.state.cancel === true){
            return redirectTo(`/manager/${this.props.id}`)
        }
        return(
            <div>
                <label style={{ display: "block" }}>Answer:<input type="text" onChange={this.handleChange}/></label>
                <label style={{ display: "block" }} >Is correct:<input type="checkbox" checked={this.state.correct} onChange={this.checkBox}/></label>
                <button onClick={this.handleSubmit} style={{ float: "left"}}>Create</button>
                <button  onClick={this.onclickRedirect}>Cancel</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        addOneAnswer(name, connect, id){
            dispatch(addOneAnswer(name, connect, id));
        }
    }
}

export default connect(null, mapDispatchToProps)(AddAnswer);