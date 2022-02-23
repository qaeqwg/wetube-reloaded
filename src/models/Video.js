import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    },
});

// model 생성, model 이름, schema
const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;