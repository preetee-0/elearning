const { google } = require("googleapis");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const googleClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
);

const googleLogin = (req, res) => {
    const url = googleClient.generateAuthUrl({
        access_type: "online",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ],
        prompt: "select_account"
    });

    res.redirect(url);
};

const googleCallback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).send("Google authorization failed");
        }

        const { tokens } =
            await googleClient.getToken(code);

        googleClient.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: googleClient,
            version: "v2"
        });

        const { data } =
            await oauth2.userinfo.get();

        const {
            id,
            name,
            email,
            picture
        } = data;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: null,
                role: "student",
                profileImage: picture || "",
                authProvider: "google",
                providerId: id
            });
        } else {
            user.authProvider = "google";
            user.providerId = id;

            if (picture) {
                user.profileImage = picture;
            }

            await user.save();
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage
        };

        const userParam = encodeURIComponent(
            JSON.stringify(userData)
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/oauth-success?token=${token}&user=${userParam}`
        );

    } catch (error) {
        console.log(
            "GOOGLE OAUTH ERROR:",
            error.response?.data || error.message
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/login?error=google`
        );
    }
};

const githubLogin = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
        scope: "read:user user:email"
    });

    res.redirect(
        `https://github.com/login/oauth/authorize?${params.toString()}`
    );
};

const githubCallback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).send(
                "GitHub authorization failed"
            );
        }

        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret:
                    process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri:
                    process.env.GITHUB_CALLBACK_URL
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );

        const githubAccessToken =
            tokenResponse.data.access_token;

        const githubUserResponse = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization:
                        `Bearer ${githubAccessToken}`,
                    Accept: "application/vnd.github+json"
                }
            }
        );

        const githubUser =
            githubUserResponse.data;

        let email = githubUser.email;

        if (!email) {
            const emailsResponse = await axios.get(
                "https://api.github.com/user/emails",
                {
                    headers: {
                        Authorization:
                            `Bearer ${githubAccessToken}`,
                        Accept:
                            "application/vnd.github+json"
                    }
                }
            );

            const primaryEmail =
                emailsResponse.data.find(
                    (item) => item.primary && item.verified
                );

            email = primaryEmail?.email;
        }

        if (!email) {
            return res.status(400).send(
                "No verified GitHub email found"
            );
        }

        const name =
            githubUser.name ||
            githubUser.login;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: null,
                role: "student",
                profileImage:
                    githubUser.avatar_url || "",
                authProvider: "github",
                providerId:
                    githubUser.id.toString()
            });
        } else {
            user.authProvider = "github";
            user.providerId =
                githubUser.id.toString();

            if (githubUser.avatar_url) {
                user.profileImage =
                    githubUser.avatar_url;
            }

            await user.save();
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage
        };

        const userParam = encodeURIComponent(
            JSON.stringify(userData)
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/oauth-success?token=${token}&user=${userParam}`
        );

    } catch (error) {
        console.log(
            "GITHUB OAUTH ERROR:",
            error.response?.data || error.message
        );

        res.redirect(
            `${process.env.FRONTEND_URL}/login?error=github`
        );
    }
};

module.exports = {
    googleLogin,
    googleCallback,
    githubLogin,
    githubCallback
};