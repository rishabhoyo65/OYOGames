import React, { useState,  useEffect } from "react";
import styles from "./signIn.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";
import { IMAGE_PATH,ICON_PATH,SIGNIN_API,PLEASE_ENTER_EMAIL_AND_PASSWORD,SERVICE_TEMPORARILY_UNAVAILABLE} from "../../utilities/constant";




export default function SignIn() {
    const [checkboxCheckedStatus, setCheckboxChecked] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });
    const [isLoading, setLoading] = useState(false);
    const [error ,setError] = useState("");
   
    const history = useHistory();
    let maxSignInTimePeriod = 60 * 60 * 1000;

    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    

    const handleSubmitClick = (e) => {
        e.preventDefault();
        authenticateToServer();
    };

    useEffect(() => {
        if (checkboxCheckedStatus) maxSignInTimePeriod = 365 * 24 * 60 * 60 * 1000;
    }, [checkboxCheckedStatus]);

    const authenticateToServer = () => {
        if (user.email.length && user.password.length) {
            const payload = {
                email: user.email,
                password: user.password,
            };
            setLoading(true);
            axios
                .post(SIGNIN_API, payload)
                .then((res) => {
                    if (res && res.data.userId) {
                        localStorage.setItem("userId", res.data.userId);
                        localStorage.setItem("userName", res.data.userName);
                        localStorage.setItem("score", res.data.score);
                        localStorage.setItem("spinLeft",res.data.spinLeft);
                        history.push("/home");
                    } else {
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    let message = (error.response && error.response.data && error.response.data.error) || SERVICE_TEMPORARILY_UNAVAILABLE;
                    setError(message);
                    setLoading(false);
                });
        } else {
            setError(PLEASE_ENTER_EMAIL_AND_PASSWORD);
        }
            
    };

    return (
        <div className={styles.signInpage}>
            {isLoading && <Spinner />}
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
                            <h3>Sign in to OYO Rooms</h3>
                            <p className={styles.error}>{error}</p>
                            <input
                                type="text"
                                id="email"
                                className="mar-tb-10 pad-12"
                                value={user.email}
                                placeholder="Username (abc@oyorooms.com)"
                                onChange={inputChangeHandler}
                            />
                            <div className={styles.password}>
                                <input
                                    type={isPasswordOpen ? "text" : "password"}
                                    id="password"
                                    value={user.password}
                                    placeholder="Password"
                                    onChange={inputChangeHandler}
                                />
                                <img
                                    src={isPasswordOpen ? ICON_PATH + "eye.svg" : ICON_PATH + "eye-no.svg"}
                                    alt=""
                                    onClick={() => {
                                        setIsPasswordOpen((isPasswordOpen) => !isPasswordOpen);
                                    }}
                                />
                            </div>
                            <div className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="keepSignedIn"
                                    className="mar-tb-10"
                                    checked={checkboxCheckedStatus}
                                    onChange={() =>
                                        setCheckboxChecked(
                                            (checkboxCheckedStatus) => !checkboxCheckedStatus
                                        )
                                    }
                                />
                                <label>Keep me Signed in</label>
                            </div>
                            <input
                                type="submit"
                                value="Sign in"
                                className="mar-tb-10 pad-12"
                                onClick={handleSubmitClick}
                                style={{cursor:'pointer'}}
                            />
                        </form>
                        <p className={styles.forgot} onClick={null}>Forgot Password?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
