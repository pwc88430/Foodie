import { useState } from "react";

export default function NewRestaurantForm() {
    const [starCount, setStarCount] = useState(0);

    function increaseStarCount(event) {
        if (event.target.classList.contains("rewarded")) {
            setStarCount(starCount - 1);
        } else {
            setStarCount(starCount + 1);
        }
        event.target.classList.toggle("rewarded");
        console.log(starCount);
    }

    return (
        <div id="new_restaurant_form">
            <h1>New Restaurant Form</h1>
            <div>
                <img onClick={increaseStarCount} src="star.svg"></img>
                <img onClick={increaseStarCount} src="star.svg"></img>
                <img onClick={increaseStarCount} src="star.svg"></img>
                <img onClick={increaseStarCount} src="star.svg"></img>
                <img onClick={increaseStarCount} src="star.svg"></img>
            </div>
            <input placeholder="Restaurant Name"></input>
            <input placeholder="Image Url"></input>
            <textarea placeholder="description"></textarea>
        </div>
    );
}
