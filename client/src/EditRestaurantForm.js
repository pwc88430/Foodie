import { useState } from "react";
import { Link } from "react-router-dom";

export default function EditRestaurantForm() {
    const [starCount, setStarCount] = useState(0);
    const [enteredName, setEnteredName] = useState("");
    const [enteredImage, setEnteredImage] = useState("");
    const [enteredReview, setEnteredReview] = useState("");
    const [enteredLocation, setEnteredLocation] = useState("");

    function increaseStarCount(event) {
        if (event.target.classList.contains("rewarded")) {
            setStarCount(starCount - 1);
        } else {
            setStarCount(starCount + 1);
        }
        event.target.classList.toggle("rewarded");
        console.log(starCount);
    }

    const locationChangeHandler = (event) => [setEnteredLocation(event.target.value)];

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

        if (enteredName === "") {
        } else if (enteredImage === "") {
        } else if (enteredReview === "") {
        } else {
            const id = new Date().getTime();

            console.log("Name: " + enteredName);

            console.log("Image: " + enteredImage);

            console.log("Review: " + enteredReview);
        }
    }

    return (
        <div id="new_restaurant_form">
            <form onSubmit={submitHandler}>
                <h1>Edit Restaurant Form</h1>
                <div>
                    <img onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img onClick={increaseStarCount} src="star.svg" alt=""></img>
                    <img onClick={increaseStarCount} src="star.svg" alt=""></img>
                </div>
                <input placeholder="Restaurant Name" onChange={nameChangeHandler}></input>
                <input placeholder="Image Url" onChange={imageChangeHandler}></input>
                <location placeholder="Location" onChange={locationChangeHandler}></location>
                <textarea placeholder="description" onChange={reviewChangeHandler}></textarea>
                <button type="submit">Update Restaurant</button>
                <Link style={{ textDecoration: "none" }} id="cancel" to="/home">
                    Cancel
                </Link>
            </form>
        </div>
    );
}
