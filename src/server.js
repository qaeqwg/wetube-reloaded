import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

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
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app