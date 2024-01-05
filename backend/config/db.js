import mongoose from "mongoose";

const connectDB = async()=>{
try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    const url = `${db.Connection.host}:${db.connection.port}`;
    console.log(`MongoDB Conectado en ${url}`);
} catch (error) {
    console.log(error);
    process.exit(1);
}

}

export default connectDB;