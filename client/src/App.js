
import "./App.css";
import LoginSignupPage from "./LoginSignupPage";
import Home from "./Home";
import "./Home.css";
import EditItem from "./EditItem";
import AddItem from "./AddItem";
import MyPost from './MyPost.js';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/login" element={<LoginSignupPage/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/editItem/:itemId" element={<EditItem />} />
                    <Route path="/addItem" element={<AddItem />} />
                    <Route path="/MyPost" element={<MyPost />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
