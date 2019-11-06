import React, {Component} from "react";

class Answers extends Component{

    render() {
        let val = this.props.value;
        return(
            <tr key={val.id}>
                <th style={{ margin: 0, textAlign: "inherit" }} className="tb tb_column_left">{val.name}</th>
                <th style={{ margin: 0 }} className="tb tb_column_right"><input checked={this.props.correct === val.id} onChange={() =>this.props.func(val.id)} type="radio"/></th>
                <th style={{ margin: 0 }} className="tb tb_column_right"><input onChange={() =>this.props.checkbox(val)} type="checkbox"/></th>
            </tr>
        )
    }

}

export default(Answers)