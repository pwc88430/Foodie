import "./Card.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Card({ stars, user, location, title, image, review, id, date }) {
    console.log(date);

    const deleteCard = (event) => {
        const token = localStorage.getItem("jwt");
        axios
            .delete(
                `http://localhost:8000/api/items/${id}`,

                {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                    params: { id: id },
                }
            )
            .then((res) => {
                event.parentNode.removeChild(event.parentNode.getElementById(id));
            })
            .catch((err) => {
                console.log(err);
            });
        const card = document.getElementById(id);
        card.parentNode.removeChild(card);
    };

    setTimeout(() => {
        const starEls = document.getElementById(id).querySelector("#rating").querySelectorAll("img");
        console.log(starEls);
        starEls.forEach((star, index) => {
            console.log(index + 1);
            if (index + 1 <= stars) star.src = "star_filled.svg";
        });
    }, 100);

    return (
        <div id={id} className="card">
            <img id="main_picture" src={image} alt=""></img>
            <div id="rating_container">
                <h1 id="title">{title}</h1>
                <div id="rating">
                    <img id="star1" src="star.svg" alt=""></img>
                    <img id="star2" src="star.svg" alt=""></img>
                    <img id="star3" src="star.svg" alt=""></img>
                    <img id="star4" src="star.svg" alt=""></img>
                    <img id="star5" src="star.svg" alt=""></img>
                </div>
            </div>
            <div id="comment_container">
                <div id="user">
                    <img src="user.svg"></img>
                    {user}
                </div>
                <div id="location">
                    <img src="location.svg"></img>
                    {location}
                </div>
                <div id="date">
                    <img src="date.svg"></img>
                    {date.substring(0, 10)}
                </div>
                <div id="review">
                    <img src="review.svg"></img>
                    {review}
                </div>

                <div id="edit_buttons" hidden={!(localStorage.getItem("jwt") !== null)}>
                    <div>
                        <img onClick={deleteCard} src="delete.svg" alt=""></img>
                        <Link id="edit" to={`/editItem/${id}`}>
                            <img src="edit.svg" alt=""></img>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
