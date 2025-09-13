import dotenv from "dotenv"

dotenv.config(); // configure dotenv globally ...


const dev = {
    app: {
        apiPort: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PORT : process.env.PORT,
        apiUrl: process.env.API_URL,
        baseUrl: process.env.NODE_ENV === "production" ? process.env.AWS_LIVE_URL : process.env.SERVER_BASE_URL,
        jwtSecretKey: process.env.JWT_SECRET_KEY,
    },
    db: {
        dbName: process.env.DB_NAME,
        dbPort: process.env.DB_PORT,
        dbUrl: process.env.DB_URL || "mongodb://localhost:27017",
    }
};


export default dev;
