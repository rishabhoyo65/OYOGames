import React from "react";
import { Carousel } from "react-responsive-carousel";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";


export default () => (
  <Carousel autoPlay showThumbs={false}>
    <div>
      <img alt="" src={IMAGE_PATH + "Commingsoon.png"} style={{height : '400px'}}/>
      <p className="legend">Welcome</p>
    </div>
    <div>
      <img alt="" src={IMAGE_PATH + "slider1.png"} style={{height : '400px'}}/>
      <p className="legend">Play & Earn Points</p>
    </div>
    <div>
      <img alt="" src={IMAGE_PATH + "gamezone.png"} style={{height : '400px'}}/>
      <p className="legend">Win Amazing Prizes</p>
    </div>
    
  
  </Carousel>
);
