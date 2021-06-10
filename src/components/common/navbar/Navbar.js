import React, {useState,useRef} from 'react'
import './navbar.scss';
import { useHistory} from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import {ICON_PATH,IMAGE_PATH} from '../../../utilities/constant';
import LanguageSelector from "../languageSelector/LanguageSelector";


export default function Navbar() {
    const history = useHistory();
    const [isLogoutWindowOpen, setLogOutWindow] = useState(false);
    const logoutRef = useRef();
    const userName = localStorage.getItem("userName");

    function onHandleLogout(){
        localStorage.setItem("userId", '');
        localStorage.setItem("userName", '');
        localStorage.setItem("score", 0);
        localStorage.setItem("spinLeft",0);
        history.push("/");
    }

    

    useOutsideClick(logoutRef,() => setLogOutWindow(false),isLogoutWindowOpen);

    return (
        <div className="navbar">
            <img src={IMAGE_PATH + "OYO_Lettermark.svg"} alt="OYO" className="oyo-logo"/>    
            <div className="right_sec">
                <div className="promo-card flex-center">
                    <div className="promo-wrapper flex-center">
                        <img src={ICON_PATH + "wizard_gold.svg"} className="wild-card" alt="W"/>
                        <div className="promo-content flex-column">
                            <div className="row-text">
                            Become a Member
                            </div>
                            <div className="row-subtext">
                            Additional 10% off on stays
                            </div>
                        </div>
                    </div>
                </div>
                <LanguageSelector/>
                <img src={ICON_PATH + "notification_Bell.svg"} alt=""/>
                <div className="profile" onClick={() => setLogOutWindow(!isLogoutWindowOpen)}>
                    <div className="profile_icon">{userName.charAt(0)}</div>
                    <div>{userName}</div>
                    <img src={ICON_PATH + "chevron-up.svg"} alt="^" className={isLogoutWindowOpen ? "chevron_up" : "chevron_down"}  style={{cursor:'pointer'}}/>
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
