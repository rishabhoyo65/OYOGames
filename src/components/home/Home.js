import React from 'react';
import "./home.scss";
import Navbar from "../common/navbar/Navbar";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";


export default function Home(props) {

    const navigateToGameZone = () => {
        props.history.push("/gamezone");
    }

    return (
        <div className="page">
            <Navbar/>
            <div className="page-main flex-center-column" style={{padding : 0}}>
                <div >
                    <img src={IMAGE_PATH + "search.png"} alt="main" style={{width:"100%"}}/>
                </div>
                <div  style={{width : "88%",margin : "15px 0"}} onClick={navigateToGameZone}>
                    <img src={IMAGE_PATH + "gamezone.png"} alt="" style={{width : '100%', height : "200px"}}/>
                </div>
                <div >
                    <img src={IMAGE_PATH + "midhome.png"} alt="main" style={{width:"100%"}}/>
                </div>
                <div >
                    <img src={IMAGE_PATH + "footer1.png"} alt="main" style={{width:"100%"}}/>
                </div>
                <div >
                    <img src={IMAGE_PATH + "footer2.png"} alt="main" style={{width:"100%"}}/>
                </div>

            </div>
        </div>
    )
}