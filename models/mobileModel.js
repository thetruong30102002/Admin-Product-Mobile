
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const MobileSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            min: 0
        },
        image: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const Mobile = mongoose.model("Mobile", MobileSchema);
export default Mobile;