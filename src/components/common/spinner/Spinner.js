import React from 'react'
import "./spinner.css"
import {IMAGE_PATH} from '../../../utilities/constant'




function Spinner(props) {
    return (
        <div className = "loader-container" style = {props.style}>
            <img className= "loading" alt="loader"
            src = {IMAGE_PATH + "loader.svg"}></img>
        </div>
    )
}

export default Spinner
