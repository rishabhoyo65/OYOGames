import React from 'react';
import './modal.css';

export default function Modal(props) {
    return (
        <div className="modal_wrapper" >
            <div className="modal_backdrop">
                {props.children}
            </div>
        </div>
    )
}
