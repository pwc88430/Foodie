import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewRestaurantForm() {
    const navigate = useNavigate();
    const [starCount, setStarCount] = useState(0);
    const [enteredName, setEnteredName] = useState("");
    const [enteredImage, setEnteredImage] = useState("");
    const [enteredReview, setEnteredReview] = useState("");

    function increaseStarCount(event) {
        if (event.target.classList.contains("rewarded")) {
            setStarCount(starCount - 1);
        } else {
            setStarCount(starCount + 1);
        }
        event.target.classList.toggle("rewarded");
        console.log(starCount);
    }

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

        if (enteredName == "") {
            alert("Please enter a Restaurant Name");
        } else if (enteredImage == "") {
            alert("Please enter a Restaurant Image");
        } else if (enteredReview == "") {
            alert("Please enter a Restaurant Review");
        } else {
            axios
                .post(
                    "http://localhost:8000/api/items",
                    { title: enteredName, description: enteredReview, publishedDate: new Date(), image: enteredImage },
                    {
                        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                    }
                )
                .then((res) => {
                    setEnteredName("");
                    setEnteredImage("");
                    setEnteredReview("");
                    alert("Restaurant Added Successfully!");
                    navigate("/home");
                })
                .catch((err) => {
                    console.log("Error");
                });
            const id = new Date().getTime();

            console.log("Name: " + enteredName);

            console.log("Image: " + enteredImage);

            console.log("Review: " + enteredReview);
        }
    }

    return (
        <div id="new_restaurant_form">
            <form onSubmit={submitHandler}>
                <h1>New Restaurant Form</h1>
                <div>
                    <img onClick={increaseStarCount} src="star.svg"></img>
                    <img onClick={increaseStarCount} src="star.svg"></img>
                    <img onClick={increaseStarCount} src="star.svg"></img>
                    <img onClick={increaseStarCount} src="star.svg"></img>
                    <img onClick={increaseStarCount} src="star.svg"></img>
                </div>
                <input placeholder="Restaurant Name" value={enteredName} onChange={nameChangeHandler}></input>
                <input placeholder="Image Url" value={enteredImage} onChange={imageChangeHandler}></input>
                <textarea placeholder="description" value={enteredReview} onChange={reviewChangeHandler}></textarea>
                <button type="submit">Add Restaurant</button>
                <Link style={{ textDecoration: "none" }} id="cancel" to="/home">
                    Cancel
                </Link>
            </form>
        </div>
    );
}
