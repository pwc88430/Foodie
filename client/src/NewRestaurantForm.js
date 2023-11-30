import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewRestaurantForm() {
    const navigate = useNavigate();
    const [starCount, setStarCount] = useState(0);
    const [enteredName, setEnteredName] = useState("");
    const [enteredImage, setEnteredImage] = useState("");
    const [enteredReview, setEnteredReview] = useState("");
    const [enteredLocation, setEnteredLocation] = useState("");

    function increaseStarCount(event) {
        let stars = event.target.id;
        stars = stars.substring(stars.length - 1, stars.length);
        setStarCount(stars);
        console.log(stars);
    }

    const locationChangeHandler = (event) => {
        setEnteredLocation(event.target.value);
    };

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const imageChangeHandler = (event) => {
        setEnteredImage(event.target.value);
    };

    const reviewChangeHandler = (event) => {
        setEnteredReview(event.target.value);
    };

    function submitHandler(event) {
        event.preventDefault();
        const token = localStorage.getItem("jwt");
        const user = localStorage.getItem("username");

        if (enteredName === "") {
            alert("Please enter a Restaurant Name");
        } else if (enteredImage === "") {
            alert("Please enter a Restaurant Image");
        } else if (enteredReview === "") {
            alert("Please enter a Restaurant Review");
        } else if (enteredLocation == "") {
            alert("Please enter a location");
        } else {
            axios
                .post(
                    "http://localhost:8000/api/items",
                    {
                        title: enteredName,
                        description: enteredReview,
                        publishedDate: new Date(),
                        image: enteredImage,
                        location: enteredLocation,
                        user: user,
                        stars: starCount,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                )
                .then((res) => {
                    setEnteredName("");
                    setEnteredImage("");
                    setEnteredReview("");
                    setEnteredLocation("");
                    alert("Restaurant Added Successfully!");
                    navigate("/home");
                })
                .catch((err) => {
                    console.log("Error");
                });
        }
    }

    return (
        <div id="new_restaurant_form">
            <form onSubmit={submitHandler}>
                <h1>New Restaurant Form</h1>
                <div>
                    <img id="star11" onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img id="star12" onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img id="star13" onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img id="star14" onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img id="star15" onClick={increaseStarCount} src="star.svg" alt=""></img>
                </div>
                <input placeholder="Restaurant Name" value={enteredName} onChange={nameChangeHandler}></input>
                <input placeholder="Image Url" value={enteredImage} onChange={imageChangeHandler}></input>
                <input placeholder="Location" value={enteredLocation} onChange={locationChangeHandler}></input>

                <textarea placeholder="description" value={enteredReview} onChange={reviewChangeHandler}></textarea>
                <button type="submit">Add Restaurant</button>
                <Link style={{ textDecoration: "none" }} id="cancel" to="/home">
                    Cancel
                </Link>
            </form>
        </div>
    );
}
