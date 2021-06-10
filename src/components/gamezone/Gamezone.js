import React,{useState} from 'react';
import "./gamezone.scss";
import Navbar from "../common/navbar/Navbar";
import CarouselContainer from "../common/CarouselContainer";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";
import { Carousel } from 'react-bootstrap';
import SpinTheWheel from "../common/spinTheWheel/SpinTheWheel";


export default function Gamezone(props) {
    const [isSpinWheelOpen, setSpinWheel] = useState(false);

    return (
        <div className="page">
            <Navbar />
            {(isSpinWheelOpen) ? <SpinTheWheel onExit={() => setSpinWheel(!isSpinWheelOpen)}/> : null}
            <div className="page-main">
            {/* <CarouselContainer /> */}
            <div className="flex wd-100">
                <div className="game-section" onClick={() => setSpinWheel(!isSpinWheelOpen)}>
                    <img src={IMAGE_PATH + "slider1.png"} alt="" style={{width:"100%"}} />
                </div>
                <div className="leaderboard">

                </div>

            </div>

            </div>
        </div>
    )
}