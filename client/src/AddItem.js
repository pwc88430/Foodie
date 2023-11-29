import NewRestaurantForm from "./NewRestaurantForm";
import { Link } from "react-router-dom";

export default function AddItem() {
    return (
        <div>
            <header>
                <img src="Logo.png" alt=""></img>
            </header>
            <NewRestaurantForm />

            <Link style={{ textDecoration: "none" }} id="logout" to="/login">
                Logout
            </Link>
        </div>
    );
}
