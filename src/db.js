import mongoose from "mongoose";

// mongoose를 통해 wetube라는 database로 연결
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB  Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
