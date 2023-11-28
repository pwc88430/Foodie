import Card from "./Card";
import "./Card.css";
import NewRestaurantForm from "./NewRestaurantForm";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/items", { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
            .then((res) => {
                setRestaurants(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error");
            });
    }, []);

    let restaurantList;

    restaurantList = restaurants.map((item) => {
        return <li>{item.title}</li>;
    });

    function addItem(event) {}

    return (
        <div>
            <header>
                <img src="logo.png"></img>
            </header>
            <div id="black_background"></div>
            <NewRestaurantForm />
            <div onClick={addItem} id="new_item_button">
                +
            </div>
            <Card />
            <Link id="logout" to="/">
                Logout
            </Link>
        </div>
    );
}
