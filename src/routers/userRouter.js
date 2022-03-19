import express from "express";
import { edit, remove, logout, see, startGithublogin, finishGithubLogin, startKakaologin, finishKakaologin } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/github/start", startGithublogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaologin);
userRouter.get("/kakao/finish", finishKakaologin);
userRouter.get(":id", see);


export default userRouter;