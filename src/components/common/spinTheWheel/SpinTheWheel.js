import React, {useState,useEffect} from 'react';
import Modal from '../modal/Modal';
import "./spinthewheel.scss";
import {ICON_PATH,LOCATION_API,QUESTION_API,CORRECT_ANSWER,WRONG_ANSWER,IMAGE_PATH,VERIFY_ANSWER} from "../../../utilities/constant";
import Wheel from "./Wheel";
import axios from 'axios';
import CustomButton from '../buttons/CustomButton';
import {SpinnerDiamond} from 'spinners-react';

export default function SpinTheWheel(props) {
    const [locations, setlocations] = useState([]);
    const [selectedLocation , setSelectedLocation] = useState("");
    const [page , setPage] = useState(1);
    const [question, setQuestion] = useState({
        id : "",
        content : "",
        type : "",
        image : "",
        options : []
    })
    const [option , setSelectedOption] = useState(null);
    const [sucess, setSucess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleSpinSelect = (id) => {
        setTimeout(() => setSelectedLocation(id),4500)
    }

    const loadWithDelay = () => {
        setTimeout(() => setLoading(false), 500)
    }

    const handlePageChange = () => {
        if(page === 1) {
            getQuestion();
            setPage(2);
        } else if (page === 2) {
            setPage(3);
        } else {
            setSelectedLocation("");
            setQuestion({
                id : "",
                content : "",
                type : "",
                image : "",
                options : []
            })
            setSelectedOption(null);
            setPage(1);
            setSucess(false)
        }
    }

    const handleSubmit = () => {
        setLoading(true)
        let payload = {
            answer : option,
            questionId : question.id,
            userId : localStorage.getItem('userId'),
            score : parseInt(localStorage.getItem('score'))
        }
        let spinLeft = parseInt(localStorage.getItem('spinLeft'));
        axios.post(VERIFY_ANSWER,payload)
            .then(response => {
                if(response && response.data) {
                    if(response.data.sucess) {
                        localStorage.setItem('score',payload.score + 5)
                    }
                    localStorage.setItem('spinLeft',spinLeft - 1);
                    setSucess(response.data.sucess);
                    handlePageChange();
                }
                loadWithDelay()
            })
            .catch(err => {
                console.log(err)
                loadWithDelay()
            })
    }

    const getQuestion = () => {
        setLoading(true)
        let params = {
            locationId : selectedLocation,
            userId : localStorage.getItem('userId')
        }
        let config = {}
        config.params = params;
        axios.get(QUESTION_API,config)
             .then(response => {
                 if(response && response.data && response.data.question) {
                     setQuestion( {
                        id : response.data.question[0]._id,
                        content : response.data.question[0].question.content,
                        type : response.data.question[0].question.type,
                        image : response.data.question[0].question.image,
                        options : response.data.question[0].options
                     })
                 }
                 loadWithDelay()
             })
             .catch((err) => {
                 console.log(err);
                 loadWithDelay()
             })
    }

    const handleExitClick = () => {    
        props.onExit();
    }

    useEffect(() => {
        setLoading(true)
        axios.get(LOCATION_API)
             .then(response => {
                 if(response && response.data) {
                     let locations = response.data || [];
                     setlocations(locations)
                 }
                 loadWithDelay()
             })
             .catch(err => {
                 console.log(err)
                 loadWithDelay()
             })
    },[])

    let displayJsx = null;

    if(page === 1) {
        displayJsx = <div className="wheel-block">
                        <div className="score-card">
                            <p>{`Your Current Score : ${localStorage.getItem('score')}`}</p>
                            <p>{`Spin Left : ${localStorage.getItem('spinLeft')}`}</p>
                        </div>
                        <div className="flex wd-100">
                            <Wheel items={locations} onSelectItem={handleSpinSelect} canSpin={(parseInt(localStorage.getItem('spinLeft')) > 0) ? true : false}/>
                            <ul className="rules">
                                <h3>Rules:</h3>
                                <li>#. Spin for a location based quiz.</li>
                                <li>#. You can only spin once.</li>
                                <li>#. Recieve +5 points for a right answer.</li>
                                <li>#. Click anywhere on the wheel, to spin.</li>
                            </ul>
                        </div>
                        {(selectedLocation) ? <CustomButton type="colored" color="green" buttonName="Ready For Question" padding="16" onClick={handlePageChange}/> : null}
                    </div>
    } else if (page === 2){
        displayJsx = <div className="quiz-block">
                        <h2 className="question">
                            {question.content}
                        </h2>
                        <div className="row-1">
                            <div className="col-2">
                                    {
                                        question.options.map((item,index) => {
                                            return <div className={`options ${(option === item.optionNo) ? 'selected': ''}`} key={index} onClick={() => setSelectedOption(item.optionNo)}>
                                                {item.content}
                                            </div>
                                        })
                                    }
                                </div>
                            <div className="col-1">
                                {(question.type === "image") ? <img src={question.image} alt="" style={{width: "100%", maxHeight : "300px"}}/> : null}
                            </div>
                            
                        </div>
                        {(option) ? <CustomButton type="colored" color="green" buttonName="Submit" padding="128" onClick={handleSubmit}/>: null}
                    </div>
    } else {
        displayJsx = <div className="flex-start-column rg-20">
            <h2 className="score">{(sucess) ? CORRECT_ANSWER : WRONG_ANSWER}</h2>
            <img src={`${IMAGE_PATH}${(sucess) ?"right.jpeg" : "wrong.png"}`} alt=""/>
            <h2 className="score">{`You collected +${(sucess) ? "5": "0"} score`}</h2>
            <CustomButton type="colored" color="green" buttonName="Start Again" padding="128" onClick={handlePageChange}/>
        </div>
    }

    return (
        <Modal>
            <div className="modal-container">
                <img className="crossmark" src={ICON_PATH + "white_x.svg"} onClick={handleExitClick} alt=""/>
                <div className="spinner-backdrop">
                    <SpinnerDiamond enabled={isLoading} size="40%" style={{height : '40%',position : 'absolute' ,top: '50%',
                    left: '50%', transform: 'translate(-50%,-50%)'}}/>
                    {
                        (isLoading) ? null : <React.Fragment>
                                <h2 className="game-heading">Spin the wheel</h2>
                                {displayJsx}
                            </React.Fragment>
                    }
                </div>
            </div> 
        </Modal>
    )
}
