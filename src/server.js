import express from "express";
import morgan from "morgan";

const PORT = 4000

// express app 생성 
const app = express();
const logger = morgan("dev");

// home directory에 대한 callback 함수 (request, response, 이 함수 다음에 실행할 함수)
const home = (req, res) => {
    console.log("I will respond.");
    return res.send("Hello");
};

const login = (req, res) => {
    return res.send("login");
};

// global middleware 생성 
app.use(logger);
// "/"(root)에 대한 get method를 통한 처리 설정("위치", "callback 함수")
app.get("/", home);
app.get("/login", login);

// callback 생성 
const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

// 서버가 request를 상시 listen하게 설정
// port와 callback을 설정 
// callback이란? request를 받으면 그에 대한 응답으로 작동하는 함수
app.listen(PORT, handleListening);