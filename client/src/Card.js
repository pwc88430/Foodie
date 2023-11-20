import "./Card.css";

export default function Card() {
    let restaurantTitle = "Magianos";
    let comment = "I really enjoyed this food here. I will definitely go again!!";

    return (
        <div id="card">
            <img id="main_picture" src="https://media-cdn.tripadvisor.com/media/photo-s/10/e6/3d/5e/the-national-s-dining.jpg"></img>
            <div id="rating_container">
                <h1 id="title">{restaurantTitle}</h1>
                <div id="rating">
                    <img src="star.svg"></img>
                    <img src="star.svg"></img>
                    <img src="star.svg"></img>
                    <img src="star.svg"></img>
                    <img src="star.svg"></img>
                </div>
            </div>
            <div id="comment_container">
                {comment}
                <div id="edit_buttons">
                    <img src="delete.svg"></img>
                    <img src="edit.svg"></img>
                </div>
            </div>
        </div>
    );
}
