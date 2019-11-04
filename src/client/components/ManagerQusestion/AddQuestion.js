import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createOneQuestion} from "../../api";
import PropType from "prop-types";
import {Redirect} from "@reach/router";


class AddQuestion extends Component {
   constructor(props){
   super(props);

   this.state = {
       description: "",
       redirect: false,
       cancel: false
   };



   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.onclickRedirect = this.onclickRedirect.bind(this);
   }

    static propTypes = {
        createOneQuestion: PropType.func.isRequired,
    };

    handleSubmit(){
       if(this.state.description !== "") {
           this.setState({
               redirect: true
           })
       }
       this.props.createOneQuestion(this.state.description);
   }


    handleChange(event){
        this.setState({description: event.target.value});
    }

    onclickRedirect(){

       this.setState({cancel: true});
    }
    render(){

       if(this.state.redirect === true || this.state.cancel === true){
           return <Redirect to="manager"/>
       }

        return(
            <div>
                <div style={{width: "100%", marginBottom: 5}}>
                    <input  type="text" placeholder="name" value={this.state.description} onChange={this.handleChange}/>
                </div>
                <button onClick={this.handleSubmit} style={{ float: "left"}}>Create</button>
                <button onClick={this.onclickRedirect}>Cancel</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        createOneQuestion(state){
            console.log(state);
            dispatch(createOneQuestion(state));
        }
    }
}

export default connect(null, mapDispatchToProps)(AddQuestion);