const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
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
            res.status(400).json({ error: "Unable to add this item", details: err});
            console.log(err);
        });
});

router.post('/login', async (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
        // Return error if email doesn't exist
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Compare the password to the stored hash
        bcrypt.compare(req.body.password, user.password)
        .then((isMatch) => {
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            // Create JWT payload
            const payload = {
                user: {
                    id: user.id,
                    username: user.username
                }
            };

            // Sign the token
            accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
            });

            // Create cookie
            res.cookie('jwt', accessToken, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000 // Cookie expiry set to 2 days
            });
            res.status(200).send('Logged in successfully');
        })
    })
    .catch((err) => {
        console.error(err.message);
        res.status(500).send('Server error');
    })
});

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.send('Logged out successfully');
});

// router.post('/login', async (req, res) => {
//     try {
//         // Find the user by email
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Compare the provided password with the stored hash
//         const isMatch = await bcrypt.compare(req.body.password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         // Create JWT payload
//         const payload = {
//             user: {
//                 id: user.id,
//                 username: user.username
//             }
//         };

//         // Sign the token and send it
//         jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });


module.exports = router;
