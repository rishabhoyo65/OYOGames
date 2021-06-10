import React from 'react';
import "./gamezone.scss";
import Navbar from "../common/navbar/Navbar";
import CarouselContainer from "../common/CarouselContainer";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";
import { Carousel } from 'react-bootstrap';
import Leaderboard from '../leaderboard/leaderboard';
import Sliders from "../slider/slider";


export default function Gamezone() {
    return (
        <div className="page">
            <Navbar />
            <div className="page-main">
                <div>
                    <Sliders />
                </div>
                <div className="flex wd-100">
                    <div >
                            <div >
                            <img src={IMAGE_PATH + "spinQuiz.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                            <div >
                            <img src={IMAGE_PATH + "slotmachine.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                            <div >
                            <img src={IMAGE_PATH + "pool.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                    </div>  
                    <div >
                            <div >
                            <img src={IMAGE_PATH + "pool.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                            <div >
                            <img src={IMAGE_PATH + "chess.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                            <div >
                            <img src={IMAGE_PATH + "spinQuiz.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                    </div>  
                    <div >
                            <div >
                            <img src={IMAGE_PATH + "spinQuiz.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                            <div >
                            <img src={IMAGE_PATH + "pool.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                            <div >
                            <img src={IMAGE_PATH + "chess.png"} alt="main" style={{width:"80%"}}/>
                            </div>
                    </div>  
                
                    <div className="leaderboard">
                        <Leaderboard />
                    </div>
                </div>

            </div>
        </div>
    )
}