import mongoose from "mongoose"
const connectDB = (url) => {
    mongoose.connect(url, {

    }).then(() => console.log('DB connected'))

}

export default connectDB