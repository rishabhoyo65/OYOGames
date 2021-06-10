import React,{useState} from 'react';
import "./gamezone.scss";
import Navbar from "../common/navbar/Navbar";
import CarouselContainer from "../common/CarouselContainer";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";
import { Carousel } from 'react-bootstrap';
import SpinTheWheel from "../common/spinTheWheel/SpinTheWheel";
import Leaderboard from '../leaderboard/leaderboard';


export default function Gamezone(props) {
    const [isSpinWheelOpen, setSpinWheel] = useState(false);

    return (
        <div className="page">
            <Navbar />
            {(isSpinWheelOpen) ? <SpinTheWheel onExit={() => setSpinWheel(!isSpinWheelOpen)}/> : null}
            <div className="page-main">
            {/* <CarouselContainer /> */}
                <div className="flex wd-100">
                    <div className="game-section">
                    <img src={IMAGE_PATH + "spinQuiz.png"} alt="main" style={{width:"80%"}} onClick={() => setSpinWheel(!isSpinWheelOpen)}/>
                    <img src={IMAGE_PATH + "slotmachine.png"} alt="main" style={{width:"80%"}}/>
                    </div>
                    
                    <div className="leaderboard">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </div>
    )
}