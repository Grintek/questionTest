import React, {Component} from 'react';
import {redirectTo} from "@reach/router";

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
    handleSubmit(){
        alert( `name ${this.state.name}`);
        alert( `checked ${this.state.correct}`);
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
            <form onSubmit={this.handleSubmit}>
                <label style={{ display: "block" }}>Answer:<input type="text" onChange={this.handleChange}/></label>
                <label style={{ display: "block" }} >Is correct:<input type="checkbox" checked={this.state.correct} onChange={this.checkBox}/></label>
                <button style={{ float: "left"}}>Create</button>
            </form>
                <button  onClick={this.onclickRedirect}>Cancel</button>
            </div>
        )
    }
}

export default(AddAnswer);