import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card";
import "./Card.css"; //
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./MyPost.css"
function MyPost() {
        const [userItems, setUserItems] = useState([]);
        const navigate = useNavigate();
        useEffect(() => {
            // Retrieve user's ID from localStorage 
            const userId = localStorage.getItem('userId');
    
            // Make GET request to fetch items associated with the user
            axios
                .get(`http://localhost:8000/api/user/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then((res) => {
                    setUserItems(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, []);
   
        const logout = () => {
            localStorage.removeItem('jwt');
             navigate("/"); // Redirect to home page
            alert('Successfully Logged Out');
        };
    
        const checkLoginStatus = () => {
            return localStorage.getItem("jwt") !== null;
        };

        const userRestaurantList = userItems.map((item, index) => (
            <Card
                user={item.user}
                location={item.location}
                date={item.updated_date}
                id={item._id}
                key={index}
                title={item.title}
                image={item.image}
                review={item.description}
                stars={item.stars}
            />
        ));
    
   
    return (
        <div>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div id="buttonlink" style={{ marginLeft: "auto" }}>
                    <button id="myHome" onClick={() => navigate("/home")} style={{ marginRight: "10px" }}>
                         {checkLoginStatus() ? "Home" : "Home"}
                    </button>
                    <button id="logout" onClick={checkLoginStatus() ? logout : () => navigate("/login")}>
                        {checkLoginStatus() ? "Logout" : "Login"}
                    </button>
                </div>

                <img src="logo.png" alt="" />

              
            </header>


            <div id="card_container">{userRestaurantList}</div>
        </div>
    );

}

export default MyPost;