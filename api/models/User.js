import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max:5
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    feature: {
        type: Boolean,
        required: false
    },
});

export default mongoose.model("User", UserSchema);