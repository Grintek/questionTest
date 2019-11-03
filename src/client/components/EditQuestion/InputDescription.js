import React, {Component} from 'react'

function InputDescription(props){
        return(
            <label>Question: <input onChange={props.input.bind(this)} value={props.values} type="text"/></label>
        )
    }
export default (InputDescription)