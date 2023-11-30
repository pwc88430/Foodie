const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const JWT_SECRET = "secret";

router.post("/signup", async (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then((user) => {
            // If successful
            res.json({ msg: "New Item added successfully" });
        })
        .catch((err) => {
            // If unseccessful
            res.status(400).json({ error: "Unable to add this item", details: err });
            console.log(err);
        });
});

router.post("/login", async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Compare the password to the stored hash
            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }

                // Create JWT payload
                const payload = {
                    user: {
                        id: user.id,
                        username: user.username,
                    },
                };

                // Sign the token
                jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error in token generation");
                    }

                    // Send response
                    res.status(200).json({ token: token, username: user.username });
                });
            });
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).send("Server error");
        });
});

// router.post('/logout', (req, res) => {
//     res.cookie('jwt', '', { maxAge: 0 });
//     console.log("Logged out successfully");
//     res.send('Logged out successfully');
// });

// router.get('/check-token', (req, res) => {
//     const token = req.cookies.jwt; // Assuming the token is stored in a cookie named 'jwt'
//     console.log(req.cookies);
//     if (!token) {
//         return res.status(401).send({ isLoggedIn: "falso" });
//     }

//     try {
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         res.send({ isLoggedIn: true });
//     } catch (error) {
//         res.status(401).send({ isLoggedIn: false });
//     }
// });

// router.post('/login', async (req, res) => {
//     User.findOne({ email: req.body.email })
//     .then((user) => {
//     // ... existing user check logic ...

//     // Compare the password to the stored hash
//     bcrypt.compare(req.body.password, user.password)
//     .then((isMatch) => {
//         if (!isMatch) {
//         return res.status(401).json({ message: "Invalid email or password" });
//         }
//         // Create JWT payload
//         const payload = {
//         user: {
//             id: user.id,
//             username: user.username
//         }
//         };

//         // Sign the token
//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error in token generation');
//         }

//         // Create cookie
//         res.cookie('jwt', token, {
//             httpOnly: true,
//             secure: false, // true if using https
//             sameSite: 'lax',
//             path: '/',
//             maxAge: 2 * 60 * 60 * 1000 // 2 hours
//         });

//         // Send response
//         res.status(200).send('Logged in successfully');
//         });
//     })
//     })
//     .catch((err) => {
//     console.error(err.message);
//     res.status(500).send('Server error');
//     });
// });

// router.post('/logout', (req, res) => {
//     res.cookie('jwt', '', { maxAge: 0 });
//     console.log("Logged out successfully");
//     res.send('Logged out successfully');
// });

// router.get('/check-token', (req, res) => {
//     const token = req.cookies.jwt; // Assuming the token is stored in a cookie named 'jwt'
//     console.log(req.cookies);
//     if (!token) {
//         return res.status(401).send({ isLoggedIn: "falso" });
//     }

//     try {
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         res.send({ isLoggedIn: true });
//     } catch (error) {
//         res.status(401).send({ isLoggedIn: false });
//     }
// });

module.exports = router;
