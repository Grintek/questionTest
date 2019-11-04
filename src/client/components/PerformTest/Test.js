import React, {Component} from 'react';

export default class Test extends Component{

    render() {
        return (
            <div>
                <h3 style={{marginBottom: 10}}>{this.props.question.description}</h3>
                {
                    this.props.question.answers.map((e) => {
                        return <input style={{ }} key={e.id} type="radio" value={e.name} onClick={() => {
                            this.props.thinkCorrectness(e.id)
                        }}/>

                    })
                }
            </div>
        )
    }
}