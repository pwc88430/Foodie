import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditRestaurantForm() {
    const navigate = useNavigate();
    const { itemId } = useParams();
    useEffect(() => {
        axios
        .get("http://localhost:8000/api/items/" + itemId, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
        .then((res) => {
            //console.log(res.data)
            setStarCount(res.data.stars);
            //console.log(starCount);
            setEnteredName(res.data.title);
            //console.log(enteredName)
            setEnteredImage(res.data.image);
            //console.log(enteredImage);
            setEnteredReview(res.data.description);
            //console.log(enteredReview);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

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
        const token = localStorage.getItem("jwt");
        const user = localStorage.getItem("username");
        axios.put(
            "http://localhost:8000/api/items/"+itemId,
            {
                title: enteredName,
                description: enteredReview,
                publishedDate: new Date(),
                image: enteredImage,
                // location: enteredLocation,
                user: user,
                stars: starCount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                alert("Restaurant Updated Successfully!");
                navigate("/home");
            })
            .catch((err) => {
                console.log("Error" + err);
            });
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
                <input placeholder={enteredName} onChange={nameChangeHandler}></input>
                <input placeholder={enteredImage}onChange={imageChangeHandler}></input>
                <textarea placeholder={enteredReview}onChange={reviewChangeHandler}></textarea>
                <location placeholder={enteredLocation} onChange={locationChangeHandler}></location>
                <button type="submit">Update Restaurant</button>
                <Link style={{ textDecoration: "none" }} id="cancel" to="/home">
                    Cancel
                </Link>
            </form>
        </div>
    );
}
