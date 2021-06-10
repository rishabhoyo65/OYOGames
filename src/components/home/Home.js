import React from 'react';
import "./home.scss";
import Navbar from "../common/navbar/Navbar";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";


export default function Home() {
    return (
        <div className="page">
            <Navbar/>
            <div className="page-main">
                <div >
                    <img src={IMAGE_PATH + "search.png"} alt="main" style={{width:"100%"}}/>
                </div>
                <div  style={{ width:"100%", height: 150,backgroundColor: 'green' }}>
                    <p style={{ textAlign:"center",fontSize: 30}}>  <b>Game Section</b></p>
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