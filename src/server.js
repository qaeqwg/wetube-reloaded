import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

// express app 생성 
const app = express();
const logger = morgan("dev");

// pug를 view engine 으로 설정
app.set("view engine", "pug");
// views의 디렉터리를 현재 디렉터리 + /src/views로 설정
app.set("views", process.cwd() + "/src/views");
// global middleware 생성 
app.use(logger);
// express가 페이지의 form을 이해하도록 javascript로 변환해주는 middleware
app.use(express.urlencoded({ extended: true }));

// Session 생성
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        // session이 수정될 때만 쿠키를 저장 = 로그인했을 때만 세션에 저장 
        resave: false,
        // 초기화된 session에 대해서만 쿠키를 저장
        saveUninitialized: false,
        // mongodb에 세션 생성
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL
        }),
    })
);

app.use(localsMiddleware);
// express에게 유저들이 이 폴더 안의 파일들을 볼 수 있게 권한 부여
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app