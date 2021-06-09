import React from 'react'
import "./spinner.scss"

function Spinner(props) {
    return (
        <div className = "loader-container" style={{width:props.width, height:props.height}}>
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner
