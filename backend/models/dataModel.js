import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        dataUrl: {
            type: String,
            required: true,
        },
        dataName: {
            type: String,
            required: true,
        },
        dataPublicId: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("data", dataSchema);