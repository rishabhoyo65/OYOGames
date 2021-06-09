import React, {useState,useRef} from 'react'
import './navbar.scss';
import { Redirect } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import {ICON_PATH,IMAGE_PATH} from '../../../utilities/constant';


export default function Navbar() {

    const [isLogoutWindowOpen, setLogOutWindow] = useState(false);
    const logoutRef = useRef();
    const [userName, setUserName] = useState("Sachin");

    function onHandleLogout(){
        setUserName("");
    }

    

    useOutsideClick(logoutRef,() => setLogOutWindow(false),isLogoutWindowOpen);

    return (
        <div className="navbar">
            <img src={IMAGE_PATH + "OYO_Lettermark.svg"} alt="OYO"/>    
            <div className="right_sec">
                <img src={ICON_PATH + "notification_Bell.svg"} alt=""/>
                <div className="profile" >
                    <div className="profile_icon">{userName.charAt(0)}</div>
                    <div>{userName}</div>
                    <img src={ICON_PATH + "chevron-up.svg"} alt="^" className={isLogoutWindowOpen ? "chevron_up" : "chevron_down"} onClick={() => setLogOutWindow(!isLogoutWindowOpen)} style={{cursor:'pointer'}}/>
                    {(isLogoutWindowOpen) ? 
                        <div className="logout" onClick = {onHandleLogout} ref={logoutRef}>
                            <img src={ICON_PATH + "log-out.svg"} alt="[ >" />
                            <div>Logout</div>
                        </div>
                        : null 
                    }
                </div>
            </div>
        </div>
    )
}
