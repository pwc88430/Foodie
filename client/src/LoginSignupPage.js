import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignupPage.css";

export default function LoginSignupPage() {
    const [signupData, setSignupData] = useState({
        email: "",
        username: "",
        password: ""
    });

    function handleInputChange(event) {
        setSignupData({ ...signupData, [event.target.name]: event.target.value });
    }

    async function handleSignup(event) {
        event.preventDefault(); // Prevents the default form submit action
        try {
            const response = await axios.post('http://localhost:8000/api/users/signup', signupData);
            console.log("User registered successfully", response.data);
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            // Handle errors
        }
    }

    function changeTabs(event) {
        const btns = document.querySelectorAll(".mainButton");
        const articles = document.querySelectorAll(".content");

        console.log(btns);
        console.log(articles);

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
                <img src="logo.png"></img>
            </header>
            <div className="tabs" onClick={changeTabs}>
                <div className="btn-container">
                    <button id="sign-up-tab-button" className="mainButton live" data-id="signup">
                        Sign Up
                    </button>
                    <button className="mainButton" data-id="login">
                        Login
                    </button>
                </div>
                <div className="tabs-content">
                    <div className="content live" id="signup">
                        <form onSubmit={handleSignup}>
                            <input 
                                placeholder="email" 
                                name="email" 
                                value={signupData.email} 
                                onChange={handleInputChange}/>
                            <input 
                                placeholder="username" 
                                name="username" 
                                value={signupData.username} 
                                onChange={handleInputChange} />
                            <input 
                                placeholder="password" 
                                name="password" 
                                type="password"
                                value={signupData.password} 
                                onChange={handleInputChange} />
                            <div>
                                <input type="checkbox"></input>
                                <label>
                                    I agree to the <a href="https://en.wikipedia.org/wiki/Lionel_Messi">Terms of Service</a>
                                </label>
                            </div>
                            <button type = "submit" className="button">Sign Up</button>
                        </form>
                    </div>
                    <div className="content" id="login">
                        <input placeholder="email"></input>
                        <input placeholder="password"></input>
                        <button className="button">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
