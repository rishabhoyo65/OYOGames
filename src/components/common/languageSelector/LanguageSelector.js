import React ,{useState,useRef}from 'react'
import './languageSelector.css';
import Dropdown from '../dropdowns/Dropdown';
import useOutsideClick from '../../../hooks/useOutsideClick';
import {ICON_PATH} from '../../../utilities/constant'

const languages = {
  en : "English",
  da : "Danish"
}

const LanguageSelector = () => {
  const [isLanguageSelectorOpen , setLanguageSelector] = useState(false);
  const [selectedLanguage, setLanguage] = useState("English");
  const languageRef = useRef();

  const changeLanguage = (id) => {
    setLanguage(languages[id]);
    setLanguageSelector(!isLanguageSelectorOpen);
  }

  useOutsideClick(languageRef,() => setLanguageSelector(false),isLanguageSelectorOpen);

  return (
    <div className = "language-selector" onChange={changeLanguage} onClick={() => setLanguageSelector(!isLanguageSelectorOpen)}>
      <img src={ICON_PATH + "globe.svg"} alt=""/>
      <div className="display_language">{selectedLanguage}</div>
      <img src ={ICON_PATH + "chevron-up.svg"} alt="" className={isLanguageSelectorOpen ?"chevron_up" : "chevron_down"} />
      {
        (isLanguageSelectorOpen) ?
        <div className="dropdown_list" ref={languageRef}>
          <Dropdown data={["English / Global","Danish / dansk"]} handleClicks={[() => changeLanguage("en"),() => changeLanguage("da")]}/>
        </div>
        : null
      }      
    </div>
  )
}

export default LanguageSelector