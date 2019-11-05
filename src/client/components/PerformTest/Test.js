import React, {Component} from 'react';

export default class Test extends Component{

    render() {
        return (
            <div style={{display: "grid"}}>
                <h3 style={{marginBottom: 10}}>{this.props.question.description}</h3>
                {
                    this.props.question.answers.map((e) => {
                        return <label><input style={{margin: 16}} key={e.id} type="radio"  onClick={() => {
                            this.props.thinkCorrectness(e.id)
                        }}/> {e.name}</label>

                    })
                }
                <button style={{width: "8%", margin: 10}}>Next</button>
            </div>
        )
    }
}