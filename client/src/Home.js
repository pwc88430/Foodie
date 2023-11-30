import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Card from "./Card";
import "./Card.css";

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    const checkLoginStatus = () => {
        return localStorage.getItem('jwt') !== null;
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/items", { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
            .then((res) => {
                setRestaurants(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);


    const logout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
        alert("Successfully Logged Out");
    }
    const restaurantList = restaurants.map((item, index) => (
        <Card id={item._id} key={index} title={item.name} image={item.image} review={item.description} />
    ));

    return (
        <div>
            <header>
                <img src="logo.png" alt=""></img>
            </header>

            {checkLoginStatus() && (
                <Link to="/addItem" id="new_item_button" style={{ textDecoration: "none" }}>
                    +
                </Link>
            )}
            <div id="card_container">{restaurantList}</div>

            <button id="logout" onClick={checkLoginStatus() ? logout : () => navigate('/login')}>
                {checkLoginStatus() ? "Logout" : "Login"}
            </button>
        </div>
    );
}

