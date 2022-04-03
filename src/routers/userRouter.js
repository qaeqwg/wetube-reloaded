import express from "express";
import {
    getEdit,
    postEdit,
    remove,
    logout,
    see,
    startGithublogin,
    finishGithubLogin,
    startKakaologin,
    finishKakaologin,
    getChangePassword,
    postChangePassword
} from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";

export const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/delete", remove);
userRouter.get("/github/start", publicOnlyMiddleware, startGithublogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/kakao/start", publicOnlyMiddleware, startKakaologin);
userRouter.get("/kakao/finish", publicOnlyMiddleware, finishKakaologin);
userRouter.get("/:id", see);


export default userRouter;