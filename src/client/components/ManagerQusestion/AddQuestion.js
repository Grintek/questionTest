import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {createOneQuestion} from "../../api";
import PropType from "prop-types";


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
        questing: PropType.object.isRequired
    };

    componentDidMount() {

    }

   handleSubmit(event){
       event.preventDefault();
       alert("form is submitted " + this.state.description);
       if(this.state.description !== "") {
           this.setState({
               redirect: true
           })
       }
       this.props.createOneQuestion(this.state.description);
   }


    handleChange(event){
        this.setState({description: event.target.value});
        console.log('email was changed', event.target.value);
    }

    onclickRedirect(){

       this.setState({cancel: true});
    }
    render(){
       // if(this.state.redirect === true && this.state.description !== "" || this.state.cancel === true){
       //     return redirectTo("/manager")
       // }

        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <div style={{width: "100%", marginBottom: 5}}>
                    <input  type="text" placeholder="name" value={this.state.description} onChange={this.handleChange}/>
                </div>
               <button style={{ float: "left"}}>Create</button>
            </form>
                <button  onClick={this.onclickRedirect}>Cancel</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        createOneQuestion(){
            dispatch(createOneQuestion());
        }
    }
}

function mapStateToProps(state) {
    return{
        questing: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);