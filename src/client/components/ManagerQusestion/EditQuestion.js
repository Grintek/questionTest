import React, {Component} from 'react'
import {redirectTo} from "@reach/router";
import Button from "@material-ui/core/Button";


class EditQuestion extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectCorrect: "123123",
            redirect: false,
            description: "",
            checked: false
        };

        this.submitSave = this.submitSave.bind(this);
        this.radioForm = this.radioForm.bind(this);
        this.checkBoxForm = this.checkBoxForm.bind(this);
        this.onclickRedirect = this.onclickRedirect.bind(this);
        this.questionDescription = this.questionDescription.bind(this);
    }
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    };

    toggleCheckbox = lablel => {
      if(this.selectedCheckboxes.has(lablel)){
          this.selectedCheckboxes.delete(lablel);
      }else{
          this.selectedCheckboxes.add(lablel);
      }
    };

    checkBoxForm(id){
        this.toggleCheckbox(id);
        console.log(`id: ${id}`);
    }

    radioForm(id){
        this.setState({ selectCorrect: id });
        console.log(`id = ${id}`);
    }

    submitSave(){
        for (const checkbox of this.selectedCheckboxes){
            alert(`id checked ${checkbox}`);
        }
      alert(this.state.selectCorrect);
      alert(this.state.description);
    }
    onclickRedirect(){
        this.setState({redirect: true});
    }


    questionDescription(e){
        let value = e.target.value;
        this.setState({description: value});
        console.log(this.state.description);
    }
    render() {
        if(this.state.redirect === true){
            redirectTo(`/manager`)
        }

        const dsa = [{ id: "123123", description: "asfsafasfSDas"}, { id: "12423", description: "asfsaafgfasfas"}, { id: "114223", description: "asfsDSafasfas"}];
        let values = dsa.map((e) => {
            return(
                <tr>
                    <th style={{ margin: 0, textAlign: "inherit" }} className="tb tb_column_left">{e.description}</th>
                    <th style={{ margin: 0 }} className="tb tb_column_right"><input checked={this.state.selectCorrect === e.id} onChange={this.radioForm.bind(this, e.id)} type="radio"/></th>
                    <th style={{ margin: 0 }} className="tb tb_column_right"><input onChange={this.checkBoxForm.bind(this, e.id)} type="checkbox"/></th>
                </tr>
            );
        });
        const link = `/manager/${this.props.id}/answer`;
        return(
            <div>
                <label>Question: <input onChange={this.questionDescription} type="text" value={this.state.description}/></label>
                <h1>{this.props.id}</h1>
                <table className="tb">
                    <tr><th className="tb tb_column_left">Answer</th><th className="tb tb_column_right">Correct</th><th className="tb tb_column_right">Delete</th></tr>
                        {values}
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
export default(EditQuestion);