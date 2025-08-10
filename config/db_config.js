import mongoose from "mongoose";
import dev from "./config.js";


export const connnectDB = async (options = {}) => {
    try {
        // console.log('db full url: ', `${dev?.db?.dbUrl}/${dev?.db?.dbName}`);

        await mongoose.connect(`${dev?.db?.dbUrl}/${dev?.db?.dbName}`, {
            ...options,
        });
        console.log("Connection of Db is successfully established....");

        // check error in db credentials after successfull connection established ...
        mongoose.connection.on('error', error => {
            console.log('Database Connection Error: ', error);
        });
    } catch (error) {
        console.log(`Couldn't connect to db: `, error);
        process.exit(1);
    }
};