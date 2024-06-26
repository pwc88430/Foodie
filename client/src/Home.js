import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card";
import "./Card.css";

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    const checkLoginStatus = () => {
        return localStorage.getItem("jwt") !== null;
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/items", { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
            .then((res) => {
                setRestaurants(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("jwt");
        navigate("/");
        alert("Successfully Logged Out");
    };
    const restaurantList = restaurants.map((item, index) => (
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
                    <button id="myPost" onClick={() => navigate("/MyPost")} style={{ marginRight: "10px" }}>
                        {checkLoginStatus() ? "My Post" : "Start Posting"}
                    </button>
                    <button id="logout" onClick={checkLoginStatus() ? logout : () => navigate("/login")}>
                        {checkLoginStatus() ? "Logout" : "Login"}
                    </button>
                </div>

                <img src="logo.png" alt="" />

                {checkLoginStatus() && (
                    <Link to="/addItem" id="new_item_button" style={{ textDecoration: "none" }}>
                        +
                    </Link>
                )}
            </header>


            <div id="card_container">{restaurantList}</div>
        </div>
    );
}
