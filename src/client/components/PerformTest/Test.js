import React, {Component} from 'react';

export default class Test extends Component{

    render() {
        return (
            <div style={{display: "grid"}}>
                <h3 style={{marginBottom: 10}}>{this.props.question.description}</h3>
                {
                    this.props.question.answers.map((e) => {
                        return <label key={e.id}><input style={{margin: "10px 0px"}}
                                             onChange={() =>{this.props.checkedIDAnswer(e.id, this.props.id)}}
                                             checked={this.props.checkedIdAnswer === e.id} type="radio" /> {e.name}</label>

                    })
                }
            </div>

        )
    }
}