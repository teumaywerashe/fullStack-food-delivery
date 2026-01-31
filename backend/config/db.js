import mongoose from "mongoose"
const connectDB = (url) => {
    mongoose.connect(url, {
            connectTimeoutMS: 10000,
        }).then(() => console.log('DB connected'))
        .catch(() => console.log('error'))

}

export default connectDB