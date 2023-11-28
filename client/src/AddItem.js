import NewRestaurantForm from "./NewRestaurantForm";
import { Link } from "react-router-dom";

export default function AddItem() {
    return (
        <div>
            <header>
                <img src="Logo.png"></img>
            </header>
            <NewRestaurantForm />

            <Link id="logout" to="/">
                Logout
            </Link>
        </div>
    );
}
