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

    restaurantList = restaurants.map((item, index) => {
        return <Card id={item._id} key={index} title={item.name} image={item.image} review={item.description} />;
    });

    function addItem(event) {}

    return (
        <div>
            <header>
                <img src="logo.png" alt=""></img>
            </header>

            <Link style={{ textDecoration: "none" }} to="/addItem" id="new_item_button">
                +
            </Link>
            <div id="card_container">{restaurantList}</div>

            <Link style={{ textDecoration: "none" }} id="logout" to="/login">
                Logout
            </Link>
        </div>
    );
}
