import React from 'react';
import {ICON_PATH} from '../../../utilities/constant'
import styles from './dropdown.module.css';

export default function Dropdown(props) {
    
    const itemJsx = props.data.map((item,index) => {
        return (
            <React.Fragment key={index}>
                <div className={styles.rows} onClick={props.handleClicks[index]}>{item}</div>
                {(index < props.data.length-1) ? <img className={styles.divider} src={ICON_PATH + "dropdown_divider.svg"} alt="-"/> : null}                
            </React.Fragment> 
        
        )
    })

    return (
        <div className={styles.list}>
            {itemJsx}
        </div>
    )
}
