import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./LoginSignupPage.css";

export default function LoginSignupPage() {
    const [signupData, setSignupData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [signupmsg, setSignupmsg] = useState("");
    const [tosChecked, setTosChecked] = useState(false);
    const navigate = useNavigate();

    function handleSignupInputChange(event) {
        setSignupData({ ...signupData, [event.target.name]: event.target.value });
    }

    function handleLoginInputChange(event) {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    }

    function handleTosChecked(event) {
        setTosChecked(event.target.checked); // Update checkbox state
    }

    async function handleSignup(event) {
        event.preventDefault(); // Prevents the default form submit action
        try {
            const response = await axios.post('http://localhost:8000/api/users/signup', signupData);
            console.log("User registered successfully", response.data);
            setSignupmsg("User registered successfully, you may now log in.");
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setSignupmsg("Error registering user, please try again.");
        }
    }

    async function handleLogin(event) {
        event.preventDefault(); // Prevents the default form submit action
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', loginData);
            console.log("Login Successful", response.data);
            // setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setSignupmsg("Error with login, please check username and password and try again.");
        }
    }

    function changeTabs(event) {
        const btns = document.querySelectorAll(".mainButton");
        const articles = document.querySelectorAll(".content");

        console.log(btns);
        console.log(articles);

        setSignupmsg("");

        const id = event.target.dataset.id;

        if (id) {
            btns.forEach((btn) => {
                btn.classList.remove("live");
            });
            event.target.classList.add("live");

            articles.forEach((article) => {
                article.classList.remove("live");
            });
            const element = document.getElementById(id);
            element.classList.add("live");
        }
    }

    return (
        <div>
           <header>
                <img src="logo.png" alt="Foodie"></img>
            </header>
            <div className="tabs" onClick={changeTabs}>
                <div className="btn-container">
                    <button className="mainButton live" data-id="login">
                        Login
                    </button>
                    <button id="sign-up-tab-button" className="mainButton" data-id="signup">
                        Sign Up
                    </button>
                </div>
                <div className="tabs-content">
                    <div className="content live" id="login">
                        <form onSubmit={handleLogin}>
                            <input 
                                placeholder="email"
                                name="email"
                                value = {loginData.email}
                                onChange={handleLoginInputChange} />
                            <input 
                                placeholder="password" 
                                name="password" 
                                type="password"
                                value={loginData.password} 
                                onChange={handleLoginInputChange} />
                            <button type = "submit" className="button">Login</button>
                        </form>
                    </div>
                    <div className="content" id="signup">
                        <form onSubmit={handleSignup}>
                            <input 
                                placeholder="email" 
                                name="email" 
                                value={signupData.email} 
                                onChange={handleSignupInputChange}/>
                            <input 
                                placeholder="username" 
                                name="username" 
                                value={signupData.username} 
                                onChange={handleSignupInputChange} />
                            <input 
                                placeholder="password" 
                                name="password" 
                                type="password"
                                value={signupData.password} 
                                onChange={handleSignupInputChange} />
                            <div>
                                <input type="checkbox"
                                    checked = {tosChecked}
                                    onChange={handleTosChecked}
                                ></input>
                                <label>
                                    I agree to the <a href="https://en.wikipedia.org/wiki/Lionel_Messi">Terms of Service</a>
                                </label>
                            </div>
                            <button type = "submit" className="button" disabled = {!tosChecked}>Sign Up</button>
                        </form>
                    </div>
                    
                    <div className="successmsg">
                        {signupmsg}
                    </div>
                </div>
            </div>
        </div>
    );
}
