import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.schema.Types.ObjectId,
        res: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const User = mongoose.model("Tasks", schema);


