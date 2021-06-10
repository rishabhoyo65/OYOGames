import React from 'react';
import "./gamezone.scss";
import Navbar from "../common/navbar/Navbar";
import CarouselContainer from "../common/CarouselContainer";
import { IMAGE_PATH, ICON_PATH } from "../../utilities/constant";
import { Carousel } from 'react-bootstrap';


export default function Gamezone() {
    return (
        <div className="page">
            <Navbar />
            <div className="page-main">
            <CarouselContainer />

            </div>
        </div>
    )
}