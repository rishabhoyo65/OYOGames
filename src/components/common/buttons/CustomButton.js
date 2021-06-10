import React from 'react'

const buttonStyle = {
    height : "2.5rem",
    width: "fit-content",
    boxSizing : "border-box",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    cursor : 'pointer'
};

const colors = {
    blue : "#2298DA",
    red : "#EE2A24",
    blocked : " rgba(0, 0, 0, 0.12)",
    default : "white",
    green : "#00B28A"
}

export default function CustomButton(props) {
    
    const buttonCss = (props.type==="colored") ? 
        {...buttonStyle,backgroundColor : colors[props.color],color : colors["default"]} 
        : 
        {...buttonStyle,backgroundColor  : colors["default"],
            border: (props.color) ? "1px solid rgba(0, 178, 138, 0.5)" : "1px solid rgba(34, 152, 218, 0.2)" ,
            color : (props.color)?  colors[props.color] : colors["blue"]
        };  
    return (
        <div style={{...buttonCss,padding:`8px ${props.padding}px`}} onClick={props.onClick}>
            {props.buttonName}
        </div>
    )
}
