import "./LoginSignupPage.css";

export default function LoginSignupPage() {
    function changeTabs(event) {
        const btns = document.querySelectorAll(".mainButton");
        const articles = document.querySelectorAll(".content");

        console.log(btns);
        console.log(articles);

        const id = event.target.dataset.id;

        if (id) {
            btns.forEach((btn) => {
                btn.classList.remove("live");
            });
            event.target.classList.add("live");

            articles.forEach((article) => {
                article.classList.remove("live");
            });
            const element = document.getElementById(id);
            element.classList.add("live");
        }
    }

    return (
        <div>
            <header>
                <img src="logo.png"></img>
            </header>
            <div className="tabs" onClick={changeTabs}>
                <div className="btn-container">
                    <button id="sign-up-tab-button" className="mainButton live" data-id="signup">
                        Sign Up
                    </button>
                    <button className="mainButton" data-id="login">
                        Login
                    </button>
                </div>
                <div className="tabs-content">
                    <div className="content live" id="signup">
                        <input placeholder="email"></input>
                        <input placeholder="username"></input>
                        <input placeholder="password"></input>
                        <div>
                            <input type="checkbox"></input>
                            <label>
                                I agree to the <a href="https://en.wikipedia.org/wiki/Lionel_Messi">Terms of Service</a>
                            </label>
                        </div>
                        <button className="button">Sign Up</button>
                    </div>
                    <div className="content" id="login">
                        <input placeholder="email"></input>
                        <input placeholder="password"></input>
                        <button className="button">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
