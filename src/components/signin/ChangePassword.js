import React,{useState,useEffect} from 'react';
import styles from "./signIn.module.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Spinner from "../common/spinner/Spinner";
import { IMAGE_PATH,SIGNIN,ICON_PATH,RESET_PASSWARD_BFF} from "../../helper/pathConstants";
import {PASSWORD_NOT_RESET,SUCCESSFUL} from "../../helper/text_EN"

export default function ChangePassword(props) {
    const [passwords, setPasswords] = useState({ new: "", confirm : "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const query = new URLSearchParams(props.location.search);

    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        setPasswords((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        let newPassword = passwords.new.trim();
        let confirmedPassword = passwords.confirm.trim();
        if(newPassword.length === 0 && confirmedPassword.length === 0) {
            setError("Enter Both Fields");
        } else if (newPassword.length > 0 && confirmedPassword === 0) {
            setError("Confirm New Password");
        } else if (newPassword.length === 0 && confirmedPassword.length > 0) {
            setError("Enter New password")
        } else if(newPassword !== confirmedPassword) {
            setError("Both Passwords doesn't Match");
        } else {
            let data = {
                password : newPassword,
                reset_password_token: query.get("reset_password_token")
            }
            setLoading(true);
            axios
                 .post(RESET_PASSWARD_BFF,data)
                 .then(res => {
                    if(res && res.data && res.data.message === SUCCESSFUL) {
                        props.history.push(SIGNIN);
                    } else {
                        let message = (res.data && res.data.message) || PASSWORD_NOT_RESET;
                        setError(message);
                    }
                    setLoading(false);
                 })
                 .catch(err => {
                    let message = (err.response.data && err.response.data.message) || PASSWORD_NOT_RESET;
                    setError(message);
                    setLoading(false);
                 })

        }
    };

    useEffect(() => {
        let reset_password_token = query.get("reset_password_token");
        if (!reset_password_token || reset_password_token.trim().length === 0) {
            props.history.push(SIGNIN);
        }
    },[])

    return (
        <div className={styles.signInpage}>
        {loading && <Spinner />}
        <div className={styles.rowLogo}>
            <img src={IMAGE_PATH + "OYO_Lettermark.svg"} alt="OYO" />
        </div>
        <div className={styles.rowContent}>
            <div className={styles.col1}>
                <img src={IMAGE_PATH + "img_login.svg"} alt="main" />
            </div>
            <div className={styles.col2}>
                <div className={styles.signIn_sec}>
                    <form className={styles.signIn_form}>
                        <h3>Change Password</h3>
                        <p className={styles.error}>{error}</p>
                        <div className={styles.password}>
                            <input
                                type={isNewOpen ? "text" : "password"}
                                id="new"
                                value={passwords.new}
                                placeholder="New Password"
                                onChange={inputChangeHandler}
                            />
                            <img
                                src={isNewOpen ? ICON_PATH + "eye.svg" : ICON_PATH + "eye-no.svg"}
                                alt=""
                                onClick={() => {
                                    setIsNewOpen((isNewOpen) => !isNewOpen);
                                }}
                            />
                        </div>
                        <div className={styles.password}>
                            <input
                                type={isConfirmOpen ? "text" : "password"}
                                id="confirm"
                                value={passwords.confirm}
                                placeholder="Confirm Password"
                                onChange={inputChangeHandler}
                            />
                            <img
                                src={isConfirmOpen ? ICON_PATH + "eye.svg" : ICON_PATH + "eye-no.svg"}
                                alt=""
                                onClick={() => {
                                    setIsConfirmOpen((isConfirmOpen) => !isConfirmOpen);
                                }}
                            />
                        </div>
                        <p className={styles.error}></p>
                        <input
                            type="submit"
                            value="Change Password"
                            className="mar-tb-10 pad-12"
                            onClick={handleSubmitClick}
                            style={{cursor:'pointer'}}
                        />
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
