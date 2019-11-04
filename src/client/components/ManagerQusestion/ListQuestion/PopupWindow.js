import React, {Component} from 'react';

class PopupWindow extends Component{

render() {

    const f = {overflow: "auto",
    background: "brown",
    width: "50%",
    padding: "10px",
    margin: "0% auto",
    position: "relative",
    top: -112};
    return (
        <div style={f}>
            <h3>Do you want to delete question</h3>
            <button style={{float: "left"}} onClick={() => {
                this.props.delete(this.props.values)
            }}>OK
            </button>
            <button style={{float: "right"}} onClick={() => {
                this.props.closed()
            }}>Cancel
            </button>
        </div>
    )

}
}

export default (PopupWindow)