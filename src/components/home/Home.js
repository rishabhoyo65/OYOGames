import React from 'react';
import "./home.scss";
import Navbar from "../common/navbar/Navbar";
import Leaderboard from "../leaderboard/Leaderboard";

export default function Home() {
    return (
        <div className="page">
            <Navbar/>
            <div className="page-main">
                <Leaderboard />
            </div>
        </div>
    )
}
