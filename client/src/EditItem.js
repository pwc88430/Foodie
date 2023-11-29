import EditRestaurantForm from "./EditRestaurantForm";
import { Link } from "react-router-dom";

export default function EditItem() {
    return (
        <div>
            <header>
                <img src="Logo.png" alt=""></img>
            </header>
            <EditRestaurantForm />

            <Link style={{ textDecoration: "none" }} id="logout" to="/login">
                Logout
            </Link>
        </div>
    );
}
