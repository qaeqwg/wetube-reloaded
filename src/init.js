import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server"

const PORT = 443

// callback 생성 
const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

// 서버가 request를 상시 listen하게 설정
// port와 callback을 설정 
// callback이란? request를 받으면 그에 대한 응답으로 작동하는 함수
app.listen(PORT, handleListening);