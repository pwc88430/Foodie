import Card from "./Card";
import "./Card.css";
import NewRestaurantForm from "./NewRestaurantForm";

export default function Home() {
    function addItem(event) {
        event.target.parentNode.querySelector("#black_background").classList.toggle("hidden");
        console.log(event.target.parentNode.querySelector("#black_background"));
        event.target.parentNode.querySelector("#new_restaurant_form").classList.toggle("hidden");
    }

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
            <div id="logout">Logout</div>
        </div>
    );
}
