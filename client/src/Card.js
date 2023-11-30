import "./Card.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Card({ title, image, review, id }) {
    console.log(title);
    const deleteCard = (event) => {
        axios
            .delete(
                `http://localhost:8000/api/items/${id}`,

                {
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
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

    return (
        <div id={id} className="card">
            <img id="main_picture" src={image} alt=""></img>
            <div id="rating_container">
                <h1 id="title">{title}</h1>
                <div id="rating">
                    <img src="star.svg" alt=""></img>
                    <img src="star.svg" alt=""></img>
                    <img src="star.svg" alt=""></img>
                    <img src="star.svg" alt=""></img>
                    <img src="star.svg" alt=""></img>
                </div>
            </div>
            <div id="comment_container">
                {review}
                <div id="edit_buttons">
                    <img onClick={deleteCard} src="delete.svg" alt=""></img>
                    <Link id="edit" to="/editItem">
                        <img src="edit.svg" alt=""></img>
                    </Link>
                </div>
            </div>
        </div>
    );
}
