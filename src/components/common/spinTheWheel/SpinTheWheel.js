import React, {useState,useEffect} from 'react';
import Modal from '../modal/Modal';
import "./spinthewheel.scss";
import {ICON_PATH,LOCATION_API,QUESTION_API} from "../../../utilities/constant";
import Wheel from "./Wheel";
import axios from 'axios';
import CustomButton from '../buttons/CustomButton';

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

    const handleSpinSelect = (id) => {
        setSelectedLocation(id);
    }

    const handlePageChange = () => {
        if(page === 1) {
            getQuestion();
            setPage(2);
        } else if (page === 2) {
            setPage(1);
        }
    }

    const getQuestion = () => {
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
             })
             .catch((err) => {
                 console.log(err);
             })
    }

    const handleExitClick = () => {    
        props.onExit();
    }

    useEffect(() => {
        axios.get(LOCATION_API)
             .then(response => {
                 if(response && response.data) {
                     let locations = response.data || [];
                     setlocations(locations)
                 }
             })
             .catch(err => {
                 console.log(err)
             })
    },[])

    return (
        <Modal>
            <div className="modal-container">
                <img className="crossmark" src={ICON_PATH + "white_x.svg"} onClick={handleExitClick} alt=""/>
                <div className="spinner-backdrop">
                    <h2 className="game-heading">Spin the wheel</h2>
                    {
                        (page === 1) ?
                        <div className="wheel-block">
                            <Wheel items={locations} onSelectItem={handleSpinSelect}/>
                            {(selectedLocation) ? <CustomButton type="colored" color="green" buttonName="Ready For Question" padding="16" onClick={handlePageChange}/> : null}
                        </div>
                        :
                        <div className="quiz-block">
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
                            {(option) ? <CustomButton type="colored" color="green" buttonName="Submit" padding="128" onClick={handlePageChange}/>: null}
                        </div>
                    }
                </div>
            </div> 
        </Modal>
    )
}
