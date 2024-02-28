import mongoose from 'mongoose';
import ENV from '../config.env'

export default async function connect() {
    const db = await mongoose.connect(ENV.ATALAS_URL);

    if (mongoose.connection.readyState === 1) {
        console.log("Database Connected 🚀");
        return;
    } else {
        console.log("failed to connect db 11")
    }

    console.log(`MongoDB successfully connected...! ${ENV.ATALAS_URL}`)
}

// export default async function connectDB() {
//     const db = await mongoose.connect(dbURL);
//     if (mongoose.connection.readyState === 1) {
//         console.log("DB is connected 🚀");
//     } else {
//         console.log("DB connection failed 11");
//     }
// }
// const connectDB14 = async () => {
//     if (mongoose.connections[0].readyState) return;

//     try {
//       await mongoose.connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log("Mongo Connection successfully established.");
//     } catch (error) {
//       throw new Error("Error connecting to Mongoose");
//     }
//   };

//   export default connectDB14;