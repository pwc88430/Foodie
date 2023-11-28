import EditRestaurantForm from "./EditRestaurantForm";
import { Link } from "react-router-dom";

export default function EditItem() {
    return (
        <div>
            <header>
                <img src="Logo.png"></img>
            </header>
            <EditRestaurantForm />

            <Link id="logout" to="/">
                Logout
            </Link>
        </div>
    );
}
