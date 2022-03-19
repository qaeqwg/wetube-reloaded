import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

const qs = require("qs");

export const getJoin = (req, res) => res.render("Join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password != password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match.",
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(400).render("join",
            {
                pageTitle,
                errorMessage: "This username/email is already taken."
            });
    }
    try {
        await User.create({
            name, username, email, password, location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join",
            {
                pageTitle,
                errorMessage: "This username/email is already taken."
            });
    }
};

export const postLogin = async (req, res) => {
    // 먼저 계정이 존재하는 지 확인    
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("login",
            {
                pageTitle,
                errorMessage: "An account with this username does not exists.",
            });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login",
            {
                pageTitle,
                errorMessage: "Wrong password",
            });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const startGithublogin = (req, res) => {
    const baseURL = `https://github.com/login/oauth/authorize`;
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);
};

export const finishGithubLogin = async (req, res) => {
    const baseURL = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    const tokenRequest = await (await fetch(finalURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();
    if ("access_token" in tokenRequest) {
        const apiURL = "https://api.github.com";
        const { access_token } = tokenRequest;
        const userData = await (await fetch(`${apiURL}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailData = await (await fetch(`${apiURL}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect("/login");
        }
        const user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const startKakaologin = async (req, res) => {
    const baseURL = "https://kauth.kakao.com/oauth/authorize";
    const config = {
        client_id: process.env.KAKAO_CLIENT,
        redirect_uri: "http://localhost:443/users/kakao/finish",
        response_type: "code",
    };
    const params = new URLSearchParams(config).toString();
    return res.redirect(`${baseURL}?${params}`);
};

export const finishKakaologin = async (req, res) => {
    const bodyData = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT,
        redirect_uri: `https://localhost:443/users/kakao/finish`,
        code: req.query.code,
        client_secret: process.env.KAKAO_SECRET,
    };
    const queryStringBody = qs.stringify(bodyData).toString('utf8');
    console.log(queryStringBody);
    const tokenRequest = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: queryStringBody,
    });
    console.log(tokenRequest);
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}
export const see = (req, res) => res.send("See");