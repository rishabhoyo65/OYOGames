import React from 'react'


const buttonStyle = {
    height : "2.5rem",
    width: "fit-content",
    boxSizing : "border-box",
    borderRadius: "6px",
    display : "flex",
    alignItem : "centre",
    marginRight : "1rem",
    flexWrap : 'wrap',
    cursor : 'pointer'
}

const buttonImageStyle = {
    display : "inline-block",
    padding : "0 0.5rem"
}

const buttonNameStyle = {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    paddingRight: "1rem",
    margin : "7px 0",
    height : "fit-content"
}

const colors = {
    blue : "#2298DA",
    red : "#EE2A24",
    default : "white",
    green : "#00B28A"
}


export default function Button(props) {
    
    const buttonCss = (props.type==="colored") ? 
        {...buttonStyle,backgroundColor : colors[props.color],padding: `0 ${props.padding}px`} : 
        {...buttonStyle,backgroundColor : colors["default"],
        border: (props.color) ? "1px solid rgba(0, 178, 138, 0.5)" : "1px solid rgba(34, 152, 218, 0.2)",
        padding: `0 ${props.padding}px`
    };
    const buttonNameCss = (props.type==="colored") ? {...buttonNameStyle,color : colors["default"]} 
        : {...buttonNameStyle , color : (props.color)?  colors[props.color] : colors["blue"]
    };  
    return (
        <div style = {buttonCss} onClick={props.onClick}>
            {(props.image) ?<img src={props.image} style={buttonImageStyle} alt=""/>: null}
            <p style={buttonNameCss}>{props.buttonName}</p>
        </div>
    )
}
