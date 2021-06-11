import React,{useState,useEffect} from 'react';
import "./gamezone.scss";
import Navbar from "../common/navbar/Navbar";
import CarouselContainer from "../common/CarouselContainer";
import { IMAGE_PATH, ICON_PATH ,LEADERBOARD_API} from "../../utilities/constant";
import { Carousel } from 'react-bootstrap';
import SpinTheWheel from "../common/spinTheWheel/SpinTheWheel";
import Leaderboard from '../leaderboard/leaderboard';
import axios from 'axios';
import Spinner from "../common/spinner/Spinner";
import Sliders from "../slider/slider";


export default function Gamezone(props) {
    const [isSpinWheelOpen, setSpinWheel] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading ,setLoading] = useState(false);

    useEffect(() => {
        updateLeaderboard()
    },[])

    const updateLeaderboard = () => {
        setLoading(true);
        axios.get(LEADERBOARD_API)
             .then((response) => {
                 if(response && response.data) {
                     const userList = response.data.map((item,index )=> {
                         return { rank:index+1,username:item.userName,score:item.score,id : item._id}
                     })
                     setUsers(userList);
                 }
                 setLoading(false);
             })
             .catch(err => {
                 console.log(err);
                 setLoading(false)
             })
    }

    return (
        <div className="page">
            {(isLoading) ? <Spinner/>: null}
            <Navbar />
            {(isSpinWheelOpen) ? <SpinTheWheel onExit={() => {setSpinWheel(!isSpinWheelOpen); updateLeaderboard();} }/> : null}
            <div className="page-main flex-column rg-20" style={{backgroundColor : "#f1f3f6"}}>
            {/* <CarouselContainer /> */}
                <div>
                    <Sliders />
                </div>
                <div className="flex-space wd-100">
                    <div className="game-section">
                        <img src={IMAGE_PATH + "spinQuiz.png"} alt="main" style={{width:"45%" , height : "300px"}} onClick={() => setSpinWheel(!isSpinWheelOpen)}/>
                        <img src={IMAGE_PATH + "slotmachine.png"} alt="main" style={{width:"45%" ,height : "300px"}}/>
                        <img src={IMAGE_PATH + "pool.png"} alt="main" style={{width:"45%", height : "300px"}}/>
                    </div>
                    <div className="leaderboard">
                        <Leaderboard users={users}/>
                    </div>
                </div>    
            </div>
        </div>
    )
}