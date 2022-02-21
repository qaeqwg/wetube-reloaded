import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000

// express app 생성 
const app = express();
const logger = morgan("dev");

// pug를 view engine 으로 설정
app.set("view engine", "pug");
// views의 디렉터리를 현재 디렉터리 + /src/views로 설정
app.set("views", process.cwd() + "/src/views");
// global middleware 생성 
app.use(logger);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// callback 생성 
const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

// 서버가 request를 상시 listen하게 설정
// port와 callback을 설정 
// callback이란? request를 받으면 그에 대한 응답으로 작동하는 함수
app.listen(PORT, handleListening);