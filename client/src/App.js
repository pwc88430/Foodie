
import "./App.css";
import LoginSignupPage from "./LoginSignupPage";
import Home from "./Home";
import "./Home.css";
import EditItem from "./EditItem";
import AddItem from "./AddItem";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginSignupPage/>} />
                    <Route exact path="/login" element={<LoginSignupPage/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/editItem" element={<EditItem />} />
                    <Route path="/addItem" element={<AddItem />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
